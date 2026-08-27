/**
 * Single source for static route title/description (and related useSEO fields)
 * shared by React and build-time prerender HTML.
 */
import { getBlogPosts, type BlogPost } from "./blog-posts";
import { properties, type Property, formatPropertyBedroomsShort } from "./properties";
import { propertyPageDescription, propertyPageTitle } from "./property-seo";
import { getPropertySeoFocus } from "./seo-property-focus";
import {
  SEO_HOME_DESCRIPTION,
  SEO_HOME_TITLE,
  SEO_META_KEYWORDS_COMPACT,
  SEO_PROPERTIES_DESCRIPTION,
  SEO_PROPERTIES_TITLE,
} from "./seo-keyword-clusters";
import {
  SEO_LANDING_KEYWORDS,
  SEO_SERVICES_DESCRIPTION,
  SEO_SERVICES_PATH,
  SEO_SERVICES_TITLE,
} from "./seo-landing-pages";

export const SITE_ORIGIN = "https://theadarecollection.com";

export function canonicalUrlForPath(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}

/** Fields consumed by useSEO and prerender head patching */
export type RouteSEOPayload = {
  path: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  ogUrl: string;
};

const ABOUT_OG = "https://theadarecollection.com/images/about/about-photo.jpg";
const HERO_1 = "https://theadarecollection.com/images/hero/adaremanor-img1.webp";
const HERO_2 = "https://theadarecollection.com/images/hero/adaremanor-img2.webp";

const LEGAL_KEYWORDS =
  "The Adare Collection Limited, The Adare Collection privacy, Adare Manor accommodation";

const TERMS_KEYWORDS =
  "The Adare Collection Limited, The Adare Collection terms, Adare Manor accommodation";

/** Static marketing / legal pages (order matches sitemap importance). */
export function getStaticRouteSEOPayloads(): RouteSEOPayload[] {
  return [
    {
      path: "/",
      title: SEO_HOME_TITLE,
      description: SEO_HOME_DESCRIPTION,
      keywords: SEO_META_KEYWORDS_COMPACT,
      ogImage: HERO_2,
      ogUrl: canonicalUrlForPath("/"),
    },
    {
      path: "/properties",
      title: SEO_PROPERTIES_TITLE,
      description: SEO_PROPERTIES_DESCRIPTION,
      keywords: SEO_META_KEYWORDS_COMPACT,
      ogImage: HERO_1,
      ogUrl: canonicalUrlForPath("/properties"),
    },
    {
      path: SEO_SERVICES_PATH,
      title: SEO_SERVICES_TITLE,
      description: SEO_SERVICES_DESCRIPTION,
      keywords: SEO_LANDING_KEYWORDS,
      ogImage: HERO_2,
      ogUrl: canonicalUrlForPath(SEO_SERVICES_PATH),
    },
    {
      path: "/about",
      title:
        "About Us | Private Accommodation & Executive Rentals near Adare Manor",
      description:
        "Meet the team behind The Adare Collection: exclusive luxury accommodation, private estates near Adare Manor, and corporate rentals in County Limerick, Ireland.",
      keywords: SEO_META_KEYWORDS_COMPACT,
      ogImage: ABOUT_OG,
      ogUrl: canonicalUrlForPath("/about"),
    },
    {
      path: "/contact",
      title: "Contact | Private Accommodation near Adare Manor | The Adare Collection Limited",
      description:
        "Enquire about luxury private accommodation near Adare Manor. Contact The Adare Collection Limited (trading as The Adare Collection). Independent provider — we do not sell tickets or official hospitality.",
      keywords: SEO_META_KEYWORDS_COMPACT,
      ogImage: HERO_2,
      ogUrl: canonicalUrlForPath("/contact"),
    },
    {
      path: "/faq",
      title: "FAQ | Private Accommodation & Rentals near Adare Manor | The Adare Collection",
      description:
        "Answers about luxury private accommodation near Adare Manor, including corporate rentals, executive homes, houses for rent, proximity to the course and County Limerick private stays.",
      keywords: SEO_META_KEYWORDS_COMPACT,
      ogImage: HERO_1,
      ogUrl: canonicalUrlForPath("/faq"),
    },
    {
      path: "/blog",
      title: "Blog | Adare Manor Travel Guides & News | The Adare Collection",
      description:
        "Travel guides and news for Adare Manor tournament week: spectator rail transport, helicopter access, ticket ballot information, and luxury accommodation planning in County Limerick.",
      keywords: SEO_META_KEYWORDS_COMPACT,
      ogImage: HERO_2,
      ogUrl: canonicalUrlForPath("/blog"),
    },
    {
      path: "/privacy",
      title: "Privacy Policy | The Adare Collection Limited",
      description:
        "Privacy policy for The Adare Collection Limited (trading as The Adare Collection), covering luxury private accommodation near Adare Manor.",
      keywords: LEGAL_KEYWORDS,
      ogImage: HERO_2,
      ogUrl: canonicalUrlForPath("/privacy"),
    },
    {
      path: "/terms",
      title: "Terms and Conditions | The Adare Collection Limited",
      description:
        "Terms and conditions for The Adare Collection Limited (trading as The Adare Collection), covering luxury private accommodation near Adare Manor.",
      keywords: TERMS_KEYWORDS,
      ogImage: HERO_2,
      ogUrl: canonicalUrlForPath("/terms"),
    },
  ];
}

