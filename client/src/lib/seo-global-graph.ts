/**
 * Single JSON-LD graph for homepage / sitewide signals (brand, WebSite, navigation hints).
 * Injected into index.html at build time; keep in sync with any page-level schema elsewhere.
 */
export const GLOBAL_SCHEMA_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theadarecollection.com/#organization",
      name: "The Adare Collection",
      legalName: "The Adare Collection Limited",
      url: "https://theadarecollection.com",
      description:
        "Exclusive private houses and estates near Adare Manor for Ryder Cup 2027. Corporate hospitality, executive rentals, and luxury homes in County Limerick.",
      logo: {
        "@type": "ImageObject",
        url: "https://theadarecollection.com/images/navbar/adarecollectionlogo.png",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Adare",
        addressRegion: "Limerick",
        addressCountry: "IE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+353-86-668-1930",
        contactType: "customer service",
        email: "info@theadarecollection.ie",
      },
      sameAs: [
        "https://www.linkedin.com/company/the-adare-collection",
        "https://www.instagram.com/theadarecollection/",
      ],
      foundingDate: "2026-04-08",
      areaServed: {
        "@type": "Country",
        name: "Ireland",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://theadarecollection.com/#website",
      url: "https://theadarecollection.com",
      name: "The Adare Collection",
      alternateName: ["The Adare Collection Ltd", "Adare Collection"],
      description:
        "Ryder Cup 2027 accommodation at Adare Manor. Luxury rentals, private residences, and estates.",
      inLanguage: "en-IE",
      publisher: { "@id": "https://theadarecollection.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://theadarecollection.com/properties?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://theadarecollection.com/#primary-navigation",
      name: "Main pages",
      numberOfItems: 9,
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Home",
          url: "https://theadarecollection.com/",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Luxury properties",
          url: "https://theadarecollection.com/properties",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Ryder Cup packages",
          url: "https://theadarecollection.com/ryder-cup-packages",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Corporate hospitality",
          url: "https://theadarecollection.com/corporate-hospitality",
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Travel management",
          url: "https://theadarecollection.com/services",
        },
        {
          "@type": "SiteNavigationElement",
          position: 6,
          name: "About",
          url: "https://theadarecollection.com/about",
        },
        {
          "@type": "SiteNavigationElement",
          position: 7,
          name: "FAQ",
          url: "https://theadarecollection.com/faq",
        },
        {
          "@type": "SiteNavigationElement",
          position: 8,
          name: "Blog",
          url: "https://theadarecollection.com/blog",
        },
        {
          "@type": "SiteNavigationElement",
          position: 9,
          name: "Contact",
          url: "https://theadarecollection.com/contact",
        },
      ],
    },
    {
      "@type": "RealEstateAgent",
      "@id": "https://theadarecollection.com/#realEstateAgent",
      name: "The Adare Collection",
      legalName: "The Adare Collection Limited",
      parentOrganization: { "@id": "https://theadarecollection.com/#organization" },
      description:
        "Ryder Cup 2027 accommodation at Adare Manor. Luxury rentals, private residences.",
      url: "https://theadarecollection.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Adare",
        addressRegion: "Limerick",
        addressCountry: "IE",
      },
      areaServed: "Adare Manor Estate",
      serviceType: "Luxury Accommodation Rental",
      event: {
        "@type": "SportsEvent",
        name: "Ryder Cup 2027",
        description:
          "The 2027 Ryder Cup golf tournament at Adare Manor, featuring the best golfers from Europe and the United States.",
        startDate: "2027-09-29",
        endDate: "2027-10-01",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Adare Manor Golf Course",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Adare Manor",
            addressLocality: "Adare",
            addressRegion: "Limerick",
            addressCountry: "IE",
            postalCode: "V94 W8WR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 52.5644,
            longitude: -8.7892,
          },
        },
        organizer: {
          "@type": "Organization",
          name: "Ryder Cup Europe",
          url: "https://www.rydercup.com",
        },
        performer: [
          { "@type": "SportsTeam", name: "European Ryder Cup Team" },
          { "@type": "SportsTeam", name: "United States Ryder Cup Team" },
        ],
        image: "https://theadarecollection.com/images/hero/adaremanor-img2.webp",
      },
    },
  ],
} as const;
