"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Standard high-end practice: disable browser auto scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Spline & GSAP style buttery smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId: number | null = null;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    const startRaf = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(raf);
      }
    };

    const stopRaf = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    startRaf();

    // Pause momentum engine when tab is inactive to save battery
    const onVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
        stopRaf();
      } else {
        lenis.start();
        startRaf();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Luxury smooth anchor navigation for all in-page links
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href) as HTMLElement | null;
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, { offset: 0, duration: 1.4 });
        }
      }
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      stopRaf();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
