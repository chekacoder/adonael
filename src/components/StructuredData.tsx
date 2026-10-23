import React from "react";

export default function StructuredData() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://adonaeltrading.com/#organization",
        "name": "Adonael Trading PLC",
        "alternateName": [
          "Adonael Trading",
          "Adonael Group",
          "Adonael PLC",
          "Adonael Trading Ethiopia"
        ],
        "url": "https://adonaeltrading.com",
        "image": "https://adonaeltrading.com/images/trading_atrium.jpg",
        "description": "Adonael Trading PLC is a premier diversified Ethiopian corporate enterprise headquartered in Addis Ababa, owning and operating Ethio EV Spare and Meteor Restaurant.",
        "telephone": "+251967431638",
        "email": "info@adonaeltrading.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Bole Sub-City",
          "addressLocality": "Addis Ababa",
          "addressRegion": "Addis Ababa",
          "addressCountry": "ET"
        },
        "sameAs": [
          "https://play.google.com/store/apps/details?id=com.evspare.buyer",
          "https://auto-s-sooty.vercel.app"
        ],
        "subOrganization": [
          {
            "@type": "AutoPartsStore",
            "@id": "https://adonaeltrading.com/#ethio-ev",
            "name": "Ethio EV Spare",
            "alternateName": ["Ethio EV Spare Parts", "Adonael EV Spare"],
            "description": "Ethiopia's premier electric vehicle supply chain and spare parts catalog offering over 10,000 certified EV powertrain, battery, motor, and chassis components.",
            "telephone": "+251967431638",
            "email": "info@adonaeltrading.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Bole Sub-City",
              "addressLocality": "Addis Ababa",
              "addressRegion": "Addis Ababa",
              "addressCountry": "ET"
            },
            "url": "https://adonaeltrading.com/#ethio-ev",
            "parentOrganization": {
              "@id": "https://adonaeltrading.com/#organization"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Ethiopia"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Electric Vehicle Replacement Parts Catalog",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "EV Lithium Iron Phosphate (LFP) Battery Packs & Enclosures",
                    "description": "High-voltage structural battery enclosures with integrated liquid thermal management for electric vehicles."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "High-Torque EV Electric Traction Motors",
                    "description": "Permanent magnet synchronous electric motors engineered for high efficiency and instant torque."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "High-Voltage Power Inverters & Motor Controllers",
                    "description": "Automotive-grade silicon carbide power inverters with CAN-bus integration."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "CCS2 Fast Charging Gun Cables & Port Assemblies",
                    "description": "Direct current high-speed DC charging connectors calibrated for Ethiopian charging networks."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Carbon-Ceramic Regenerative Brake Pads & Vented Rotors",
                    "description": "Low-dust, zero-fade braking pads engineered for heavy electric vehicle thermal dynamics."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Active Air Suspension Dampers & Height Control Valves",
                    "description": "Adaptive pneumatic dampers and underbody protective armor plates for rugged Ethiopian topography."
                  }
                }
              ]
            }
          },
          {
            "@type": "Restaurant",
            "@id": "https://adonaeltrading.com/#meteor",
            "name": "Meteor Restaurant",
            "alternateName": ["Meteor Restaurant Addis Ababa", "Meteor Dining Atelier"],
            "description": "Addis Ababa's flagship contemporary culinary atelier and fine dining lounge featuring open-kitchen theater, curated wine cellar, and private salons.",
            "telephone": "+251967431638",
            "email": "info@adonaeltrading.com",
            "image": "https://adonaeltrading.com/images/meteor_interior.webp",
            "url": "https://adonaeltrading.com/#meteor",
            "parentOrganization": {
              "@id": "https://adonaeltrading.com/#organization"
            },
            "servesCuisine": [
              "Contemporary Gastronomy",
              "International Fine Dining",
              "Artisanal Fusion"
            ],
            "priceRange": "$$$",
            "acceptsReservations": "True",
            "maximumAttendeeCapacity": 140,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Bole Medhanialem Enclave",
              "addressLocality": "Addis Ababa",
              "addressCountry": "ET"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "11:30",
                "closes": "23:00"
              }
            ]
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://adonaeltrading.com/#website",
        "url": "https://adonaeltrading.com",
        "name": "Adonael Trading PLC",
        "description": "Official portal of Adonael Trading PLC, parent company of Ethio EV Spare and Meteor Restaurant in Addis Ababa, Ethiopia.",
        "publisher": {
          "@id": "https://adonaeltrading.com/#organization"
        },
        "inLanguage": "en"
      },
      {
        "@type": "FAQPage",
        "@id": "https://adonaeltrading.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Adonael Trading PLC and what companies does it own?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Adonael Trading PLC is a premier diversified corporate enterprise in Addis Ababa, Ethiopia. It owns and operates two flagship enterprises: Ethio EV Spare (Ethiopia's leading electric vehicle parts and logistics network) and Meteor Restaurant (a flagship contemporary fine dining atelier located in Bole Medhanialem)."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I buy electric vehicle (EV) spare parts in Addis Ababa, Ethiopia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ethio EV Spare, an enterprise of Adonael Trading PLC, provides over 10,000 cataloged electric vehicle components in Addis Ababa. Products include high-voltage battery modules, electric traction motors, power inverters, CCS2 fast charging connectors, ceramic brake pads, and air suspension struts with warranty coverage. Contact +251 96 743 1638 or info@adonaeltrading.com."
            }
          },
          {
            "@type": "Question",
            "name": "How can I reserve a table at Meteor Restaurant in Addis Ababa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Table reservations at Meteor Restaurant can be made directly via WhatsApp at +251 96 743 1638 or by calling the concierge desk at 0967431638. Meteor Restaurant is located in the Bole Medhanialem enclave and offers open-kitchen dining, curated beverage cellars, and private salons for executive summits."
            }
          },
          {
            "@type": "Question",
            "name": "Does Ethio EV Spare have a mobile application for ordering parts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Ethio EV Spare has an official Android mobile app available on the Google Play Store (app ID: com.evspare.buyer), allowing users to search by chassis or vehicle model, check live warehouse stock in Addis Ababa, and request express delivery."
            }
          },
          {
            "@type": "Question",
            "name": "What are the official contact numbers and email for Adonael Trading?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Adonael Trading PLC can be contacted by phone and WhatsApp at 0967431638 (+251 96 743 1638) and by email at info@adonaeltrading.com. The headquarters is located in Bole Sub-City, Addis Ababa, Ethiopia."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
