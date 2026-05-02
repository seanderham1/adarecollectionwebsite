import { properties, formatPropertyBedroomsShort } from "@/lib/properties";

interface PropertyStructuredDataProps {
  propertyId?: string;
}

export function PropertyStructuredData({ propertyId }: PropertyStructuredDataProps) {
  const property = propertyId ? properties.find(p => p.id === propertyId) : null;

  if (!property) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": property.name,
    "description": `${property.name} - Exclusive luxury rental for Ryder Cup 2027. ${formatPropertyBedroomsShort(property)} bedrooms, premium amenities, located in Adare Manor Estate.`,
    "url": `https://theadarecollection.com/property/${property.id}`,
    "image": `https://theadarecollection.com${property.images[0]}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Adare",
      "addressRegion": "Limerick",
      "addressCountry": "IE",
      ...(property.eircode ? { postalCode: property.eircode } : {}),
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.location?.lat ?? 52.5644,
      "longitude": property.location?.lng ?? -8.7892
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Bedrooms",
        "value": formatPropertyBedroomsShort(property)
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Golf Course Access",
        "value": "Adare Manor Golf Course"
      }
    ],
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "priceRange": "€€€€",
    "telephone": "+353-61-605-200",
    "email": "info@theadarecollection.com",
    "sameAs": [
      "https://theadarecollection.com"
    ],
    "event": {
      "@type": "SportsEvent",
      "name": "Ryder Cup 2027",
      "description": "The 2027 Ryder Cup golf tournament at Adare Manor, featuring the best golfers from Europe and the United States.",
      "startDate": "2027-09-29",
      "endDate": "2027-10-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Adare Manor Golf Course",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Adare Manor",
          "addressLocality": "Adare",
          "addressRegion": "Limerick",
          "addressCountry": "IE",
          "postalCode": "V94 W8WR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 52.5644,
          "longitude": -8.7892
        }
      },
      "organizer": {
        "@type": "Organization",
        "name": "Ryder Cup Europe",
        "url": "https://www.rydercup.com"
      },
      "performer": [
        {
          "@type": "SportsTeam",
          "name": "European Ryder Cup Team"
        },
        {
          "@type": "SportsTeam",
          "name": "United States Ryder Cup Team"
        }
      ],
      "image": "https://theadarecollection.com/images/hero/adaremanor-img2.webp",
      "offers": {
        "@type": "Offer",
        "name": "Ryder Cup 2027 Tickets",
        "description": "Official tickets for the 2027 Ryder Cup at Adare Manor",
        "availability": "https://schema.org/InStock",
        "url": "https://www.rydercup.com"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebSiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "The Adare Collection",
    "description": "Ryder Cup 2027 accommodation at Adare Manor. Luxury rentals, private residences, villas for rent.",
    "url": "https://theadarecollection.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://theadarecollection.com/properties?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbListStructuredData({ propertyName, propertyId }: { propertyName: string; propertyId: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://theadarecollection.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Properties",
        "item": "https://theadarecollection.com/properties"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": propertyName,
        "item": `https://theadarecollection.com/property/${propertyId}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Adare Collection",
    "legalName": "The Adare Collection Limited",
    "description": "Exclusive luxury property rentals for Ryder Cup 2027 at Adare Manor Estate",
    "url": "https://theadarecollection.com",
    "logo": "https://theadarecollection.com/images/navbar/adarecollectionlogo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Adare",
      "addressRegion": "Limerick", 
      "addressCountry": "IE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+353-61-605-200",
      "contactType": "customer service",
      "email": "info@theadarecollection.com"
    },
    "sameAs": [
      "https://theadarecollection.com"
    ],
    "foundingDate": "2024",
    "areaServed": {
      "@type": "Country",
      "name": "Ireland"
    },
    "serviceType": "Luxury Accommodation Rental"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
