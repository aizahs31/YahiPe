import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

// 1. Corrected Leaflet Icon Fix
// This ensures the marker icons are visible.
if (typeof L !== 'undefined') {
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

// 2. Component to handle map re-centering
const LocationMarker = ({ position, children }) => {
  // useMap hook provides access to the Leaflet map instance
  const map = useMap();

  useEffect(() => {
    if (position) {
      // Use flyTo for a smooth animation to the new location
      map.flyTo(position, map.getZoom());
    }
  }, [map, position]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>{children}</Popup>
    </Marker>
  );
};

const ShopkeeperDashboard = () => {
  // Fallback default position (e.g., a major city)
  const fallbackPosition = [28.6139, 77.2090]; 

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setPosition(fallbackPosition);
      setLoading(false);
      return;
    }

    // Attempt to get the current position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
      },
      (err) => {
        // Handle failure (e.g., user denied access)
        setError(`Location access denied or failed: ${err.message}. Showing fallback location.`);
        setPosition(fallbackPosition); // Use fallback on error
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // Increased timeout for slow connections
        maximumAge: 0,
      }
    );
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Locating your shop...</div>;
  }

  // Use the actual position if found, otherwise use the fallback
  const initialCenter = position || fallbackPosition;

  return (
    <div className="h-full w-full">
      {error && <div className="p-2 text-red-600 bg-red-100">{error}</div>}
      
      <MapContainer 
        // Initial center is set to the determined position
        center={initialCenter} 
        zoom={position ? 16 : 10} 
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <LocationMarker position={position}>
          <h3 className="font-bold">My Current location</h3>
          
        </LocationMarker>

      </MapContainer>
    </div>
  );
};

export default ShopkeeperDashboard;