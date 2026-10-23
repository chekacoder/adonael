import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function Ecosystem() {
  const pillars = [
    {
      title: "Sustainable Mobility",
      division: "Ethio EV Spare",
      desc: "Direct OEM import pipeline supplying certified lithium battery modules, traction motors, power inverters, and high-speed charging hardware across Ethiopia.",
      stat: "10,000+",
      statLabel: "Cataloged EV SKUs",
    },
    {
      title: "Artisanal Hospitality",
      division: "Meteor Restaurant",
      desc: "Dual-zone dining hall with open culinary theater, private diplomatic salons, and curated cellar situated in Addis Ababa's Bole Medhanialem enclave.",
      stat: "140 Seats",
      statLabel: "Architectural Capacity",
    },
    {
      title: "Supply Chain & Logistics",
      division: "Adonael Logistics Hub",
      desc: "Bonded customs clearance, climate-controlled central warehousing in Bole Sub-City, and same-day dispatch with verified warranty coverage.",
      stat: "Same-Day",
      statLabel: "Addis Ababa Dispatch",
    },
  ];

  return (
    <section id="ecosystem" className="py-28 relative bg-[#F8FAFC] border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
            The Multi-Industry Power of <br />
            <span className="gradient-text-slate">Adonael Trading PLC</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            By combining pioneering electric vehicle technologies with world-class hospitality,
            Adonael Trading creates sustainable value, employment, and modern lifestyle standards across Ethiopia.
          </p>
        </div>

        {/* 3 Ecosystem Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="glass-card-elevated p-8 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 block mb-2">
                  {item.division}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {item.stat}
                  </div>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    {item.statLabel}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
