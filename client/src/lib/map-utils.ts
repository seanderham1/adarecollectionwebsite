/// <reference types="google.maps" />

// Global map loading state
let isMapScriptLoading = false;
let mapScriptLoaded = false;
const mapCallbacks: Array<() => void> = [];

// Constants for walk radius
export const WALK_RADIUS_METERS = 800; // Approximately 10 minutes walk at average speed
export const MAP_CENTER = { lat: 52.562213, lng: -8.781279 };

/**
 * Get the base URL for property links based on environment
 */
export function getBaseUrl(): string {
  // Check if we're in development (localhost) or production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
  }
  // Production URL
  return 'https://theadarecollection.com';
}

/**
 * Generate property URL from property ID
 */
export function getPropertyUrl(propertyId: string): string {
  return `${getBaseUrl()}/property/${propertyId}`;
}


// Base overlay (golf course + buildings)
export const GEOJSON_URL = "/data/adare_demesne.geojson";
// Properties (points layer)
export const PROPERTIES_URL = "/data/properties.geojson";

/**
 * Load Google Maps script if not already loaded
 */
export function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (mapScriptLoaded && (window as any).google) {
      resolve();
      return;
    }

    // If already loading, add to callbacks
    if (isMapScriptLoading) {
      mapCallbacks.push(resolve);
      return;
    }

    // Start loading
    isMapScriptLoading = true;

    // Check if script already exists
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      // Script exists but might not be loaded yet
      const checkLoaded = () => {
        if ((window as any).google) {
          mapScriptLoaded = true;
          isMapScriptLoading = false;
          resolve();
          mapCallbacks.forEach(cb => cb());
          mapCallbacks.length = 0;
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    // Create global callback
    (window as any).initGoogleMaps = () => {
      mapScriptLoaded = true;
      isMapScriptLoading = false;
      resolve();
      mapCallbacks.forEach(cb => cb());
      mapCallbacks.length = 0;
    };

    // Create and load script
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.async = true;
    script.defer = true;
    // Use environment variable for API key
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API Key not found in environment variables');
      reject(new Error('Google Maps API Key is required but not set in environment variables'));
      return;
    }
    console.log('Google Maps API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMaps&libraries=geometry&v=weekly`;
    
    script.onerror = (error) => {
      isMapScriptLoading = false;
      console.error('Google Maps script failed to load:', error);
      reject(new Error(`Failed to load Google Maps script. API Key: ${apiKey ? 'Present' : 'Missing'}`));
    };

    document.head.appendChild(script);
  });
}

/**
 * Create a property marker with consistent styling
 */
export function createPropertyMarker(
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
): google.maps.Marker {
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

  return marker;
}

/**
 * Create info window content for property markers
 */
export function createPropertyInfoWindowContent(props: {
  title?: string;
  beds?: number;
  baths?: number;
  price?: string;
  thumb?: string;
  desc?: string;
  url?: string;
  id?: string;
}): string {
  // Use the provided URL or generate one from the property ID
  const propertyUrl = props.url || (props.id ? getPropertyUrl(props.id) : '');
  
  return `
    <div style="max-width:380px;font-family:inherit;line-height:1.35;padding:0 8px 0 8px;">
             ${
               props.thumb
                 ? `<img src="${props.thumb}" alt="${props.title ?? "Property"}" style="width:100%;height:auto;margin:0 0 8px 0;display:block;border-radius:6px;"/>`
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
        propertyUrl
          ? `<div style="text-align:center;margin-top:8px;"><a href="${propertyUrl}" style="display:inline-block;border:1px solid #374151;background:#374151;color:white;padding:6px 16px;text-decoration:none;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:0.05em;transition:all 0.2s;" onmouseover="this.style.backgroundColor='transparent';this.style.color='#374151';" onmouseout="this.style.backgroundColor='#374151';this.style.color='white';">View Property</a></div>`
          : ""
      }
    </div>
  `;
}

/**
 * Add walk radius circle to map (for property pages)
 */
export function addWalkRadiusCircle(map: google.maps.Map, center?: google.maps.LatLngLiteral) {
  // Create the circle with same styling as hero section
  const circleCenter = center || MAP_CENTER;
  const walkCircle = new google.maps.Circle({
    strokeColor: '#142a4d',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: 'transparent',
    fillOpacity: 0,
    map,
    center: circleCenter,
    radius: WALK_RADIUS_METERS,
    zIndex: 20,
    clickable: false,
  });

  // Create a custom overlay for the walking icon and text (matching hero section)
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
  const labelLat = circleCenter.lat + (dLat * 180 / Math.PI);
  const labelPosition = new google.maps.LatLng(labelLat, circleCenter.lng);

  // Add the custom label
  const walkLabel = new WalkRadiusLabel(labelPosition);
  walkLabel.setMap(map);

  return { circle: walkCircle, label: walkLabel };
}

/**
 * Add walk radius circle to map (for hero section with walking icon)
 */
