import type { Property } from "./properties";
import { formatPropertyBedroomsShort } from "./properties";
import { getPropertySeoFocus } from "./seo-property-focus";

/** Title-case focus keywords for browser titles (The, Tee, Way, Cup, Oak, etc.). */
function titleCaseKeyword(keyword: string): string {
  return keyword
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function propertyPageTitle(property: Property): string {
  const focus = getPropertySeoFocus(property.id);
  if (focus) {
    const label = titleCaseKeyword(focus.focusKeyword);
    return `${property.name} | ${label} | Adare Manor`;
  }
  return `${property.name} - Private Rental near Adare Manor`;
}

/** Unique per listing; keep within ~160 chars for meta descriptions. */
export function propertyPageDescription(property: Property): string {
  const beds = formatPropertyBedroomsShort(property);
  const focus = getPropertySeoFocus(property.id);
  const keywordPhrase = focus ? focus.focusKeyword : "private rental near Adare Manor";
  const line = `${property.name}, ${beds} bedrooms. ${keywordPhrase} at Adare Manor, Ireland. ${property.subtitle}`;
  if (line.length <= 158) return line;
  const shorter = `${property.name}, ${keywordPhrase}. ${beds} bedrooms near Adare Manor, County Limerick. Enquire for availability.`;
  if (shorter.length <= 158) return shorter;
  return `${shorter.slice(0, 155).trimEnd()}…`;
}

export function propertyPageSubheading(propertyId: string): string | undefined {
  return getPropertySeoFocus(propertyId)?.pageSubheading;
}
