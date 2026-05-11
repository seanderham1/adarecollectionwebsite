export interface Property {
  id: string;
  name: string;
  subtitle: string;
  bedrooms: number;
  description: string;
  fullDescription: string;
  price: string;
  images: string[];
  thumbnail?: string;
  features: string[];
  amenities: string[];
  location: {
    lat: number;
    lng: number;
  };
  walkingDistance: string;
  videoUrl?: string;
  eircode?: string;
  /** Matterport (or compatible) showcase URL for 360° embed */
  matterportUrl?: string;
  /** When set (e.g. "5-6"), used in UI/SEO instead of `${bedrooms}` for bedroom count */
  bedroomsLabel?: string;
}

export function formatPropertyBedroomsShort(property: Pick<Property, "bedrooms" | "bedroomsLabel">): string {
  return property.bedroomsLabel ?? String(property.bedrooms);
}

/** Uppercase label on property cards and gallery (homepage, listing, detail). */
export function getPropertyCollectionBadge(propertyId: string): string {
  if (propertyId === "croagh-house") return "PREMIUM";
  if (["darrira-house", "dunes-lodge", "parkview-house"].includes(propertyId)) return "DELUXE";
  return "EXECUTIVE";
}

export const properties: Property[] = [
  {
    id: "rangeview",
    name: "Range View",
    subtitle: "Located within Adare Manor estate, offering front-row proximity to Ryder Cup 2027",
    bedrooms: 6,
    description: "Located within Adare Manor estate, 'Range View' offers front-row proximity to Ryder Cup 2027.",
    fullDescription: "Range View is a stately luxurious residence nestled within the private and gated enclave of Adare Manor Resort, just 300 yards from the Ryder Cup 2027 driving range and a five-minute walk to the first tee box. Offering over 7,000ft²/650m² of refined living space across three expansive floors, this home delivers unrivalled proximity to the event alongside world-class interiors, making it ideal for corporate hospitality or discerning private guests.",
    price: "Enquire Now",
    images: [
      "/images/houses/house 2/house-2-main-original.webp",
      "/images/houses/house 2/house-2-stairway-1.webp",
      "/images/houses/house 2/house-2-living-room-3.webp",
      "/images/houses/house 2/house-2-living-room-2.webp",
      "/images/houses/house 2/house-2-living-room-1.webp",
      "/images/houses/house 2/house-2-living-room-4.webp",
      "/images/houses/house 2/house-2-living-room.webp",
      "/images/houses/house 2/house-2-dining.webp",
      "/images/houses/house 2/house-2-cinema-room.webp",
      "/images/houses/house 2/house-2-master-bedroom.webp",
      "/images/houses/house 2/house-2-master-bedroom-2.webp",
      "/images/houses/house 2/house-2-master-changing-room.webp",
      "/images/houses/house 2/house-2-master-bathroom.webp",
      "/images/houses/house 2/house-2-bedroom-2.webp",
      "/images/houses/house 2/house-2-bedroom-1.webp",
      "/images/houses/house 2/house-2-bathroom-1.webp",
      "/images/houses/house 2/house-2-bathroom-2.webp",
      "/images/houses/house 2/house-2-bathroom-3.webp",
      "/images/houses/house 2/house-2-games-room.webp",
      "/images/houses/house 2/house-2-study.webp",
      "/images/houses/house 2/house-2-sauna.webp",
      "/images/houses/house 2/house-2-gym.webp",
      "/images/houses/house 2/house-2-outdoor-seating.webp"
    ],
    thumbnail: "/images/houses/house 2/house-2-main-original.webp",
    features: [
      "Grand chandelier-lit entrance hall with open fireplace",
      "5/6 double ensuite bedrooms including a 95m² master suite with jacuzzi bath",
      "Formal sitting room flowing into a dining room for up to 18 guests",
      "Expansive gourmet kitchen with walk-in cold room and professional-grade appliances",
      "Large outdoor areas including 3230ft²/300m² of landscaped gardens and 2690ft²/250m² of Liscannor paving, perfect for marquee events (up to 100 guests)"
    ],
    amenities: [
      "Chef cooked breakfast",
      "Private cinema room with retractable projector, stereo system, and automatic blinds",
      "Fully equipped lounge bar with draught taps, keg room, pool table and classic 'Pac-man' arcade game.",
      "Fitness suite including gym, sauna, and shower facilities",
      "Executive home office",
      "High-speed WiFi and satellite TV",
      "Daily serviced fresh towels and linens",
      "Daily housekeeping",
      "BBQ and smoker",
      "Secure private parking"
    ],
    location: {
      lat: 52.55891014565409,
      lng: -8.78703798127682
    },
    walkingDistance: "Just a short stroll to Ryder Cup practice range and golf course",
    videoUrl: "/videos/rangeview.mp4"
  },
  {
    id: "the-captains",
    name: "The Captains",
    subtitle: "Within Adare Manor's secure walls, 'Captains House' places you at the heart of Ryder Cup action in complete privacy.",
    bedrooms: 6,
    description: "Within Adare Manor's secure walls, 'Captains House' places you at the heart of Ryder Cup action in complete privacy.",
    fullDescription: "Situated within the exclusive and secure walls of the Adare Manor resort, 'The Captains' home offers an extraordinary opportunity to stay at the epicentre of the Ryder Cup 2027. This six-bedroom estate spanning over 8500ft²/790m² is not just near the event. It is almost part of it.\n\nWith the practice range just over the hedge, and a 5 minute stroll from the 1st tee box, this residence is ideal for the discerning client, sponsors, media, and corporate clients seeking to be immersed in the heart of the Ryder Cup action, without compromising on space, luxury, or privacy.",
    price: "POA",
    images: [
      "/images/houses/house 3/house-3-main-original.webp",
      "/images/houses/house 3/house-3-entry-hall.webp",
      "/images/houses/house 3/house-3-kitchen.webp",
      "/images/houses/house 3/house-3-kitchen-2.webp",
      "/images/houses/house 3/house-3-kitchen-3.webp",
      "/images/houses/house 3/house-3-living-room-1.webp",
      "/images/houses/house 3/house-3-living-room-2.webp",
      "/images/houses/house 3/house-3-living-room-3.webp",
      "/images/houses/house 3/house-3-living-room-4.webp",
      "/images/houses/house 3/house-3-living-room-5.webp",
      "/images/houses/house 3/house-3-living-room-6.webp",
      "/images/houses/house 3/house-3-living-room-7.webp",
      "/images/houses/house 3/house-3-stairs.webp",
      "/images/houses/house 3/house-3-chandelier.webp",
      "/images/houses/house 3/house-3-reading-room.webp",
      "/images/houses/house 3/house-3-bedroom-1.webp",
      "/images/houses/house 3/house-3-bedroom-2.webp",
      "/images/houses/house 3/house-3-bedroom-3.webp",
      "/images/houses/house 3/house-3-master-bath-1.webp",
      "/images/houses/house 3/house-3-master-bath-2.webp",
      "/images/houses/house 3/house-3-master-bath-3.webp",
      "/images/houses/house 3/house-3-bedroom-4.webp",
      "/images/houses/house 3/house-3-bedroom-6.webp",
      "/images/houses/house 3/house-3-bedroom-7.webp",
      "/images/houses/house 3/house-3-bedroom-9.webp",
      "/images/houses/house 3/house-3-bedroom-11.webp",
      "/images/houses/house 3/house-3-exterior.webp"
    ],
    thumbnail: "/images/houses/house 3/house-3-main-original.webp",
    features: [
      "Six luxury ensuite bedrooms, including an exquisite master suite with jacuzzi bath, open fireplace, and walk-in wardrobe",
      "Grand entrance hall with crystal chandelier and a grand piano, perfect for welcoming guests or evening entertainment.",
      "Three elegant reception areas: a large drawing room and two sitting rooms with ample tranquil seating",
      "Open-plan kitchen and living space with high-end finishes, adjoining a formal dining room for 10 people",
      "Separate dining area capable of hosting 50+ guests."
    ],
    amenities: [
      "Chef cooked breakfast",
      "Daily serviced fresh towels and linens",
      "Daily housekeeping",
      "High-speed Wi-Fi and satellite TV",
      "Games room with pool table, table tennis, and dart board; convertible into a fitness studio with treadmill (if required)",
      "Secure private parking"
    ],
    location: {
      lat: 52.55909971573407,
      lng: -8.786145768660083
    },
    walkingDistance: "Just a short stroll to Ryder Cup practice range and golf course",
    videoUrl: "/videos/thecaptains.mp4"
  },
  {
    id: "putters-way",
    name: "Putters Way",
    subtitle: "At the very centre of Ryder Cup 2027, Golf Village, Adare Manor",
    bedrooms: 2,
    description: "Premium residence within the private Golf Village of Adare Manor, metres from the Carriage House and a short stroll to the 1st tee.",
    fullDescription: "'Putters Way' is a rare and exclusive opportunity to stay at the very heart of the Ryder Cup action 2027. Situated just metres from where the U.S and European team will warm up on the practice range and putting green and a one minute stroll to the 1st tee, it just doesn't get any closer than this!\n\nLocated in the prestigious private Golf Village, this deluxe residence places guests at the centre of the tournament atmosphere while still offering elegant privacy, luxury finishes, and complete immersion in the experience.\n\nThis is not just a place to stay. It is a chance to live the event.",
    price: "POA",
    images: [
      "/images/houses/house 4/adare-house-4-original.webp",
      "/images/houses/house 4/house-4-dining.webp",
      "/images/houses/house 4/house-4-dining-2.webp",
      "/images/houses/house 4/house-4-living.webp",
      "/images/houses/house 4/house-4-living-2.webp",
      "/images/houses/house 4/house-4-bedroom.webp",
      "/images/houses/house 4/house-4-bathroom.webp",
      "/images/houses/house 4/house-4-exterior.webp",
      "/images/houses/house 4/house-4-rolex.webp"
    ],
    thumbnail: "/images/houses/house 4/adare-house-4-original.webp",
    features: [
      "Modern, bright open-plan kitchen and dining room, perfect for entertaining or relaxing after a day on the course",
      "Spacious, beautifully appointed sitting room with premium seating and contemporary comforts",
      "Tastefully designed interiors that combine modern luxury with Irish elegance",
      "Two double ensuite bedrooms, each with two double beds, ideal for small groups or executive stays"
    ],
    amenities: [
      "Located at the centre of the Adare Manor resort",
      "High-speed internet access",
      "Premium seating and entertainment areas",
      "Daily housekeeping"
    ],
    location: {
      lat: 52.56182292270544,
      lng: -8.780515540696719
    },
    walkingDistance: "1 minute stroll to the 1st tee box",
    videoUrl: "/videos/puttersway.mp4"
  },
  {
    id: "the-first-tee",
    name: "The First Tee",
    subtitle: "Closest residence to the Ryder Cup course, just 150 yards from the practice range and 1st tee.",
    bedrooms: 5,
    bedroomsLabel: "5-6",
    description: "The closest residence to the Ryder Cup action, 150 yards from the practice range and 1st tee.",
    fullDescription: "Nestled within the prestigious grounds of Adare Manor, just steps from the world-renowned championship course and practice facilities, The First Tee offers a truly unrivalled location for golf enthusiasts and discerning guests alike.\n\nPositioned closer to the Ryder Cup action than any other residence in The Demesne, this exceptional home provides a rare opportunity to stay quite literally at the starting point of one of the world's most celebrated golfing experiences.\n\nDesigned with elegance and comfort in mind, the property blends timeless architecture with refined contemporary interiors. Expansive living spaces filled with natural light create a seamless flow throughout, offering both relaxed and formal settings for entertaining, unwinding, or hosting in style.\n\nThe residence features 5-6 beautifully appointed bedrooms, including four en-suite, alongside luxurious bathrooms designed for comfort and relaxation after a day on the course.\n\nThe First Tee is more than a residence. It holds a privileged position at the very heart of Adare Manor.",
    price: "POA",
    images: [
      "/images/houses/house 7/house-7-exterior-3.webp",
      "/images/houses/house 7/house-7-hallway-1.webp",
      "/images/houses/house 7/house-7-hallway-2.webp",
      "/images/houses/house 7/house-7-kitchen-1.webp",
      "/images/houses/house 7/house-7-kitchen-2.webp",
      "/images/houses/house 7/house-7-dining-1.webp",
      "/images/houses/house 7/house-7-lounge-1.webp",
      "/images/houses/house 7/house-7-sitting-room-1.webp",
      "/images/houses/house 7/house-7-downstairs-bathroom-1.webp",
      "/images/houses/house 7/house-7-master-bedroom-1.webp",
      "/images/houses/house 7/house-7-master-bathroom-1.webp",
      "/images/houses/house 7/house-7-master-bathroom-2.webp",
      "/images/houses/house 7/house-7-second-bedroom-1.webp",
      "/images/houses/house 7/house-7-fourth-bedroom-2.webp",
      "/images/houses/house 7/house-7-fourth-bedroom-1.webp",
      "/images/houses/house 7/house-7-fourth-bedroombath-1.webp",
      "/images/houses/house 7/house-7-fourth-bedroombath-2.webp",
      "/images/houses/house 7/house-7-fourth-bedroombath-3.webp",
      "/images/houses/house 7/house-7-second-bedroom-2.webp",
      "/images/houses/house 7/house-7-third-bedroom-1.webp",
      "/images/houses/house 7/house-7-third-bedroom-2.webp",
      "/images/houses/house 7/house-7-fifth-bedroom-1.webp",
      "/images/houses/house 7/house-7-snooker-1.webp",
      "/images/houses/house 7/house-7-exterior-1.webp"
    ],
    thumbnail: "/images/houses/house 7/house-7-exterior-3.webp",
    features: [
      "Located on the grounds of Adare Manor",
      "Closest residence to the course and practice range (150 yards)",
      "5-6 spacious bedrooms, including 4 en-suite",
      "Multiple reception rooms and lounges",
      "Open-plan kitchen and dining areas",
      "Formal dining room",
      "Luxury bathroom with jacuzzi bath",
      "High-quality finishes throughout",
      "Private driveway with parking",
      "Landscaped grounds"
    ],
    amenities: [
      "Chef cooked breakfast",
      "Fully equipped kitchen",
      "High-speed Wi-Fi",
      "Multiple living areas",
      "Luxury bathrooms with jacuzzi bath and walk-in showers",
      "Large outdoor patio for evening BBQs",
      "Home office space",
      "Laundry facilities",
      "Fresh linens and towels",
      "Secure private setting"
    ],
    location: {
      lat: 52.56157892845145,
      lng: -8.787714781150669
    },
    walkingDistance: "150 yards to practice range and 1st tee",
    videoUrl: "/videos/thefirsttee.mp4",
    eircode: "V94 D40K"
  },
  {
    id: "the-fairways",
    name: "The Fairways",
    subtitle: "Located within the gates of Adare Manor, just steps from the 2027 Ryder Cup venue.",
    bedrooms: 6,
    description: "Within Adare Manor's gates, on Ireland's most prestigious estate and steps from Ryder Cup 2027.",
    fullDescription: "The Fairways is a contemporary luxury residence located within the Demesne, a gated secure luxury neighbourhood on the grounds of Adare Manor, offering unrivalled proximity to Ryder Cup 2027. This expansive 6-bedroom home spans over 4,840 ft² of immaculately designed interiors, combining privacy, grandeur, and modern elegance.\n\nPositioned just a short walk from the beautifully appointed Adare Manor Ryder Cup venue and 1st tee, this is one of the closest private properties at the heart of the tournament, making it an ideal choice for sponsors, media, or executive guests.",
    price: "POA",
    images: [
      "/images/houses/house 1/house-1-main.webp",
      "/images/houses/house 1/house-1-hall.webp",
      "/images/houses/house 1/house-1-kitchen.webp",
      "/images/houses/house 1/house-1-kitchen-2.webp",
      "/images/houses/house 1/house-1-living-room.webp",
      "/images/houses/house 1/house-1-living-room-2.webp",
      "/images/houses/house 1/house-1-living-room-3.webp",
      "/images/houses/house 1/house-1-living-room-4.webp",
      "/images/houses/house 1/house-1-bedroom-1.webp",
      "/images/houses/house 1/house-1-bedroom-2.webp",
      "/images/houses/house 1/house-1-bedroom-3.webp",
      "/images/houses/house 1/house-1-bedroom-4.webp",
      "/images/houses/house 1/house-1-bedroom-5.webp",
      "/images/houses/house 1/house-1-bedroom-6.webp",
      "/images/houses/house 1/house-1-gym.webp",
      "/images/houses/house 1/house-1-exterior-3.webp",
      "/images/houses/house 1/house-1-exterior-4.webp",
      "/images/houses/house 1/house-1-exterior-1.webp",
      "/images/houses/house 1/house-1-exterior-2.webp"
    ],
    thumbnail: "/images/houses/house 1/house-1-main-optimized.webp",
    features: [
      "Grand entrance foyer with natural light and architectural presence",
      "Exquisite master suite (860ft²/80m²) with lounge, dual walk-in wardrobes, jacuzzi bath, double vanity, and dual showers",
      "Five additional double bedrooms",
      "Two spacious formal lounges with TV and large seating areas",
      "Upper-level private retreat with lounge/TV space, shower, bath, and a fully fitted office",
      "Large open-plan kitchen with premium appliances, dual ovens, gas stove, under-counter fridges, and a full utility room",
      "Elegant dining area adjoining a conservatory that opens to the garden"
    ],
    amenities: [
      "Chef cooked breakfast",
      "Fitness Suite: a fully equipped private gym above the garage",
      "Firepit Terrace & Gazebo: covered outdoor living area with built-in fireplace, lounge seating for 10 to 12, and Kamado Joe BBQ",
      "Secluded rear garden with patio, dining area, and cushioned seating for al fresco entertaining",
      "High-speed WiFi & Satellite TV",
      "Fresh linen and towel service (daily)",
      "Daily housekeeping",
      "Secure private parking"
    ],
    location: {
      lat: 52.561116990572174,
      lng: -8.788021971381418
    },
    walkingDistance: "Just a short stroll to Ryder Cup practice range and golf course",
    videoUrl: "/videos/thefairways.mp4"
  },
  {
    id: "cragleigh-house",
    name: "Cragleigh House",
    subtitle: "Located just 15 drive minutes from Adare Manor with convenient access to Limerick, the M20 motorway, and Shannon Airport. Cragleigh House offers privacy, space, and effortless access to Ryder Cup 2027",
    bedrooms: 5,
    description: "Just 15 minutes from Adare Manor with easy access to Limerick, Shannon Airport, and Ryder Cup 2027.",
    fullDescription: "Cragleigh House is a magnificent manor-style residence located just under 15 minutes from the Ryder Cup 2027 venue at Adare Manor. Privately positioned yet within easy reach of the action, this elegant estate combines traditional charm with modern luxury across extensive gardens and refined interiors.\n\nOffering five spacious double bedrooms, multiple reception rooms, and formal dining areas, Cragleigh House is ideal for the discerning client, sponsors, media teams, or corporate hosts seeking a prestigious base during Ryder Cup week.",
    price: "POA",
    images: [
      "/images/houses/house 5/cragleigh-house-main-optimized.webp",
      "/images/houses/house 5/cragleighhouse-main.webp",
      "/images/houses/house 5/cragleigh-interior.webp",
      "/images/houses/house 5/cragleigh-dining.webp",
      "/images/houses/house 5/cragleigh-house-living-room-2.webp",
      "/images/houses/house 5/cragleigh-house-living-room-1.webp",
      "/images/houses/house 5/cragleigh-master-bedroom.webp",
      "/images/houses/house 5/cragleigh-master-ensuite.webp",
      "/images/houses/house 5/cragleigh-master-ensuite-2.webp",
      "/images/houses/house 5/cragleigh-bedroom-1.webp",
      "/images/houses/house 5/cragleigh-bedroom-2.webp",
      "/images/houses/house 5/cragleigh-bedroom-3.webp",
      "/images/houses/house 5/cragleigh-patio.webp"
    ],
    thumbnail: "/images/houses/house 5/cragleigh-house-main-optimized.webp",
    features: [
      "Five double bedrooms: 1 master ensuite, 2 bedrooms sharing a large ensuite with bathtub, and 2 bedrooms sharing another ensuite",
      "Two large elegant sitting rooms with ample space for entertaining",
      "Two formal dining rooms suitable for private dining or group hosting",
      "Large kitchen ideal for pre-dinner drinks",
      "Extensive garden space suitable for outdoor receptions and large gatherings"
    ],
    amenities: [
      "Chef cooked breakfast",
      "Private gated and secure manor residence",
      "Beautifully landscaped outdoor areas",
      "Flexible living and dining spaces for formal or relaxed hosting",
      "Proximity to Limerick City, the M20 motorway, and Shannon Airport",
      "Daily housekeeping"
    ],
    location: {
      lat: 52.60043120307769,
      lng: -8.633705271352245
    },
    walkingDistance: "15 minutes drive",
    videoUrl: "/videos/cragleighhouse.mp4"
  },
  {
    id: "darrira-house",
    name: "Darrira House",
    subtitle: "Just ten minutes from Adare Manor, an elegant private retreat in Croagh, County Limerick.",
    bedrooms: 5,
    description: "An elegant and private countryside retreat ten minutes from Adare Manor, ideal for discreet stays with generous indoor and outdoor spaces.",
    fullDescription: "Nestled just ten minutes from the Ryder Cup 2027 venue at Adare Manor, Darrira House offers an elegant and private retreat in the peaceful countryside of Croagh, County Limerick. With its graceful proportions, beautifully furnished interiors, and expansive outdoor spaces, this residence is ideally suited for discerning guests seeking comfort, convenience, and discretion.\n\nBoasting four double bedrooms and one single bedroom, including two en-suites with one lovingly adapted to accommodate guests with specific accessibility needs, the property is perfect for golfers, corporate groups, or families looking to stay close to the action without compromising on tranquility.\n\nThe heart of the home is a bright, open-plan kitchen and dining area that opens into a sun-filled conservatory, ideal for casual breakfasts or evening gatherings. Elegant living spaces and charming garden views complete the warm and inviting atmosphere.\n\nThis deluxe property includes thoughtful accessibility features for guests with special needs. The property has ramp access through the front door. Double doors from the hallway open into the sitting room, which flows into a spacious open-plan kitchen and onwards to a bright conservatory, which allows smooth wheelchair access throughout the downstairs level.\n\nA generously proportioned downstairs double bedroom features an electric profile double bed and a 44-inch wall-mounted television. Attached is a separate wet room equipped with a shower chair, shower sling, and (if required) a shower bed. An overhead ceiling hoist enables safe and dignified transfers from wheelchair to bed. A separate WC is also located nearby.",
    price: "POA",
    images: [
      "/images/houses/house 6/house-6-exterior-1.webp",
      "/images/houses/house 6/house-6-kitchen-2.webp",
      "/images/houses/house 6/house-6-kitchen-1.webp",
      "/images/houses/house 6/house-6-kitchen-3.webp",
      "/images/houses/house 6/house-6-sunroom.webp",
      "/images/houses/house 6/house-6-livingroom.webp",
      "/images/houses/house 6/house-6-hallway.webp",
      "/images/houses/house 6/house-6-master-bedroom-2.webp",
      "/images/houses/house 6/house-6-master-bedroom-1.webp",
      "/images/houses/house 6/house-6-master-ensuite-1.webp",
      "/images/houses/house 6/house-6-master-ensuite-2.webp",
      "/images/houses/house 6/house-6-bedroom-2.webp",
      "/images/houses/house 6/house-6-bedroom-3.webp",
      "/images/houses/house 6/house-6-main-bathroom-1.webp",
      "/images/houses/house 6/house-6-jacuzzi.webp",
      "/images/houses/house 6/house-6-shower-room.webp"
    ],
    thumbnail: "/images/houses/house 6/house-6-exterior-1.webp",
    features: [
      "4 double bedrooms (one ensuite)",
      "Downstairs double bedroom adapted for special needs",
      "1 single bedroom",
      "Stylish kitchen-dining space opening to conservatory",
      "Elegant interiors and abundant natural light",
      "Quiet village location just 10 minutes from Adare Manor"
    ],
    amenities: [
      "Home cooked breakfast",
      "Daily housekeeping",
      "High-speed WiFi",
      "Satellite TV",
      "Secure private parking"
    ],
    location: {
      lat: 52.551248755996916,
      lng: -8.874792660717345
    },
    walkingDistance: "10 minutes drive",
    videoUrl: "/videos/darrirahouse.mp4"
  },
  {
    id: "croagh-house",
    name: "Croagh House",
    subtitle: "Privacy and direct Ryder Cup access (10 minutes from Adare Manor, 2 minutes from the official Park & Ride).",
    bedrooms: 4,
    bedroomsLabel: "4-5",
    description:
      "Privacy and direct Ryder Cup access (10 minutes from Adare Manor, 2 minutes from the official Park & Ride).",
    fullDescription:
      "Positioned behind secure gates and accessed via a private driveway, Croagh House offers a refined base just 10 minutes from Adare Manor and 2 minutes from the official park & ride at Smithfield, Croagh, ensuring direct access to the event while maintaining complete privacy. This is not a generic rental property. It is a private modern, show-home standard residence curated for hosting, discretion, and seamless access during the Ryder Cup.\n\nIts proximity to Parkview House also creates a rare opportunity for larger corporate groups to secure adjacent accommodation, combining capacity with convenience.\n\nThe residence comprises 4-5 bedrooms (two en-suite), with the flexibility to accommodate an additional guest suite on the top floor if required. The master suite is designed as a private retreat, featuring a walk-in wardrobe and a spa-quality bathroom with a freestanding jacuzzi bath, walk-in shower, and double vanity.\n\nA ground-floor bathroom with shower adds further practicality and accessibility, ensuring comfort and ease of use for all guests.\n\nInternally, the home is presented to an exceptional standard throughout. A grand entrance hallway with statement chandelier leads into multiple reception spaces, including a main living area with electric reclining seating and a separate media lounge, allowing for both formal hosting and relaxed downtime.\n\nThe open-plan kitchen and dining area is designed for entertaining, featuring a bespoke in-frame solid kitchen finished with premium appliances including a Rangemaster cooker, smart American-style fridge/freezer, quartz worktops, and an integrated wine fridge, with direct access to a private landscaped patio and garden.\n\nEvery element of the residence has been considered for comfort, flow, and discretion, making it ideally suited to corporate groups, sponsors, and discerning guests seeking a controlled, high-quality environment during the Ryder Cup.",
    price: "POA",
    images: [
      "/images/houses/croaghhouse/exterior/croaghhouse-exterior-2.webp",
      "/images/houses/croaghhouse/kitchen/croaghhouse-kitchen-2.webp",
      "/images/houses/croaghhouse/kitchen/croaghhouse-kitchen-1.webp",
      "/images/houses/croaghhouse/sittingroom/croaghhouse-sittingroom-1.webp",
      "/images/houses/croaghhouse/sittingroom/croaghhouse-sittingroom-2.webp",
      "/images/houses/croaghhouse/stairs/croaghhouse-stairs-1.webp",
      "/images/houses/croaghhouse/landing/croaghhouse-landing-1.webp",
      "/images/houses/croaghhouse/masterbedroom/croaghhouse-masterbedroom-1.webp",
      "/images/houses/croaghhouse/masterbedroom/croaghhouse-masterbedroom-2.webp",
      "/images/houses/croaghhouse/masterbedroom/croaghhouse-masterbedroom-closet-1.webp",
      "/images/houses/croaghhouse/masterbedroom/croaghhouse-masterbedroom-bathroom-2.webp",
      "/images/houses/croaghhouse/masterbedroom/croaghhouse-masterbedroom-bathroom-1.webp",
      "/images/houses/croaghhouse/masterbedroom/croaghhouse-masterbedroom-bathroom-3.webp",
      "/images/houses/croaghhouse/bedroom 2/croaghhouse-bedroom2-1.webp",
      "/images/houses/croaghhouse/bedroom 2/croaghhouse-bedroom2-2.webp",
      "/images/houses/croaghhouse/bedroom 3/croaghhouse-bedroom3.webp",
      "/images/houses/croaghhouse/bedroom 4/croaghhouse-bedroom4.webp",
      "/images/houses/croaghhouse/exterior/croaghhouse-exterior-1.webp",
      "/images/houses/croaghhouse/bathroom/croaghhouse-bathroom-1.webp",
      "/images/houses/croaghhouse/utilitiyroom/croaghhouse-utilitybathroom-1.webp",
      "/images/houses/croaghhouse/utilitiyroom/croaghhouse-utilitybathroom-2.webp",
      "/images/houses/croaghhouse/utilitiyroom/croaghhouse-utilitybathroom-3.webp"
    ],
    thumbnail: "/images/houses/croaghhouse/exterior/croaghhouse-exterior-2.webp",
    features: [
      "4-5 bedrooms; 2 en-suite bedrooms",
      "Additional top-floor bedroom option",
      "Master suite with walk-in wardrobe; spa-style bathroom with jacuzzi, walk-in shower, and double vanity",
      "Large main bathroom and shower",
      "Ground-floor bathroom with shower",
      "Secure gated property with private driveway",
      "12 minutes to Adare Manor; 4 minutes to official Park & Ride (Smithfield)",
      "Separate media / lounge room"
    ],
    amenities: [
      "High-speed Wi-Fi throughout",
      "Smart TVs and entertainment systems",
      "Fully equipped modern kitchen",
      "Dedicated laundry facilities",
      "Premium linens and towels",
      "Multiple contemporary bathrooms",
      "Ample private parking within secure grounds",
      "Outdoor dining and seating areas",
      "Climate-controlled interior",
      "Available on request: private chauffeur and executive transport; in-residence chef and bespoke dining; pre-arrival provisioning and stocking; daily housekeeping and laundry; tailored hospitality and entertainment"
    ],
    location: {
      lat: 52.54885726209432,
      lng: -8.880012509768715
    },
    walkingDistance: "Approximately 10 minutes' drive to Adare Manor; about 2 minutes to the Croagh Park & Ride at Smithfield.",
    matterportUrl: "https://my.matterport.com/show/?m=geo8qL777Pz"
  },
  {
    id: "parkview-house",
    name: "Parkview House",
    subtitle:
      "High-capacity private residence for up to 12 guests (10 minutes from Adare Manor, 2 minutes from the official Park & Ride).",
    bedrooms: 6,
    bedroomsLabel: "6-7",
    description:
      "High-capacity private residence for up to 12 guests (10 minutes from Adare Manor, 2 minutes from the official Park & Ride).",
    fullDescription:
      "Parkview House is a substantial private residence positioned just 10 minutes from Adare Manor and only 2 minutes from the official Park & Ride at Smithfield, Croagh, offering one of the most practical and accessible bases available for Ryder Cup 2027.\n\nSet on private grounds with a generous driveway and a quiet, residential setting, the property is ideally configured for group hosting at scale, accommodating up to 12 guests across a flexible 6-7 bedroom layout. Its proximity to Croagh House also creates a rare opportunity for larger corporate groups to secure adjacent accommodation, combining capacity with convenience.\n\nInside, the home is designed around comfort, flow, and usability, with multiple living spaces that allow guests to gather, host, or unwind with ease. A bright, open-plan kitchen and dining area forms the centre of the home, complemented by a sunroom filled with natural light and two separate reception rooms, each with its own open fireplace, creating a warm and relaxed atmosphere throughout.\n\nThe bedroom configuration is particularly well suited to corporate and group stays, offering a mix of ensuite and shared arrangements that maximise both privacy and capacity. The master bedroom includes an ensuite bathroom, while a second ensuite bedroom and additional shared bathrooms support the remaining rooms. A Jacuzzi bath in the main bathroom provides a welcome space to relax after a day on the course.\n\nThis is a high-capacity private residence delivering space, flexibility, and one of the most efficient access points to the Ryder Cup.",
    price: "POA",
    images: [
      "/images/houses/parkviewhouse/exterior/parkview-exterior-1.webp",
      "/images/houses/parkviewhouse/kitchen/parkview-kitchen-1.webp",
      "/images/houses/parkviewhouse/kitchen/parkview-kitchen-2.webp",
      "/images/houses/parkviewhouse/conservatory/parkview-conservatory-1.webp",
      "/images/houses/parkviewhouse/sitting-room/parkview-sitting-room-1.webp",
      "/images/houses/parkviewhouse/sitting-room/parkview-sitting-room-2.webp",
      "/images/houses/parkviewhouse/landing/parkview-landing-1.webp",
      "/images/houses/parkviewhouse/master-bedroom/parkview-master-bedroom-1.webp",
      "/images/houses/parkviewhouse/master-bedroom/parkview-master-bedroom-2.webp",
      "/images/houses/parkviewhouse/master-bedroom/parkview-master-bedroom-3.webp",
      "/images/houses/parkviewhouse/bedroom 2/parkview-bedroom2-1.webp",
      "/images/houses/parkviewhouse/bedroom 2/parkview-bedroom2-2.webp",
      "/images/houses/parkviewhouse/bedroom 2/parkview-bedroom2-3.webp",
      "/images/houses/parkviewhouse/bedroom 3/parkview-bedroom3-1.webp",
      "/images/houses/parkviewhouse/bedroom 4/parkview-bedroom4-1.webp",
      "/images/houses/parkviewhouse/bedroom 5/parkview-bedroom5-1.webp",
      "/images/houses/parkviewhouse/bedroom 5/parkview-bedroom6-1.webp",
      "/images/houses/parkviewhouse/utility-room/parkview-utility-room-1.webp"
    ],
    thumbnail: "/images/houses/parkviewhouse/exterior/parkview-exterior-1.webp",
    features: [
      "Accommodates up to 12 guests",
      "6-7 bedroom configuration",
      "Master ensuite bedroom, 2 doubles, one twin, triple and a single room",
      "Main bathroom with Jacuzzi bath",
      "Two reception rooms with open fireplaces",
      "Bright sunroom",
      "Large open-plan kitchen and dining area",
      "Private driveway with ample parking"
    ],
    amenities: [
      "Fully equipped kitchen",
      "High-speed Wi-Fi throughout",
      "Smart TVs and entertainment systems",
      "Dedicated laundry facilities",
      "Premium linens and towels",
      "Multiple bathrooms",
      "Ample private parking within secure grounds",
      "Available on request: private chauffeur and executive transport; in-residence chef and bespoke dining; pre-arrival provisioning and stocking; daily housekeeping and laundry; tailored hospitality and entertainment"
    ],
    location: {
      lat: 52.54854779330623,
      lng: -8.880395148400085
    },
    walkingDistance: "Approximately 10 minutes' drive to Adare Manor; about 2 minutes to the Croagh Park & Ride at Smithfield.",
    eircode: "V94 K3EX",
    matterportUrl: "https://my.matterport.com/show/?m=BxbEQdSmPXo"
  },
  {
    id: "dunes-lodge",
    name: "Dunes Lodge",
    subtitle: "Architect-designed A-rated home in Lahinch with sea and golf course views, ideal for Ryder Cup 2027 stays.",
    bedrooms: 4,
    description: "Architect-designed A-rated home in Lahinch with sea and golf course views, ideal for Ryder Cup 2027 stays.",
    fullDescription: "Located in the vibrant surf and golf town of Lahinch along the scenic Wild Atlantic Way, Dunes Lodge is a recently renovated, architect-designed A-rated energy-efficient home. It provides an idyllic retreat for golfers, surfers, families, and groups attending major events like the Ryder Cup 2027. Overlooking the 18th green of the Lahinch Old Course, this home boasts exceptional sea and golf course views and is just over one hour drive or a short helicopter ride from Adare Manor.",
    price: "POA",
    images: [
      "/images/houses/house 9/house-9-kitchen-3.webp",
      "/images/houses/house 9/house-9-kitchen-5.webp",
      "/images/houses/house 9/house-9-kitchen-living.webp",
      "/images/houses/house 9/house-9-living-room-1.webp",
      "/images/houses/house 9/house-9-living-room-2.webp",
      "/images/houses/house 9/house-9-living-room-4.webp",
      "/images/houses/house 9/house-9-kitchen-4.webp",
      "/images/houses/house 9/house-9-primary-bedroom-1.webp",
      "/images/houses/house 9/house-9-primary-bedroom-2.webp",
      "/images/houses/house 9/house-9-bathroom-2.webp",
      "/images/houses/house 9/house-9-bedroom-2.webp",
      "/images/houses/house 9/house-9-bedroom-3.webp",
      "/images/houses/house 9/house-9-bathroom-1.webp",
      "/images/houses/house 9/house-9-stairs.webp",
      "/images/houses/house 9/house-9-stairs-under.webp"
    ],
    thumbnail: "/images/houses/house 9/house-9-kitchen-3.webp",
    features: [
      "Open-plan kitchen, dining and living area with wood-burning stove",
      "Upstairs lounge with bar and panoramic golf and ocean views",
      "3 bedrooms with king beds, 1 bedroom with 4 single beds",
      "3 bathrooms with wet room rain showers",
      "Fully equipped utility room",
      "Architect-designed layout, ideal for social gatherings",
      "High-speed Wi-Fi, streaming services, and dedicated workspace",
      "Garage for golf clubs",
      "Outdoor BBQ and entertainment area",
      "Sauna, ice bath, and outdoor shower"
    ],
    amenities: [
      "A-rated energy-efficient home",
      "Short walk to Lahinch village, beach, and surf",
      "Hugo’s Bakery, cafés, restaurants, and traditional Irish pubs nearby",
      "5-minute drive to Cliffs of Moher",
      "Close to ferry for Aran Islands, The Burren, Loop Head, Doolin",
      "Lahinch Leisure Centre nearby",
      "Helicopter landing possible on Lahinch Golf Course (100m away)",
      "Welcome hamper provided on arrival",
      "Optional transport services (airport pick-up, transfers to Adare Manor)",
      "Laundry and catering available on request",
      "One-week rental only (week before, during, and after Ryder Cup available separately)",
      "Price on application"
    ],
    location: {
      lat: 52.9346,
      lng: -9.3432
    },
    walkingDistance: "Just over one hour drive to Adare Manor"
  },
  {
    id: "hillview-house",
    name: "Hillview House",
    subtitle:
      "Five-star modern residence for Ryder Cup 2027 — up to 14 guests, approximately 45 minutes from Adare Manor; about 20 minutes from Limerick Junction with direct trains to Adare.",
    bedrooms: 6,
    description:
      "A beautifully finished five-star home near Ballylanders: six double bedrooms, generous entertaining space, and secure gated privacy — ideal for Ryder Cup 2027.",
    fullDescription:
      "Hillview House is a beautifully finished five-star modern residence, offering an exceptional private retreat for groups attending the Ryder Cup 2027. Located just a 45-minute drive from Adare Manor, this property combines contemporary design, generous living space, and a high-end finish throughout. It is about 20 minutes from Limerick Junction, with direct trains to Adare for flexible travel to the village and tournament.\n\nDesigned with both comfort and entertaining in mind, the home centres around a stunning open-plan kitchen, dining, and living area that flows seamlessly onto a private patio, ideal for relaxed evenings or hosting guests.\n\nThe property accommodates up to 14 guests sharing (or 6 individually) across six well-appointed double bedrooms, including a luxurious master suite complete with walk-in wardrobe. With four bathrooms and multiple spacious living areas, Hillview House delivers both privacy and flexibility for executive groups.\n\nSet behind secure electric gates and positioned alongside a second family residence, Hillview House also offers a unique opportunity for larger groups to secure both homes, creating an exclusive multi-residence solution in a private setting.",
    price: "POA",
    images: [
      "/images/houses/house 13/house-13-exterior-4.webp",
      "/images/houses/house 13/house-13-exterior-1.webp",
      "/images/houses/house 13/house-13-kitchen-1.webp",
      "/images/houses/house 13/house-13-kitchen-2.webp",
      "/images/houses/house 13/house-13-kitchen-3.webp",
      "/images/houses/house 13/house-13-kitchen-4.webp",
      "/images/houses/house 13/house-13-sitting-1.webp",
      "/images/houses/house 13/house-13-sitting-2.webp",
      "/images/houses/house 13/house-13-bathroom-1.webp",
      "/images/houses/house 13/house-13-bathroom-2.webp",
      "/images/houses/house 13/house-13-master-1.webp",
      "/images/houses/house 13/house-13-master-2.webp",
      "/images/houses/house 13/house-13-master-3.webp",
      "/images/houses/house 13/house-13-bedroom-2-1.webp",
      "/images/houses/house 13/house-13-bedroom-2-2.webp",
      "/images/houses/house 13/house-13-bedroom-3-1.webp",
      "/images/houses/house 13/house-13-bedroom-4-1.webp",
      "/images/houses/house 13/house-13-bedroom-4-2.webp",
      "/images/houses/house 13/house-13-attic-1.webp",
      "/images/houses/house 13/house-13-attic-2.webp",
      "/images/houses/house 13/house-13-attic-3.webp",
      "/images/houses/house 13/house-13-exterior-38.webp",
      "/images/houses/house 13/house-13-exterior-25.webp",
      "/images/houses/house 13/house-13-exterior-31.webp",
      "/images/houses/house 13/house-13-exterior-34.webp",
    ],
    thumbnail: "/images/houses/house 13/house-13-exterior-4.webp",
    features: [
      "Six spacious double bedrooms",
      "Master suite with walk-in wardrobe",
      "Four modern bathrooms",
      "Open-plan kitchen, dining, and living space",
      "Direct access to private patio and outdoor area",
      "Secure electric gated entrance",
      "Contemporary five-star finish throughout",
      "Large, bright living areas designed for comfort and entertaining",
    ],
    amenities: [
      "Fully equipped modern kitchen with high-end appliances",
      "Stylish dining area suitable for group dining",
      "Comfortable lounge and relaxation spaces",
      "High-speed WiFi throughout",
      "Smart TVs and modern entertainment setup",
      "Quality bed linen and towels provided",
      "Laundry facilities",
      "Daily housekeeping",
      "Private parking within gated grounds",
      "Electric vehicle charging points",
      "Office space",
      "About 20 minutes from Limerick Junction, with direct trains to Adare",
    ],
    location: {
      lat: 52.3714932,
      lng: -8.3473484,
    },
    walkingDistance: "Approximately 45 minutes' drive to Adare Manor",
  },
  {
    id: "portland-house",
    name: "Portland House",
    subtitle:
      "Generous private residence for Ryder Cup 2027 — sun room, attic space, and outdoor bar — about 45 minutes from Adare Manor; about 20 minutes from Limerick Junction with direct trains to Adare; pairs naturally with neighbouring Hillview House.",
    bedrooms: 6,
    description:
      "A substantial private home with bright living spaces, a sun-filled sun room, attic bedrooms and bathroom, and a bar area in the shed — ideal for Ryder Cup 2027 groups.",
    fullDescription:
      "Portland House is a roomy private residence suited to extended families and corporate groups travelling for the Ryder Cup 2027. It sits roughly 45 minutes from Adare Manor by road and about 20 minutes from Limerick Junction, where direct trains run to Adare. It can be booked alongside neighbouring Hillview House for larger parties who want two houses side by side.\n\nDownstairs revolves around generous reception space: a welcoming kitchen area, formal and informal sitting rooms, a study, back hall circulation, and a sun room that floods the plan with daylight. Outside, landscaping and elevations provide strong curb appeal, with additional imagery showing the grounds and elevations from several angles.\n\nSleeping quarters are arranged across ground and first floors and in the attic, including a ground-floor master suite, a first-floor master, two further first-floor bedrooms, and flexible attic accommodation with its own bathroom — giving privacy and flexibility for mixed groups.\n\nPractical touches include multiple bathrooms, an outdoor bar in the shed for relaxed evenings, and parking on site. The finish and layout are designed for comfortable longer stays, with space to gather, work, and unwind between tournament days.",
    price: "POA",
    images: [
      "/images/houses/house 14/house-14-exterior-21.webp",
      "/images/houses/house 14/house-14-kitchen-1.webp",
      "/images/houses/house 14/house-14-kitchen-2.webp",
      "/images/houses/house 14/house-14-sitting-1.webp",
      "/images/houses/house 14/house-14-sitting-2.webp",
      "/images/houses/house 14/house-14-sunroom-1.webp",
      "/images/houses/house 14/house-14-sunroom-2.webp",
      "/images/houses/house 14/house-14-sunroom-3.webp",
      "/images/houses/house 14/house-14-study-1.webp",
      "/images/houses/house 14/house-14-hall-1.webp",
      "/images/houses/house 14/house-14-master-ground-1.webp",
      "/images/houses/house 14/house-14-master-ground-2.webp",
      "/images/houses/house 14/house-14-master-ground-3.webp",
      "/images/houses/house 14/house-14-master-ground-4.webp",
      "/images/houses/house 14/house-14-master-ground-5.webp",
      "/images/houses/house 14/house-14-master-first-1.webp",
      "/images/houses/house 14/house-14-master-first-2.webp",
      "/images/houses/house 14/house-14-master-first-3.webp",
      "/images/houses/house 14/house-14-master-first-4.webp",
      "/images/houses/house 14/house-14-bedroom-2-1.webp",
      "/images/houses/house 14/house-14-bedroom-2-2.webp",
      "/images/houses/house 14/house-14-bedroom-2-3.webp",
      "/images/houses/house 14/house-14-bedroom-2-4.webp",
      "/images/houses/house 14/house-14-bedroom-3-1.webp",
      "/images/houses/house 14/house-14-bedroom-3-2.webp",
      "/images/houses/house 14/house-14-attic-1.webp",
      "/images/houses/house 14/house-14-attic-2.webp",
      "/images/houses/house 14/house-14-attic-3.webp",
      "/images/houses/house 14/house-14-bar-1.webp",
      "/images/houses/house 14/house-14-hall-2.webp",
      "/images/houses/house 14/house-14-bathroom-first-1.webp",
      "/images/houses/house 14/house-14-bathroom-first-2.webp",
      "/images/houses/house 14/house-14-exterior-8.webp",
      "/images/houses/house 14/house-14-exterior-9.webp",
      "/images/houses/house 14/house-14-exterior-10.webp",
      "/images/houses/house 14/house-14-exterior-12.webp",
      "/images/houses/house 14/house-14-exterior-13.webp",
      "/images/houses/house 14/house-14-exterior-18.webp",
      "/images/houses/house 14/house-14-exterior-20.webp",
      "/images/houses/house 14/house-14-exterior-23.webp",
      "/images/houses/house 14/house-14-exterior-32.webp",
      "/images/houses/house 14/house-14-exterior-34.webp",
      "/images/houses/house 14/house-14-exterior-35.webp",
      "/images/houses/house 14/house-14-exterior-36.webp",
    ],
    thumbnail: "/images/houses/house 14/house-14-exterior-21.webp",
    features: [
      "Multiple reception rooms plus a bright sun room",
      "Ground-floor and first-floor master bedroom suites",
      "Two further first-floor bedrooms plus flexible attic bedrooms and bathroom",
      "Outdoor bar area in the shed",
      "Study and generous back hall / circulation space",
      "Kitchen and informal dining geared for group stays",
      "Private parking on site",
    ],
    amenities: [
      "Fully equipped kitchen",
      "Comfortable lounging and dining areas",
      "High-speed Wi-Fi throughout",
      "Quality bed linen and towels",
      "Laundry facilities",
      "Multiple bathrooms across floors",
      "Private parking",
      "About 20 minutes from Limerick Junction, with direct trains to Adare",
    ],
    location: {
      lat: 52.3714932,
      lng: -8.3473484,
    },
    walkingDistance: "Approximately 45 minutes' drive to Adare Manor",
  },
];
