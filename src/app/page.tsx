import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EthioEVSpare from "@/components/EthioEVSpare";
import MeteorRestaurant from "@/components/MeteorRestaurant";
import Ecosystem from "@/components/Ecosystem";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Redesigned Glassmorphic Navigation */}
      <Navbar />

      {/* Section 1: Overall Description / All-In-One from Adonael Trading */}
      <Hero />

      {/* Section 2: Ethio EV Spare (Sequential Image, Video, & Google Play Store Link) */}
      <EthioEVSpare />

      {/* Section 3: Meteor Restaurant (Gastronomy, Ambiance & Reservations) */}
      <MeteorRestaurant />

      {/* Section 4: Adonael Trading Corporate Synergy & Ecosystem */}
      <Ecosystem />

      {/* Section 5: Authoritative Frequently Asked Questions (GEO & Search Engine Q&A) */}
      <FAQSection />

      {/* Section 6: Direct Contact & Inquiries */}
      <ContactSection />

      {/* Modern Corporate Footer */}
      <Footer />
    </main>
  );
}
