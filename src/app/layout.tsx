import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cinzel } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://adonaeltrading.com"),
  title: {
    default: "Adonael Trading PLC — Ethio EV Spare & Meteor Restaurant | Addis Ababa",
    template: "%s | Adonael Trading PLC",
  },
  description:
    "Official website of Adonael Trading PLC, parent company of Ethio EV Spare (10,000+ electric vehicle parts in Addis Ababa) and Meteor Restaurant (flagship contemporary culinary atelier in Bole Medhanialem, Ethiopia). Direct wholesale and reservations: 0967431638.",
  applicationName: "Adonael Trading",
  authors: [{ name: "Adonael Trading PLC", url: "https://adonaeltrading.com" }],
  creator: "Adonael Trading PLC",
  publisher: "Adonael Trading PLC",
  keywords: [
    "Adonael Trading",
    "Adonael Trading PLC",
    "Ethio EV Spare",
    "Ethio EV Spare parts",
    "EV spare parts Ethiopia",
    "Electric vehicle parts Addis Ababa",
    "Electric car battery Ethiopia",
    "EV traction motor Addis Ababa",
    "Meteor Restaurant Addis Ababa",
    "Meteor Restaurant Bole",
    "Fine dining Addis Ababa",
    "Contemporary restaurant Ethiopia",
    "CCS2 charger Ethiopia",
    "Electric vehicle importer Ethiopia",
    "Adonael Logistics Hub",
  ],
  alternates: {
    canonical: "https://adonaeltrading.com",
  },
  openGraph: {
    title: "Adonael Trading PLC — Ethio EV Spare & Meteor Restaurant",
    description:
      "Powering Ethiopia's sustainable electric mobility with Ethio EV Spare and contemporary culinary excellence with Meteor Restaurant. Bole Sub-City, Addis Ababa.",
    url: "https://adonaeltrading.com",
    siteName: "Adonael Trading PLC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/trading_atrium.jpg",
        width: 1200,
        height: 630,
        alt: "Adonael Trading Headquarters and Enterprise Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adonael Trading PLC — Ethio EV Spare & Meteor Restaurant",
    description:
      "Premier electric vehicle parts supply chain & contemporary culinary atelier in Addis Ababa, Ethiopia. Direct hotline: 0967431638.",
    images: ["/images/trading_atrium.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Automotive & Hospitality",
  classification: "Enterprise, Electric Mobility Supply Chain, Contemporary Fine Dining",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%230F172A'/><path d='M50 20 L75 80 L25 80 Z' fill='%23059669'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${cinzel.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-emerald-500/20 selection:text-emerald-900"
      >
        <StructuredData />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
