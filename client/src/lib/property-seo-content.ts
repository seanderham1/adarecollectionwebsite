/**
 * Optional extra on-page copy appended after fullDescription on property detail.
 */

const SHARED_BOOKING = `Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve. Ryder Cup 2027 ticket information is available from the official tournament site; we do not sell tickets.`;

const SHARED_BOOKING_SHORT = `Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`;

const SHARED_TRANSPORT = `Transportation to the Ryder Cup venue varies by home: demesne residences are within walking distance of the course; others use private parking plus chauffeur or shuttle options arranged in advance. Galway and Shannon Airport are common arrival points for international guests travelling to County Limerick.`;

/** Extra paragraphs appended after fullDescription on property detail. */
const PROPERTY_SEO_SUPPLEMENTS: Record<string, string[]> = {
  rangeview: [
    `This large demesne rental offers bedrooms, chef-ready kitchen, parking, wifi, and amenities at the heart of the venue.`,
    `Experience Ireland's Ryder Cup 2027 from inside the estate with concierge support for ground transportation and entertaining. Availability is exclusive to Ryder week; booking is by private enquiry.`,
    SHARED_BOOKING_SHORT,
  ],
  "the-captains": [
    `With multiple bedrooms, chef-ready kitchens, parking, and full amenities, it functions as a private hospitality base rather than a standard rental. Wifi, laundry, and concierge coordination help your team focus on the tournament, venue access, and guest experience throughout Ireland's Ryder Cup 2027.`,
    SHARED_BOOKING_SHORT,
  ],
  "putters-way": [
    `Bedrooms, kitchen, parking, and wifi with premium amenities and optional in-residence chef service. Booking availability is limited, contact us for guest count and rental confirmation.`,
    SHARED_BOOKING_SHORT,
  ],
  "the-first-tee": [
    SHARED_BOOKING_SHORT,
  ],
  "the-fairways": [
    `Availability is limited; enquire for rental terms and guest capacity. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "cragleigh-house": [
    `This rental suits guests who want prestige and privacy off the demesne while staying close to the course. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "darrira-house": [
    `Amenities include accessibility features, wifi, and room for hosted meals. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "croagh-house": [
    SHARED_BOOKING_SHORT,
  ],
  "parkview-house": [
    `Booking is handled personally by our team; we confirm availability, guest count, house rules, and rental terms before you reserve.`,
  ],
  "portland-house": [
    SHARED_BOOKING_SHORT,
  ],
  "hillview-house": [
    `Availability is limited for Ryder week; contact us early to discuss booking, rental terms, and optional chef or chauffeur services. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "southview-cullinagh": [
    `This deluxe cottage suits guests who want a town-centre base in an Official Ryder Cup Fan Hub with straightforward Park & Ride access to Adare Manor. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "nead-fainleog": [
    `This executive residence suits guests who want generous ensuite capacity, wellness amenities and a short walk or drive to the Ryder Cup venue. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "dunes-lodge": [
    `Dunes Lodge Lahinch Ryder Cup 2027 accommodation combines Wild Atlantic Way scenery with championship golf views, with kitchen, parking, wifi, and amenities for surfers and golf fans. The home suits guests who want a coastal Ireland experience.`,
    `Dunes Lodge offers group capacity availability for Ryder week subject to confirmation. Booking includes guidance on travel time to the Ryder Cup venue and local hospitality options.`,
    `Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve. Helicopter transfers to Adare Manor may be arranged subject to availability; ground transportation and parking are included for self-drive guests.`,
  ],
};

export function getPropertySeoSupplementParagraphs(propertyId: string): string[] {
  return PROPERTY_SEO_SUPPLEMENTS[propertyId] ?? [];
}
