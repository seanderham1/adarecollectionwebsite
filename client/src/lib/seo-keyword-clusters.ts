/**
 * Editorial keyword clusters for Ryder Cup 2027 / Adare Manor.
 * Use in titles, meta descriptions, and visible copy naturally, not as stuffing.
 * Google does not use meta keywords for ranking; keep that tag short if present.
 */

export const SEO_HOME_TITLE =
  "Luxury Accommodation near Adare Manor | Houses & Estates | The Adare Collection";

export const SEO_HOME_DESCRIPTION =
  "Exclusive private houses and estates near Adare Manor for tournament week 2027. Corporate and executive rentals and luxury homes in County Limerick, Ireland. Enquire for availability. Independent provider — not affiliated with the Ryder Cup.";

export const SEO_PROPERTIES_TITLE =
  "Properties | Luxury Houses for Rent near Adare Manor | The Adare Collection";

export const SEO_PROPERTIES_DESCRIPTION =
  "Browse private homes and estates on and near Adare Manor. Executive and corporate groups welcome. Premium golf accommodation in County Limerick, Ireland.";

/** Short list for legacy meta keywords only (not a ranking signal). */
export const SEO_META_KEYWORDS_COMPACT =
  "Adare Manor house rental, private accommodation Adare, executive rentals Adare Manor, luxury homes near Adare Manor, private estate rental Ireland, tournament week accommodation Limerick";

/**
 * Themes we weave into FAQs and prose. /services targets estate-hosted services
 * (chef, chauffeur, concierge, ground transfers), not flights or package-holiday agency sales.
 */
export const SEO_LONG_TAIL_THEMES = [
  "Adare Manor private accommodation",
  "Corporate rentals near Adare Manor",
  "Private Ireland rental tournament week",
  "Executive housing near Adare Manor",
] as const;

/** Operational reminders for PR and authority (no runtime SEO effect). */
export const SEO_AUTHORITY_OPS_REMINDERS = [
  "Pitch stories or guest posts to Irish travel/golf/outlets with links where earned",
  "Partner with event-adjacent businesses and reciprocal listings, never link schemes",
  "Monitor Google Search Console for query variants; prioritise CTR and enquiries",
  "Track conversions from organic traffic, not rankings alone",
] as const;
