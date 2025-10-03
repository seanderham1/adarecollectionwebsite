import { properties } from "@/lib/properties";

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
    "description": `${property.name} - Exclusive luxury rental for Ryder Cup 2027. ${property.bedrooms} bedrooms, premium amenities, located in Adare Manor Estate.`,
    "url": `https://theadarecollection.com/property/${property.id}`,
    "image": `https://theadarecollection.com${property.images[0]}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Adare",
      "addressRegion": "Limerick",
      "addressCountry": "IE",
      "postalCode": "V94 W8WR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.coordinates?.lat || 52.5644,
      "longitude": property.coordinates?.lng || -8.7892
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Bedrooms",
        "value": property.bedrooms
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Bathrooms",
        "value": property.bathrooms
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
      "startDate": "2027-09-29",
      "endDate": "2027-10-01",
      "location": {
        "@type": "Place",
        "name": "Adare Manor",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Adare",
          "addressRegion": "Limerick",
          "addressCountry": "IE"
        }
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

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Adare Collection",
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
