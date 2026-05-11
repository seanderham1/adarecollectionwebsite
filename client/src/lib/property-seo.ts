import type { Property } from "./properties";
import { formatPropertyBedroomsShort } from "./properties";

export function propertyPageTitle(property: Property): string {
  return `${property.name} - Ryder Cup 2027 Accommodation | Adare Manor Rental`;
}

/** Unique per listing; keep within ~160 chars for meta descriptions. */
export function propertyPageDescription(property: Property): string {
  const beds = formatPropertyBedroomsShort(property);
  const line = `${property.name} — ${beds} bedrooms. ${property.subtitle}`;
  if (line.length <= 158) return line;
  return `${line.slice(0, 155).trimEnd()}…`;
}
