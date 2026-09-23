import { formatPropertyBedroomsShort, properties, type Property } from "./properties";
import { propertyPageDescription } from "./property-seo";

export const SITE_ORIGIN = "https://theadarecollection.com";

/** Google VacationRental requires 8+ image URLs in JSON-LD (gallery on page is not enough by itself). */
export const VACATION_RENTAL_MIN_IMAGES = 8;

function absoluteImageUrl(src: string): string {
  return src.startsWith("http") ? src : `${SITE_ORIGIN}${src}`;
}

function guestOccupancy(property: Property): number {
  return Math.max(property.bedrooms * 2, property.bedrooms);
}

function buildContainsPlaceAmenities(property: Property) {
  const flags: { name: string; value: boolean }[] = [
    { name: "wifi", value: property.amenities.some((a) => /wifi/i.test(a)) },
    { name: "parking", value: property.amenities.some((a) => /parking/i.test(a)) },
    { name: "kitchen", value: property.features.some((f) => /kitchen/i.test(f)) },
  ];
  return flags
    .filter((f) => f.value)
    .map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f.name,
      value: true,
    }));
}

/**
 * Full VacationRental listing schema; uses every gallery image URL.
 * @see https://developers.google.com/search/docs/appearance/structured-data/vacation-rental
 */
export function buildPropertyVacationRentalJsonLd(property: Property) {
  const images = property.images.map(absoluteImageUrl);

  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "@id": `${SITE_ORIGIN}/property/${property.id}#vacationRental`,
    identifier: property.id,
    name: property.name,
    description: propertyPageDescription(property),
    url: `${SITE_ORIGIN}/property/${property.id}`,
    image: images,
    latitude: String(property.location.lat),
    longitude: String(property.location.lng),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adare",
      addressRegion: "County Limerick",
      addressCountry: "IE",
      ...(property.eircode ? { postalCode: property.eircode } : {}),
    },
    containsPlace: {
      "@type": "Accommodation",
      additionalType: "EntirePlace",
      name: property.name,
      numberOfBedrooms: property.bedrooms,
      occupancy: {
        "@type": "QuantitativeValue",
        value: guestOccupancy(property),
      },
      amenityFeature: buildContainsPlaceAmenities(property),
    },
    telephone: "+353-86-668-1930",
    email: "info@theadarecollection.ie",
  };
}

/** Fallback when a listing has fewer than 8 images in data. */
export function buildPropertyLodgingJsonLd(property: Property) {
  const images = property.images.map(absoluteImageUrl);
  const beds = formatPropertyBedroomsShort(property);

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_ORIGIN}/property/${property.id}#lodging`,
    name: property.name,
    description: propertyPageDescription(property),
    url: `${SITE_ORIGIN}/property/${property.id}`,
    image: images,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adare",
      addressRegion: "County Limerick",
      addressCountry: "IE",
      ...(property.eircode ? { postalCode: property.eircode } : {}),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.lat,
      longitude: property.location.lng,
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Bedrooms",
        value: beds,
      },
      ...property.amenities.slice(0, 8).map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        name: amenity,
        value: true,
      })),
    ],
    numberOfBedrooms: property.bedrooms,
    telephone: "+353-86-668-1930",
    email: "info@theadarecollection.ie",
    parentOrganization: {
      "@type": "Organization",
      name: "The Adare Collection",
      url: SITE_ORIGIN,
    },
  };
}

export function buildPropertyListingJsonLd(property: Property) {
  if (property.images.length >= VACATION_RENTAL_MIN_IMAGES) {
    return buildPropertyVacationRentalJsonLd(property);
  }
  return buildPropertyLodgingJsonLd(property);
}

export type PropertySchemaValidation = {
  id: string;
  name: string;
  galleryImages: number;
  schemaType: string;
  schemaImageCount: number;
  ok: boolean;
  issues: string[];
};

export function validatePropertyListingJsonLd(property: Property): PropertySchemaValidation {
  const data = buildPropertyListingJsonLd(property) as Record<string, unknown>;
  const issues: string[] = [];
  const schemaType = data["@type"] as string;
  const rawImages = data.image;
  const schemaImageCount = Array.isArray(rawImages) ? rawImages.length : rawImages ? 1 : 0;

  if (schemaImageCount !== property.images.length) {
    issues.push(
      `schema image count (${schemaImageCount}) !== gallery (${property.images.length})`,
    );
  }

  if (schemaType === "VacationRental") {
    if (!data.identifier) issues.push("missing identifier");
    if (!data.latitude || !data.longitude) issues.push("missing latitude/longitude");
    const place = data.containsPlace as Record<string, unknown> | undefined;
    const occupancy = (place?.occupancy as { value?: number })?.value;
    if (!place) issues.push("missing containsPlace");
    else if (!occupancy) issues.push("missing containsPlace.occupancy.value");
    if (schemaImageCount < VACATION_RENTAL_MIN_IMAGES) {
      issues.push(`VacationRental needs >= ${VACATION_RENTAL_MIN_IMAGES} images in JSON-LD`);
    }
    if (data.event) issues.push("nested event should not be on property listing");
  }

  if (data.event) issues.push("nested SportsEvent/tickets should be removed");

  return {
    id: property.id,
    name: property.name,
    galleryImages: property.images.length,
    schemaType,
    schemaImageCount,
    ok: issues.length === 0,
    issues,
  };
}

export function validateAllPropertyListings(): PropertySchemaValidation[] {
  return properties.map(validatePropertyListingJsonLd);
}
