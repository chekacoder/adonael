import React from "react";
import Image from "next/image";
import {
  Clock,
  MapPin,
  Calendar,
  Phone,
} from "lucide-react";

export default function MeteorRestaurant() {
  const highlights = [
    {
      title: "Open Culinary Atelier",
      desc: "Watch master chefs craft contemporary dishes with seasonal organic ingredients and innovative flair.",
    },
    {
      title: "Panoramic Glass Architecture",
      desc: "Sunlit dining by day, radiant city lights by night in our high-ceilinged glass pavilion.",
    },
    {
      title: "Curated Beverage & Wine Cellar",
      desc: "Grand cru selections, bespoke botanical mocktails, and rare single-origin highland coffee infusions.",
    },
    {
      title: "Executive Business Lunches & Galas",
      desc: "Discrete private dining salons equipped for diplomatic dinners, corporate summits, and milestone celebrations.",
    },
  ];

  const reservationWhatsAppUrl =
    "https://wa.me/251967431638?text=Hello%20Meteor%20Restaurant,%20I%20would%20like%20to%20reserve%20a%20table%20for%20dinner.";

  return (
    <section id="meteor" className="py-28 relative bg-white border-t border-slate-200/60 overflow-hidden scroll-mt-20">
      {/* Ambient Warm Gradient Orbs */}
      <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            Addis Ababa&apos;s Flagship <br />
            <span className="gradient-text-meteor">Contemporary Culinary Atelier</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A venture of <strong>Adonael Trading</strong>, Meteor Restaurant brings together
            modern architectural elegance, innovative culinary gastronomy, and flawless hospitality
            in the cosmopolitan heart of the Ethiopian capital.
          </p>
        </div>

        {/* Hero Double-Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Interior Photo */}
          <div
            className="lg:col-span-7 relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 group"
            style={{ position: "relative" }}
          >
            <Image
              src="/images/meteor_interior.webp"
              alt="Meteor Restaurant Main Dining Hall"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-lg">
              <h4 className="text-lg font-bold text-slate-900">
                Light-filled architectural dining with open kitchen theater
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Seating up to 140 guests for executive lunches, romantic dinners, and private galas.
              </p>
            </div>
          </div>

          {/* Gourmet Dish Detail Photo */}
          <div
            className="lg:col-span-5 relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 border border-slate-200/80 group"
            style={{ position: "relative" }}
          >
            <Image
              src="/images/meteor_cuisine.webp"
              alt="Meteor Restaurant Signature Plated Dish"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-lg">
              <h4 className="text-lg font-bold text-slate-900">
                Artisanal plates pairing local heritage with global gastronomy
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Paired with fine international vintages and signature botanical infusions.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-amber-300"
            >
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reservation & Visit Banner */}
        <div className="glass-card-elevated rounded-3xl p-8 sm:p-12 border border-amber-200/80 bg-gradient-to-r from-amber-50/60 via-white/80 to-amber-50/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Reserve Your Table at Meteor Restaurant
            </h3>
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                Mon – Sun: 11:30 AM – 11:00 PM
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                Bole Medhanialem Enclave, Addis Ababa
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={reservationWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark py-3 px-6 text-xs"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Reserve via WhatsApp</span>
            </a>

            <a
              href="tel:0967431638"
              className="btn-glass py-3 px-6 text-xs"
            >
              <Phone className="w-4 h-4 text-slate-600" />
              <span>Direct Concierge: 0967431638</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