export function propertyKeywords(property: Property): string {
  const focus = getPropertySeoFocus(property.id)?.focusKeyword;
  const focusPart = focus ? `${focus}, ` : "";
  return `${property.name}, ${focusPart}private accommodation near Adare Manor, Adare Manor rental, ${formatPropertyBedroomsShort(property)} bedroom, golf accommodation Ireland`;
}

/** Mirrors property-detail useSEO when a listing exists. */
export function getPropertyRouteSEOPayload(property: Property): RouteSEOPayload {
  const path = `/property/${property.id}`;
  const first = property.images[0];
  const ogImage = first.startsWith("http")
    ? first
    : `${SITE_ORIGIN}${first}`;
  return {
    path,
    title: `${propertyPageTitle(property)} | The Adare Collection`,
    description: propertyPageDescription(property),
    keywords: propertyKeywords(property),
    ogImage,
    ogUrl: canonicalUrlForPath(path),
  };
}

export function getPropertyRouteSEOPayloads(): RouteSEOPayload[] {
  return properties.map(getPropertyRouteSEOPayload);
}

export function getBlogPostRouteSEOPayload(post: BlogPost): RouteSEOPayload {
  const path = `/blog/${post.slug}`;
  const ogImage = post.heroImage.startsWith("http")
    ? post.heroImage
    : `${SITE_ORIGIN}${post.heroImage}`;
  return {
    path,
    title: `${post.title} | The Adare Collection`,
    description: post.excerpt,
    keywords: post.keywords,
    ogImage,
    ogUrl: canonicalUrlForPath(path),
  };
}

export function getBlogPostRouteSEOPayloads(): RouteSEOPayload[] {
  return getBlogPosts().map(getBlogPostRouteSEOPayload);
}

/** All routes that receive prerendered HTML + Firebase rewrites. */
export function getAllPrerenderRouteSEOPayloads(): RouteSEOPayload[] {
  return [
    ...getStaticRouteSEOPayloads(),
    ...getPropertyRouteSEOPayloads(),
    ...getBlogPostRouteSEOPayloads(),
  ];
}

/** useSEO() args derived from a prerender payload (drops `path`). */
export function toUseSEOArgs(
  payload: RouteSEOPayload,
): Omit<RouteSEOPayload, "path"> {
  const { path: _path, ...args } = payload;
  return args;
}

export function getStaticRouteSEOByPath(
  path: string,
): RouteSEOPayload | undefined {
  return getStaticRouteSEOPayloads().find((r) => r.path === path);
}

/** Filename under dist/public/_prerender/ (plan: property__slug.html). */
export function prerenderHtmlFilename(path: string): string {
  if (path === "/") return "home.html";
  if (path.startsWith("/property/")) {
    const id = path.slice("/property/".length).replace(/\//g, "_");
    return `property__${id}.html`;
  }
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length).replace(/\//g, "_");
    return `blog__${slug}.html`;
  }
  return `${path.slice(1)}.html`;
}
