/**
 * Per-property focus keywords and on-page checklist.
 */

export type PropertySeoFocus = {
  focusKeyword: string;
  /** Optional keyword-led subheading under property name on detail page */
  pageSubheading?: string;
};

/** Properties audited in the May 2026 report. */
export const PROPERTY_SEO_FOCUS: Record<string, PropertySeoFocus> = {
  "portland-house": { focusKeyword: "adare manor accommodation" },
  "parkview-house": {
    focusKeyword: "private rental near adare manor",
    pageSubheading: "Private rental with group capacity near Adare Manor",
  },
  "the-fairways": {
    focusKeyword: "the fairways adare manor rental",
    pageSubheading: "The Fairways, Adare Manor demesne private stay",
  },
  "the-first-tee": {
    focusKeyword: "the first tee adare manor rental",
    pageSubheading: "The First Tee, closest demesne residence to the championship course",
  },
  "croagh-house": {
    focusKeyword: "croagh house adare manor rental",
    pageSubheading: "Croagh House, private rental near Adare Manor",
  },
  "darrira-house": {
    focusKeyword: "darrira house adare accommodation",
    pageSubheading: "Darrira House, countryside accommodation near Adare Manor",
  },
  "hillview-house": {
    focusKeyword: "hillview house adare rental",
    pageSubheading: "Hillview House, executive rental near Adare",
  },
  "nead-fainleog": {
    focusKeyword: "nead fainleog adare manor rental",
    pageSubheading: "Nead Fainleog, executive residence near Adare Manor",
  },
  "the-manor-lodge": {
    focusKeyword: "the manor lodge adare village rental",
    pageSubheading: "The Manor Lodge, executive residence in Adare village",
  },
  "the-captains": {
    focusKeyword: "the captains house adare manor rental",
    pageSubheading: "The Captains, on-estate private home at Adare Manor",
  },
  "dunes-lodge": {
    focusKeyword: "dunes lodge lahinch golf rental",
    pageSubheading: "Dunes Lodge, Lahinch base with coastal golf",
  },
  "putters-way": {
    focusKeyword: "putters way adare manor rental",
    pageSubheading: "Putters Way, Golf Village private accommodation",
  },
  /** Extended audit (not in original report). */
  "cragleigh-house": {
    focusKeyword: "cragleigh house adare manor rental",
    pageSubheading: "Cragleigh House, manor-style estate near Adare",
  },
  rangeview: {
    focusKeyword: "rangeview adare manor rental",
    pageSubheading: "Range View, demesne accommodation at Adare Manor",
  },
  "derg-house": {
    focusKeyword: "derg house adare manor rental",
    pageSubheading: "Derg House, luxury country residence near Adare Manor",
  },
  "riverston-abbey": {
    focusKeyword: "riverston abbey nenagh private estate",
    pageSubheading: "Riverston Abbey, executive private estate in Nenagh",
  },
  "kildimo-house": {
    focusKeyword: "kildimo house adare manor rental",
    pageSubheading: "Kildimo House, five-bedroom residence near Adare Manor",
  },
  "coolbawn-quay": {
    focusKeyword: "coolbawn quay lough derg resort",
    pageSubheading: "Coolbawn Quay, boutique lakeside resort near Adare Manor",
  },
  "oak-leaf-house": {
    focusKeyword: "oak leaf house adare manor rental",
    pageSubheading: "Oak Leaf House, deluxe family residence near Adare Manor",
  },
};

/** Shared on-page.ai term checklist for property copy supplements. */
export const PROPERTY_ON_PAGE_CHECKLIST = [
  "accommodation",
  "adare manor",
  "ireland",
  "location",
  "course",
  "bedrooms",
  "galway",
  "experience",
  "venue",
  "amenities",
  "guests",
  "kitchen",
  "parking",
  "availability",
  "wifi",
  "booking",
  "rental",
  "transportation",
] as const;

export function getPropertySeoFocus(propertyId: string): PropertySeoFocus | undefined {
  return PROPERTY_SEO_FOCUS[propertyId];
}
