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

// Base overlay (golf course + buildings)
const GEOJSON_URL = "/data/adare_demesne.geojson";
// Properties (points layer)
const PROPERTIES_URL = "/data/properties.geojson";

// Constants for walk radius
const WALK_RADIUS_METERS = 800; // Approximately 10 minutes walk at average speed
const MAP_CENTER = { lat: 52.562213, lng: -8.781279 };

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

    const addPropertyMarker = (
      map: google.maps.Map,
      pos: google.maps.LatLngLiteral,
      props: {
        id?: string;
        title?: string;
        url?: string;
        beds?: number;
        baths?: number;
        price?: string;
        thumb?: string;
        desc?: string;
      }
    ) => {
      const marker = new google.maps.Marker({
        map,
        position: pos,
        title: props.title || "Property",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="rgba(0,0,0,0.3)"/>
                </filter>
              </defs>
              <!-- Main pin shape with border -->
              <path fill="#142a4d" stroke="white" stroke-width="0.5" filter="url(#shadow)" d="M14 2.25A9.75 9.75 0 0 1 23.75 12c0 4.12-2.895 8.61-8.61 13.518a1.75 1.75 0 0 1-2.283-.002l-.378-.328C7.017 20.408 4.25 16.028 4.25 12A9.75 9.75 0 0 1 14 2.25Zm0 6a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5Z"/>
              <!-- Inner circle in white -->
              <circle cx="14" cy="12" r="3.75" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(28, 28),
          anchor: new google.maps.Point(14, 28)
        }
      });

      const html = `
        <div style="max-width:260px;font-family:inherit;line-height:1.35">
          ${
            props.thumb
              ? `<img src="${props.thumb}" alt="${props.title ?? "Property"}" style="width:100%;height:auto;border-radius:10px;margin:0 0 8px 0;display:block;"/>`
              : ""
          }
          <div style="font-weight:600;margin:0 0 4px 0">${props.title || "Property"}</div>
          <div style="color:#666;font-size:12px;margin:0 0 6px 0">
            ${props.beds ?? "–"} bed · ${props.baths ?? "–"} bath ${
        props.price ? `· ${props.price}` : ""
      }
          </div>
          ${
            props.desc
              ? `<div style="color:#444;font-size:12px;margin:0 0 8px 0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${props.desc}</div>`
              : ""
          }
          ${
            props.url
              ? `<a href="${props.url}" style="display:inline-block;padding:8px 10px;border-radius:8px;background:#111;color:#fff;text-decoration:none;font-size:12px;">View details</a>`
              : ""
          }
        </div>
      `;
      
      marker.addListener("click", () => {
        // Close any existing info window
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        
        // Create new info window and open it
        currentInfoWindow = new google.maps.InfoWindow({ content: html });
        currentInfoWindow.open({ map, anchor: marker });
      });
    };

    const addWalkRadiusCircle = (map: google.maps.Map) => {
             // Create the circle
       const walkCircle = new google.maps.Circle({
         strokeColor: '#142a4d',
         strokeOpacity: 0.8,
         strokeWeight: 2,
         fillColor: 'transparent',
         fillOpacity: 0,
         map,
         center: MAP_CENTER,
         radius: WALK_RADIUS_METERS,
         zIndex: 20,
         clickable: false,
       });

      // Create a custom overlay for the walking icon and text
      class WalkRadiusLabel extends google.maps.OverlayView {
        private div_: HTMLElement | null = null;
        private position_: google.maps.LatLng;

        constructor(position: google.maps.LatLng) {
          super();
          this.position_ = position;
        }

        onAdd() {
          const div = document.createElement('div');
                     div.style.cssText = `
             position: absolute;
             background-color: #142a4d;
             color: white;
             padding: 6px 10px;
             border-radius: 16px;
             font-size: 12px;
             font-weight: 500;
             white-space: nowrap;
             display: flex;
             align-items: center;
             gap: 4px;
             box-shadow: 0 2px 4px rgba(0,0,0,0.1);
             pointer-events: none;
             z-index: 1000;
           `;

                     // Create walking icon using custom SVG
           const iconSvg = document.createElement('img');
           iconSvg.src = '/icons/walking.svg';
           iconSvg.style.cssText = `
             width: 14px;
             height: 14px;
             filter: brightness(0) invert(1);
           `;

          const textSpan = document.createElement('span');
          textSpan.textContent = '10 minute walk';

          div.appendChild(iconSvg);
          div.appendChild(textSpan);

          this.div_ = div;
          const panes = this.getPanes();
          if (panes) {
            panes.overlayLayer.appendChild(div);
          }
        }

        draw() {
          if (this.div_) {
            const overlayProjection = this.getProjection();
            if (overlayProjection) {
              const position = overlayProjection.fromLatLngToDivPixel(this.position_);
              if (position) {
                // Position the label at the top of the circle
                this.div_.style.left = (position.x - this.div_.offsetWidth / 2) + 'px';
                this.div_.style.top = (position.y - 10) + 'px';
              }
            }
          }
        }

        onRemove() {
          if (this.div_ && this.div_.parentNode) {
            this.div_.parentNode.removeChild(this.div_);
            this.div_ = null;
          }
        }
      }

      // Calculate position at the top of the circle for the label
      const earthRadius = 6371000; // Earth's radius in meters
      const dLat = WALK_RADIUS_METERS / earthRadius;
      const labelLat = MAP_CENTER.lat + (dLat * 180 / Math.PI);
      const labelPosition = new google.maps.LatLng(labelLat, MAP_CENTER.lng);

      // Add the custom label
      const walkLabel = new WalkRadiusLabel(labelPosition);
      walkLabel.setMap(map);

      return { circle: walkCircle, label: walkLabel };
    };

    const initMapFn = () => {
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
      addWalkRadiusCircle(map);

      // ---- LOAD GEOJSON OVERLAY ----
      map.data.loadGeoJson(GEOJSON_URL, null, () => applyStyle());

      // ---- STYLES FOR OVERLAY ----
      const styleFor = (feature: google.maps.Data.Feature, zoom: number) => {
        const leisure = feature.getProperty("leisure");
        const golf = feature.getProperty("golf");
        const hasBuilding = !!feature.getProperty("building");

        if (leisure === "golf_course") {
          return {
            fillColor: "#d0e2c4",
            fillOpacity: 0.18,
            strokeColor: "#c1d3b5",
            strokeWeight: 2,
            zIndex: 1,
          };
        }

        if (golf === "hole") return { visible: false }; // hide hole centerlines
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
          if (zoom < 15) return { visible: false };
          return {
            fillColor: "#eeeeee",
            fillOpacity: 0.8,
            strokeColor: "#dbdbdb",
            strokeWeight: 1,
            zIndex: 4,
          };
        }

        return {};
      };

      const applyStyle = () => {
        const z = map.getZoom() ?? 15;
        map.data.setStyle((f) => styleFor(f, z));
      };

      map.addListener("zoom_changed", applyStyle);

      // ---- MAP CLICK LISTENER ----
      map.addListener("click", () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
          currentInfoWindow = null;
        }
      });

      // ---- PROPERTIES LAYER ----
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
             addPropertyMarker(map, { lat, lng }, p);
           });
         })
         .catch((error) => {
           console.error("Error loading properties:", error);
           // fallback marker if properties.geojson is missing
           console.log("Adding fallback marker");
           addPropertyMarker(
             map,
             { lat: 52.55886548383084, lng: -8.78699909386544 },
             {
               title: "Putters Way",
               desc: "Deluxe residence within the private Golf Village of Adare Manor, metres from the Carriage House and a short stroll to the 1st tee.",
               url: "http://localhost:3000/property/putters-way",
             }
           );
         });
    };

    // Handle script loading
    if ((window as any).google) {
      initMapFn();
      return;
    }
    const existingScript = document.getElementById("google-maps-script");
    if (!existingScript) {
      (window as any).initMap = initMapFn;
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      document.body.appendChild(script);
    } else {
      (window as any).initMap = initMapFn;
    }
  }, []);

  return (
    <div className="bg-white py-16">
      <section className="relative lg:h-[85vh] h-auto flex overflow-hidden bg-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row items-stretch">
          {/* Image Gallery Section */}
          <div className="lg:w-3/5 w-full lg:h-full relative bg-white flex flex-col lg:mr-4">
            {/* Main Image with fade transition */}
            <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:flex-1 overflow-hidden mb-4">
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