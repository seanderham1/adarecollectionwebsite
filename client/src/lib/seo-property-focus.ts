/**
 * Per-property focus keywords (GSC / SEO report Part 1.2) and on-page checklist.
 */

export type PropertySeoFocus = {
  focusKeyword: string;
  /** Optional keyword-led subheading under property name on detail page */
  pageSubheading?: string;
};

/** Properties audited in the May 2026 report. */
export const PROPERTY_SEO_FOCUS: Record<string, PropertySeoFocus> = {
  "portland-house": { focusKeyword: "ryder cup accommodation" },
  "parkview-house": {
    focusKeyword: "ryder cup 2027 accommodation",
    pageSubheading: "Ryder Cup 2027 accommodation with group capacity near Adare Manor",
  },
  "the-fairways": {
    focusKeyword: "the fairways adare manor ryder cup",
    pageSubheading: "The Fairways, Adare Manor demesne Ryder Cup stay",
  },
  "the-first-tee": {
    focusKeyword: "the first tee adare manor ryder cup",
    pageSubheading: "The First Tee, closest demesne residence to Ryder Cup 2027 play",
  },
  "croagh-house": {
    focusKeyword: "croagh house ryder cup 2027",
    pageSubheading: "Croagh House, private Ryder Cup 2027 rental near Adare Manor",
  },
  "darrira-house": {
    focusKeyword: "darrira house ryder cup 2027",
    pageSubheading: "Darrira House, countryside Ryder Cup 2027 accommodation",
  },
  "hillview-house": {
    focusKeyword: "hillview house ryder cup 2027",
    pageSubheading: "Hillview House, executive Ryder Cup 2027 rental in Adare",
  },
  "southview-cullinagh": {
    focusKeyword: "southview cullinagh ryder cup 2027",
    pageSubheading: "Southview Cullinagh, deluxe Ryder Cup 2027 cottage in Newcastle West",
  },
  "nead-fainleog": {
    focusKeyword: "nead fainleog ryder cup 2027",
    pageSubheading: "Nead Fainleog, executive Ryder Cup 2027 residence near Adare Manor",
  },
  "the-captains": {
    focusKeyword: "the captains house adare manor ryder cup",
    pageSubheading: "The Captains, on-estate Ryder Cup 2027 corporate hospitality home",
  },
  "dunes-lodge": {
    focusKeyword: "dunes lodge lahinch ryder cup 2027",
    pageSubheading: "Dunes Lodge, Lahinch base for Ryder Cup 2027 with coastal golf",
  },
  "putters-way": {
    focusKeyword: "putters way adare manor ryder cup",
    pageSubheading: "Putters Way, Golf Village Ryder Cup 2027 accommodation",
  },
  /** Extended audit (not in original report). */
  "cragleigh-house": {
    focusKeyword: "cragleigh house ryder cup 2027",
    pageSubheading: "Cragleigh House, manor-style Ryder Cup 2027 estate near Adare",
  },
  rangeview: {
    focusKeyword: "rangeview adare manor ryder cup 2027",
    pageSubheading: "Range View, demesne Ryder Cup 2027 accommodation at Adare Manor",
  },
};

/** Shared on-page.ai term checklist for property copy supplements. */
export const PROPERTY_ON_PAGE_CHECKLIST = [
  "ryder cup",
  "accommodation",
  "adare manor",
  "ireland",
  "location",
  "course",
  "bedrooms",
  "galway",
  "experience",
  "tickets",
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
