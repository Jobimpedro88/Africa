'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { KnowledgeItem } from '@/lib/knowledge';
import { Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic import required for Leaflet in Next.js since it depends on the window object
const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((m) => m.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then((m) => m.Polyline), { ssr: false });

// Leaflet specific hook import
const MapUpdater = dynamic(() => Promise.resolve(({ locations, selectedPlace }: { locations: KnowledgeItem[], selectedPlace: KnowledgeItem | null }) => {
    const { useMap } = require('react-leaflet');
    const map = useMap();

    useEffect(() => {
        if (!map || locations.length === 0) return;

        if (selectedPlace && selectedPlace.coordinates) {
            map.flyTo([selectedPlace.coordinates.lat, selectedPlace.coordinates.lng], 14, { duration: 1 });
            return;
        }

        const L = require('leaflet');
        const bounds = L.latLngBounds(locations.map(loc => [loc.coordinates!.lat, loc.coordinates!.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }, [map, locations, selectedPlace]);

    return null;
}), { ssr: false });

// Custom hook to fix default marker icons
const useLeafletIcons = () => {
    useEffect(() => {
        const L = require('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
    }, []);
};


interface ItineraryMapProps {
    activeItems: KnowledgeItem[];
    allItems: KnowledgeItem[];
    onPinSelected?: (item: KnowledgeItem) => void;
}

export default function ItineraryMap({ activeItems, allItems, onPinSelected }: ItineraryMapProps) {
    useLeafletIcons(); // Fix icons on load

    // We display all items but we could highlight active ones if needed.
    // Right now we'll just display the activeItems so the map focuses on the current day's events.
    const displayedLocations = activeItems.filter(item => item.coordinates);

    function getPinColorClass(type: string) {
        switch (type) {
            case 'Accommodation': return 'bg-blue-500';
            case 'Dining': return 'bg-orange-500';
            case 'Activity': return 'bg-emerald-500';
            case 'Transport': return 'bg-amber-500';
            default: return 'bg-gray-500';
        }
    }

    // Default center to South Africa
    const defaultCenter: [number, number] = [-29.0, 24.0];

    return (
        <div className="w-full h-full relative z-0">
            <MapContainer center={defaultCenter} zoom={5} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                <MapUpdater locations={displayedLocations} selectedPlace={null} />

                {displayedLocations.length > 1 && (
                    <Polyline
                        positions={displayedLocations.map(loc => [loc.coordinates!.lat, loc.coordinates!.lng] as [number, number])}
                        pathOptions={{ color: '#c2410c', weight: 3, dashArray: '5, 8' }}
                    />
                )}

                {displayedLocations.map((item, index) => (
                    <Marker
                        key={item.slug}
                        position={[item.coordinates!.lat, item.coordinates!.lng]}
                        eventHandlers={{
                            click: () => onPinSelected?.(item),
                        }}
                    >
                        <Popup>
                            <div className="p-1 min-w-[200px]">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-orange-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">{index + 1}</span>
                                    <span className={`w-2 h-2 rounded-full ${getPinColorClass(item.type)}`}></span>
                                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                                </div>
                                <p className="text-[10px] text-gray-500 uppercase mb-2">{item.type}</p>
                                <a
                                    href={item.links?.googleMaps || `https://www.google.com/maps/search/?api=1&query=${item.title}&query_place_id=${item.coordinates!.lat},${item.coordinates!.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded-md transition-colors font-medium no-underline mt-2"
                                >
                                    <Navigation className="w-3 h-3" />
                                    Abrir GPS
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
