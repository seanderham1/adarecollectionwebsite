import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { properties, type Property } from "@/lib/properties";
import { Link } from "wouter";
import { Heart, Bed } from "lucide-react";

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="property-card bg-white overflow-hidden" data-testid={`property-card-${property.id}`}>
      <div className="relative group">
        <Link href={`/property/${property.id}`}>
          <img 
            src={property.images[0]} 
            alt={property.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            data-testid={`property-image-${property.id}-0`}
          />
        </Link>
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 uppercase tracking-wide">
            EXCLUSIVE
          </Badge>
        </div>
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-muted uppercase tracking-wide font-medium">
            REF {property.id.toUpperCase().replace('-', '')} 
          </div>
          <div className="flex items-center text-xs text-muted">
            <Bed className="h-3 w-3 mr-1" />
            <span>{property.bedrooms}</span>
          </div>
        </div>
        
        <h3 className="font-serif text-xl font-normal mb-2 text-primary" data-testid={`property-name-${property.id}`}>
          {property.name}
        </h3>
        
        <p className="text-secondary text-sm leading-relaxed mb-6" data-testid={`property-description-${property.id}`}>
          {property.description}
        </p>
        
          <div className="space-y-3">
            <Link href={`/property/${property.id}`}>
              <Button
                className="btn-primary text-white w-full text-sm font-medium py-2"
                data-testid={`button-discover-more-${property.id}`}
              >
                DISCOVER MORE
              </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default function PropertyGrid() {
  return (
    <section id="properties" className="py-12 px-4 bg-white" data-testid="property-grid-section">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6 text-primary tracking-tight" data-testid="properties-title">
            Our Collection
          </h2>
          <div className="flex justify-center">
            <p className="text-base text-secondary leading-relaxed max-w-3xl">
              Premium homes within the grounds of Adare Manor, just steps from the 1st tee and Carriage House.<br />
              Deluxe manor residences just minutes from Adare, offering exceptional space and privacy.<br />
              All properties feature elegant interiors, multiple ensuite bedrooms, and generous entertainment areas.
            </p>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid md:grid-cols-3 gap-8" data-testid="properties-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
