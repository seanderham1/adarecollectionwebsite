import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PropertyMap from "@/components/property-map";
import VideoModal from "@/components/video-modal";
import MapModal from "@/components/map-modal";
import { properties } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Car, ChefHat, Heading, Shirt, Crown, Tickets, Bed, Mail, MessageCircle } from "lucide-react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  
  // Use property-specific video URL or fallback to default
  const videoUrl = property?.videoUrl || "/videos/rangeview.mp4";

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

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );

  const selectImage = (index: number) => setCurrentImageIndex(index);

  const handleRequestAvailability = () => {
    const subject = encodeURIComponent(`Availability Request - ${property.name}`);
    const body = encodeURIComponent(`I am interested in learning more about the availability of ${property.name} for Ryder Cup 2027.\n\nPlease provide more information about:\n- Availability dates\n- Pricing\n- Additional services\n\nThank you.`);
    window.location.href = `mailto:info@theadarecollection.ie?subject=${subject}&body=${body}`;
  };

  const handleViewVideo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };

  const handleViewMap = () => {
    setIsMapModalOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapModalOpen(false);
  };

  const handleDownloadBrochure = () => {
    if (property.id === 'putters-way') {
      // Download the specific Putters Way brochure
      const link = document.createElement('a');
      link.href = '/downloads/Putters Way - Brochure.pdf';
      link.download = 'Putters Way - Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (property.id === 'rangeview') {
      // Download the specific Range View brochure
      const link = document.createElement('a');
      link.href = '/downloads/Range View - Brochure.pdf';
      link.download = 'Range View - Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (property.id === 'the-fairways') {
      // Download the specific The Fairways brochure
      const link = document.createElement('a');
      link.href = '/downloads/The Fairways - Brochure.pdf';
      link.download = 'The Fairways - Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Default brochure download for other properties
      const subject = encodeURIComponent(`Brochure Request - ${property.name}`);
      const body = encodeURIComponent(`I would like to request a brochure for ${property.name} at The Adare Collection for Ryder Cup 2027.\n\nThank you.`);
      window.location.href = `mailto:info@theadarecollection.ie?subject=${subject}&body=${body}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24">
        {/* Main Content Container - Full Page Layout */}
        <div className="max-w-[2000px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-0 min-h-screen">
            {/* Left Content - Hero and Property Details */}
            <div className="lg:col-span-2 bg-white">
              {/* Hero Section */}
              <section className="relative w-full overflow-hidden bg-white -mt-24">
                {/* White mask to cover area above navigation */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-white z-10"></div>
                <div className="lg:h-[85vh] relative bg-white flex flex-col">
                  {/* Main Image with fade transition */}
                  <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:flex-1 overflow-hidden">
                    {property.images.map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`${property.name} - Image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                          property.images[index].includes('house-1-hall.webp') ||
                          property.images[index].includes('house-3-master-bath-1.webp') ||
                          property.images[index].includes('house-3-master-bath-2.webp') ||
                          property.images[index].includes('house-3-master-bath-3.webp') ||
                          property.images[index].includes('house-4-rolex.webp')
                            ? 'object-contain'
                            : 'object-cover'
                        } ${
                          index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ 
                          transform: property.images[index].includes('house-1-hall.webp') 
                            ? 'translateY(0%)' 
                            : (property.images[index].includes('/house 4/house-4-rolex.webp') || 
                               (property.id === 'putters-way' && index === 8))
                            ? 'translateY(10%)'
                            : 'translateY(5%)',
                          objectPosition: (property.images[index].includes('/house 4/house-4-rolex.webp') || 
                                          (property.id === 'putters-way' && index === 8))
                            ? 'center 50%'
                            : property.id === 'the-captains' 
                            ? property.images[index].includes('house-3-master-bath-1.webp') ||
                              property.images[index].includes('house-3-master-bath-2.webp') ||
                              property.images[index].includes('house-3-master-bath-3.webp')
                              ? 'center center'
                              : '5% center'
                            : property.id === 'rangeview' 
                            ? 'center 30%' 
                            : property.images[index].includes('house-1-hall.webp')
                            ? 'center 30%'
                            : property.images[index].includes('house-3-master-bath-1.webp') ||
                              property.images[index].includes('house-3-master-bath-2.webp') ||
                              property.images[index].includes('house-3-master-bath-3.webp')
                            ? 'center center'
                            : 'center center'
                        }}
                        data-testid={`property-gallery-image-${index}`}
                      />
                    ))}

                    {/* EXCLUSIVE/DELUXE Banner */}
                    <div className="absolute top-16 left-0 right-0 z-20">
                      <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
                        <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                          {property.id === 'cragleigh-house' ? 'DELUXE' : 'EXCLUSIVE'}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Right Navigation with Play Video and Arrow Buttons */}
                    <div className="absolute bottom-6 right-6 z-10 flex space-x-2">
                      {/* Play Video Button */}
                      <button
                        onClick={handleViewVideo}
                        className="bg-white shadow-lg px-4 h-10 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-100 cursor-pointer"
                        aria-label="Play video"
                      >
                        <Play className="h-4 w-4 stroke-2 text-black" />
                        <span className="text-sm font-medium text-black">PLAY VIDEO</span>
                      </button>
                      
                      {/* Left Arrow Square */}
                      <button
                        onClick={prevImage}
                        className="bg-white shadow-lg w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-100 cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6 stroke-2 text-black" />
                      </button>
                      
                      {/* Right Arrow Square */}
                      <button
                        onClick={nextImage}
                        className="bg-white shadow-lg w-10 h-10 flex items-center justify-center transition-all duration-200 hover:bg-gray-100 cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6 stroke-2 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Mobile/Tablet Enquire Section */}
              <section className="lg:hidden bg-white px-4 py-8">
                <div className="w-full">
                  {/* Property Title and Details */}
                  <div className="text-left mb-6">
                    <h1 className="font-serif text-2xl font-normal text-primary mb-2">
                      {property.name}
                    </h1>
                    <p className="text-sm text-primary font-serif mb-0">Available exclusively for Ryder Cup 2027</p>
                    <p className="text-sm text-primary font-serif mb-3">10-day minimum stay</p>
                    <p className="text-sm text-primary leading-relaxed">
                      {property.subtitle}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-6">
                    <Button 
                      onClick={handleRequestAvailability}
                      className="border border-gray-700 bg-gray-700 text-white px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200 w-full"
                      data-testid="button-request-availability-mobile"
                    >
                      REQUEST AVAILABILITY
                    </Button>
                    

                    <Button 
                      onClick={handleViewMap}
                      className="border border-gray-700 bg-white text-gray-700 px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
                    >
                      MAP
                    </Button>

                    {property.id !== 'the-captains' && property.id !== 'cragleigh-house' && (
                      <Button 
                        onClick={handleDownloadBrochure}
                        className="border border-gray-700 bg-white text-gray-700 px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
                      >
                        BROCHURE
                      </Button>
                    )}
                  </div>

                  {/* Share Section */}
                  <div className="text-center">
                    <p className="text-sm text-primary mb-3">Share this property</p>
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => {
                          const subject = encodeURIComponent("Property at The Adare Collection");
                          const body = encodeURIComponent(`Look at this home that I found for the 2027 Ryder Cup!\n\n${window.location.href}`);
                          window.location.href = `mailto:?subject=${subject}&body=${body}`;
                        }}
                        className="text-primary hover:text-gray-900 transition-colors"
                      >
                        <Mail className="h-6 w-6" />
                      </button>
                      <button 
                        onClick={() => {
                          const text = encodeURIComponent(`Look at this home that I found for the 2027 Ryder Cup! ${window.location.href}`);
                          window.open(`https://wa.me/?text=${text}`, '_blank');
                        }}
                        className="text-primary hover:text-gray-900 transition-colors"
                      >
                        <MessageCircle className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Property Details */}
              <div className="px-4 mt-6">
                <div className="mb-8 lg:pl-4 lg:pr-4">
                  <h2 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-6 mt-4" data-testid="property-description-title">
                    Property Description
                  </h2>
                  <div className="text-sm text-primary leading-relaxed" data-testid="property-full-description">
                    {property.fullDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Add-on Services */}
                <div className="mb-8 lg:pl-4 lg:pr-4">
                  <h3 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-6 mt-4" data-testid="addon-services-title">
                    Add-on Services
                  </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <Car className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-chauffeur-title">Private Chauffeur Services</h4>
                          <p className="text-primary text-sm" data-testid="service-chauffeur-description">Professional transportation throughout your stay</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <ChefHat className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-chef-title">In-residence Private Chef</h4>
                          <p className="text-primary text-sm" data-testid="service-chef-description">Bespoke dining experiences in your residence</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <Heading className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-helicopter-title">Helicopter Transfers</h4>
                          <p className="text-primary text-sm" data-testid="service-helicopter-description">Subject to availability</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shirt className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-housekeeping-title">Full Laundry & Housekeeping</h4>
                          <p className="text-primary text-sm" data-testid="service-housekeeping-description">Daily serviced fresh towels and linens</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <Tickets className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-tickets-title">Ryder Cup Tickets</h4>
                          <p className="text-primary text-sm" data-testid="service-tickets-description">Subject to availability</p>
                        </div>
                      </div>
                      
                      {(property.id === 'rangeview' || property.id === 'the-captains' || property.id === 'the-fairways') && (
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Crown className="text-white h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary mb-1" data-testid="service-hospitality-title">Bespoke Hospitality & Entertainment</h4>
                            <p className="text-primary text-sm" data-testid="service-hospitality-description">Available upon request</p>
                          </div>
                        </div>
                      )}
                    </div>
                </div>

                {/* Location Map */}
                <div className="mb-8 lg:pl-4 lg:pr-4">
                  <h3 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-2 mt-4" data-testid="location-map-title">Location</h3>
                  <p className="text-sm text-primary font-serif mb-4" data-testid="property-walking-distance-detail">
                    {property.walkingDistance}
                  </p>
                  <div className="aspect-[1.7/1.1] bg-gray-200 relative overflow-hidden">
                    <PropertyMap propertyId={property.id} />
                  </div>
                </div>
                {/* Features and Amenities - Combined on one line */}
                <div className="grid md:grid-cols-2 gap-6 mb-12 lg:pl-4 lg:pr-4">
                  {/* Features */}
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-6 mt-4">Features</h3>
                    <ul className="space-y-3 list-none">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3" data-testid={`property-feature-${index}`}>
                          <span className="w-1.5 h-1.5 border border-gray-700 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-6 mt-4">Amenities</h3>
                    <ul className="space-y-3 list-none">
                      {property.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-start space-x-3" data-testid={`property-amenity-${index}`}>
                          <span className="w-1.5 h-1.5 border border-gray-700 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-700 text-sm leading-relaxed">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Enquire Section with proper positioning */}
            <div className="lg:col-span-1 hidden lg:block bg-neutral-100 -mt-24">
              <div 
                className="sticky bg-neutral-100 px-8 pt-8" 
                style={{
                  top: '6.5rem', // ENQUIRE SECTION VERTICAL POSITION CONTROL - adjust this value to move content up/down
                  maxHeight: 'calc(100vh - 0rem)', // ENQUIRE SECTION BOTTOM POSITION CONTROL - decrease this value to allow content to extend lower
                }}
              >
                <div className="max-w-sm mx-auto">
                  {/* Property Information */}
                  <div className="mb-6">
                    <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-2 text-left">
                      {property.name}
                    </h1>
                    <p className="text-sm text-primary font-serif mb-0 text-left">Available exclusively for Ryder Cup 2027</p>
                    <p className="text-sm text-primary font-serif mb-4 text-left">10-day minimum stay</p>
                    <p className="text-sm text-primary leading-relaxed mb-1 text-left">
                      {property.subtitle}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <Button 
                      onClick={handleRequestAvailability}
                      className="border border-gray-700 bg-gray-700 text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-transparent hover:!text-gray-700 transition-all duration-200 w-full"
                      data-testid="button-request-availability"
                    >
                      REQUEST AVAILABILITY
                    </Button>
                    
                  </div>

                  {/* Map & Brochure Links */}
                  <div className="space-y-4 mb-7 mt-4">
                    <div className="flex justify-center space-x-2">
                      <Button 
                        onClick={handleViewMap}
                        className={`border border-gray-700 bg-white text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 ${
                          (property.id === 'the-captains' || property.id === 'cragleigh-house') ? 'w-full' : 'w-1/2'
                        }`}
                      >
                        MAP
                      </Button>
                      {property.id !== 'the-captains' && property.id !== 'cragleigh-house' && (
                        <Button 
                          onClick={handleDownloadBrochure}
                          className="border border-gray-700 bg-white text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-1/2"
                        >
                          BROCHURE
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Price and Enquiry Information */}
                  <div className="text-center mb-6">
                    <p className="text-xs text-primary font-medium uppercase tracking-wider">
                      Price on Application | Enquiries by Private Appointment Only
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="text-center">
                      <p className="text-sm text-primary mb-3">Share this property</p>
                      <div className="flex justify-center space-x-4">
                        <button 
                          onClick={() => {
                            const subject = encodeURIComponent("Property at The Adare Collection");
                            const body = encodeURIComponent(`Look at this home that I found for the 2027 Ryder Cup!\n\n${window.location.href}`);
                            window.location.href = `mailto:?subject=${subject}&body=${body}`;
                          }}
                          className="text-primary hover:text-gray-900 transition-colors"
                        >
                          <Mail className="h-6 w-6" />
                        </button>
                        <button 
                          onClick={() => {
                            const text = encodeURIComponent(`Look at this home that I found for the 2027 Ryder Cup! ${window.location.href}`);
                            window.open(`https://wa.me/?text=${text}`, '_blank');
                          }}
                          className="text-primary hover:text-gray-900 transition-colors"
                        >
                          <MessageCircle className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        videoUrl={videoUrl}
      />
      
      {/* Map Modal */}
      <MapModal 
        isOpen={isMapModalOpen}
        onClose={handleCloseMap}
        propertyId={property?.id || ''}
      />
    </div>
  );
}