import { useEffect } from "react";
import { X } from "lucide-react";
import { 
  loadGoogleMapsScript, 
  MAP_CENTER, 
  GEOJSON_URL, 
  PROPERTIES_URL,
  createPropertyMarker,
  createPropertyInfoWindowContent,
  addWalkRadiusCircle
} from "@/lib/map-utils";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

export default function MapModal({ isOpen, onClose, propertyId }: MapModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Initialize map when modal opens
  useEffect(() => {
    if (!isOpen) return;

    let currentInfoWindow: google.maps.InfoWindow | null = null;

    const initMap = async () => {
      try {
        // Load Google Maps script
        await loadGoogleMapsScript();

        const map = new google.maps.Map(
          document.getElementById("modal-map") as HTMLElement,
          {
            center: MAP_CENTER,
            zoom: 15,
            mapId: "c3acdccb9694c869d85b690f",
            disableDefaultUI: true,
          }
        );

        // Add walk radius circle and label
        addWalkRadiusCircle(map);

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
  }, [isOpen, propertyId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl mx-4 bg-black overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full transition-all duration-200"
          aria-label="Close map"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Map Container - Same size as video */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div id="modal-map" className="absolute top-0 left-0 w-full h-full" />
        </div>
      </div>
    </div>
  );
}
