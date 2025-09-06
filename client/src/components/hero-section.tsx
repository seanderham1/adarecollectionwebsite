/// <reference types="google.maps" />

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { 
  loadGoogleMapsScript, 
  MAP_CENTER, 
  GEOJSON_URL, 
  PROPERTIES_URL,
  createPropertyMarker,
  createPropertyInfoWindowContent,
  addHeroWalkRadiusCircle
} from "@/lib/map-utils";

const propertyImages = [
  "/images/hero/adaremanor-img3.jpg",
  "/images/hero/adaremanor-img2.jpg",
  "/images/hero/adaremanor-img1.jpg",
  "/images/hero/adaremanor-img3.webp",
];

// Countdown component
function RyderCupCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2027-09-25T00:00:00'); // Ryder Cup 2027 start date

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="bg-white bg-opacity-50 backdrop-blur-sm px-6 lg:px-8 py-3">
        <div className="text-xs font-medium text-gray-900 uppercase tracking-wider">
          RYDER CUP 2027 IN: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>
    </div>
  );
}

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
    // Create a single info window that will be reused
    let currentInfoWindow: google.maps.InfoWindow | null = null;

    const initMap = async () => {
      try {
        // Load Google Maps script
        await loadGoogleMapsScript();

        const map = new google.maps.Map(
          document.getElementById("hero-map") as HTMLElement,
          {
            center: MAP_CENTER,
            zoom: 15,
            mapId: "c3acdccb9694c869d85b690f", // your Map ID
            disableDefaultUI: true,
          }
        );

        // Add walk radius circle and label
        addHeroWalkRadiusCircle(map);

        // Load and style GeoJSON overlay
        map.data.loadGeoJson(GEOJSON_URL, null, (features) => {
          console.log("GeoJSON loaded with features:", features);
          
          // Apply styling directly using original colors and stroke weights
          const z = map.getZoom() ?? 15;
          map.data.setStyle((f) => {
            const leisure = f.getProperty("leisure");
            const golf = f.getProperty("golf");
            const hasBuilding = !!f.getProperty("building");
            console.log("Styling feature:", { leisure, golf, hasBuilding });
            
            if (leisure === "golf_course") {
              return {
                fillColor: "#d0e2c4",
                fillOpacity: 0.18,
                strokeColor: "#c1d3b5",
                strokeWeight: 2,
                zIndex: 1,
              };
            }
            if (golf === "hole") return { visible: false };
            if (golf === "fairway") {
              return {
                fillColor: "#c8e0bb",
                fillOpacity: 0.25,
                strokeColor: "#b9d1ac",
                strokeWeight: 1,
                zIndex: 2,
              };
            }
            if (golf === "green") {
              return {
                fillColor: "#c8e0bb",
                fillOpacity: 0.35,
                strokeColor: "#b9d1ac",
                strokeWeight: 1,
                zIndex: 3,
              };
            }
            if (golf === "tee") {
              return {
                fillColor: "#c8e0bb",
                fillOpacity: 0.35,
                strokeColor: "#b9d1ac",
                strokeWeight: 1,
                zIndex: 2,
              };
            }
            if (hasBuilding) {
              if (z < 15) return { visible: false };
              return {
                fillColor: "#eeeeee",
                fillOpacity: 0.8,
                strokeColor: "#dbdbdb",
                strokeWeight: 1,
                zIndex: 4,
              };
            }
            return {};
          });
          
          // Add zoom change listener to reapply styling
          map.addListener("zoom_changed", () => {
            const newZ = map.getZoom() ?? 15;
            map.data.setStyle((f) => {
              const leisure = f.getProperty("leisure");
              const golf = f.getProperty("golf");
              const hasBuilding = !!f.getProperty("building");
              
              if (leisure === "golf_course") {
                return {
                  fillColor: "#d0e2c4",
                  fillOpacity: 0.18,
                  strokeColor: "#c1d3b5",
                  strokeWeight: 2,
                  zIndex: 1,
                };
              }
              if (golf === "hole") return { visible: false };
              if (golf === "fairway") {
                return {
                  fillColor: "#c8e0bb",
                  fillOpacity: 0.25,
                  strokeColor: "#b9d1ac",
                  strokeWeight: 1,
                  zIndex: 2,
                };
              }
              if (golf === "green") {
                return {
                  fillColor: "#c8e0bb",
                  fillOpacity: 0.35,
                  strokeColor: "#b9d1ac",
                  strokeWeight: 1,
                  zIndex: 3,
                };
              }
              if (golf === "tee") {
                return {
                  fillColor: "#c8e0bb",
                  fillOpacity: 0.35,
                  strokeColor: "#b9d1ac",
                  strokeWeight: 1,
                  zIndex: 2,
                };
              }
              if (hasBuilding) {
                if (newZ < 15) return { visible: false };
                return {
                  fillColor: "#eeeeee",
                  fillOpacity: 0.8,
                  strokeColor: "#dbdbdb",
                  strokeWeight: 1,
                  zIndex: 4,
                };
              }
              return {};
            });
          });
        });

        // Map click listener to close info windows
        map.addListener("click", () => {
          if (currentInfoWindow) {
            currentInfoWindow.close();
            currentInfoWindow = null;
          }
        });

        // Load properties and add markers
        console.log("Loading properties from:", PROPERTIES_URL);
        fetch(PROPERTIES_URL)
          .then((r) => {
            console.log("Fetch response status:", r.status);
            if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
            return r.json();
          })
          .then((fc) => {
            console.log("Properties data loaded:", fc);
            if (!fc || !Array.isArray(fc.features)) {
              throw new Error("Bad properties geojson structure");
            }
            console.log("Found", fc.features.length, "properties");
            fc.features.forEach((feat: any, index: number) => {
              console.log(`Processing feature ${index}:`, feat);
              if (!feat.geometry || feat.geometry.type !== "Point") {
                console.log(`Skipping feature ${index}: not a Point geometry`);
                return;
              }
              const [lng, lat] = feat.geometry.coordinates;
              const p = feat.properties || {};
              console.log(`Adding marker for ${p.title} at [${lat}, ${lng}]`);
              
              const marker = createPropertyMarker(map, { lat, lng }, p);
              
              // Add click listener to marker
              marker.addListener("click", () => {
                if (currentInfoWindow) {
                  currentInfoWindow.close();
                }
                currentInfoWindow = new google.maps.InfoWindow({
                  content: createPropertyInfoWindowContent(p),
                  maxWidth: 280,
                });
                currentInfoWindow.open(map, marker);
              });
            });
          })
          .catch((error) => {
            console.error("Error loading properties:", error);
            // fallback marker if properties.geojson is missing
            console.log("Adding fallback marker");
            const fallbackProps = {
              title: "Putters Way",
              desc: "Premium residence within the private Golf Village of Adare Manor, metres from the Carriage House and a short stroll to the 1st tee.",
              url: "http://localhost:3000/property/putters-way",
            };
            
            const marker = createPropertyMarker(
              map,
              { lat: 52.55886548383084, lng: -8.78699909386544 },
              fallbackProps
            );
            
            marker.addListener("click", () => {
              if (currentInfoWindow) {
                currentInfoWindow.close();
              }
              currentInfoWindow = new google.maps.InfoWindow({
                content: createPropertyInfoWindowContent(fallbackProps),
                maxWidth: 280,
              });
              currentInfoWindow.open(map, marker);
            });
          });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();
  }, []);

  return (
    <div className="bg-white w-full pt-16">
      <section className="relative lg:h-[85vh] h-auto flex overflow-hidden bg-white w-full">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Image Gallery Section */}
          <div className="lg:w-2/3 w-full lg:h-full relative bg-white flex flex-col">
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

              {/* Ryder Cup Countdown Overlay */}
              <RyderCupCountdown />

              {/* Bottom Right Navigation with Separate White Squares */}
              <div className="absolute bottom-6 right-6 z-10 flex space-x-2">
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

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center">
                <div className="text-left text-white px-6 lg:px-8 max-w-2xl">
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
                    className="border border-white bg-transparent text-white px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-none hover:bg-white hover:text-gray-900 transition-all duration-200"
                  >
                    SEE PROPERTIES
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:w-1/3 w-full lg:h-full relative mt-8 lg:mt-0">
            <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[60vh] lg:h-full overflow-hidden shadow-lg">
              <div id="hero-map" className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}