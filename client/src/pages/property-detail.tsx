import { useParams, useSearch, useLocation, Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PropertyMap from "@/components/property-map";
import VideoModal from "@/components/video-modal";
import { PropertyEnquiryModal } from "@/components/property-enquiry-modal";
import MapModal from "@/components/map-modal";
import MatterportModal from "@/components/matterport-modal";
import BrochureModal from "@/components/brochure-modal";
import { properties, getPropertyCollectionBadge } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  ChefHat,
  Heading,
  Shirt,
  Crown,
  Bed,
  Mail,
  MessageCircle,
  Bath,
  Users,
  MapPinned,
  TrainFront,
  Tv,
  Maximize2,
  UtensilsCrossed,
  CookingPot,
  ChevronLeft,
  ChevronRight,
  Play,
  Scan,
  Package,
  Sofa,
  Accessibility,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useState, useEffect, type CSSProperties } from "react";
import { useSEO } from "@/hooks/use-seo";
import { PropertyStructuredData, BreadcrumbListStructuredData } from "@/components/structured-data";
import {
  getPropertyRouteSEOPayload,
  SITE_ORIGIN,
  toUseSEOArgs,
} from "@/lib/prerender-route-meta";
import { getPropertySeoSupplementParagraphs } from "@/lib/property-seo-content";
import { SeoHubLinks } from "@/components/seo-hub-links";

const PROPERTY_SPEC_ICONS: Record<string, LucideIcon> = {
  Bedrooms: Bed,
  Bathrooms: Bath,
  Occupancy: Users,
  "Reception rooms": Sofa,
  "Distance from Ryder Cup Course": MapPinned,
  "Distance to Park and Ride": MapPinned,
  "Distance from Ryder Cup train": TrainFront,
  "Number of TVs": Tv,
  "Square footage": Maximize2,
  "Dining seating": UtensilsCrossed,
  "Kitchen seating": CookingPot,
  "Kitchen/Dining seating": UtensilsCrossed,
  Accessibility: Accessibility,
  "Guest bedroom": Bed,
  "Kitchen & dining": UtensilsCrossed,
  Interiors: Sun,
  Location: MapPinned,
};

/** Parkview: pre-load guess (overridden by intrinsic size on onLoad). Exterior/kitchen/sitting are typically landscape. */
function parkviewGuessLandscape(src: string): boolean {
  return (
    src.includes("/exterior/") ||
    src.includes("/kitchen/") ||
    src.includes("/sitting-room/")
  );
}

