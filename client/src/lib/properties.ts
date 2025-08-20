export interface Property {
  id: string;
  name: string;
  subtitle: string;
  bedrooms: number;
  description: string;
  fullDescription: string;
  price: string;
  images: string[];
  features: string[];
  location: {
    lat: number;
    lng: number;
  };
  walkingDistance: string;
}

export const properties: Property[] = [
  {
    id: "house-2",
    name: "House 2",
    subtitle: "19 The Demesne",
    bedrooms: 6,
    description: "Stately luxurious residence within the private gated enclave of Adare Manor Resort, 300 yards from the 2027 Ryder Cup driving range.",
    fullDescription: "House 2 at 19 The Demesne presents an excellent opportunity to reside in one of Ireland's most prestigious addresses, nestled within the private and gated enclave of the Adare Manor Resort. This stately luxurious residence is a mere 300 yards from the 2027 Ryder Cup driving range and a five-minute stroll to the first tee box, offering unrivalled proximity to one of golf's most anticipated events. Spanning across three expansive floors and over 650m²/7020 sq.ft, this residence features sophisticated living spaces with a grand chandelier-lit entrance hall, five/six double ensuite bedrooms including a master suite with jacuzzi bath, grand entertaining areas, gourmet kitchen, private cinema room, fully equipped lounge bar with pool table, fitness suite with gym and sauna, and executive office. The property offers exceptional outdoor entertaining with 300m² of manicured gardens and 250m² of Liscannor paving, ideal for hosting marquee events for up to 100 guests.",
    price: "POA",
    images: [
      "/images/houses/house 2/house-2-main.jpg",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "5-6 Double Ensuite Bedrooms",
      "Master Suite with Jacuzzi Bath (95m²)",
      "Private Cinema Room",
      "Fully Equipped Lounge Bar with Pool Table",
      "Fitness Suite with Gym & Sauna",
      "Gourmet Kitchen with Walk-in Cold Room",
      "Formal Dining Room (seats 18)",
      "Executive Office",
      "Balcony overlooking Driving Range",
      "300m² Manicured Gardens",
      "250m² Liscannor Paving",
      "300m from Ryder Cup Driving Range",
      "5-minute walk to First Tee",
      "Helicopter Transfer Available",
      "Chauffeur Services",
      "Full Concierge Services"
    ],
    location: {
      lat: 52.5629,
      lng: -8.7906
    },
    walkingDistance: "5 minutes to first tee"
  },
  {
    id: "the-demesne-residence",
    name: "The Demesne Residence",
    subtitle: "20 The Demesne",
    bedrooms: 6,
    description: "Luxury estate home within Adare Manor's gated enclave, moments from the Carriage House and first tee.",
    fullDescription: "The Demesne Residence at 20 The Demesne offers one of the most exclusive private stays available during the Ryder Cup 2027. Set within the secure walls of Adare Manor's most prestigious enclave, this substantial six-bedroom estate home is embedded in the very grounds of Adare Manor, just moments from the Carriage House and a short stroll to the first tee. Behind its elegant façade lies a sanctuary of style, space, and quiet grandeur. Step through the door into a stunning entrance hall where a crystal chandelier casts warm light across polished floors. The accommodation includes an exquisite master suite with walk-in wardrobe, dressing area, and spa-like ensuite bathroom with jacuzzi bath, plus five additional double bedrooms, each ensuite and individually styled. The home features a formal drawing room with grand piano, second large sitting room, chef-equipped kitchen opening to a spacious dining room capable of hosting 50+ guests, light-filled conservatory with French doors to garden, and games room with pool table and arcade entertainment.",
    price: "POA",
    images: [
      "/images/houses/house 3/house-3-main.jpg",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "6 Double Ensuite Bedrooms",
      "Master Suite with Jacuzzi Bath",
      "Walk-in Wardrobe & Dressing Area",
      "Formal Drawing Room with Grand Piano",
      "Chef-Equipped Kitchen",
      "Dining Room (seats 50+ guests)",
      "Light-filled Conservatory",
      "Games Room with Pool Table",
      "Crystal Chandelier Entrance Hall",
      "24-hour Gated Security",
      "Mature Garden Space",
      "Private Off-street Parking",
      "Moments from Carriage House",
      "Short Stroll to First Tee",
      "Private Chef Services Available",
      "Helicopter Landing Access",
      "Chauffeur Services",
      "Butler Services"
    ],
    location: {
      lat: 52.5640,
      lng: -8.7920
    },
    walkingDistance: "Short stroll to first tee"
  },
  {
    id: "putters-way",
    name: "Putters Way",
    subtitle: "24 Golf Village",
    bedrooms: 2,
    description: "Deluxe residence within the private Golf Village of Adare Manor, metres from the Carriage House and a short stroll to the 1st tee.",
    fullDescription: "Positioned just metres from the Carriage House and a short stroll to the 1st tee, Putters Way offers an unrivalled base inside the Ryder Cup 2027 venue. This deluxe residence lies within the private Golf Village of Adare Manor, placing guests at the centre of the action while cocooned in refined luxury. Watch the world's greatest golfers tee off while sipping coffee on your private terrace. Dine at the Carriage House mere steps from your door. This is not just a place to stay — it's the rare opportunity to live inside the event. The property features 2 spacious double bedrooms, both ensuite, with tastefully designed interiors showcasing contemporary Irish elegance. Open-plan living and dining spaces provide comfort and entertaining, while the modern kitchen comes with premium appliances. The outdoor terrace is ideal for drinks, morning coffee, or corporate hospitality.",
    price: "POA",
    images: [
      "/images/houses/house 4/adare-house-4.jpg",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "2 Spacious Double Ensuite Bedrooms",
      "Contemporary Irish Elegance Design",
      "Open-plan Living & Dining",
      "Modern Kitchen with Premium Appliances",
      "Private Outdoor Terrace",
      "Metres from Carriage House",
      "3-minute Walk to 1st Tee",
      "Private Golf Village Location",
      "Fully Secure & Gated Estate",
      "Private Parking Included",
      "Executive Chauffeur Available",
      "Private Chef Services",
      "Concierge Support",
      "Perfect for Corporate Hospitality",
      "VIP Privacy & Exclusivity"
    ],
    location: {
      lat: 52.5650,
      lng: -8.7890
    },
    walkingDistance: "3 minutes to 1st tee"
  }
];
