/// <reference types="google.maps" />

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const propertyImages = [
  "/images/hero/adaremanor-img3.jpg",
  "/images/hero/adaremanor-img2.jpg",
  "/images/hero/adaremanor-img1.jpg",
  "/images/hero/adaremanor-img3.webp",
];

// Served by the dev server from client/public
const GEOJSON_URL = "/data/adare_demesne.geojson";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const scrollToProperties = () => {
    const el = document.getElementById("properties");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);

  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + propertyImages.length) % propertyImages.length
    );

  const selectImage = (index: number) => setCurrentImageIndex(index);

  // --- GOOGLE MAPS LOADER & INIT ---
  useEffect(() => {
    const initMapFn = () => {
      const map = new google.maps.Map(
        document.getElementById("hero-map") as HTMLElement,
        {
          center: { lat: 52.562213, lng: -8.781279 },
          zoom: 15,
          mapId: "c3acdccb9694c869d85b690f", // your Map ID
          disableDefaultUI: true,
        }
      );

      // ---- LOAD GEOJSON OVERLAY ----
      map.data.loadGeoJson(GEOJSON_URL, null, () => {
        // Apply initial style after data loads
        applyStyle();
      });

      // ---- THEME / STYLES ----
      const styleFor = (feature: google.maps.Data.Feature, zoom: number) => {
        const leisure = feature.getProperty("leisure");
        const golf = feature.getProperty("golf");
        const hasBuilding = !!feature.getProperty("building");

        // Outer golf course polygon
        if (leisure === "golf_course") {
          return {
            fillColor: "#2e7d32", // deep green
            fillOpacity: 0.18,
            strokeColor: "#1b5e20",
            strokeWeight: 2,
          };
        }

        // Golf sub-features (hide holes if present; keep fairway/green/tee)
        if (golf === "hole") {
          return { visible: false }; // ensure hole lines are suppressed even if present
        }
        if (golf === "fairway") {
          return {
            fillColor: "#66bb6a",
            fillOpacity: 0.25,
            strokeColor: "#388e3c",
            strokeWeight: 1,
          };
        }
        if (golf === "green") {
          return {
            fillColor: "#a5d6a7",
            fillOpacity: 0.35,
            strokeColor: "#2e7d32",
            strokeWeight: 1,
          };
        }
        if (golf === "tee") {
          return {
            fillColor: "#81c784",
            fillOpacity: 0.35,
            strokeColor: "#2e7d32",
            strokeWeight: 1,
          };
        }

        // Buildings: show only when zoomed in enough
        if (hasBuilding) {
          if (zoom < 15) return { visible: false };
          return {
            fillColor: "#9e9e9e",
            fillOpacity: 0.55,
            strokeColor: "#616161",
            strokeWeight: 1,
          };
        }

        return {};
      };

      const applyStyle = () => {
        const z = map.getZoom() ?? 15;
        map.data.setStyle((f) => styleFor(f, z));
      };

      // Keep styles in sync with zoom level
      map.addListener("zoom_changed", applyStyle);
    };

    // If API already loaded (client-side route back), just init
    if ((window as any).google) {
      initMapFn();
      return;
    }

    // Otherwise load the script once
    const existingScript = document.getElementById("google-maps-script");
    if (!existingScript) {
      (window as any).initMap = initMapFn;
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.async = true;
      script.defer = true;
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCNQfvlQLy7tm9sB57m2mMsUt9CWln41_s&callback=initMap";
      document.body.appendChild(script);
    } else {
      // script tag exists but google isn’t on window yet
      (window as any).initMap = initMapFn;
    }
  }, []);

  return (
    <div className="bg-white py-16">
      <section className="relative lg:h-[85vh] h-auto flex overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch">
          {/* Image Gallery Section */}
          <div className="lg:w-3/5 w-full lg:h-full relative bg-white flex flex-col lg:mr-4">
            {/* Main Image with fade transition */}
            <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:flex-1 overflow-hidden">
              {propertyImages.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`Property view ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-white drop-shadow-lg" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-white drop-shadow-lg" />
              </button>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                <div className="text-left text-white px-12 pb-12 md:pb-16 lg:pb-20 max-w-2xl">
                  <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-0 md:mb-2 leading-tight font-medium">
                    Ryder Cup 2027
                  </h1>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-0 mb-2 md:mb-6 leading-tight font-medium">
                    Executive Rentals
                  </h2>
                  <p className="text-white mb-2 md:mb-6 font-medium text-xs sm:text-sm md:text-[calc(1.4*0.875rem)]">
                    Private Residences | Adare Manor Estate & Surrounds
                  </p>
                  <Button
                    onClick={scrollToProperties}
                    className="bg-primary text-white px-4 py-1.5 text-xs md:px-6 md:py-2 md:text-sm font-medium hover:bg-primary/80 hover:scale-105 transition-all duration-200"
                  >
                    See Properties
                  </Button>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="h-32 bg-white flex items-center px-3 sm:px-4 md:px-6 gap-2 sm:gap-3">
              <button
                onClick={prevImage}
                className="inline-flex p-1 hover:bg-gray-100 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700" />
              </button>

              <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-3">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`w-full border ${
                      index === currentImageIndex
                        ? "border-black"
                        : "border-transparent"
                    } transition-colors bg-white`}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <div className="w-full aspect-[5/4] overflow-hidden bg-white p-1">
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={nextImage}
                className="inline-flex p-1 hover:bg-gray-100 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:w-2/5 w-full lg:h-full relative mt-8 lg:mt-0">
            <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[60vh] lg:h-full overflow-hidden shadow-lg">
              <div id="hero-map" className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
