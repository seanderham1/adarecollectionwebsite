import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bed } from "lucide-react";

export default function PropertiesPage() {
  // create 3 additional inspired properties (lightweight client-side array)
  const extras = [
    {
      id: "woodlands-villa",
      name: "Woodlands Villa",
      subtitle: "Modern Serenity by the Trees",
      bedrooms: 5,
      description:
        "Contemporary villa set on a private lane near Adare, with floor-to-ceiling glazing and expansive terraces.",
      images: [
        "https://images.unsplash.com/photo-1502005229762-cf1b2da7c08e?auto=format&fit=crop&w=1200&h=800",
      ],
    },
    {
      id: "carriage-house-residence",
      name: "Carriage House Residence",
      subtitle: "Steps from Dining & The First Tee",
      bedrooms: 4,
      description:
        "Elegant townhouse a short walk from the Carriage House, featuring refined interiors and private courtyard.",
      images: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&h=800",
      ],
    },
    {
      id: "riverbank-manor",
      name: "Riverbank Manor",
      subtitle: "Classic Style with River Views",
      bedrooms: 6,
      description:
        "Grand residence overlooking the river, with formal reception rooms and landscaped gardens for entertaining.",
      images: [
        "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&h=800",
      ],
    },
  ];

  const all = [...properties, ...extras];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-[1600px] mx-auto text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
            Explore our properties
          </h1>
          <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
            Discover a curated selection of private residences in and around Adare Manor—each chosen for comfort,
            privacy, and proximity. Whether you seek a discreet estate within the grounds or a spacious home just
            minutes away, our collection is tailored for Ryder Cup week and beyond.
          </p>
        </div>

        <div className="max-w-[1600px] mx-auto grid md:grid-cols-3 gap-8">
          {all.map((p) => (
            <div key={p.id} className="property-card bg-white overflow-hidden">
              <div className="relative group">
                <Link href={`/property/${p.id}`}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-muted uppercase tracking-wide font-medium">{p.subtitle}</div>
                  <div className="flex items-center text-xs text-muted">
                    <Bed className="h-3 w-3 mr-1" />
                    <span>{p.bedrooms}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-normal mb-2 text-primary">{p.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">{p.description}</p>
                <Link href={`/property/${p.id}`}>
                  <Button className="btn-primary text-white w-full text-sm font-medium py-2">
                    DISCOVER MORE
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}


