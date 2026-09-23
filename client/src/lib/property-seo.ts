import type { Property } from "./properties";
import { formatPropertyBedroomsShort } from "./properties";
import { getPropertySeoFocus } from "./seo-property-focus";

function titleCaseKeyword(keyword: string): string {
  return keyword
    .split(" ")
    .map((w) => (w.length <= 3 && w !== "ryder" ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/Ryder/g, "Ryder")
    .replace(/Cup/g, "Cup")
    .replace(/Adare/g, "Adare")
    .replace(/Manor/g, "Manor");
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
