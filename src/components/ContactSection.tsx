"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Utensils, AlertCircle } from "lucide-react";

export default function ContactSection() {
  const [division, setDivision] = useState("Ethio EV Spare");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please provide your full name before submitting.");
      return;
    }
    if (!contact.trim() || contact.trim().length < 6) {
      setErrorMessage("Please provide a valid phone number or email address so our team can reach you.");
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setErrorMessage("Please include a brief message or part requirements.");
      return;
    }

    setErrorMessage(null);
    setSent(true);
  };

  const handleWhatsApp = () => {
    if (!name.trim()) {
      setErrorMessage("Please fill in your name before dispatching to WhatsApp.");
      return;
    }
    setErrorMessage(null);

    const text = `*ADONAEL TRADING INQUIRY*
━━━━━━━━━━━━━━━━━
• *Division:* ${division}
• *Name:* ${name || "Client"}
• *Contact:* ${contact || "Direct"}
• *Message:* ${message || "General inquiry"}
━━━━━━━━━━━━━━━━━
Dispatched from adonael.com`;
    window.open(`https://wa.me/251967431638?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section id="contact" className="py-28 relative bg-white border-t border-slate-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Corporate Info */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Connect With <br />
              <span className="gradient-text-slate">Adonael Trading</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-8">
              Whether you are looking to source high-grade EV components for your fleet,
              inquire about wholesale supply, or reserve Meteor Restaurant for private dining,
              our dedicated team is at your service.
            </p>

            <div className="space-y-5 text-sm text-slate-600 mb-10">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Corporate & EV Hotline</strong>
                  <a href="tel:0967431638" className="hover:text-sky-600 transition-colors font-medium">0967431638 (Direct Call & WhatsApp)</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Meteor Restaurant Reservations</strong>
                  <a href="tel:0967431638" className="hover:text-amber-600 transition-colors font-medium">0967431638 (Direct Line)</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Corporate Email</strong>
                  <a href="mailto:info@adonaeltrading.com" className="hover:text-slate-900 transition-colors font-medium">info@adonaeltrading.com</a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold">Headquarters Location</strong>
                  <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card-elevated p-8 sm:p-10 rounded-3xl border border-slate-200/80">
              {!sent ? (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 text-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Send a Message to Adonael Trading
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Select the target division to route your request immediately to the right team.
                  </p>

                  {/* Visible Submit Error State */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-3 animate-fade-in shadow-xs"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <strong className="font-bold block text-rose-950 mb-0.5">Please Complete All Fields</strong>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  {/* Target Division Selector */}
                  <div>
                    <span id="target-division-label" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Target Division
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="target-division-label"
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                    >
                      {["Ethio EV Spare", "Meteor Restaurant", "Adonael Corporate"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          role="radio"
                          aria-checked={division === item}
                          onClick={() => {
                            setDivision(item);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                            division === item
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Contact (Associated with htmlFor & id) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-full-name"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                      >
                        Your Full Name
                      </label>
                      <input
                        id="sender-full-name"
                        name="sender-full-name"
                        type="text"
                        placeholder="e.g. Dawit Kebede"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sender-contact"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                      >
                        Phone or WhatsApp Number
                      </label>
                      <input
                        id="sender-contact"
                        name="sender-contact"
                        type="tel"
                        placeholder="+251 9... or Email"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value);
                          if (errorMessage) setErrorMessage(null);
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Message (Associated with htmlFor & id) */}
                  <div>
                    <label
                      htmlFor="sender-message"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Message / Order Details
                    </label>
                    <textarea
                      id="sender-message"
                      name="sender-message"
                      rows={4}
                      placeholder="Specify your EV spare part requirements, restaurant table size, or corporate partnership proposal..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="btn-dark flex-1 py-3 text-xs justify-center cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="btn-glass flex-1 py-3 text-xs justify-center text-emerald-700 border-emerald-200 hover:bg-emerald-50 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>Instant WhatsApp Message</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">
                    Thank you, <strong className="text-slate-900">{name}</strong>. Your message regarding{" "}
                    <strong className="text-sky-600">{division}</strong> has been transmitted. We will reply promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setName("");
                      setContact("");
                      setMessage("");
                    }}
                    className="btn-glass text-xs py-2 px-5 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
