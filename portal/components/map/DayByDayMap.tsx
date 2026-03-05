"use client";

import { useMemo, useState } from 'react';
import { Calendar, Quote, MapPin, Youtube, ExternalLink, Clock, Navigation, History, Sun, Wind, ChevronDown, ChevronUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { RichItineraryDay } from '@/lib/itinerary';
import type { City } from '@/lib/cities';

const ItineraryMap = dynamic(() => import('./ItineraryMap'), { ssr: false });

interface DayByDayMapProps {
    days: RichItineraryDay[];
    cities: City[];
}

function CityInfoCard({ city }: { city: City }) {
    if (!city) return null;
    return (
        <div className="mb-6 p-5 bg-white rounded-2xl border-2 border-[var(--savanna-sand)] shadow-sm overflow-hidden relative group">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-label="Country Flag">{city.countryFlag}</span>
                <div>
                    <h3 className="text-xl font-bold font-serif text-[var(--savanna-brown)]">{city.name}</h3>
                    <p className="text-[10px] font-bold tracking-widest text-[var(--savanna-ochre)] uppercase">{city.country}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-[#f9f7f2] p-4 rounded-xl border border-[var(--savanna-sand)]/50">
                    <p className="text-sm text-gray-700 leading-relaxed italic border-l-2 border-[var(--savanna-rust)] pl-3">
                        "{city.history}"
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold">
                    <span className="flex items-center gap-1.5 bg-orange-50 text-orange-800 px-3 py-1.5 rounded-lg border border-orange-100">
                        <Sun size={14} /> {city.climate.temp}
                    </span>
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-100">
                        <Wind size={14} /> {city.climate.conditions}
                    </span>
                </div>
            </div>
        </div>
    );
}

const eventColors = {
    Accommodation: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', iconBg: 'bg-blue-100' },
    Activity: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', iconBg: 'bg-emerald-100' },
    Dining: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', iconBg: 'bg-orange-100' },
    Transport: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconBg: 'bg-amber-100' },
    Transit: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', iconBg: 'bg-gray-200' },
    Tip: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', iconBg: 'bg-yellow-100' }
};

export default function DayByDayMap({ days, cities = [] }: DayByDayMapProps) {
    const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
    const [selectedPlace, setSelectedPlace] = useState<any>(null); // For map flying

    const activeDayData = days[activeDayIdx];

    // Build map pins from the underlying mapped knowledge items
    const allMapItems = useMemo(() => {
        const items: any[] = [];
        days.forEach(day => {
            if ((day as any).selectedDetails) {
                (day as any).selectedDetails.forEach((detail: any) => {
                    if (!items.find(i => i.id === detail.id)) {
                        items.push({ ...detail, relatedDay: day.day });
                    }
                });
            }
        });
        return items;
    }, [days]);

    const activeMapItems = (activeDayData as any)?.selectedDetails || [];

    // Find active city based on dates roughly
    const activeCityData = useMemo(() => {
        if (!activeDayData || !cities.length) return null;
        return cities.find(city => {
            const matchesName = activeDayData.location.toLowerCase().includes(city.name.toLowerCase().split(' ')[0]);
            const dayDayStr = activeDayData.date.substring(0, 2);
            const matchesDate = city.dates.includes(dayDayStr);
            return matchesName || matchesDate;
        });
    }, [cities, activeDayData]);

    return (
        <div className="flex flex-col md:flex-row h-full w-full bg-[#f4f1ea] overflow-hidden">

            {/* LEFT SIDEBAR - ACCORDION LIST */}
            <div className="w-full md:w-2/3 flex-shrink-0 flex flex-col h-full bg-white border-r border-[var(--savanna-sand)] relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.04)]">

                {/* Fixed Header */}
                <div className="p-5 md:p-6 bg-white border-b border-[var(--savanna-sand)] z-10 shadow-sm shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar className="text-[var(--savanna-rust)]" size={24} />
                        <h2 className="text-2xl font-bold font-serif text-[var(--savanna-brown)]">Roteiro Completo</h2>
                    </div>
                </div>

                {/* ACCORDION LIST AREA */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f9f7f2] scrollbar-thin">

                    {/* Official Playlist (Always Top) */}
                    <div className="mb-6 p-4 bg-zinc-900 rounded-2xl shadow-lg border border-zinc-700 flex items-center justify-between group hover:bg-zinc-800 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                <span className="text-green-400 font-bold">🎵</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-sm tracking-wide text-white">Playlist Oficial</h4>
                                <p className="text-xs text-zinc-400">Vibração da Viagem</p>
                            </div>
                        </div>
                        <a
                            href="https://open.spotify.com/playlist/7eNfPjXwX8M55OqWJ7oU5A?si=023a10e7b4154fa9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-green-500 text-black text-xs font-bold rounded-full hover:bg-green-400 transition-colors shadow-md"
                        >
                            Ouvir
                        </a>
                    </div>

                    {/* The Days Accordions */}
                    <div className="space-y-4 pb-20">
                        {days.map((day, idx) => {
                            const isActive = activeDayIdx === idx;
                            return (
                                <div
                                    key={day.day}
                                    className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${isActive ? 'border-[var(--savanna-rust)] shadow-lg bg-white ring-4 ring-[var(--savanna-rust)]/10' : 'border-[var(--savanna-sand)] bg-white/70 hover:bg-white cursor-pointer hover:border-[var(--savanna-rust)]/50'}`}
                                >
                                    {/* Accordion Header */}
                                    <div
                                        className="p-5 flex items-center justify-between select-none"
                                        onClick={() => !isActive && setActiveDayIdx(idx)}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${isActive ? 'bg-[var(--savanna-rust)] text-white' : 'bg-[var(--savanna-sand)] text-[var(--savanna-brown)]'}`}>
                                                    DIA {day.day}
                                                </span>
                                                <span className="text-sm font-medium text-gray-500">{day.date}</span>
                                            </div>
                                            <h3 className={`mt-1 font-bold font-serif leading-tight ${isActive ? 'text-[var(--savanna-brown)] text-xl' : 'text-gray-700 text-lg'}`}>
                                                {day.location}
                                            </h3>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ml-4 ${isActive ? 'bg-[var(--savanna-rust)]/10 text-[var(--savanna-rust)]' : 'bg-gray-100 text-gray-400'}`}>
                                            {isActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                    </div>

                                    {/* Accordion Expanded Content */}
                                    {isActive && (
                                        <div className="px-5 pb-6 pt-2 border-t border-[var(--savanna-sand)] bg-gradient-to-b from-white to-[#fdfbf7] animate-in slide-in-from-top-2">

                                            {/* City Context Card */}
                                            {activeCityData && (
                                                <div className="mt-4 mb-6">
                                                    <CityInfoCard city={activeCityData} />
                                                </div>
                                            )}

                                            <div className="mb-6">
                                                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">{day.summary}</p>

                                                {day.goldenTip && (
                                                    <div className="bg-yellow-50/80 border border-yellow-200 p-4 rounded-xl flex items-start gap-3 shadow-sm">
                                                        <Quote className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                                                        <div>
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-800 block mb-1">Dica de Ouro</span>
                                                            <p className="text-sm text-yellow-900/90 font-medium italic leading-relaxed">
                                                                {day.goldenTip}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Vertical Timeline */}
                                            <div className="relative pt-2 pl-4 md:pl-6 border-l-2 border-dashed border-[var(--savanna-sand)] space-y-8">
                                                {day.schedule?.map((event, i) => {
                                                    const colors = eventColors[event.type as keyof typeof eventColors] || eventColors.Transit;

                                                    // See if this event maps to a KnowledgeItem we loaded
                                                    const mappedItem = event.slug ? activeMapItems.find((m: any) => m.slug === event.slug) : null;

                                                    return (
                                                        <div
                                                            key={i}
                                                            className={`relative group ${event.slug ? 'cursor-pointer' : ''}`}
                                                            onClick={() => {
                                                                if (mappedItem) setSelectedPlace(mappedItem);
                                                            }}
                                                        >
                                                            {/* Timeline Node Dot */}
                                                            <div className={`absolute -left-[25px] md:-left-[33px] top-1 w-4 h-4 rounded-full border-4 border-white ${colors.iconBg} flex items-center justify-center shadow-sm z-10 ring-1 ring-gray-200`}>
                                                                <div className={`w-1.5 h-1.5 rounded-full ${colors.bg}`}></div>
                                                            </div>

                                                            {/* Event Content Card */}
                                                            <div className={`p-4 rounded-xl border-2 transition-all ${colors.bg} ${colors.border} ${event.slug ? 'hover:shadow-md hover:scale-[1.01]' : 'shadow-sm'}`}>
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded bg-white shadow-sm border border-gray-100 ${colors.text}`}>
                                                                            <Clock size={12} /> {event.time}
                                                                        </span>
                                                                        {event.status && (
                                                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border ${event.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                                                                                }`}>
                                                                                {event.status === 'Confirmado' ? '✅ Confirmado' : '⏳ Previsto'}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${colors.iconBg} ${colors.text}`}>
                                                                        {event.type}
                                                                    </span>
                                                                </div>

                                                                <h4 className="font-bold text-gray-900 text-lg mb-1 leading-tight">{event.title}</h4>

                                                                {event.description && (
                                                                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{event.description}</p>
                                                                )}

                                                                {/* Action Links Row */}
                                                                {(event.slug || event.mapsLink || event.youtubeLink || event.bookingLink) && (
                                                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5">
                                                                        {event.slug && (
                                                                            <button className="flex items-center gap-1 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-center rounded-lg shadow-sm transition-colors">
                                                                                <MapPin size={12} /> Ver no Mapa
                                                                            </button>
                                                                        )}
                                                                        {event.mapsLink && (
                                                                            <a href={event.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg transition-colors">
                                                                                <Navigation size={12} /> GPS
                                                                            </a>
                                                                        )}
                                                                        {event.youtubeLink && (
                                                                            <a href={event.youtubeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors">
                                                                                <Youtube size={12} /> Assistir
                                                                            </a>
                                                                        )}
                                                                        {event.bookingLink && (
                                                                            <a href={event.bookingLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-lg transition-colors">
                                                                                <ExternalLink size={12} /> Site Oficial
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE MAP COLUMN */}
            <div className="h-[40vh] md:h-full md:w-1/3 md:shrink-0 relative bg-[#e5e1d8]">
                <ItineraryMap
                    activeItems={activeMapItems}
                    allItems={allMapItems}
                    onPinSelected={(item) => setSelectedPlace(item)}
                />
            </div>
        </div>
    );
}
