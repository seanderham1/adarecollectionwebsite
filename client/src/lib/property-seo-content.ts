/**
 * Optional extra on-page copy appended after fullDescription on property detail.
 */

const SHARED_BOOKING = `Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve. We do not sell tickets or official hospitality; those are available only via the official Ryder Cup website.`;

const SHARED_BOOKING_SHORT = `Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`;

const SHARED_TRANSPORT = `Transportation to Adare Manor varies by home: demesne residences are within walking distance of the course; others use private parking plus chauffeur or shuttle options arranged in advance. Galway and Shannon Airport are common arrival points for international guests travelling to County Limerick.`;

/** Extra paragraphs appended after fullDescription on property detail. */
const PROPERTY_SEO_SUPPLEMENTS: Record<string, string[]> = {
  rangeview: [
    `This large demesne rental offers bedrooms, chef-ready kitchen, parking, wifi, and amenities at the heart of the venue.`,
    `Experience Ireland from inside the estate with concierge support for ground transportation and entertaining. Availability is exclusive for tournament week; booking is by private enquiry.`,
    SHARED_BOOKING_SHORT,
  ],
  "the-captains": [
    `With multiple bedrooms, chef-ready kitchens, parking, and full amenities, it functions as a private whole-home base rather than a standard hotel stay. Wifi, laundry, and concierge coordination help your group focus on the tournament, venue access, and guest experience throughout Ireland.`,
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
  "nead-fainleog": [
    `This executive residence suits guests who want generous ensuite capacity, wellness amenities and a short walk or drive to the Ryder Cup venue. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "the-manor-lodge": [
    `This executive Adare village residence suits guests who want contemporary interiors, outdoor entertaining and a short walk to Adare Manor for Ryder Cup 2027. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "dunes-lodge": [
    `Dunes Lodge in Lahinch combines Wild Atlantic Way scenery with championship golf views, with kitchen, parking, wifi, and amenities for surfers and golf fans. The home suits guests who want a coastal Ireland experience.`,
    `Dunes Lodge offers group capacity availability for tournament week subject to confirmation. Booking includes guidance on travel time to Adare Manor and local dining options.`,
    `Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve. Helicopter transfers to Adare Manor may be arranged subject to availability; ground transportation and parking are included for self-drive guests.`,
  ],
  "derg-house": [
    `This luxury country rental offers ensuite bedrooms, chef-ready kitchen, parking, wifi, and amenities for up to ten guests within easy reach of Adare Manor. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "riverston-abbey": [
    `This executive estate suits sponsors, corporate groups and multi-generational families who need extensive ensuite capacity, formal dining for up to thirty guests and a private gated base approximately 40 minutes from Adare Manor. Booking is handled personally by our team: we confirm availability, guest count, and house rules before you reserve.`,
  ],
  "kildimo-house": [
    `Kildimo House combines space and privacy with contemporary comfort: a bright open-plan kitchen and dining area for up to eight guests, a central island for gathering, and multiple relaxing rooms for entertaining or downtime.`,
    `A family-friendly countryside base in Kildimo village, with five ensuite double bedrooms (including a ground-floor option) and a children’s play area in the rear garden—approximately 12 minutes from the official Adare Park & Ride facility.`,
    SHARED_BOOKING_SHORT,
  ],
  "coolbawn-quay": [
    `Coolbawn Quay offers exclusive use of a boutique lakeside village with approximately 60 mostly ensuite rooms, wellness facilities and a private marina—an exceptional option for large Ryder Cup 2027 groups seeking atmosphere and capacity outside the demesne.`,
    `Located on Lough Derg in North Tipperary, the resort is approximately one hour by road from Adare Manor, with village cottages, clubhouse dining and on-site wellness within a single private setting.`,
    SHARED_BOOKING_SHORT,
  ],
  "oak-leaf-house": [
    `Oak Leaf House is a deluxe, child-friendly country residence near Adare Manor with approximately 2,500 sq. ft. of accommodation, secure electric gates, landscaped gardens and parking for families or mixed groups of up to nine guests.`,
    `A bright open-plan kitchen and dining area seats up to ten at the table, with two living rooms, three bathrooms and countryside views—ideally placed about 12 minutes from the course and seven minutes from Croagh Park & Ride.`,
    SHARED_BOOKING_SHORT,
  ],
};

export function getPropertySeoSupplementParagraphs(propertyId: string): string[] {
  return PROPERTY_SEO_SUPPLEMENTS[propertyId] ?? [];
}
