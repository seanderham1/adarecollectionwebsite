import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Bed } from "lucide-react";

export default function PropertiesPage() {
  // All properties are now in the main properties array
  const all = properties;

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />

      <main className="pt-24 pb-16 px-6 bg-neutral-100">
        {/* Header Section - Full Width */}
        <section className="bg-white py-12 mb-12 -mx-6 px-6 -mt-24 pt-24 border-b border-gray-200">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
              Explore our properties
            </h1>
            <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
              Discover a curated selection of private residences in and around Adare Manor—each chosen for comfort,
              privacy, and proximity. Whether you seek a discreet estate within the grounds or a spacious home just
              minutes away, our collection is tailored for Ryder Cup week and beyond.
            </p>
          </div>
        </section>

        {/* Property Grid Section */}
        <div className="max-w-[2000px] mx-auto grid md:grid-cols-3 gap-6">
          {all.filter(p => p.id !== 'riverbank-manor').map((p) => (
            <div key={p.id} className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none cursor-pointer group">
              <div className="relative aspect-[16/9]">
                <Link href={`/property/${p.id}`}>
                  <img
                    src={p.thumbnail || p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <Link href={`/property/${p.id}`}>
                  <div className="absolute top-0 left-0 right-0 z-20 cursor-pointer">
                    <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
                      <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                        {p.id === 'cragleigh-house' ? 'DELUXE' : 'EXCLUSIVE'}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-muted uppercase tracking-wider font-medium">
                    {p.bedrooms} BEDROOMS
                  </div>
                  <div className="text-xs text-muted uppercase tracking-wider font-medium">
                    AVAILABLE
                  </div>
                </div>
                <h3 className="font-serif text-xl font-normal mb-2 text-primary">{p.name}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-6">{p.description}</p>
                <div className="space-y-3">
                  <Link href={`/property/${p.id}`}>
                    <Button
                      className="border border-gray-700 bg-transparent text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
                    >
                      DISCOVER MORE
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}


