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
}

export const properties: Property[] = [
  {
    id: "rangeview",
    name: "Range View",
    subtitle: "Located within Adare Manor estate, offering front-row proximity to Ryder Cup 2027",
    bedrooms: 6,
    description: "Located within Adare Manor estate, 'Range View' offers front-row proximity to Ryder Cup 2027.",
    fullDescription: "Range View is a stately luxurious residence nestled within the private and gated enclave of Adare Manor Resort — just 300 yards from the Ryder Cup 2027 driving range and a five-minute walk to the first tee box. Offering over 7,000ft²/650m² of refined living space across three expansive floors, this home delivers unrivalled proximity to the event alongside world-class interiors, making it ideal for corporate hospitality or discerning private guests.",
    price: "Enquire Now",
    images: [
      "/images/houses/house 2/house-2-main-original.webp",
      "/images/houses/house 2/house-2-living-room-3.webp",
      "/images/houses/house 2/house-2-living-room-2.webp",
      "/images/houses/house 2/house-2-living-room-1.webp",
      "/images/houses/house 2/house-2-living-room.webp",
      "/images/houses/house 2/house-2-dining.webp",
      "/images/houses/house 2/house-2-cinema-room.webp",
      "/images/houses/house 2/house-2-master-bedroom.webp",
      "/images/houses/house 2/house-2-bedroom-2.webp",
      "/images/houses/house 2/house-2-bedroom-1.webp",
      "/images/houses/house 2/house-2-games-room.webp",
      "/images/houses/house 2/house-2-study.webp",
      "/images/houses/house 2/house-2-sauna.webp",
      "/images/houses/house 2/house-2-gym.webp",
      "/images/houses/house 2/house-2-outdoor-seating.webp"
    ],
    thumbnail: "/images/houses/house 2/house-2-main.webp",
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
    fullDescription: "Situated within the exclusive and secure walls of the Adare Manor resort, 'The Captains' home offers an extraordinary opportunity to stay at the epicentre of the Ryder Cup 2027. This six-bedroom estate spanning over 8500ft²/790m² is not just near the event—it's almost part of it.\n\nWith the practice range just over the hedge, and a 5 minute stroll from the 1st tee box, this residence is ideal for the discerning client, sponsors, media, and corporate clients seeking to be immersed in the heart of the Ryder Cup action, without compromising on space, luxury, or privacy.",
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
      "/images/houses/house 3/house-3-bedroom-5.webp",
      "/images/houses/house 3/house-3-bedroom-6.webp",
      "/images/houses/house 3/house-3-bedroom-7.webp",
      "/images/houses/house 3/house-3-bedroom-8.webp",
      "/images/houses/house 3/house-3-bedroom-9.webp",
      "/images/houses/house 3/house-3-bedroom-10.webp",
      "/images/houses/house 3/house-3-bedroom-11.webp",
      "/images/houses/house 3/house-3-exterior.webp"
    ],
    thumbnail: "/images/houses/house 3/house-3-main.webp",
    features: [
      "Six luxury ensuite bedrooms, including an exquisite master suite with jacuzzi bath, open fireplace, and walk-in wardrobe",
      "Grand entrance hall with crystal chandelier and a grand piano – perfect for welcoming guests or evening entertainment.",
      "Three elegant reception areas: a large drawing room and two sitting rooms with ample tranquil seating",
      "Open-plan kitchen and living space with high-end finishes, adjoining a formal dining room for 10 people",
      "Separate dining area capable of hosting 50+ guests."
    ],
    amenities: [
      "Chef cooked breakfast",
      "Daily serviced fresh towels and linens",
      "Daily housekeeping",
      "High-speed Wi-Fi and satellite TV",
      "Games room with pool table, table tennis, and dart board – convertible into a fitness studio with treadmill (if required)",
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
    subtitle: "At the very centre of Ryder Cup 2027 – Golf Village, Adare Manor",
    bedrooms: 2,
    description: "Premium residence within the private Golf Village of Adare Manor, metres from the Carriage House and a short stroll to the 1st tee.",
    fullDescription: "'Putters Way' is a rare and exclusive opportunity to stay at the very heart of the Ryder Cup action 2027. Situated just metres from where the U.S and European team will warm up on the practice range and putting green and a one minute stroll to the 1st tee, it just doesn't get any closer than this!\n\nLocated in the prestigious private Golf Village, this deluxe residence places guests at the centre of the tournament atmosphere — while offering elegant privacy, luxury finishes, and complete immersion in the experience.\n\nThis is not just a place to stay — it's a chance to live the event.",
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
    thumbnail: "/images/houses/house 4/adare-house-4.webp",
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
    id: "the-fairways",
    name: "The Fairways",
    subtitle: "Located within the gates of Adare Manor — just steps from the 2027 Ryder Cup venue.",
    bedrooms: 6,
    description: "Within Adare Manor's gates — Ireland's most prestigious estate, steps from Ryder Cup 2027.",
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
      "Fitness Suite – a fully equipped private gym above the garage",
      "Firepit Terrace & Gazebo – covered outdoor living area with built-in fireplace, lounge seating for 10–12, and Kamado Joe BBQ",
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
    subtitle: "Located just 15 drive minutes from Adare Manor, with convenient access to Limerick, the M20 motorway, and Shannon Airport – Cragleigh House offers privacy, space, and effortless access to Ryder Cup 2027",
    bedrooms: 5,
    description: "Just 15 minutes from Adare Manor with easy access to Limerick, Shannon Airport, and Ryder Cup 2027.",
    fullDescription: "Cragleigh House is a magnificent manor-style residence located just under 15 minutes from the Ryder Cup 2027 venue at Adare Manor. Privately positioned yet within easy reach of the action, this elegant estate combines traditional charm with modern luxury across extensive gardens and refined interiors.\n\nOffering five spacious double bedrooms, multiple reception rooms, and formal dining areas, Cragleigh House is ideal for the discerning client, sponsors, media teams, or corporate hosts seeking a prestigious base during Ryder Cup week.",
    price: "POA",
    images: [
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
  }
];
