"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Menu, X, Phone, Utensils, Zap, ChevronRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for active navigation indicator
      const scrollY = window.scrollY + 280;
      const ethioEvEl = document.getElementById("ethio-ev");
      const meteorEl = document.getElementById("meteor");
      const ecosystemEl = document.getElementById("ecosystem");
      const faqEl = document.getElementById("faq");
      const contactEl = document.getElementById("contact");

      if (contactEl && scrollY >= contactEl.offsetTop) {
        setActiveSection("contact");
      } else if (faqEl && scrollY >= faqEl.offsetTop) {
        setActiveSection("faq");
      } else if (ecosystemEl && scrollY >= ecosystemEl.offsetTop) {
        setActiveSection("ecosystem");
      } else if (meteorEl && scrollY >= meteorEl.offsetTop) {
        setActiveSection("meteor");
      } else if (ethioEvEl && scrollY >= ethioEvEl.offsetTop) {
        setActiveSection("ethio-ev");
      } else {
        setActiveSection("overview");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "EV Spare", href: "#ethio-ev", id: "ethio-ev" },
    { name: "Meteor Dining", href: "#meteor", id: "meteor" },
    { name: "Enterprise", href: "#ecosystem", id: "ecosystem" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 mx-auto w-[94%] max-w-7xl z-50 transition-all duration-300">
      <div
        className={`w-full h-16 sm:h-[68px] rounded-2xl sm:rounded-full transition-all duration-300 px-4 sm:px-6 flex items-center justify-between border ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border-slate-200/90 shadow-[0_12px_40px_-6px_rgba(15,23,42,0.08)]"
            : "bg-white/75 backdrop-blur-xl border-slate-200/60 shadow-[0_8px_30px_-4px_rgba(15,23,42,0.04)]"
        }`}
      >
        {/* Left: Refined Monogram Brand Mark */}
        <a
          href="#overview"
          id="nav-brand-logo"
          className="flex items-center gap-3 group shrink-0 select-none"
        >
          {/* Architectural Holding Monogram */}
          <div className="relative w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-md shadow-slate-950/20 group-hover:scale-105 group-hover:shadow-emerald-950/20 transition-all duration-300 border border-slate-800/80 overflow-hidden">
            {/* Jewel light gradient reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/30 via-transparent to-amber-400/20 pointer-events-none" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 relative z-10"
            >
              {/* Dynamic Faceted "A" Enterprise Emblem */}
              <path
                d="M12 3L20 19H15.5L12 11.5L8.5 19H4L12 3Z"
                fill="url(#brandGradient)"
              />
              <path
                d="M12 14L14.5 19H9.5L12 14Z"
                fill="#10B981"
              />
              <defs>
                <linearGradient id="brandGradient" x1="4" y1="3" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F8FAFC" />
                  <stop offset="0.7" stopColor="#E2E8F0" />
                  <stop offset="1" stopColor="#94A3B8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Typography: Clean, architectural, sophisticated */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold tracking-[0.14em] text-slate-900 text-sm sm:text-base">
                ADONAEL
              </span>
              <span className="font-semibold tracking-[0.12em] text-[#059669] text-xs sm:text-sm">
                TRADING
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9.5px] tracking-[0.2em] uppercase font-bold text-slate-400">
                PLC · ADDIS ABABA
              </span>
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation Links with Segmented Highlighting */}
        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden lg:flex items-center bg-slate-100/70 p-1 rounded-full border border-slate-200/60 backdrop-blur-md"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right: Clean, Balanced Action Group */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Direct Concierge Line with pulsing live status dot */}
          <a
            href="tel:0967431638"
            id="nav-phone-call"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-slate-100/80 hover:bg-slate-200/70 text-slate-800 text-xs font-bold tracking-wide transition-all duration-200 border border-slate-200/80 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
            </span>
            <Phone className="w-3.5 h-3.5 text-slate-600 group-hover:text-[#059669] transition-colors" />
            <span className="tabular-nums">0967431638</span>
          </a>

          {/* Primary Action Button: Inquiries / Connect */}
          <a
            href="#contact"
            id="nav-inquiries-btn"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-full bg-slate-900 hover:bg-[#059669] text-white text-xs font-bold tracking-wide shadow-sm hover:shadow-[0_8px_20px_rgba(5,150,105,0.25)] hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean, Modern Card Overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-white/95 rounded-2xl border border-slate-200/80 p-5 flex flex-col gap-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] animate-fade-in">
          {/* Quick Division Highlights */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <a
              href="#ethio-ev"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 hover:bg-emerald-100/70 transition-colors flex flex-col gap-1"
            >
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ethio EV Spare</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">Genuine EV Components</span>
            </a>

            <a
              href="#meteor"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 hover:bg-amber-100/70 transition-colors flex flex-col gap-1"
            >
              <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>Meteor Dining</span>
              </div>
              <span className="text-[10px] text-amber-700 font-medium">Addis Ababa Hospitality</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 py-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              );
            })}
          </div>

          {/* Mobile Bottom Quick Actions */}
          <div className="pt-3 flex flex-col gap-2 border-t border-slate-100">
            <a
              href="tel:0967431638"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#059669]" />
              <span>Call Concierge: 0967431638</span>
            </a>

            <a
              href="https://wa.me/251967431638?text=Hello%20Adonael%20Trading,%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Instant WhatsApp Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
