'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default marker icon in Next.js
const customIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description: string;
}

const locations: Location[] = [
    { id: 'cape-town', name: 'Cape Town', lat: -33.9249, lng: 18.4241, description: 'Cidade Mãe & Table Mountain' },
    { id: 'winelands', name: 'Winelands (Stellenbosch)', lat: -33.9321, lng: 18.8602, description: 'Vinhos e Gastronomia' },
    { id: 'kruger', name: 'Kruger National Park', lat: -24.9948, lng: 31.5969, description: 'Safari Big Five' },
    { id: 'vic-falls', name: 'Victoria Falls', lat: -17.9244, lng: 25.8559, description: 'A Fumaça que Troveja' },
    { id: 'hwange', name: 'Hwange National Park', lat: -19.0911, lng: 26.5416, description: 'Elefantes e Cães Selvagens' },
    { id: 'jnb', name: 'Johannesburg (OR Tambo)', lat: -26.1367, lng: 28.2411, description: 'Hub de Conexão' }
];

export default function AfricanMap() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-full h-[400px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Carregando Mapa...</div>;
    }

    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border-4 border-white z-0 relative">
            <MapContainer
                center={[-26.0, 24.0]}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc) => (
                    <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
                        <Popup>
                            <div className="font-sans">
                                <h3 className="font-bold text-[var(--savanna-terracotta)]">{loc.name}</h3>
                                <p className="text-sm m-0">{loc.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
