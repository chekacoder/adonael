import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adonael Trading PLC — Ethio EV Spare & Meteor Restaurant",
    short_name: "Adonael Trading",
    description:
      "Official portal for Adonael Trading PLC, Ethio EV Spare parts supply, and Meteor Restaurant in Addis Ababa, Ethiopia.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
