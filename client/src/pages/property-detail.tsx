import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { MapPin, Car, Users, Utensils, Plane } from "lucide-react";

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Navigation />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">Property Not Found</h1>
            <p className="text-dark-gray">The property you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleRequestAvailability = () => {
    const subject = encodeURIComponent(`Availability Request - ${property.name}`);
    const body = encodeURIComponent(`I am interested in learning more about the availability of ${property.name} for Ryder Cup 2027.\n\nPlease provide more information about:\n- Availability dates\n- Pricing\n- Additional services\n\nThank you.`);
    window.location.href = `mailto:info@theadarecollection.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-warm-white">
      <Navigation />
      
      <div className="pt-24 pb-20">
        {/* Property Header */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-5xl font-bold text-charcoal mb-4" data-testid="property-title">
              {property.name}
            </h1>
            <p className="text-2xl text-dark-gray mb-6" data-testid="property-subtitle">
              {property.subtitle}
            </p>
            <div className="flex justify-center items-center space-x-4 text-warm-gold">
              <MapPin className="h-5 w-5" />
              <span className="font-medium" data-testid="property-walking-distance">{property.walkingDistance}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-12">
            <Carousel className="w-full max-w-4xl mx-auto" data-testid="property-gallery">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video">
                      <img 
                        src={image} 
                        alt={`${property.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg luxury-shadow"
                        data-testid={`property-gallery-image-${index}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4" />
              <CarouselNext className="absolute right-4" />
            </Carousel>
          </div>
        </div>

        {/* Property Details */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="font-playfair text-3xl font-bold text-charcoal mb-6" data-testid="property-description-title">
                    Property Description
                  </h2>
                  <p className="text-lg text-dark-gray leading-relaxed" data-testid="property-full-description">
                    {property.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6" data-testid="property-features-title">
                    Features & Amenities
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-warm-gold text-white" data-testid={`property-feature-${index}`}>
                          {feature}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add-on Services */}
              <Card>
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-charcoal mb-6" data-testid="addon-services-title">
                    Add-on Services
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <Car className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-1" data-testid="service-chauffeur-title">Chauffeur Service</h4>
                        <p className="text-dark-gray text-sm" data-testid="service-chauffeur-description">Professional transportation throughout your stay</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <Utensils className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-1" data-testid="service-chef-title">Private Chef</h4>
                        <p className="text-dark-gray text-sm" data-testid="service-chef-description">Bespoke dining experiences in your residence</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-1" data-testid="service-concierge-title">Concierge</h4>
                        <p className="text-dark-gray text-sm" data-testid="service-concierge-description">24/7 personal assistance and arrangements</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0">
                        <Plane className="text-white h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-1" data-testid="service-helicopter-title">Helicopter Transfer</h4>
                        <p className="text-dark-gray text-sm" data-testid="service-helicopter-description">Direct transfers from airports or nearby locations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <Card className="luxury-shadow mb-8">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-warm-gold" data-testid="property-price">{property.price}</span>
                    <p className="text-dark-gray text-sm mt-2">8-night minimum stay</p>
                  </div>
                  
                  <Button 
                    onClick={handleRequestAvailability}
                    className="w-full btn-primary text-white py-3 rounded-lg font-medium mb-4"
                    data-testid="button-request-availability"
                  >
                    Request Availability
                  </Button>
                  
                  <p className="text-dark-gray text-sm">
                    All rates are subject to availability and may vary based on dates and services selected.
                  </p>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="luxury-shadow">
                <CardContent className="p-8">
                  <h3 className="font-playfair text-xl font-bold text-charcoal mb-4" data-testid="location-map-title">Location</h3>
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                      alt="Property Location Map"
                      className="w-full h-full object-cover"
                      data-testid="property-location-map"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer hover:bg-opacity-20 transition-all">
                      <div className="text-white text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">View on Map</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-dark-gray text-sm text-center" data-testid="property-walking-distance-detail">
                    {property.walkingDistance} to Adare Manor Golf Course
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
