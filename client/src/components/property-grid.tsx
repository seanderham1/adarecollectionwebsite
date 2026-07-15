import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { properties, type Property, formatPropertyBedroomsShort, getPropertyCollectionBadge, getPropertyAvailabilityLabel, sortPropertiesByCollectionTier } from "@/lib/properties";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none cursor-pointer group" data-testid={`property-card-${property.id}`}>
        <div className="relative aspect-[16/9]">
          <img 
            src={property.thumbnail || property.images[0]} 
            alt={`${property.name} - Ryder Cup 2027 accommodation at Adare Manor`}
            className="w-full h-full object-cover"
            data-testid={`property-image-${property.id}-0`}
          />
          <Link href={`/property/${property.id}`}>
            <div className="absolute top-0 left-0 right-0 z-20 cursor-pointer">
              <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
                <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                  {getPropertyCollectionBadge(property.id)}
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-muted uppercase tracking-wider font-medium">
              {formatPropertyBedroomsShort(property)} BEDROOMS
            </div>
            <div className="text-xs text-muted uppercase tracking-wider font-medium">
              {getPropertyAvailabilityLabel(property)}
            </div>
          </div>
          
          <h3 className="font-serif text-xl font-normal mb-2 text-primary" data-testid={`property-name-${property.id}`}>
            {property.name}
          </h3>
          
          <p className="text-secondary text-sm leading-relaxed mb-6" data-testid={`property-description-${property.id}`}>
            {property.description}
          </p>
          
          <div className="space-y-3">
            <Button
              className="border border-gray-700 bg-transparent text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
              data-testid={`button-discover-more-${property.id}`}
            >
              DISCOVER MORE
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ComingSoonCard() {
  return (
    <Link href="/properties">
      <div className="property-card bg-neutral-100 overflow-hidden border-0 shadow-none cursor-pointer group" data-testid="coming-soon-card">
        <div className="relative aspect-[16/9]">
          <img 
            src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&h=800"
            alt="View More Properties"
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-white text-lg font-medium uppercase tracking-wider flex items-center gap-2">
              VIEW MORE
              <ArrowRight className="h-4 w-4" />
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
            View Our Additional Properties
          </h3>

          <p className="text-secondary text-sm leading-relaxed mb-6">
            Stay tuned for more exceptional accommodations for Ryder Cup 2027.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PropertyGrid() {
  const sortedProperties = sortPropertiesByCollectionTier(properties);

  return (
    <section id="properties" className="py-12 px-4 bg-neutral-100 w-full" data-testid="property-grid-section">
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-gray-900 mb-6" data-testid="properties-title">
            Our Collection
          </h2>
          <div className="text-base text-gray-900 leading-relaxed max-w-5xl mx-auto">
            <p className="font-serif text-base font-normal">
              Executive type homes within the grounds of Adare Manor, just steps from the 1st tee box of Ryder Cup 2027. Deluxe properties within driving distance from Adare, some located near some of Ireland's finest championship lynx golf courses on the Atlantic way. All properties feature elegant interiors, multiple ensuite bedrooms, and generous entertainment areas.
            </p>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-3 gap-6" data-testid="properties-grid">
          {sortedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}