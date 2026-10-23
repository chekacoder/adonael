"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type Lenis from "lenis";
import {
  ExternalLink,
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

const TOTAL_FRAMES = 240;
const START_FRAME = 0; // Starts strictly from 0:00 video start

export default function EthioEVSpare() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const requestedFramesRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const isPlayingAutoRef = useRef(false);

  // Smooth interpolation refs (starts precisely from 0:00)
  const currentFrameRef = useRef(START_FRAME);
  const targetFrameRef = useRef(START_FRAME);
  const lastDrawnFrameRef = useRef(-1);

  const lerpedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastStateProgressRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const lastAutoTimeRef = useRef<number | null>(null);

  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.evspare.buyer&pcampaignid=web_share";
  const webAppUrl = "https://auto-s-sooty.vercel.app";

  // Draw frame with true full-screen 4K cover geometry and high-precision interpolation
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return false;

    let img = imagesRef.current[frameIdx];
    let isExact = true;

    // Fallback: ONLY search backward for the most recently loaded earlier frame.
    // NEVER look forward to future frames, which would cause premature jumping!
    if (!img || !img.complete || img.naturalWidth === 0) {
      isExact = false;
      for (let f = frameIdx - 1; f >= 0; f--) {
        const prev = imagesRef.current[f];
        if (prev?.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
      }
      // Ultimate baseline: frame 0 fallback
      if (!img || !img.complete || img.naturalWidth === 0) {
        img = imagesRef.current[0];
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return false;

    // 4K Ultra-Crisp High-Definition bicubic smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    // True fullscreen cover geometry: fills entire display with zero distortion
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const drawWidth = Math.round(imgWidth * scale);
    const drawHeight = Math.round(imgHeight * scale);
    let drawX = Math.round((canvasWidth - drawWidth) / 2);
    const drawY = Math.round((canvasHeight - drawHeight) / 2);

    // Responsive entrance pinning: on narrow/tall displays where drawX < 0,
    // prevent the car from being cropped off-screen during frames 0 to 32
    if (frameIdx <= 32 && drawX < 0) {
      const leftShiftRatio = 1 - (frameIdx / 32);
      drawX = Math.round(drawX * (1 - leftShiftRatio));
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    return isExact;
  }, []);

  // Priority-ordered bounded frame preloader
  // 1. Fully prioritizes opening frames 0 to 48 in strict order before scheduling later frames
  // 2. Loads the rest in bounded batches with controlled concurrency to prevent network saturation
  // 3. Dynamically prioritizes frames around the user's active scroll position
  useEffect(() => {
    let isCancelled = false;
    const images = imagesRef.current;
    const requested = requestedFramesRef.current;

    // Single frame loader returning a promise that resolves upon load/error
    const loadSingleFrame = (idx: number): Promise<void> => {
      if (idx < 0 || idx >= TOTAL_FRAMES || requested[idx] || isCancelled) {
        return Promise.resolve();
      }
      requested[idx] = true;

      return new Promise<void>((resolve) => {
        const img = new Image();
        const padded = String(idx).padStart(3, "0");

        img.onload = () => {
          if (!isCancelled) {
            images[idx] = img;
            const curr = Math.round(currentFrameRef.current);
            if (idx === START_FRAME || Math.abs(curr - idx) <= 1) {
              drawFrame(curr);
            }
          }
          resolve();
        };

        img.onerror = () => {
          if (!isCancelled) {
            requested[idx] = false;
          }
          resolve();
        };

        img.src = `/ev-sequence/frame_${padded}.webp`;

        if (img.complete && !isCancelled) {
          images[idx] = img;
          const curr = Math.round(currentFrameRef.current);
          if (idx === START_FRAME || Math.abs(curr - idx) <= 1) {
            drawFrame(curr);
          }
          resolve();
        }
      });
    };

    // 1. Immediately load frame 0 for instant visual presence & poster fallback
    loadSingleFrame(0);

    // 2. Defer chronological queue (frames 1 to 48) until the visitor enters this section.
    let proximityInterval: NodeJS.Timeout | null = null;
    let hasStartedQueue = false;

    const startPreload = () => {
      if (hasStartedQueue || isCancelled) return;
      hasStartedQueue = true;

      // Chronological priority worker queue for opening frames (1 to 48)
      const OPENING_END = 48;
      let nextOpeningIdx = 1;

      const openingWorker = async () => {
        while (nextOpeningIdx <= OPENING_END && !isCancelled) {
          const idx = nextOpeningIdx++;
          await loadSingleFrame(idx);
        }
      };

      const concurrency = 6;
      Promise.all(Array.from({ length: concurrency }, () => openingWorker()));

      // 3. Sliding window proximity loader around current scroll position
      // Only streams a small window [curr - 2, curr + 22] ahead on demand as the user scrubs
      proximityInterval = setInterval(() => {
        if (isCancelled) return;
        const curr = Math.round(currentFrameRef.current);
        const start = Math.max(0, curr - 2);
        const end = Math.min(TOTAL_FRAMES - 1, curr + 22);

        for (let i = start; i <= end; i++) {
          if (!requested[i]) {
            loadSingleFrame(i);
          }
        }
      }, 100);
    };

    // The section begins immediately after the full-screen hero, so a positive
    // margin would begin downloading the sequence on the initial page view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPreload();
        }
      },
      { rootMargin: "0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      isCancelled = true;
      if (proximityInterval) clearInterval(proximityInterval);
      observer.disconnect();
    };
  }, [drawFrame]);

  // Handle canvas resize to fill viewport completely with true 4K-ready DPR
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // 4K resolution buffer scaling (up to 3.0x DPR for high-density & Retina displays)
      const dpr = Math.min(window.devicePixelRatio || 1, 3.0);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      lastDrawnFrameRef.current = -1;
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Render only while the section and browser tab are visible.
  useEffect(() => {
    let isVisible = false;
    let isPageVisible = !document.hidden;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderLoop = (time: number) => {
      if (!isVisible || !isPageVisible || prefersReducedMotion) {
        animFrameIdRef.current = null;
        return;
      }

      // 1. Auto-play mode (when user clicks Play Full Sequence)
      if (isPlayingAutoRef.current) {
        if (lastAutoTimeRef.current === null) lastAutoTimeRef.current = time;
        const dt = time - lastAutoTimeRef.current;
        lastAutoTimeRef.current = time;

        // Advance at 24 frames per second
        currentFrameRef.current += (dt / 1000) * 24;
        if (currentFrameRef.current >= TOTAL_FRAMES - 1) {
          currentFrameRef.current = TOTAL_FRAMES - 1;
          isPlayingAutoRef.current = false;
          setIsPlayingAuto(false);
        }
        targetFrameRef.current = currentFrameRef.current;

        // Sync scrollProgress to match auto-playback
        const prog = currentFrameRef.current / (TOTAL_FRAMES - 1);
        lerpedProgressRef.current = prog;
        setScrollProgress(prog);
      } else {
        lastAutoTimeRef.current = null;

        // 2. Smooth scrubbing interpolation (GSAP/Spline style buttery inertia)
        const frameDiff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(frameDiff) > 0.001) {
          currentFrameRef.current += frameDiff * 0.15;
          if (Math.abs(targetFrameRef.current - currentFrameRef.current) < 0.005) {
            currentFrameRef.current = targetFrameRef.current;
          }
        }

        // 3. Scroll progress smoothing for text overlays
        const progDiff = targetProgressRef.current - lerpedProgressRef.current;
        if (Math.abs(progDiff) > 0.0001) {
          lerpedProgressRef.current += progDiff * 0.15;
          if (Math.abs(targetProgressRef.current - lerpedProgressRef.current) < 0.002) {
            lerpedProgressRef.current = targetProgressRef.current;
          }

          if (Math.abs(lerpedProgressRef.current - lastStateProgressRef.current) > 0.002) {
            setScrollProgress(lerpedProgressRef.current);
            lastStateProgressRef.current = lerpedProgressRef.current;
          }
        }
      }

      // Draw current interpolated frame
      const frameToDraw = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
      );
      if (frameToDraw !== lastDrawnFrameRef.current) {
        const drawnExact = drawFrame(frameToDraw);
        if (drawnExact) {
          lastDrawnFrameRef.current = frameToDraw;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    const startRendering = () => {
      if (
        animFrameIdRef.current === null &&
        isVisible &&
        isPageVisible &&
        !prefersReducedMotion
      ) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    const stopRendering = () => {
      if (animFrameIdRef.current !== null) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startRendering();
        } else {
          stopRendering();
        }
      },
      { rootMargin: "300px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startRendering();
      } else {
        stopRendering();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      stopRendering();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [drawFrame]);

  // Scroll event listener synchronized with Lenis smooth momentum
  useEffect(() => {
    const handleScroll = () => {
      // If user is manually scrolling, disable auto-play mode so user has full control
      if (isPlayingAutoRef.current) {
        isPlayingAutoRef.current = false;
        setIsPlayingAuto(false);
      }

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // When section is above or approaching viewport (rect.top > 0), progress is strictly 0.0 (Frame 0: 0:00)
      if (rect.top > 0) {
        targetProgressRef.current = 0;
        targetFrameRef.current = 0;
        return;
      }

      // When section is sticky (rect.top <= 0), progress maps from 0.0 to 1.0
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      targetProgressRef.current = progress;

      // Generous cinematic pacing: 32% of total scroll dedicated to 0:00-2.0s (Frames 0-48)
      // Gives ~1,100+ pixels of luxurious scroll room for the car entrance, centering, and parking!
      let targetFrame = 0;
      if (progress <= 0.32) {
        // Frames 0 to 48 across first 32% of scroll
        targetFrame = (progress / 0.32) * 48;
      } else {
        // Frames 48 to 239 across remaining 68% of scroll
        targetFrame = 48 + ((progress - 0.32) / 0.68) * (TOTAL_FRAMES - 1 - 48);
      }

      targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrame));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let lenisUnsub: (() => void) | null = null;
    const setupLenis = () => {
      const lenis = (window as unknown as { lenis?: Lenis }).lenis;
      if (lenis) {
        lenis.on("scroll", handleScroll);
        lenisUnsub = () => lenis.off("scroll", handleScroll);
      }
    };
    setupLenis();
    const lenisTimer = setTimeout(setupLenis, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(lenisTimer);
      if (lenisUnsub) lenisUnsub();
    };
  }, []);

  // Toggle Auto-play full sequence
  const toggleAutoPlay = () => {
    if (isPlayingAutoRef.current) {
      isPlayingAutoRef.current = false;
      setIsPlayingAuto(false);
    } else {
      // If at end, loop back to start
      if (currentFrameRef.current >= TOTAL_FRAMES - 2) {
        currentFrameRef.current = 0;
        targetFrameRef.current = 0;
        lastDrawnFrameRef.current = -1;
        drawFrame(0);
      }
      isPlayingAutoRef.current = true;
      setIsPlayingAuto(true);
    }
  };

  // Reset sequence back to 0:00
  const resetToStart = () => {
    isPlayingAutoRef.current = false;
    setIsPlayingAuto(false);
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;
    lastDrawnFrameRef.current = -1;
    drawFrame(0);

    // Also scroll container to top of section
    const container = containerRef.current;
    if (container) {
      const top = container.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Discrete stage partitioning tuned to exact 240-frame video cuts starting from 0:00
  // Stage 1: Frames 0 - 48 (0.00 - 0.32): Car Entrance from 0:00, Centering & Pristine EV [RIGHT]
  // Stage 1B: Frames 49 - 74 (0.32 - 0.44): 3D Exploded Powertrain & Battery Enclosure [RIGHT]
  // Stage 2: Frames 75 - 95 (0.44 - 0.54): Matrix LED Headlight & Modular Front [RIGHT]
  // Stage 3: Frames 96 - 117 (0.54 - 0.65): Ceramic Brake Disc & Dual-Piston Caliper [LEFT]
  // Stage 4: Frames 118 - 172 (0.65 - 0.80): Pneumatic Air Suspension & Structural Enclosures [RIGHT]
  // Stage 5: Frames 173 - 239 (0.80 - 1.00): 10,000+ Parts & Official Play Store App [RIGHT]
  const isStage1 = scrollProgress < 0.32;
  const isStage1B = scrollProgress >= 0.32 && scrollProgress < 0.44;
  const isStage2 = scrollProgress >= 0.44 && scrollProgress < 0.54;
  const isStage3 = scrollProgress >= 0.54 && scrollProgress < 0.65;
  const isStage4 = scrollProgress >= 0.65 && scrollProgress < 0.80;
  const isStage5 = scrollProgress >= 0.80;

  return (
    <section
      id="ethio-ev"
      ref={containerRef}
      className="relative h-[600vh] bg-white"
    >
      {/* Sticky Fullscreen 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Instant visual fallback: frame 0 (0:00 video start) */}
        <img
          src="/ev-sequence/frame_000.webp"
          alt="Electric Vehicle Powertrain"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          loading="eager"
        />

        {/* Fullscreen 4K High-Definition 3D Canvas Video Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
          style={{
            filter: "contrast(1.05) brightness(1.01) saturate(1.03)",
            imageRendering: "auto",
          }}
        />

        {/* Cinematic Auto-Play / Pause Floating Pill Controls (Bottom Left) */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 z-30 flex items-center gap-2 pointer-events-auto">
          <button
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 hover:bg-white text-slate-800 hover:text-slate-950 font-bold text-xs tracking-wide shadow-[0_8px_24px_rgba(15,23,42,0.1)] border border-slate-200/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            title={isPlayingAuto ? "Pause Animation" : "Play Full 4K Sequence"}
          >
            {isPlayingAuto ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 ml-0.5" />
                <span>Play Full Sequence</span>
              </>
            )}
          </button>

          <button
            onClick={resetToStart}
            className="p-2 rounded-full bg-white/85 hover:bg-white text-slate-700 hover:text-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.1)] border border-slate-200/80 backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            title="Reset to 0:00"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Content Overlays - Strict single-stage rendering, Left/Right alternating, fully transparent */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-14 pointer-events-none flex items-center min-h-[calc(100vh-80px)] pt-16">
          
          {/* Stage 1: Intro & Entrance from 0:00 - RIGHT (Keeps left side 100% open for car drive-in) */}
          {isStage1 && (
            <div className="w-full flex justify-end pointer-events-auto">
              <div className="w-full max-w-[360px] sm:max-w-[400px] text-left animate-fade-in bg-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 font-sans">
                    An Adonael Trading Enterprise
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight"
                  style={{ textShadow: "0 1px 12px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.9), 0 0 30px #ffffff" }}
                >
                  Ethio EV Spare Parts Supply
                </h2>
                <p
                  className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold mb-5"
                  style={{ textShadow: "0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 16px #ffffff" }}
                >
                  Adonael Trading accelerates Ethiopia’s clean transportation revolution. Through Ethio EV Spare, we supply certified electric vehicle powertrains, modular replacements, and nationwide technical logistics.
                </p>

                <div
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-sky-600 font-bold uppercase tracking-wider animate-bounce"
                  style={{ textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)" }}
                >
                  <span>Scroll to explore disassembly</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Stage 1B: 3D Exploded Powertrain & Subframe (0.32 - 0.44) - RIGHT */}
          {isStage1B && (
            <div className="w-full flex justify-end pointer-events-auto">
              <div className="w-full max-w-[360px] sm:max-w-[400px] text-left animate-fade-in bg-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 font-sans">
                    Core Powertrain Logistics
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight"
                  style={{ textShadow: "0 1px 12px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.9), 0 0 30px #ffffff" }}
                >
                  Modular 3D Powertrain Architecture
                </h2>
                <p
                  className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold mb-4"
                  style={{ textShadow: "0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 16px #ffffff" }}
                >
                  Precision OEM engineering delivered through Adonael Trading&apos;s direct international supply chain: dual traction motors, structural LFP battery packs, and high-tensile subframes.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-slate-900 mb-5 font-semibold">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>Dual high-torque electric traction motors</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>High-voltage structural battery enclosure</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>Lightweight reinforced aluminum subframe</span>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-sky-600 font-bold uppercase tracking-wider animate-bounce"
                  style={{ textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)" }}
                >
                  <span>Scroll for matrix optics</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Matrix LED Headlight & Modular Front (0.44 - 0.54) - RIGHT */}
          {isStage2 && (
            <div className="w-full flex justify-end pointer-events-auto">
              <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] text-left animate-fade-in bg-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 font-sans">
                    OEM Optical Systems
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight"
                  style={{ textShadow: "0 1px 12px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.9), 0 0 30px #ffffff" }}
                >
                  Adaptive Matrix LED Optics & Fascia
                </h2>
                <p
                  className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold mb-4"
                  style={{ textShadow: "0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 16px #ffffff" }}
                >
                  Adaptive multi-zone beam matrices engineered for Ethiopian night highways. Sourced with factory CAN-bus calibration and guaranteed optical alignment.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-slate-900 mb-5 font-semibold">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Multi-zone adaptive matrix headlight array</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>UV-stabilized polycarbonate aerodynamic lens</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Integrated CAN-bus optical level controllers</span>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-sky-600 font-bold uppercase tracking-wider animate-bounce"
                  style={{ textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)" }}
                >
                  <span>Scroll for ceramic brakes</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Stage 3: Regenerative Brakes & Discs (0.54 - 0.65) - LEFT */}
          {isStage3 && (
            <div className="w-full flex justify-start pointer-events-auto">
              <div className="w-full max-w-[320px] sm:max-w-[350px] lg:max-w-[360px] text-left animate-fade-in bg-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 font-sans">
                    Thermal Braking Dynamics
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight"
                  style={{ textShadow: "0 1px 12px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.9), 0 0 30px #ffffff" }}
                >
                  Carbon-Ceramic Braking Precision
                </h2>
                <p
                  className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold mb-4"
                  style={{ textShadow: "0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 16px #ffffff" }}
                >
                  Electric vehicles exert substantial thermal demand on braking systems. Sourced directly via Adonael Trading&apos;s Addis Ababa central hub with zero brake fade.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-slate-900 mb-5 font-semibold">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Low-dust ceramic compound for regenerative braking</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Integrated electronic wear warning telemetry</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Cross-drilled heat dissipation channels</span>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-sky-600 font-bold uppercase tracking-wider animate-bounce"
                  style={{ textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)" }}
                >
                  <span>Scroll for air suspension</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Stage 4: Modular Air Suspension & Enclosures (0.65 - 0.80) - RIGHT */}
          {isStage4 && (
            <div className="w-full flex justify-end pointer-events-auto">
              <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] text-left animate-fade-in bg-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-700 font-sans">
                    Chassis & Terrain Defense
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.15] mb-3 tracking-tight"
                  style={{ textShadow: "0 1px 12px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.9), 0 0 30px #ffffff" }}
                >
                  Active Air Suspension & Underbody Armor
                </h2>
                <p
                  className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold mb-4"
                  style={{ textShadow: "0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 16px #ffffff" }}
                >
                  From adaptive pneumatic struts and damping valves to heavy-duty underbody battery armor plates, Adonael Trading supplies factory-calibrated structural components for Ethiopia&apos;s roads.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-slate-900 mb-5 font-semibold">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Adaptive air dampers with millisecond valve response</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Underbody battery armor plates for rough terrain</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0" />
                    <span>Acoustic door seals and factory structural fitment</span>
                  </div>
                </div>

                <div
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-sky-600 font-bold uppercase tracking-wider animate-bounce"
                  style={{ textShadow: "0 1px 8px rgba(255, 255, 255, 0.95)" }}
                >
                  <span>Scroll for mobile app download</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Stage 5: App & Play Store CTA (0.80 - 1.00) - RIGHT (Never center!) */}
          {isStage5 && (
            <div className="w-full flex justify-end pointer-events-auto">
              <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] text-left animate-fade-in bg-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 font-sans">
                    Ethio EV Spare · Adonael Trading
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-[1.15] mb-2.5"
                  style={{ textShadow: "0 1px 12px rgba(255, 255, 255, 0.95), 0 2px 20px rgba(255, 255, 255, 0.9), 0 0 30px #ffffff" }}
                >
                  10,000+ EV Spare Parts <br />
                  <span className="gradient-text-ev">Directly in Your Pocket</span>
                </h2>

                <p
                  className="text-xs sm:text-sm text-slate-800 font-semibold mb-4 leading-relaxed"
                  style={{ textShadow: "0 1px 10px rgba(255, 255, 255, 0.95), 0 2px 16px #ffffff" }}
                >
                  Search by vehicle model or chassis number, check live inventory in Adonael Trading&apos;s Addis Ababa warehouses, and order with express local delivery.
                </p>

                {/* Direct Wholesale Contact Bar */}
                <div className="mb-4 p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/90 text-xs text-slate-800 flex items-center justify-between shadow-xs">
                  <span className="font-semibold text-slate-600">Wholesale Desk:</span>
                  <div className="flex items-center gap-2 font-bold text-[#059669]">
                    <a href="tel:0967431638" className="hover:underline">0967431638</a>
                    <span className="text-slate-300">·</span>
                    <a href="mailto:info@adonaeltrading.com" className="hover:underline text-slate-800">info@adonaeltrading.com</a>
                  </div>
                </div>

                {/* Google Play Store & Web Portal CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mb-4">
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-playstore py-2.5 px-4 group shadow-lg"
                  >
                    {/* Official Google Play Vector */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3.6 1.8L14.4 12.6L3.6 23.4C3.2 23 3 22.4 3 21.6V3.6C3 2.8 3.2 2.2 3.6 1.8Z"
                        fill="#2196F3"
                      />
                      <path
                        d="M17.4 9.6L14.4 12.6L3.6 1.8C4.1 1.4 4.7 1.3 5.3 1.6L17.4 8.5C18.2 8.9 18.2 9.2 17.4 9.6Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M14.4 12.6L17.4 15.6C18.2 16 18.2 16.3 17.4 16.7L5.3 23.6C4.7 23.9 4.1 23.8 3.6 23.4L14.4 12.6Z"
                        fill="#F44336"
                      />
                      <path
                        d="M20.2 11.2L17.4 9.6L14.4 12.6L17.4 15.6L20.2 14C21.3 13.4 21.3 12 20.2 11.2Z"
                        fill="#FFEB3B"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] tracking-wider uppercase text-slate-300 font-medium leading-none mb-1">
                        GET IT ON
                      </div>
                      <div className="text-sm font-bold text-white tracking-wide leading-none">
                        Google Play
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-white" />
                  </a>

                  <a
                    href={webAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 font-bold shadow-md bg-white/70"
                  >
                    <span>Open Web Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                  </a>
                </div>

                <div className="text-xs text-slate-600 font-medium drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
                  Compatible with Android 8.0+ · Free Download · Direct Wholesale Inquiries Supported
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
