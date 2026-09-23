import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  /** If omitted, canonical matches `ogUrl` when set (preferred for SPAs). */
  canonicalUrl?: string;
  noIndex?: boolean;
}

export function useSEO({
  title,
  description,
  keywords,
  ogImage,
  ogUrl,
  canonicalUrl,
  noIndex = false
}: SEOProps) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      updateMetaTag('name', 'description', description);
    }

    // Update meta keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }

    // Update Open Graph tags
    if (title) {
      updateMetaTag('property', 'og:title', title);
    }
    if (description) {
      updateMetaTag('property', 'og:description', description);
    }
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage);
    }
    if (ogUrl) {
      updateMetaTag('property', 'og:url', ogUrl);
    }

    const canonical = canonicalUrl ?? ogUrl;
    if (canonical) {
      updateCanonicalLink(canonical);
    }

    // Update Twitter Card tags
    if (title) {
      updateMetaTag('name', 'twitter:title', title);
    }
    if (description) {
      updateMetaTag('name', 'twitter:description', description);
    }
    if (ogImage) {
      updateMetaTag('name', 'twitter:image', ogImage);
    }

    // Handle no-index
    if (noIndex) {
      updateMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      updateMetaTag('name', 'robots', 'index, follow');
    }
  }, [title, description, keywords, ogImage, ogUrl, canonicalUrl, noIndex]);
}

function updateMetaTag(attribute: string, value: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
  }
  
  meta.content = content;
}

function updateCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}
