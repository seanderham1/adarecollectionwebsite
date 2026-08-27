import { type Property, getPropertyCollectionBadge } from "@/lib/properties";

export type PropertyTier = "EXECUTIVE" | "DELUXE" | "PREMIUM";

export interface PropertyFilterBounds {
  maxDistanceMiles: number;
  maxGuests: number;
  maxBedrooms: number;
}

const DEG_TO_RAD = Math.PI / 180;
const EARTH_RADIUS_METERS = 6_371_000;
const METERS_PER_MILE = 1609.344;

function toRadians(value: number): number {
  return value * DEG_TO_RAD;
}

function haversineMiles(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const fromLat = toRadians(from.lat);
  const toLat = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const meters = EARTH_RADIUS_METERS * c;
  return meters / METERS_PER_MILE;
}

/**
 * Keep distance calculations aligned with the map overlay position in map-utils.
 */
export function getGolfCourseCenter(): { lat: number; lng: number } {
  const baseLat = 52.571;
  const baseLng = -8.78;
  const latOffset = -1000 / 111320;
  const lngOffset = 350 / (111320 * Math.cos(baseLat * Math.PI / 180));

  return { lat: baseLat + latOffset, lng: baseLng + lngOffset };
}

function parseMaxFromRange(text: string): number | null {
  const rangeMatch = text.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (!rangeMatch) return null;
  return Number(rangeMatch[2]);
}

function parseLargestNumber(text: string): number | null {
  const all = Array.from(text.matchAll(/\d+/g)).map((m) => Number(m[0]));
  if (all.length === 0) return null;
  return Math.max(...all);
}

function fallbackGuestCapacity(property: Property): number {
  return Math.max(property.bedrooms * 2, property.bedrooms);
}

export function getPropertyTier(property: Property): PropertyTier {
  return getPropertyCollectionBadge(property.id) as PropertyTier;
}

export function getPropertyMaxGuests(property: Property): number {
  const occupancySpec = property.specs?.find((spec) =>
    spec.label.toLowerCase().includes("occupancy"),
  );

  if (!occupancySpec) return fallbackGuestCapacity(property);

  const text = occupancySpec.value.toLowerCase();
  const rangeMax = parseMaxFromRange(text);
  if (rangeMax && Number.isFinite(rangeMax)) return rangeMax;

  const largest = parseLargestNumber(text);
  if (largest && Number.isFinite(largest)) return largest;

  return fallbackGuestCapacity(property);
}

export function getDistanceToGolfCourseMiles(property: Property): number {
  return haversineMiles(property.location, getGolfCourseCenter());
}

export function deriveFilterBounds(properties: readonly Property[]): PropertyFilterBounds {
  const maxDistance = properties.reduce((max, property) => {
    return Math.max(max, getDistanceToGolfCourseMiles(property));
  }, 0);
  const maxGuests = properties.reduce((max, property) => {
    return Math.max(max, getPropertyMaxGuests(property));
  }, 0);
  const maxBedrooms = properties.reduce((max, property) => {
    return Math.max(max, property.bedrooms);
  }, 0);

  return {
    maxDistanceMiles: Math.max(5, Math.ceil(maxDistance)),
    maxGuests: Math.max(2, maxGuests),
    maxBedrooms: Math.min(15, Math.max(1, maxBedrooms)),
  };
}