/** Croagh: guessed landscape paths before intrinsic size is known; everything else defaults to centred contain until onLoad confirms. */
function croaghGuessLandscape(src: string): boolean {
  if (!src.includes("/croaghhouse/")) return false;
  return (
    src.includes("/exterior/") ||
    src.includes("/kitchen/") ||
    src.includes("/sittingroom/") ||
    src.includes("/landing/") ||
    src.includes("masterbedroom-1.webp") ||
    src.includes("masterbedroom-2.webp") ||
    src.includes("bedroom2-1.webp") ||
    src.includes("croaghhouse-bedroom3.webp") ||
    src.includes("croaghhouse-bedroom4.webp")
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const search = useSearch();
  const [location] = useLocation();
  const property = properties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Check for video parameter immediately and set initial state
  const urlParams = new URLSearchParams(window.location.search);
  const hasVideoParam = urlParams.get('video') === 'true';
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isMatterportModalOpen, setIsMatterportModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [videoStartMuted, setVideoStartMuted] = useState(hasVideoParam); // Start muted if video param is present
  
  // Use property-specific video URL only
  const videoUrl = property?.videoUrl;
  const hasVideo = Boolean(videoUrl);
  const matterportUrl = property?.matterportUrl;
  const hasMatterport = Boolean(matterportUrl);

  /** Parkview gallery: intrinsic portrait vs landscape (src key), so vertical shots aren’t full-bleed cover */
  const [parkviewImageOrient, setParkviewImageOrient] = useState<
    Record<string, "portrait" | "landscape">
  >({});

  /** Croagh House: same pattern; portrait assets get centred contain like utility bathrooms */
  const [croaghImageOrient, setCroaghImageOrient] = useState<
    Record<string, "portrait" | "landscape">
  >({});

  /**
   * Default carousel branch: intrinsic orientation per `src`, so portrait photos (taller than wide)
   * use centred contain instead of cropped cover. Parkview/Croagh keep their own state + guesses.
   */
  const [carouselImageOrient, setCarouselImageOrient] = useState<
    Record<string, "portrait" | "landscape">
  >({});

  useSEO(
    property
      ? toUseSEOArgs(getPropertyRouteSEOPayload(property))
      : {
          title: "Property Details | The Adare Collection",
          description:
            "Discover luxury Ryder Cup 2027 accommodation at The Adare Collection.",
          keywords:
            "Ryder Cup 2027 accommodation, Adare rental Ryder Cup, Adare Manor rental, golf accommodation",
          ogImage: `${SITE_ORIGIN}/images/hero/adaremanor-img1.webp`,
          ogUrl: `${SITE_ORIGIN}/property/${id ?? ""}`,
        },
  );

  // Auto-play video if URL parameter is present
  useEffect(() => {
    console.log('Video autoplay check:', { 
      hasVideoParam, 
      property: property?.id,
      url: window.location.href 
    });
    
    if (hasVideoParam && property) {
      console.log('Opening video modal for property:', property.id);
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        console.log('Setting video modal open');
        setIsVideoModalOpen(true);
      }, 1500); // Increased delay to ensure everything is loaded
      
      return () => clearTimeout(timer);
    }
  }, [hasVideoParam, property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-warm-white">
        <Navigation />
        <div className="pt-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl font-bold text-charcoal mb-4">Property Not Found</h1>
            <p className="text-dark-gray">The property you're looking for doesn't exist.</p>
            <p className="text-sm text-gray-500 mt-2">ID: {id}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Debug info - remove this later
  console.log('PropertyDetail rendered:', { 
    id, 
    property: property.id, 
    hasVideoParam, 
    isVideoModalOpen,
    url: window.location.href 
  });

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );

  const selectImage = (index: number) => setCurrentImageIndex(index);

  const handleRequestAvailability = () => {
    setIsEnquiryModalOpen(true);
  };

  const handleCloseEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
  };

  const handleViewVideo = () => {
    // Set video to start unmuted when manually clicked
    setVideoStartMuted(false);
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

  const handleViewBrochure = () => {
    setIsBrochureModalOpen(true);
  };

  const handleCloseBrochure = () => {
    setIsBrochureModalOpen(false);
  };

  const handleOpenMatterport = () => {
    setIsMatterportModalOpen(true);
  };

  const handleCloseMatterport = () => {
    setIsMatterportModalOpen(false);
  };

  const getBrochureUrl = () => {
    // PDF brochures removed - using WebP brochure modal instead
    return null;
  };

  const handleDownloadBrochure = () => {
    // Always open brochure modal for WebP brochure viewing
    setIsBrochureModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <PropertyStructuredData propertyId={property.id} />
      <BreadcrumbListStructuredData propertyName={property.name} propertyId={property.id} />
      <Navigation />
      
      <div className="pt-24">
        {/* Main Content Container - Full Page Layout */}
        <div className="max-w-[2000px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-0 min-h-screen">
            {/* Left Content - Hero and Property Details */}
            <div className="lg:col-span-2 min-h-0 bg-white">
              {/* Hero Section */}
              <section className="relative w-full overflow-hidden bg-white -mt-24 lg:min-h-0">
                {/* White mask to cover area above navigation */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-white z-10"></div>
                <div className="lg:h-[85vh] lg:min-h-0 relative bg-white flex min-h-0 flex-col">
                  {/* Main Image with fade transition: min-h-0 + basis-0 so flex/grid ancestors don’t clip cover height */}
                  <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:min-h-0 lg:flex-1 lg:basis-0 w-full min-h-0 overflow-hidden bg-white">
                    {property.images.map((image, index) => {
                      const src = property.images[index];
                      const isParkview = property.id === "parkview-house";
                      const isCroagh = property.id === "croagh-house";

                      const croaghPortraitStyle: CSSProperties = {
                        transform: "translate(-50%, -50%)",
                        objectPosition: "center center",
                        objectFit: "contain",
                      };
                      const croaghLandscapeStyle: CSSProperties = {
                        objectFit: "cover",
                        objectPosition: "center center",
                        width: "100%",
                        height: "100%",
                        minWidth: "100%",
                        minHeight: "100%",
                      };

                      let layoutClass: string;
                      let imgStyle: CSSProperties;

                      if (isParkview) {
                        const measured = parkviewImageOrient[src];
                        const isPortrait =
                          measured === "portrait"
                            ? true
                            : measured === "landscape"
                              ? false
                              : !parkviewGuessLandscape(src);
                        if (isPortrait) {
                          layoutClass =
                            "left-1/2 top-1/2 block h-full max-h-full w-auto max-w-full object-contain";
                          imgStyle = {
                            transform: "translate(-50%, -50%)",
                            objectFit: "contain",
                            objectPosition: "center center",
                          };
                        } else {
                          layoutClass =
                            "top-0 left-1/2 block h-full max-h-full w-auto min-w-full -translate-x-1/2 object-cover";
                          imgStyle = {
                            objectFit: "cover",
                            objectPosition: "center center",
                            height: "100%",
                            width: "auto",
                            minWidth: "100%",
                            maxHeight: "100%",
                          };
                        }
                      } else if (isCroagh) {
                        const measured = croaghImageOrient[src];
                        const isPortrait =
                          measured === "portrait"
                            ? true
                            : measured === "landscape"
                              ? false
                              : !croaghGuessLandscape(src);
                        if (isPortrait) {
                          layoutClass =
                            "left-1/2 top-1/2 block h-full max-h-full w-auto max-w-full object-contain";
                          imgStyle = croaghPortraitStyle;
                        } else {
                          layoutClass =
                            "inset-0 block h-full w-full min-h-full min-w-full object-cover object-center";
                          imgStyle = croaghLandscapeStyle;
                        }
                      } else if (
                        src.includes("house-7-downstairs-bathroom") ||
                        src.includes("house-7-fourth-bedroombath-2") ||
                        src.includes("house-7-fourth-bedroombath-3") ||
                        src.includes("house-1-hall.webp") ||
                        src.includes("house-2-bathroom-1.webp") ||
                        src.includes("house-2-bathroom-2.webp") ||
                        src.includes("house-2-bathroom-3.webp") ||
                        src.includes("house-3-master-bath-1.webp") ||
                        src.includes("house-3-master-bath-2.webp") ||
                        src.includes("house-3-master-bath-3.webp") ||
                        src.includes("house-4-rolex.webp") ||
                        src.includes("house-6-shower-room.webp") ||
                        src.includes("house-9-bathroom-1.webp") ||
                        src.includes("house-9-bathroom-2.webp") ||
                        src.includes("house-9-bedroom-2.webp") ||
                        src.includes("house-9-bedroom-3.webp") ||
                        src.includes("house-9-kitchen-4.webp") ||
                        src.includes("house-9-stairs-under.webp") ||
                        src.includes("house-9-stairs.webp")
                      ) {
                        layoutClass =
                          "inset-0 w-full h-full min-w-full min-h-full object-contain";
                        imgStyle = {
                          transform: "translateY(0%)",
                          objectFit: "contain",
                          objectPosition:
                            property.id === "the-captains"
                              ? src.includes("house-3-master-bath-1.webp") ||
                                  src.includes("house-3-master-bath-2.webp") ||
                                  src.includes("house-3-master-bath-3.webp")
                                ? "center center"
                                : "5% center"
                              : property.id === "rangeview"
                                ? "center 30%"
                                : src.includes("house-1-hall.webp")
                                  ? "center 30%"
                                  : src.includes("house-3-master-bath-1.webp") ||
                                      src.includes("house-3-master-bath-2.webp") ||
                                      src.includes("house-3-master-bath-3.webp")
                                    ? "center center"
                                    : "center center",
                        };
                      } else if (carouselImageOrient[src] === "portrait") {
                        layoutClass =
                          "left-1/2 top-1/2 block h-full max-h-full w-auto max-w-full object-contain";
                        imgStyle = croaghPortraitStyle;
                      } else {
                        layoutClass =
                          "inset-0 w-full h-full min-w-full min-h-full object-cover";
                        imgStyle = {
                          transform:
                            src.includes("/house 4/house-4-rolex.webp") ||
                            (property.id === "putters-way" && index === 8)
                              ? "translateY(10%)"
                              : "translateY(5%)",
                          objectPosition:
                            src.includes("/house 4/house-4-rolex.webp") ||
                            (property.id === "putters-way" && index === 8)
                              ? "center 50%"
                              : property.id === "the-captains"
                                ? src.includes("house-3-master-bath-1.webp") ||
                                    src.includes("house-3-master-bath-2.webp") ||
                                    src.includes("house-3-master-bath-3.webp")
                                  ? "center center"
                                  : "5% center"
                                : property.id === "rangeview"
                                  ? "center 30%"
                                  : src.includes("house-1-hall.webp")
                                    ? "center 30%"
                                    : src.includes("house-3-master-bath-1.webp") ||
                                        src.includes("house-3-master-bath-2.webp") ||
                                        src.includes("house-3-master-bath-3.webp")
                                      ? "center center"
                                      : "center center",
                        };
                      }

                      return (
                        <img
                          key={image}
                          src={image}
                          alt={`${property.name} - Ryder Cup 2027 accommodation at Adare Manor - Image ${index + 1}`}
                          className={`absolute transition-opacity duration-700 ${layoutClass} ${
                            index === currentImageIndex ? "opacity-100 z-[1]" : "opacity-0 z-0"
                          }`}
                          style={imgStyle}
                          onLoad={(e) => {
                            const el = e.currentTarget;
                            const o =
                              el.naturalHeight > el.naturalWidth * 1.02
                                ? "portrait"
                                : "landscape";
                            setCarouselImageOrient((prev) =>
                              prev[src] === o ? prev : { ...prev, [src]: o }
                            );
                            if (property.id === "parkview-house") {
                              setParkviewImageOrient((prev) =>
                                prev[src] === o ? prev : { ...prev, [src]: o }
                              );
                            }
                            if (property.id === "croagh-house") {
                              setCroaghImageOrient((prev) =>
                                prev[src] === o ? prev : { ...prev, [src]: o }
                              );
                            }
                          }}
                          data-testid={`property-gallery-image-${index}`}
                        />
                      );
                    })}

                    {/* Collection tier banner */}
                    <div className="absolute top-16 left-0 right-0 z-20">
                      <div className="bg-white bg-opacity-50 backdrop-blur-sm px-4 py-2">
                        <div className="text-xs font-medium text-gray-900 uppercase tracking-wider font-sans">
                          {getPropertyCollectionBadge(property.id)}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Right Navigation with Play Video and Arrow Buttons */}
                    <div className="absolute bottom-6 right-6 z-10 flex flex-wrap justify-end gap-2 max-w-[calc(100%-3rem)]">
                      {/* Play Video Button */}
                      {hasVideo && (
                        <button
                          onClick={handleViewVideo}
                          className="bg-white shadow-lg px-4 h-10 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-100 cursor-pointer"
                          aria-label="Play video"
                        >
                          <Play className="h-4 w-4 stroke-2 text-black" />
                          <span className="text-sm font-medium text-black">PLAY VIDEO</span>
                        </button>
                      )}
                      {hasMatterport && (
                        <button
                          type="button"
                          onClick={handleOpenMatterport}
                          className="bg-white shadow-lg px-4 h-10 flex items-center justify-center gap-2 transition-all duration-200 hover:bg-gray-100 cursor-pointer"
                          aria-label="Open 360 degree virtual tour"
                        >
                          <Scan className="h-4 w-4 stroke-2 text-black shrink-0" />
                          <span className="text-sm font-medium text-black whitespace-nowrap">
                            VIEW 360° TOUR
                          </span>
                        </button>
                      )}
                      
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
                    <p className="text-sm text-primary font-serif mb-1">Available exclusively for Ryder Cup 2027</p>
                    
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

{property.id !== 'dunes-lodge' && property.id !== 'the-first-tee' && property.id !== 'croagh-house' && property.id !== 'parkview-house' && property.id !== 'hillview-house' && property.id !== 'portland-house' && property.id !== 'nead-fainleog' && property.id !== 'the-manor-lodge' && (
                        <Button 
                          onClick={handleDownloadBrochure}
                          className="border border-gray-700 bg-white text-gray-700 px-4 py-3 text-sm font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-full"
                        >
                          BROCHURE
                        </Button>
                      )}
                  </div>

                  <p className="text-xs text-secondary text-center mt-4 leading-relaxed px-2">
                    General questions about booking or Ryder Cup 2027?{" "}
                    <Link href="/faq" className="underline underline-offset-4 hover:text-gray-900">
                      Read our FAQ
                    </Link>
                    .
                  </p>

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
                      <p key={`base-${index}`} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                    {(property.id === "rangeview" || property.id === "the-captains" || property.id === "putters-way" || property.id === "the-first-tee" || property.id === "the-fairways" || property.id === "cragleigh-house" || property.id === "darrira-house" || property.id === "croagh-house" || property.id === "parkview-house" || property.id === "portland-house" || property.id === "dunes-lodge" || property.id === "hillview-house" || property.id === "nead-fainleog" || property.id === "the-manor-lodge") &&
                      getPropertySeoSupplementParagraphs(property.id).map((paragraph, index) => (
                        <p key={`seo-${index}`} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>

                {property.specs && property.specs.length > 0 && (
                  <div className="mb-8 lg:pl-4 lg:pr-4" data-testid="property-specs">
                    <div className="grid md:grid-cols-2 gap-6">
                      {property.specs.map((spec, index) => {
                        const SpecIcon = PROPERTY_SPEC_ICONS[spec.label];
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-4"
                            data-testid={`property-spec-${index}`}
                          >
                            {SpecIcon && (
                              <div
                                className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0"
                                aria-hidden
                              >
                                <SpecIcon className="text-white h-6 w-6" />
                              </div>
                            )}
                            <div>
                              <h4 className="font-semibold text-primary mb-1">{spec.label}</h4>
                              <p className="text-primary text-sm">{spec.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="mb-8 lg:pl-4 lg:pr-4">
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
                <div className="mb-8 lg:pl-4 lg:pr-4">
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

                {/* Location Map */}
                <div className="mb-8 lg:pl-4 lg:pr-4">
                  <h3 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-2 mt-4" data-testid="location-map-title">Location</h3>
                  <p className="text-sm text-primary font-serif mb-4" data-testid="property-walking-distance-detail">
                    {property.walkingDistance}
                  </p>
                  {property.eircode && property.id !== "the-first-tee" && property.id !== "nead-fainleog" && property.id !== "the-manor-lodge" && (
                    <p className="text-sm text-primary font-serif mb-4" data-testid="property-eircode">
                      Eircode: {property.eircode}
                    </p>
                  )}
                  <div className="aspect-[1.7/1.1] bg-gray-200 relative overflow-hidden">
                    <PropertyMap propertyId={property.id} />
                  </div>
                </div>

                {/* Add-on Services */}
                <div className="mb-12 lg:pl-4 lg:pr-4">
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
                      
                      {property.id !== "darrira-house" && (
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <ChefHat className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-chef-title">In-residence Private Chef</h4>
                          <p className="text-primary text-sm" data-testid="service-chef-description">Bespoke dining experiences in your residence</p>
                        </div>
                      </div>
                      )}
                      
                      {!["darrira-house", "croagh-house", "parkview-house", "cragleigh-house"].includes(property.id) && (
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Heading className="text-white h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary mb-1" data-testid="service-helicopter-title">Helicopter Transfers</h4>
                            <p className="text-primary text-sm" data-testid="service-helicopter-description">Subject to availability</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shirt className="text-white h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1" data-testid="service-housekeeping-title">Full Laundry</h4>
                          <p className="text-primary text-sm" data-testid="service-housekeeping-description">Professional washing, drying, and pressing service</p>
                        </div>
                      </div>
                      
                      {(property.id === 'rangeview' || property.id === 'the-captains' || property.id === 'the-fairways' || property.id === 'cragleigh-house' || property.id === 'the-first-tee' || property.id === 'croagh-house' || property.id === 'parkview-house' || property.id === 'hillview-house' || property.id === 'portland-house' || property.id === 'nead-fainleog' || property.id === 'the-manor-lodge') && (
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

                      {["croagh-house", "parkview-house"].includes(property.id) && (
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                            <Package className="text-white h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-primary mb-1" data-testid="service-provisioning-title">Pre-arrival provisioning and stocking</h4>
                            <p className="text-primary text-sm" data-testid="service-provisioning-description">Available upon request</p>
                          </div>
                        </div>
                      )}
                    </div>
                </div>

                <SeoHubLinks className="mb-12 lg:pl-4 lg:pr-4 justify-start" />
              </div>
            </div>

            {/* Right Column - Sticky Enquire Section with proper positioning */}
            <div className="lg:col-span-1 hidden lg:block bg-neutral-100 -mt-24">
              <div 
                className="sticky bg-neutral-100 px-8 pt-8 h-[530px] overflow-hidden" 
                style={{
                  top: '4rem', // ENQUIRE SECTION VERTICAL POSITION CONTROL - adjust this value to move content up/down
                }}
              >
                <div className="max-w-sm mx-auto">
                  {/* Property Information */}
                  <div className="mb-6">
                    <h1 className="font-serif text-3xl md:text-4xl font-normal text-primary mb-2 text-left">
                      {property.name}
                    </h1>
                    <p className="text-sm text-primary font-serif mb-1 text-left">Available exclusively for Ryder Cup 2027</p>
                  
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
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-center space-x-2">
                      <Button 
                        onClick={handleViewMap}
                        className={`border border-gray-700 bg-white text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 ${property.id !== 'dunes-lodge' && property.id !== 'the-first-tee' && property.id !== 'croagh-house' && property.id !== 'parkview-house' && property.id !== 'hillview-house' && property.id !== 'portland-house' && property.id !== 'nead-fainleog' && property.id !== 'the-manor-lodge' ? 'w-1/2' : 'w-full'}`}
                      >
                        MAP
                      </Button>
                      {property.id !== 'dunes-lodge' && property.id !== 'the-first-tee' && property.id !== 'croagh-house' && property.id !== 'parkview-house' && property.id !== 'hillview-house' && property.id !== 'portland-house' && property.id !== 'nead-fainleog' && property.id !== 'the-manor-lodge' && (
                        <Button 
                          onClick={handleDownloadBrochure}
                          className="border border-gray-700 bg-white text-gray-700 px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:!bg-gray-700 hover:!text-white transition-all duration-200 w-1/2"
                        >
                          BROCHURE
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-secondary text-left mt-3 mb-7 leading-relaxed">
                    General questions about booking or Ryder Cup 2027?{" "}
                    <Link href="/faq" className="underline underline-offset-4 hover:text-gray-900">
                      Read our FAQ
                    </Link>
                    .
                  </p>

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

      <nav
        aria-label="Other luxury rentals"
        className="border-t border-gray-200 bg-neutral-50 py-10 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-xl font-normal text-primary mb-4 text-center">
            More Ryder Cup 2027 properties
          </h2>
          <p className="text-sm text-secondary text-center mb-6">
            Explore our full portfolio of private homes near Adare Manor.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm list-none">
            <li>
              <Link href="/properties" className="text-gray-900 underline underline-offset-4">
                All properties
              </Link>
            </li>
            {properties
              .filter((p) => p.id !== property.id)
              .map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/property/${p.id}`}
                    className="text-secondary hover:text-gray-900 underline-offset-4 hover:underline"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <Footer />
      
      {/* Video Modal */}
      {hasVideo && (
        <VideoModal 
          isOpen={isVideoModalOpen}
          onClose={handleCloseVideo}
          videoUrl={videoUrl!}
          startMuted={videoStartMuted}
        />
      )}

      <PropertyEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={handleCloseEnquiryModal}
        property={property}
      />
      
      {/* Map Modal */}
      <MapModal 
        isOpen={isMapModalOpen}
        onClose={handleCloseMap}
        propertyId={property?.id || ''}
      />

      {hasMatterport && matterportUrl && (
        <MatterportModal
          isOpen={isMatterportModalOpen}
          onClose={handleCloseMatterport}
          src={matterportUrl}
          title={`${property.name}: 360 degree virtual tour`}
        />
      )}
      
      {/* Brochure Modal */}
      <BrochureModal 
        isOpen={isBrochureModalOpen}
        onClose={handleCloseBrochure}
        propertyId={property?.id || ''}
        title={property?.name || ''}
      />
    </div>
  );
}