export function addHeroWalkRadiusCircle(map: google.maps.Map) {
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

    setVisible(visible: boolean) {
      if (this.div_) {
        this.div_.style.display = visible ? 'flex' : 'none';
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
}

/**
 * Add golf course text overlay to map
 */
export function addGolfCourseTextOverlay(map: google.maps.Map) {
  // Create a custom overlay for the golf course text
  class GolfCourseLabel extends google.maps.OverlayView {
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
        background-color: transparent;
        color: #1a1a1a;
        padding: 0;
        font-size: 16px;
        font-weight: 500;
        font-family: 'Google Sans', 'Roboto', sans-serif;
        text-align: center;
        pointer-events: none;
        z-index: 1000;
        line-height: 1.2;
        text-shadow: 1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white;
      `;

      // Create golf course icon
      const golfIcon = document.createElement('div');
      golfIcon.style.cssText = `
        width: 24px;
        height: 24px;
        margin: 0 auto 4px auto;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      // Create SVG golf course icon
      const golfSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      golfSvg.setAttribute('width', '24');
      golfSvg.setAttribute('height', '24');
      golfSvg.setAttribute('viewBox', '0 -960 960 960');
      golfSvg.setAttribute('fill', '#1a1a1a');
      golfSvg.style.filter = 'drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px 1px 0 white)';
      
      // Golf course path
      const golfPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      golfPath.setAttribute('d', 'M780-120q-25 0-42.5-17.5T720-180q0-25 17.5-42.5T780-240q25 0 42.5 17.5T840-180q0 25-17.5 42.5T780-120ZM400-80q-100 0-170-23.5T160-160q0-23 33-41t87-29v70h80v-720l320 156-240 124v362q86 5 143 26.5t57 51.5q0 33-70 56.5T400-80Z');
      golfSvg.appendChild(golfPath);
      
      golfIcon.appendChild(golfSvg);
      div.appendChild(golfIcon);

      const textSpan = document.createElement('div');
      textSpan.innerHTML = 'Ryder Cup<br>Golf Course';
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
            this.div_.style.left = (position.x - this.div_.offsetWidth / 2) + 'px';
            this.div_.style.top = (position.y - this.div_.offsetHeight / 2) + 'px';
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

    setVisible(visible: boolean) {
      if (this.div_) {
        this.div_.style.display = visible ? 'block' : 'none';
      }
    }
  }

  // Calculate the center position of the golf course
  // Based on the fairway coordinates from the GeoJSON, the golf course center is approximately:
  // Adjusted 200m east and 500m south from the original position
  const earthRadius = 6371000; // Earth's radius in meters
  
  // Convert meters to degrees
  // 1 degree latitude ≈ 111,320 meters
  // 1 degree longitude ≈ 111,320 * cos(latitude) meters
  const latOffset = -1000 / 111320; // 1000m south (900m + 100m more)
  const lngOffset = 350 / (111320 * Math.cos(52.571 * Math.PI / 180)); // 350m east (300m + 50m more)
  
  const golfCourseCenter = new google.maps.LatLng(52.571 + latOffset, -8.780 + lngOffset);

  // Add the custom label
  const golfLabel = new GolfCourseLabel(golfCourseCenter);
  golfLabel.setMap(map);

  return golfLabel;
}

/**
 * Apply styling to map data layer
 */
export function applyMapStyling(map: google.maps.Map) {
  const styleFor = (feature: google.maps.Data.Feature, zoom: number) => {
    const leisure = feature.getProperty("leisure");
    const golf = feature.getProperty("golf");
    const hasBuilding = !!feature.getProperty("building");

    if (leisure === "golf_course") {
      return {
        fillColor: "#E8F5E8", // Very light green for golf course
        fillOpacity: 0.4,
        strokeColor: "#90EE90", // Light green stroke
        strokeWeight: 0.5,
        zIndex: 1,
      };
    }

    if (golf === "hole") return { visible: false }; // hide hole centerlines
    if (golf === "fairway") {
      return {
        fillColor: "#F0FFF0", // Honeydew for fairways
        fillOpacity: 0.5,
        strokeColor: "#98FB98", // Pale green stroke
        strokeWeight: 0.3,
        zIndex: 2,
      };
    }
    if (golf === "green") {
      return {
        fillColor: "#90EE90", // Light green for greens
        fillOpacity: 0.7,
        strokeColor: "#32CD32", // Lime green stroke
        strokeWeight: 0.3,
        zIndex: 3,
      };
    }
    if (golf === "tee") {
      return {
        fillColor: "#F5FFFA", // Mint cream for tees
        fillOpacity: 0.6,
        strokeColor: "#90EE90", // Light green stroke
        strokeWeight: 0.3,
        zIndex: 2,
      };
    }

    if (hasBuilding) {
      if (zoom < 15) return { visible: false };
      return {
        fillColor: "#F5F5F5", // Light gray for buildings
        fillOpacity: 0.8,
        strokeColor: "#D3D3D3", // Light gray stroke
        strokeWeight: 0.5,
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
  return applyStyle;
}
