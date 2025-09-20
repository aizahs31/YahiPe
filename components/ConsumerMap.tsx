
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Shop } from '../types';
import { GreenPin, RedPin } from './icons';

interface ConsumerMapProps {
  shops: Shop[];
}

const ConsumerMap: React.FC<ConsumerMapProps> = ({ shops }) => {
  const defaultPosition: [number, number] = [28.6139, 77.2090]; // Delhi center

  return (
    <div className="h-full w-full">
      <MapContainer center={defaultPosition} zoom={14} scrollWheelZoom={false} className="h-full w-full rounded-lg shadow-lg">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shops.map(shop => (
          <Marker 
            key={shop.id} 
            position={[shop.location.lat, shop.location.lng]}
            icon={shop.isOpen ? GreenPin : RedPin}
          >
            <Popup>
              <div className="p-1 text-sm">
                <h3 className="font-bold text-base text-gray-800">{shop.name}</h3>
                <p className={`font-semibold ${shop.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                  {shop.isOpen ? 'Open' : 'Closed'}
                </p>
                <p className="text-gray-600">{shop.category}</p>
                <p className="text-gray-600">Staff Available: {shop.staff.length}</p>
                <button className="mt-2 w-full bg-indigo-600 text-white text-xs px-2 py-1 rounded hover:bg-indigo-700 transition-colors">
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ConsumerMap;
