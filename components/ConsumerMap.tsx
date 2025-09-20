import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ShopkeeperDashboard = () => {
  const defaultPosition: [number, number] = [28.6139, 77.2090];

  return (
    <div className="h-full w-full">
      <MapContainer center={defaultPosition} zoom={14} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={defaultPosition}>
          <Popup>
            <h3 className="font-bold">My Shop</h3>
            <p>Status: Open</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ShopkeeperDashboard;
