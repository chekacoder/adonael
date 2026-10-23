import React from "react";
import { ChevronDown, HelpCircle, Phone, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Adonael Trading PLC and what businesses does it own?",
    answer:
      "Adonael Trading PLC is a premier diversified Ethiopian corporate enterprise headquartered in Addis Ababa. It owns and operates two flagship market-leading subsidiaries: Ethio EV Spare (Ethiopia's premier electric vehicle supply chain, parts distributor, and mobile automotive catalog) and Meteor Restaurant (a flagship contemporary architectural dining atelier and lounge in Bole Medhanialem).",
  },
  {
    question: "Where can I source certified electric vehicle (EV) spare parts in Addis Ababa?",
    answer:
      "Ethio EV Spare, an enterprise of Adonael Trading PLC, stocks over 10,000 cataloged EV components in its Addis Ababa central warehouses. Offerings include high-voltage LFP battery modules, electric traction motors, power inverters, CCS2 fast charging connectors, ceramic brake pads, and adaptive air suspension struts. Inquiries can be made via 0967431638 or info@adonaeltrading.com.",
  },
  {
    question: "How can I reserve a table or book private dining at Meteor Restaurant?",
    answer:
      "Table reservations at Meteor Restaurant can be placed instantly via WhatsApp at +251 96 743 1638 (0967431638) or by calling our concierge desk directly at 0967431638. Located in the Bole Medhanialem enclave, Meteor seats up to 140 guests and features open-kitchen gastronomy, private salons, and an international cellar.",
  },
  {
    question: "Is there an official mobile app for Ethio EV Spare parts?",
    answer:
      "Yes. The official 'Ethio EV Spare' Android application is available on the Google Play Store (ID: com.evspare.buyer). The app enables vehicle owners, mechanics, and fleet operators to search parts by chassis or vehicle model, view real-time warehouse inventory in Addis Ababa, and request express delivery.",
  },
  {
    question: "What are the official direct contacts for Adonael Trading?",
    answer:
      "You can contact Adonael Trading PLC directly by telephone or WhatsApp at 0967431638 (+251 96 743 1638) and via email at info@adonaeltrading.com. Our central office and logistics hub are located in Bole Sub-City, Addis Ababa, Ethiopia.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 relative bg-white border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3 text-emerald-700 text-xs font-bold uppercase tracking-[0.2em]">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Everything You Need to Know About <br />
            <span className="gradient-text-slate">Adonael Trading</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Direct answers on electric vehicle components, restaurant reservations, and corporate trade operations across Ethiopia.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            return (
              <details
                key={idx}
                open={idx === 0}
                className="group rounded-2xl border border-slate-200/80 bg-white overflow-hidden transition-all duration-300 hover:border-slate-300 open:bg-[#F8FAFC] open:border-slate-300 open:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
              >
                <summary
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-2">
                    {faq.question}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-slate-100 text-slate-600 transition-all duration-300 group-open:bg-emerald-600 group-open:text-white group-open:rotate-180"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </summary>

                <div className="px-6 pb-6 sm:px-8 sm:pb-7 text-sm sm:text-base text-slate-600 leading-relaxed font-normal animate-fade-in border-t border-slate-100/80 pt-4">
                  <p>{faq.answer}</p>
                </div>
              </details>
            );
          })}
        </div>

        {/* Quick Contact Help Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Have a specific EV part or private reservation request?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our Addis Ababa trade and concierge desk responds within 2 hours.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:0967431638"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#059669]" />
              <span>0967431638</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
