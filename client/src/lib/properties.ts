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
    id: "putters-way",
    name: "Putters Way",
    subtitle: "At the Heart of the Ryder Cup 2027",
    bedrooms: 2,
    description: "Located steps from the Carriage House, this executive home sits within the private Golf Village of Adare Manor.",
    fullDescription: "Located steps from the Carriage House, this two-bedroom executive home sits within the private Golf Village of Adare Manor. Designed for discretion and elegance, it offers unmatched proximity to the first tee, alongside private terraces, open-plan living, and optional concierge services.",
    price: "POA",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "2 Bedrooms",
      "Private Terraces",
      "Open-plan Living",
      "Golf Village Location",
      "Concierge Services",
      "Walking Distance to First Tee"
    ],
    location: {
      lat: 52.5629,
      lng: -8.7906
    },
    walkingDistance: "2 minutes to championship course"
  },
  {
    id: "cragleigh-house",
    name: "Cragleigh House",
    subtitle: "Georgian Elegance Reimagined",
    bedrooms: 6,
    description: "This beautifully restored Georgian mansion offers refined luxury with modern amenities and panoramic countryside views.",
    fullDescription: "This beautifully restored Georgian mansion combines historic elegance with contemporary luxury. Featuring six spacious bedrooms, formal dining areas, and expansive grounds, Cragleigh House offers the perfect blend of traditional Irish architecture and modern comfort for discerning guests.",
    price: "POA",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "6 Bedrooms",
      "Georgian Architecture",
      "Formal Dining",
      "Extensive Grounds",
      "Historic Features",
      "Panoramic Views"
    ],
    location: {
      lat: 52.5640,
      lng: -8.7920
    },
    walkingDistance: "5 minutes to Adare Manor"
  },
  {
    id: "demesne-residence",
    name: "The Demesne Residence",
    subtitle: "Contemporary Luxury Estate",
    bedrooms: 8,
    description: "An architectural masterpiece offering the pinnacle of modern luxury with unrivaled privacy and stunning golf course views.",
    fullDescription: "The Demesne Residence represents the ultimate in contemporary luxury living. This architectural masterpiece features eight elegantly appointed bedrooms, state-of-the-art amenities, and breathtaking views of the championship golf course. With its emphasis on privacy, space, and sophistication, it provides an unparalleled retreat for the most discerning guests.",
    price: "POA",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
    ],
    features: [
      "8 Bedrooms",
      "Contemporary Architecture",
      "Golf Course Views",
      "Private Estate",
      "State-of-the-art Amenities",
      "Maximum Privacy"
    ],
    location: {
      lat: 52.5650,
      lng: -8.7890
    },
    walkingDistance: "3 minutes to golf course"
  }
];
