/// <reference types="google.maps" />

import { useEffect } from "react";
import { 
  loadGoogleMapsScript, 
  MAP_CENTER, 
  GEOJSON_URL, 
  PROPERTIES_URL,
  TEN_MIN_DRIVE_RADIUS_METERS,
  FIFTEEN_MIN_DRIVE_RADIUS_METERS,
  ONE_HOUR_DRIVE_RADIUS_METERS,
  createPropertyMarker,
  addWalkRadiusCircle,
  addGolfCourseTextOverlay,
  applyMapStyling,
  getPropertyUrl
} from "@/lib/map-utils";
import { properties } from "@/lib/properties";

interface PropertyMapProps {
  propertyId: string;
  containerId?: string;
}

export default function PropertyMap({ propertyId, containerId = "property-map" }: PropertyMapProps) {
  useEffect(() => {
    const initMap = async () => {
      try {
        // Load Google Maps script
        await loadGoogleMapsScript();

        // Find the property to get its location for centering
        const property = properties.find(p => p.id === propertyId);
        const mapCenter = property?.location || MAP_CENTER;

        const map = new google.maps.Map(
          document.getElementById(containerId) as HTMLElement,
          {
            center: mapCenter,
            zoom: propertyId === 'dunes-lodge'
              ? 8
              : propertyId === 'darrira-house'
                ? 11
                : propertyId === 'cragleigh-house'
                  ? 10
                  : 14,
            mapId: "c3acdccb9694c869d85b690f", // your Map ID
            disableDefaultUI: true,
          }
        );

        // Add radius circle and label centered on the property
        if (propertyId === 'darrira-house') {
          addWalkRadiusCircle(map, mapCenter, {
            radiusMeters: TEN_MIN_DRIVE_RADIUS_METERS,
            labelText: '10 minute drive',
            icon: 'car',
          });
        } else if (propertyId === 'cragleigh-house') {
          addWalkRadiusCircle(map, mapCenter, {
            radiusMeters: FIFTEEN_MIN_DRIVE_RADIUS_METERS,
            labelText: '15 minute drive',
            icon: 'car',
          });
        } else if (propertyId === 'dunes-lodge') {
          addWalkRadiusCircle(map, mapCenter, {
            radiusMeters: ONE_HOUR_DRIVE_RADIUS_METERS,
            labelText: '1 hour drive',
            icon: 'car',
          });
        } else {
          addWalkRadiusCircle(map, mapCenter);
        }

        // Add golf course text overlay
        addGolfCourseTextOverlay(map);

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

        // Load properties and add markers (only show current property)
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
            
            // Find and show only the current property's marker
            const currentPropertyFeature = fc.features.find((feat: any) => 
              feat.properties && feat.properties.id === propertyId
            );
            
            if (currentPropertyFeature) {
              const [lng, lat] = currentPropertyFeature.geometry.coordinates;
              const p = currentPropertyFeature.properties || {};
              console.log(`Adding marker for current property ${p.title} at [${lat}, ${lng}]`);
              
              createPropertyMarker(map, { lat, lng }, p);
            } else {
              console.log(`Property ${propertyId} not found in GeoJSON data`);
            }
          })
          .catch((error) => {
            console.error("Error loading properties:", error);
            // fallback marker if properties.geojson is missing
            console.log("Adding fallback marker");
            const fallbackProps = {
              id: "putters-way",
              title: "Putters Way",
              desc: "Premium residence within the private Golf Village of Adare Manor, metres from the Carriage House and a short stroll to the 1st tee.",
            };
            
            createPropertyMarker(
              map,
              { lat: 52.55886548383084, lng: -8.78699909386544 },
              fallbackProps
            );
          });
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initMap();
  }, [propertyId]);

  return (
    <div 
      id="property-map" 
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    />
  );
}
