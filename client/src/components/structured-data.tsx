import { properties } from "@/lib/properties";
import { type BlogPost } from "@/lib/blog-posts";
import { buildPropertyListingJsonLd } from "@/lib/property-structured-data";
import { GLOBAL_SCHEMA_GRAPH } from "@/lib/seo-global-graph";

const SITE = "https://theadarecollection.com";

interface PropertyStructuredDataProps {
  propertyId?: string;
}

export function PropertyStructuredData({ propertyId }: PropertyStructuredDataProps) {
  const property = propertyId ? properties.find((p) => p.id === propertyId) : null;

  if (!property) return null;

  const structuredData = buildPropertyListingJsonLd(property);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

/** Sitewide Organization + WebSite + navigation hints + RealEstateAgent (see seo-global-graph.ts). */
export function GlobalSchemaStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SCHEMA_GRAPH) }}
    />
  );
}

export function FaqPageStructuredData({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

/** Local business signals for contact page (NAP aligned with footer). */
export function ContactLocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "The Adare Collection",
    legalName: "The Adare Collection Limited",
    url: SITE,
    telephone: "+353-86-668-1930",
    email: "info@theadarecollection.ie",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adare",
      addressRegion: "County Limerick",
      addressCountry: "IE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.5644,
      longitude: -8.7892,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: "Adare Manor, County Limerick, Ireland",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BlogPostingStructuredData({ post }: { post: BlogPost }) {
  const image = post.heroImage.startsWith("http")
    ? post.heroImage
    : `${SITE}${post.heroImage}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image,
    url: `${SITE}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "The Adare Collection",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "The Adare Collection",
      url: SITE,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbListStructuredData({
  propertyName,
  propertyId,
}: {
  propertyName: string;
  propertyId: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties",
        item: `${SITE}/properties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: propertyName,
        item: `${SITE}/property/${propertyId}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
