'use client';

import React, { useState } from 'react';
import { City, AccommodationOption, Restaurant, Activity, DayPlan, ScheduleItem } from '@/lib/cities';
import {
    MapPin,
    Calendar,
    Clock,
    Video,
    Globe,
    ChevronDown,
    ChevronUp,
    Utensils,
    Bed,
    Camera,
    Info,
    PlayCircle
} from 'lucide-react';

// --- Sub-components (Cards) ---

const LinkButtons = ({ maps, site, video }: { maps?: string; site?: string; video?: string }) => (
    <div className="flex gap-2 mt-3">
        {maps && (
            <a
                href={maps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors border border-emerald-200"
            >
                <MapPin size={12} /> Maps
            </a>
        )}
        {site && (
            <a
                href={site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors border border-blue-200"
            >
                <Globe size={12} /> Site
            </a>
        )}
        {video && (
            <a
                href={video}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors border border-red-200"
            >
                <Video size={12} /> Video
            </a>
        )}
    </div>
);

const AccommodationCard = ({ hotel, isPrimary }: { hotel: AccommodationOption; isPrimary?: boolean }) => (
    <div className={`p-5 rounded-xl border ${isPrimary ? 'bg-white border-[var(--savanna-gold)] shadow-md' : 'bg-gray-50 border-gray-200'} transition-all hover:shadow-lg`}>
        <div className="flex justify-between items-start">
            <div>
                <h4 className={`font-serif font-bold ${isPrimary ? 'text-lg text-[var(--savanna-terracotta)]' : 'text-base text-gray-700'}`}>
                    {hotel.name}
                </h4>
                <p className="text-gray-500 text-sm mt-1">{hotel.pricePerNight}</p>
            </div>
            {isPrimary && (
                <span className="px-2 py-1 bg-[var(--savanna-gold)] text-white text-[10px] uppercase font-bold tracking-wider rounded shadow-sm">
                    Recomendado
                </span>
            )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
            {hotel.highlights.map((pro, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md border border-gray-200 font-medium">
                    {pro}
                </span>
            ))}
        </div>

        <LinkButtons maps={hotel.mapsLink} site={hotel.officialSite} video={hotel.youtubeReview} />
    </div>
);

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
    <div className="p-4 bg-white rounded-xl border border-[var(--savanna-sand)] shadow-sm hover:shadow-md transition-all">
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-800 font-serif">{restaurant.name}</h4>
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{restaurant.priceRange}</span>
        </div>
        <div className="flex items-center gap-2 mb-3 text-sm text-[var(--savanna-terracotta)] font-medium">
            <Utensils size={14} />
            <span>{restaurant.cuisine}</span>
        </div>
        {restaurant.mustOrder && (
            <p className="text-sm text-gray-600 italic border-l-2 border-[var(--savanna-gold)] pl-3 my-2 bg-amber-50/50 p-2 rounded-r">
                &quot;{restaurant.mustOrder}&quot;
            </p>
        )}
        <LinkButtons maps={restaurant.mapsLink} site={restaurant.officialSite} video={restaurant.youtubeReview} />
    </div>
);

const ActivityCard = ({ activity }: { activity: Activity }) => (
    <div className="p-4 bg-white rounded-xl border border-[var(--savanna-sand)] shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
        <div>
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800 font-serif">{activity.name}</h4>
                {activity.price && <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono">{activity.price}</span>}
            </div>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1"><Clock size={14} /> {activity.duration}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{activity.tips}</p>
        </div>
        <div className="mt-4">
            <LinkButtons maps={activity.mapsLink} site={activity.officialSite} video={activity.youtubeVideo} />
        </div>
    </div>
);

const DayTimeline = ({ day }: { day: DayPlan }) => (
    <div className="ml-4 border-l-2 border-[var(--savanna-sand)] pl-6 pb-8 last:pb-0 relative">
        {/* Dot on timeline */}
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--savanna-terracotta)] border-2 border-white shadow-sm ring-2 ring-orange-50"></div>

        <div className="mb-4">
            {/* We rely on parent to show date/title if needed, or show it here */}
            {/* Simplified for inside Day Loop */}
        </div>

        <div className="space-y-3">
            {day.schedule.map((item, i) => (
                <div key={i} className="group relative bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-[var(--savanna-sand)] hover:shadow-md transition-all flex gap-3 items-start">
                    <div className="flex flex-col items-center min-w-[50px] pt-1">
                        <span className="text-xs font-bold font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">{item.time}</span>
                    </div>
                    <div className="flex-1">
                        <h5 className="font-bold text-gray-800 text-sm">{item.activity}</h5>
                        {item.location && (
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-xs text-[var(--savanna-green)] flex items-center gap-1 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                    <MapPin size={10} /> {item.location}
                                </span>
                                {item.mapsLink && (
                                    <a href={item.mapsLink} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline">
                                        (Abrir Mapa)
                                    </a>
                                )}
                            </div>
                        )}
                        {item.notes && <p className="text-xs text-gray-500 mt-2 bg-amber-50 p-2 rounded border border-amber-100 italic">{item.notes}</p>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main Accordion Component ---

export const CityAccordion = ({ city }: { city: City }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="mb-6 rounded-2xl overflow-hidden bg-white border border-[var(--savanna-sand)] shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px] duration-300">
            {/* Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex justify-between items-center p-6 bg-gradient-to-r from-[var(--savanna-bg)] via-white to-white transition-colors group"
            >
                <div className="flex items-center gap-5">
                    <span className="text-5xl shadow-sm rounded-full bg-white p-3 border border-gray-100 transform group-hover:scale-110 transition-transform duration-300">{city.countryFlag}</span>
                    <div className="text-left">
                        <h3 className="text-2xl font-bold font-serif text-[var(--savanna-terracotta)] group-hover:text-orange-700 transition-colors">{city.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{city.daysCount} {city.daysCount > 1 ? 'dias' : 'dia'}</span>
                            <span className="text-gray-400 text-sm">• {city.dates}</span>
                        </div>
                    </div>
                </div>
                <div className={`p-3 rounded-full bg-[var(--savanna-sand)]/20 text-[var(--savanna-terracotta)] transition-all duration-300 ${expanded ? 'rotate-180 bg-[var(--savanna-terracotta)] text-white' : 'group-hover:bg-[var(--savanna-sand)]'}`}>
                    <ChevronDown size={24} />
                </div>
            </button>

            {/* Expanded Content */}
            {expanded && (
                <div className="border-t border-[var(--savanna-sand)] bg-[var(--savanna-bg)]/30">

                    {/* 1. Overview Section */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-4">
                            <div className="bg-white p-6 rounded-xl border border-[var(--savanna-sand)] shadow-sm h-full">
                                <h4 className="flex items-center gap-2 font-bold text-lg text-gray-800 mb-4 border-b border-gray-100 pb-2">
                                    <Info size={20} className="text-[var(--savanna-gold)]" /> Sobre a Cidade
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{city.history}</p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-bold text-amber-700 flex items-center gap-1">
                                        🌡️ {city.climate.temp}
                                    </span>
                                    <span className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
                                        ☁️ {city.climate.conditions}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* Video Card */}
                            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg relative group h-full min-h-[200px] border border-gray-800">
                                {city.youtubeOverview.includes('watch?v=') ? (
                                    <img
                                        src={`https://img.youtube.com/vi/${city.youtubeOverview.split('v=')[1]}/hqdefault.jpg`}
                                        alt="City Video"
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity duration-500 scale-105 group-hover:scale-100"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
                                )}

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/20 group-hover:bg-black/40 transition-colors">
                                    <a href={city.youtubeOverview} target="_blank" rel="noreferrer" className="transform group-hover:scale-110 transition-transform duration-300">
                                        <PlayCircle size={56} className="text-white fill-red-600 shadow-2xl" />
                                    </a>
                                    <p className="text-white font-bold mt-3 text-center drop-shadow-md text-sm uppercase tracking-widest border-b-2 border-transparent group-hover:border-red-600 transition-all pb-1">Ver Guia em Vídeo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Accordion Sections for Details */}
                    <div className="px-6 pb-6 space-y-4">

                        {/* Accommodation */}
                        <details className="group bg-white rounded-xl border border-[var(--savanna-sand)] overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                                <h4 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                                        <Bed size={20} />
                                    </div>
                                    Onde Ficar
                                </h4>
                                <ChevronDown size={20} className="text-gray-400 group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-4 animate-fadeIn">
                                <AccommodationCard hotel={city.accommodation.primary} isPrimary />
                                {city.accommodation.alternatives.map((alt, i) => (
                                    <AccommodationCard key={i} hotel={alt} />
                                ))}
                            </div>
                        </details>

                        {/* Restaurants */}
                        {city.restaurants.length > 0 && (
                            <details className="group bg-white rounded-xl border border-[var(--savanna-sand)] overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                                    <h4 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                                        <div className="p-2 bg-orange-100 text-orange-700 rounded-lg">
                                            <Utensils size={20} />
                                        </div>
                                        Onde Comer
                                    </h4>
                                    <ChevronDown size={20} className="text-gray-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="p-4 border-t border-gray-100 bg-gray-50/50 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                    {city.restaurants.map((rest, i) => <RestaurantCard key={i} restaurant={rest} />)}
                                </div>
                            </details>
                        )}

                        {/* Activities */}
                        {city.activities.length > 0 && (
                            <details className="group bg-white rounded-xl border border-[var(--savanna-sand)] overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                                    <h4 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                                        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                                            <Camera size={20} />
                                        </div>
                                        O que Fazer
                                    </h4>
                                    <ChevronDown size={20} className="text-gray-400 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="p-4 border-t border-gray-100 bg-gray-50/50 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                                    {city.activities.map((act, i) => <ActivityCard key={i} activity={act} />)}
                                </div>
                            </details>
                        )}

                        {/* Daily Itinerary */}
                        <details className="group bg-white rounded-xl border border-[var(--savanna-sand)] overflow-hidden shadow-sm hover:shadow-md transition-all" open>
                            <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                                <h4 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-[var(--savanna-terracotta)] text-white rounded-lg">
                                        <Calendar size={20} />
                                    </div>
                                    Roteiro Dia a Dia
                                </h4>
                                <ChevronDown size={20} className="text-gray-400 group-open:rotate-180 transition-transform duration-300" />
                            </summary>
                            <div className="p-6 border-t border-gray-100 bg-gray-50/30 space-y-10 animate-fadeIn">
                                {city.days.map((day, i) => (
                                    <div key={i} className="relative">
                                        <h5 className="font-bold text-[var(--savanna-terracotta)] text-lg mb-4 flex items-center gap-3 border-b border-[var(--savanna-sand)] pb-2">
                                            <span className="bg-[var(--savanna-terracotta)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                                                {day.dayNumber}
                                            </span>
                                            {day.title} <span className="text-gray-400 text-sm font-normal ml-auto font-mono bg-white px-2 py-1 rounded border border-gray-100">{day.date}</span>
                                        </h5>
                                        <DayTimeline day={day} />
                                    </div>
                                ))}
                            </div>
                        </details>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CityAccordion;
