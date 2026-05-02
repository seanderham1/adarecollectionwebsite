import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { properties, formatPropertyBedroomsShort, getPropertyCollectionBadge } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  SEO_META_KEYWORDS_COMPACT,
  SEO_PROPERTIES_DESCRIPTION,
  SEO_PROPERTIES_TITLE,
} from "@/lib/seo-keyword-clusters";
import { useSEO } from "@/hooks/use-seo";

// Coming Soon Card Component
function ComingSoonCard() {
  return (
    <div className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none" data-testid="coming-soon-card">
      <div className="relative aspect-[16/9]">
        <img 
          src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&h=800"
          alt="Coming Soon Property"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-lg font-medium uppercase tracking-wider">COMING SOON</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-muted uppercase tracking-wider font-medium">
            &nbsp;
          </div>
          <div className="text-xs text-muted uppercase tracking-wider font-medium">
            &nbsp;
          </div>
        </div>
        
        <h3 className="font-serif text-xl font-normal mb-2 text-primary">
          Additional Properties Coming Soon
        </h3>
        
        <p className="text-secondary text-sm leading-relaxed mb-6">
          Additional properties will be added to our collection soon. Stay tuned for more exceptional accommodations for Ryder Cup 2027.
        </p>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  // All properties are now in the main properties array
  const all = properties;

  useSEO({
    title: SEO_PROPERTIES_TITLE,
    description: SEO_PROPERTIES_DESCRIPTION,
    keywords: SEO_META_KEYWORDS_COMPACT,
    ogImage: 'https://theadarecollection.com/images/hero/adaremanor-img1.webp',
    ogUrl: 'https://theadarecollection.com/properties'
  });

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />

      <main className="pt-24 pb-16 px-6 bg-neutral-100">
        {/* Header Section - Full Width */}
        <section className="bg-white py-12 mb-12 -mx-6 px-6 -mt-24 pt-24 border-b border-gray-200">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-4">
              Ryder Cup 2027 Accommodation at Adare Manor
            </h1>
            <p className="text-base text-secondary leading-relaxed max-w-3xl mx-auto">
              Exclusive Ryder Cup 2027 accommodation: luxury houses for rent across our portfolio, from golf village
              and demesne settings through to upscale executive retreats minutes from Adare Manor. Ideal for sponsors,
              corporate hospitality, and groups who want a whole-home private Ireland rental near the Ryder Cup
              venue.
            </p>
          </div>
        </section>

        {/* Property Grid Section */}
        <div className="max-w-[2000px] mx-auto grid md:grid-cols-3 gap-6">
          {all.map((p) => (
            <Link key={p.id} href={`/property/${p.id}`}>
              <div className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none cursor-pointer group">
                <div className="relative aspect-[16/9]">
                  <img
                    src={p.thumbnail || p.images[0]}
                    alt={`${p.name} - Ryder Cup 2027 accommodation at Adare Manor`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 right-0 z-20 cursor-pointer">
                    <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
                      <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                        {getPropertyCollectionBadge(p.id)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-muted uppercase tracking-wider font-medium">
                      {formatPropertyBedroomsShort(p)} BEDROOMS
                    </div>
                    <div className="text-xs text-muted uppercase tracking-wider font-medium">
                      AVAILABLE
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-normal mb-2 text-primary">{p.name}</h3>
                  <p className="text-secondary text-sm leading-relaxed mb-6">{p.description}</p>
                  <div className="space-y-3">
                    <Button
                      className="border border-gray-700 bg-transparent text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
                    >
                      DISCOVER MORE
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <ComingSoonCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}


