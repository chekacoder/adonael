"use client";

import React from "react";
import { Zap, Utensils, Phone, Mail, MapPin, ArrowUp, ExternalLink } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.evspare.buyer&pcampaignid=web_share";
  const webAppUrl = "https://auto-s-sooty.vercel.app";

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center font-bold text-lg">
                <span className="font-[family-name:var(--font-cinzel)]">A</span>
              </div>
              <div>
                <span className="font-[family-name:var(--font-cinzel)] text-xl font-bold tracking-[0.16em] text-white block">
                  ADONAEL
                </span>
                <span className="text-[10px] tracking-[0.22em] text-sky-400 uppercase font-sans font-semibold block">
                  Trading PLC · Addis Ababa
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-light max-w-sm mb-6 leading-relaxed">
              Driving sustainable growth and modern lifestyle excellence in Ethiopia across
              electric vehicle supply chain technology and contemporary culinary hospitality.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                <span>Ethio EV Spare on Google Play</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Division Links */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              Key Divisions
            </h4>
            <div className="space-y-4 text-xs font-sans">
              <div>
                <a
                  href="#ethio-ev"
                  className="font-semibold text-white hover:text-sky-400 flex items-center gap-1.5 transition-colors"
                >
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>Ethio EV Spare Parts</span>
                </a>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Batteries, Inverters, Brakes, Chargers & Mobile App
                </p>
              </div>

              <div>
                <a
                  href="#meteor"
                  className="font-semibold text-white hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Meteor Restaurant</span>
                </a>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Contemporary Fine Dining, Open Kitchen & Private Salons
                </p>
              </div>

              <div>
                <a
                  href={webAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sky-400 hover:underline flex items-center gap-1.5"
                >
                  <span>Ethio EV Spare Web Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Touchpoints */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white mb-5">
              Addis Ababa Office
            </h4>
            <div className="space-y-3 text-xs text-slate-400 font-sans mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a href="tel:0967431638" className="hover:text-white transition-colors">0967431638</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>info@adonaeltrading.com</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer border border-slate-700"
            >
              <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; 2026 Adonael Trading PLC. All rights reserved.
          </div>
          <div className="flex items-center gap-5 sm:gap-6">
            <a href="#ethio-ev" className="hover:text-slate-300 transition-colors">
              Ethio EV Spare
            </a>
            <span>•</span>
            <a href="#meteor" className="hover:text-slate-300 transition-colors">
              Meteor Restaurant
            </a>
            <span>•</span>
            <a href="#faq" className="hover:text-slate-300 transition-colors">
              FAQ
            </a>
            <span>•</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">
              Corporate Desk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
