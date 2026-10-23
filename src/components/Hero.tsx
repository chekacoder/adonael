"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  image: string;
  alt: string;
  className?: string;
}

function ProductCard({ image, alt, className = "" }: ProductCardProps) {
  return (
    <div
      className={`w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px] xl:w-[155px] xl:h-[155px] 2xl:w-[165px] 2xl:h-[165px] bg-white rounded-[16px] sm:rounded-[18px] xl:rounded-[20px] border border-sky-100/90 shadow-[0_10px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.12)] hover:scale-[1.03] transition-all duration-300 p-3 sm:p-3.5 flex items-center justify-center shrink-0 select-none group relative overflow-hidden ${className}`}
    >
      {/* Isolated Product Image with Crisp Studio Clarity & Lightweight WebP Payload */}
      <img
        src={image}
        alt={alt}
        width={160}
        height={160}
        decoding="async"
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        loading="lazy"
      />

      {/* Subtle Specular Surface Highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/[0.02] via-transparent to-white/30 pointer-events-none" />
    </div>
  );
}

// 4 distinct item lists (8 curated cards each) using lightweight 320px WebP thumbnails
const col1Items = [
  { image: "/images/thumbs/ev_suspension.webp", alt: "Automotive Air Suspension Strut" },
  { image: "/images/thumbs/ev_wheel.webp", alt: "EV Performance Alloy Wheel with Green Caliper" },
  { image: "/images/thumbs/ev_rotor.webp", alt: "Cross-Drilled and Vented Brake Disc Rotor" },
  { image: "/images/thumbs/ev_bracket.webp", alt: "Suspension Structural Knuckle" },
  { image: "/images/thumbs/ev_headlight.webp", alt: "Matrix LED Headlight Assembly" },
  { image: "/images/thumbs/ev_motor.webp", alt: "High-Power EV Traction Motor" },
  { image: "/images/thumbs/ev_battery.webp", alt: "High-Voltage EV Battery Pack Module" },
  { image: "/images/thumbs/ev_charger.webp", alt: "CCS2 Fast Charging Gun Connector" },
];

const col2Items = [
  { image: "/images/thumbs/ev_headlight.webp", alt: "Matrix LED Headlight Assembly" },
  { image: "/images/thumbs/ev_charger.webp", alt: "CCS2 Fast Charging Gun Connector" },
  { image: "/images/thumbs/ev_sensor.webp", alt: "Automotive Electronic Sensor Module" },
  { image: "/images/thumbs/ev_wheel.webp", alt: "EV Performance Alloy Wheel" },
  { image: "/images/thumbs/ev_inverter.webp", alt: "High-Voltage EV Inverter Power Electronics" },
  { image: "/images/thumbs/ev_rotor.webp", alt: "Vented Brake Disc Rotor" },
  { image: "/images/thumbs/ev_suspension.webp", alt: "Air Suspension Strut" },
  { image: "/images/thumbs/ev_brakepads.webp", alt: "Ceramic Automotive Brake Pads Pair" },
];

const col3Items = [
  { image: "/images/thumbs/ev_motor.webp", alt: "High-Power EV Traction Motor" },
  { image: "/images/thumbs/ev_brakepads.webp", alt: "Ceramic Automotive Brake Pads Pair" },
  { image: "/images/thumbs/ev_bracket.webp", alt: "Precision Molded Structural Bracket" },
  { image: "/images/thumbs/ev_charger.webp", alt: "CCS2 Fast Charging Gun" },
  { image: "/images/thumbs/ev_battery.webp", alt: "High-Voltage EV Battery Pack" },
  { image: "/images/thumbs/ev_sensor.webp", alt: "Automotive Sensor Module" },
  { image: "/images/thumbs/ev_wheel.webp", alt: "Performance Alloy Wheel" },
  { image: "/images/thumbs/ev_inverter.webp", alt: "High-Voltage EV Inverter Power Electronics" },
];

const col4Items = [
  { image: "/images/thumbs/ev_inverter.webp", alt: "High-Voltage EV Inverter Power Electronics" },
  { image: "/images/thumbs/ev_battery.webp", alt: "High-Voltage EV Battery Pack Module" },
  { image: "/images/thumbs/ev_motor.webp", alt: "High-Power EV Traction Motor" },
  { image: "/images/thumbs/ev_bracket.webp", alt: "Chassis Structural Mount" },
  { image: "/images/thumbs/ev_brakepads.webp", alt: "Ceramic Brake Pads" },
  { image: "/images/thumbs/ev_suspension.webp", alt: "Air Suspension Damper" },
  { image: "/images/thumbs/ev_rotor.webp", alt: "Cross-Drilled Brake Rotor" },
  { image: "/images/thumbs/ev_headlight.webp", alt: "Matrix LED Headlight Assembly" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);

  const offset1Ref = useRef(0);
  const offset2Ref = useRef(0);
  const offset3Ref = useRef(0);
  const offset4Ref = useRef(0);
  const hasInitRef = useRef(false);

  useEffect(() => {
    let animId: number | null = null;
    let isVisible = false;
    let isPageVisible = !document.hidden;
    const startTime = performance.now();
    let lastScrollY = window.scrollY;

    // Check user preference for reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Physics state for smooth car-like throttle & inertia
    let currentScrollSpeed = 0;
    let targetScrollSpeed = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // STOP scroll acceleration after 2 sections (~2.0 viewports)
      if (currentScrollY < window.innerHeight * 2.0) {
        targetScrollSpeed += delta * 0.32;
        targetScrollSpeed = Math.max(-12.0, Math.min(12.0, targetScrollSpeed));
      } else {
        targetScrollSpeed = 0;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const stopAnimation = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const animate = (time: number) => {
      if (!isVisible || !isPageVisible || prefersReducedMotion) {
        animId = null;
        return;
      }

      const col1 = col1Ref.current;
      const col2 = col2Ref.current;
      const col3 = col3Ref.current;
      const col4 = col4Ref.current;

      if (!col1 || !col2 || !col3) {
        animId = requestAnimationFrame(animate);
        return;
      }

      // Exact height of one repeated unit (1/3 of the 3-unit track)
      const unitHeight = col1.scrollHeight / 3;
      if (unitHeight <= 0) {
        animId = requestAnimationFrame(animate);
        return;
      }

      // Initial stagger of columns on first load across the repetition window
      if (!hasInitRef.current) {
        offset1Ref.current = 0;
        offset2Ref.current = unitHeight * 0.25;
        offset3Ref.current = unitHeight * 0.50;
        offset4Ref.current = unitHeight * 0.75;
        hasInitRef.current = true;
      }

      // Entrance: moves from medium-fast (3.4 px/frame) down to slow (0.70 px/frame)
      const elapsed = (time - startTime) / 1000;
      const duration = 2.6;
      const fastStartSpeed = 3.4;
      const slowCruisingSpeed = 0.70;
      let baseSpeed = slowCruisingSpeed;
      if (elapsed < duration) {
        const p = elapsed / duration;
        const easeOut = 1 - Math.pow(1 - p, 3);
        baseSpeed = fastStartSpeed - (fastStartSpeed - slowCruisingSpeed) * easeOut;
      }

      // Physics throttle lerp
      currentScrollSpeed += (targetScrollSpeed - currentScrollSpeed) * 0.16;
      targetScrollSpeed *= 0.92;
      if (Math.abs(currentScrollSpeed) < 0.01) currentScrollSpeed = 0;

      const effectiveSpeed = baseSpeed + currentScrollSpeed;

      // Columns 1 & 3 move UP
      offset1Ref.current = (offset1Ref.current + effectiveSpeed) % unitHeight;
      if (offset1Ref.current < 0) offset1Ref.current += unitHeight;

      offset3Ref.current = (offset3Ref.current + effectiveSpeed) % unitHeight;
      if (offset3Ref.current < 0) offset3Ref.current += unitHeight;

      // Columns 2 & 4 move DOWN
      offset2Ref.current = (offset2Ref.current + effectiveSpeed) % unitHeight;
      if (offset2Ref.current < 0) offset2Ref.current += unitHeight;

      offset4Ref.current = (offset4Ref.current + effectiveSpeed) % unitHeight;
      if (offset4Ref.current < 0) offset4Ref.current += unitHeight;

      col1.style.transform = `translate3d(0, ${-offset1Ref.current}px, 0)`;
      col3.style.transform = `translate3d(0, ${-offset3Ref.current}px, 0)`;
      col2.style.transform = `translate3d(0, ${offset2Ref.current - unitHeight}px, 0)`;
      if (col4) {
        col4.style.transform = `translate3d(0, ${offset4Ref.current - unitHeight}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (
        animId === null &&
        isVisible &&
        isPageVisible &&
        !prefersReducedMotion
      ) {
        animId = requestAnimationFrame(animate);
      }
    };

    // Stop scheduling frames when the hero is outside the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: "200px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopAnimation();
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="relative min-h-screen lg:min-h-[640px] w-full max-w-full bg-white flex items-center overflow-hidden select-none"
    >
      {/* Top White Shadow Gradient Overlay */}
      <div
        className="absolute inset-x-0 top-0 h-28 sm:h-32 lg:h-36 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0.4) 65%, transparent 100%)",
        }}
      />

      {/* Bottom White Shadow Gradient Overlay (Decreased height & subtle soft fade) */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 sm:h-20 lg:h-24 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%)",
        }}
      />

      {/* Atmospheric Background Lighting (White + Soft Ice-Blue Atmosphere + Restrained Emerald Highlights) */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[-5%] w-[1100px] h-[1100px] bg-gradient-to-br from-sky-100/60 via-sky-50/30 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[32%] right-[14%] w-[550px] h-[550px] bg-emerald-100/35 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[30%] w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Floating Organic Emerald Leaf Accents (Matching Visual Source of Truth) */}
      <div className="hidden lg:block absolute left-[46.5%] top-[27%] w-5 h-8 bg-gradient-to-br from-emerald-500/80 to-teal-400/50 rounded-full blur-[1px] pointer-events-none animate-float-leaf z-30 shadow-[0_0_16px_rgba(16,185,129,0.4)]" />
      <div className="hidden lg:block absolute left-[42%] bottom-[30%] w-3.5 h-6 bg-emerald-400/50 rounded-full blur-[2px] pointer-events-none animate-float-slow z-30" />

      {/* Main Full-Width Content Container */}
      <div className="relative z-20 max-w-[1680px] w-full mx-auto px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between h-full pt-28 pb-12">
        
        {/* Left Side: Exact Typography, Supporting Copy & CTAs (z-40 so it stays crisply above overlays) */}
        <div className="w-full lg:w-[44%] xl:w-[42%] 2xl:w-[40%] text-left pt-2 lg:pt-0 shrink-0 z-40 relative">
          
          {/* Confident Large Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] 2xl:text-[76px] font-black tracking-tight leading-[1.04] mb-4 sm:mb-5">
            <span className="text-[#0F172A] block animate-hero-1">
              Visionary Trade.
            </span>
            <span className="text-[#059669] block animate-hero-2">
              Powering Ethiopia.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed mb-6 sm:mb-7 max-w-lg animate-hero-3">
            Adonael Trading PLC is a premier diversified Ethiopian enterprise. We lead the nation’s electric mobility supply chain through <strong className="text-slate-900 font-semibold">Ethio EV Spare</strong> and curate contemporary gastronomy with <strong className="text-slate-900 font-semibold">Meteor Restaurant</strong>.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6 sm:mb-7 animate-hero-4">
            {/* Primary Emerald Button - Ethio EV Spare */}
            <a
              href="#ethio-ev"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:py-3.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_12px_26px_rgba(5,150,105,0.32)] hover:shadow-[0_16px_32px_rgba(5,150,105,0.42)] hover:-translate-y-0.5 transition-all group"
            >
              <span>Explore Ethio EV Spare</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary Frosted Pill Button - Meteor Restaurant */}
            <a
              href="#meteor"
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/85 hover:bg-white text-[#0F172A] font-semibold text-sm sm:text-base tracking-wide border border-sky-200/90 shadow-xs hover:border-sky-300 hover:-translate-y-0.5 transition-all group"
            >
              <span>Discover Meteor Dining</span>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Supporting Label with Emerald Dot */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 font-medium animate-hero-5">
            <span className="w-2 h-2 rounded-full bg-[#059669] shrink-0" />
            <span>Adonael Trading · Sustainable Mobility & Modern Hospitality</span>
          </div>
        </div>

        {/* Right Side: Diagonal Automotive Product Collage (~57% layout width, overflowing naturally under z-30 white shadows) */}
        <div className="w-full lg:w-[56%] xl:w-[58%] mt-8 lg:mt-0 relative h-[480px] sm:h-[540px] lg:h-[560px] xl:h-[600px] flex items-center overflow-visible pointer-events-auto z-10">
          
          {/* Diagonal Tilted Grid Container (25deg rotation — centered at top-[50%] -translate-y-1/2) */}
          <div
            className="absolute left-[4%] sm:left-[6%] lg:left-[8%] xl:left-[10%] top-[50%] -translate-y-1/2 flex gap-3 sm:gap-3.5 xl:gap-4 pointer-events-auto"
            style={{
              transform: "rotate(25deg)",
              transformOrigin: "0% 45%",
            }}
          >
            {/* Column 1: Moves UP (3-Unit Triple Track of 8 Cards = 24 Cards) */}
            <div
              ref={col1Ref}
              className="flex flex-col gap-3 sm:gap-3.5 xl:gap-4 will-change-transform"
            >
              {[...col1Items, ...col1Items, ...col1Items].map((item, idx) => (
                <ProductCard key={`col1-${idx}`} image={item.image} alt={item.alt} />
              ))}
            </div>

            {/* Column 2: Moves DOWN */}
            <div
              ref={col2Ref}
              className="flex flex-col gap-3 sm:gap-3.5 xl:gap-4 will-change-transform"
            >
              {[...col2Items, ...col2Items, ...col2Items].map((item, idx) => (
                <ProductCard key={`col2-${idx}`} image={item.image} alt={item.alt} />
              ))}
            </div>

            {/* Column 3: Moves UP */}
            <div
              ref={col3Ref}
              className="flex flex-col gap-3 sm:gap-3.5 xl:gap-4 will-change-transform"
            >
              {[...col3Items, ...col3Items, ...col3Items].map((item, idx) => (
                <ProductCard key={`col3-${idx}`} image={item.image} alt={item.alt} />
              ))}
            </div>

            {/* Column 4: Moves DOWN (hidden on extra small screens, visible on sm+) */}
            <div
              ref={col4Ref}
              className="hidden sm:flex flex-col gap-3 sm:gap-3.5 xl:gap-4 will-change-transform"
            >
              {[...col4Items, ...col4Items, ...col4Items].map((item, idx) => (
                <ProductCard key={`col4-${idx}`} image={item.image} alt={item.alt} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
