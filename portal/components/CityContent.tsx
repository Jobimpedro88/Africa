'use client';

import { useState } from 'react';
import { KnowledgeItem } from '@/lib/knowledge';
import { MapPin, ArrowLeft, Star, Clock, DollarSign, Search } from 'lucide-react';

export default function CityContent({ places, logistics }: { places: (KnowledgeItem & { date?: string })[], logistics: KnowledgeItem[] }) {
    const [filterType, setFilterType] = useState<'All' | 'Accommodation' | 'Activity' | 'Dining'>('All');
    const [filterLocation, setFilterLocation] = useState<string>('All');
    const [filterDate, setFilterDate] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Extract unique locations and dates for the filter dropdowns
    const allLocations = Array.from(new Set(places.flatMap(p => p.locations))).sort();
    const allDates = Array.from(new Set(places.map(p => p.date).filter(Boolean) as string[])).sort();

    const filteredPlaces = places.filter(p => {
        const matchesType = filterType === 'All' || p.type === filterType;
        const matchesLocation = filterLocation === 'All' || p.locations.includes(filterLocation);
        const matchesDate = filterDate === 'All' || p.date === filterDate;
        const matchesSearch = searchQuery === '' ||
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.content && p.content.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesType && matchesLocation && matchesDate && matchesSearch;
    });

    const categories = [
        { id: 'All', label: 'Tudo' },
        { id: 'Accommodation', label: '🏨 Hospedagem' },
        { id: 'Activity', label: '🦁 Passeios' },
        { id: 'Dining', label: '🍽️ Restaurantes' }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Places */}
            <div className="lg:col-span-2 space-y-8">

                {/* Filters Section */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row flex-wrap gap-4 sticky top-20 z-30 lg:static">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            type="text"
                            placeholder="Buscar no acervo..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[var(--savanna-terracotta)] focus:outline-none focus:ring-1 focus:ring-[var(--savanna-terracotta)] bg-gray-50 text-sm"
                        />
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                    </div>

                    {/* Location Filter */}
                    <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="py-2 px-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:border-[var(--savanna-terracotta)] focus:outline-none focus:ring-1 focus:ring-[var(--savanna-terracotta)]"
                    >
                        <option value="All">📍 Local (Todos)</option>
                        {allLocations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>

                    {/* Date Filter */}
                    <select
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="py-2 px-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:border-[var(--savanna-terracotta)] focus:outline-none focus:ring-1 focus:ring-[var(--savanna-terracotta)]"
                    >
                        <option value="All">📅 Data (Todas)</option>
                        {allDates.map(date => (
                            <option key={date} value={date}>{date}</option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilterType(cat.id as any)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filterType === cat.id
                                ? 'bg-[var(--savanna-terracotta)] text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-[var(--savanna-terracotta)]'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-[var(--savanna-terracotta)] flex items-center gap-2 font-serif">
                            <Star className="text-[var(--savanna-gold)]" /> Destaques Filtrados
                        </h2>
                        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded-full">{filteredPlaces.length} itens</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredPlaces.map(item => (
                            <ItemCard key={item.slug} item={item} />
                        ))}
                        {filteredPlaces.length === 0 && (
                            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-gray-300">
                                <Search size={32} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-gray-500 font-bold">Nenhum item encontrado.</p>
                                <p className="text-gray-400 text-sm italic mt-1">Tente remover alguns filtros.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Sidebar: Logistics (Always Visible) */}
            <div className="space-y-8">
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--savanna-sand)] sticky top-24">
                    <h2 className="text-xl font-bold text-[var(--savanna-green)] mb-6 flex items-center gap-2 uppercase tracking-wide border-b border-[var(--savanna-sand)] pb-4">
                        📦 Logística
                    </h2>
                    <div className="space-y-6">
                        {logistics.map(item => (
                            <div key={item.slug} className="group border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                                <h3 className="font-bold text-gray-800 mb-1 text-sm group-hover:text-[var(--savanna-terracotta)] transition-colors">{item.title}</h3>
                                <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                                    {item.content.replace(/---[\s\S]*?---/, '').replace(/[*#]/g, '').slice(0, 100)}...
                                </p>
                            </div>
                        ))}
                        {logistics.length === 0 && <p className="text-gray-400 italic text-sm">Nenhuma dica logística.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
}

function ItemCard({ item }: { item: KnowledgeItem }) {
    // Portal 2.0: Rich Data & Color System
    const typeStyles: Record<string, { bg: string, text: string, border: string, icon: any }> = {
        'Accommodation': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Star },
        'Activity': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: MapPin },
        'Dining': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: Clock },
        'Transport': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: ArrowLeft },
    };

    const style = typeStyles[item.type] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: Star };

    // Translation Map
    const typeTranslation: Record<string, string> = {
        'Accommodation': 'Hospedagem',
        'Activity': 'Passeio',
        'Dining': 'Restaurante',
        'Transport': 'Transporte',
        'Tip': 'Dica'
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm border ${style.border} overflow-hidden hover:shadow-md transition-all`}>
            {/* Header / Summary Section (Visible Always) */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
                            {typeTranslation[item.type] || item.type}
                        </span>
                        {item.status && (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${item.status === 'Confirmado' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-amber-100 text-amber-800 border-amber-200'
                                }`}>
                                {item.status === 'Confirmado' ? '✅ Confirmado' : '⏳ Previsto'}
                            </span>
                        )}
                    </div>
                    {item.rating && (
                        <div className="flex text-amber-400 text-xs gap-0.5">
                            {'★'.repeat(item.rating)}
                            <span className="text-gray-300">{'★'.repeat(5 - item.rating)}</span>
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight font-serif">{item.title}</h3>
                <div className="text-xs text-gray-500 mb-4 flex flex-wrap gap-x-4 gap-y-1">
                    {item.locations.map(loc => (
                        <span key={loc} className="flex items-center gap-1"><MapPin size={10} /> {loc}</span>
                    ))}
                    {item.time && (
                        <span className="flex items-center gap-1 text-gray-600 font-medium"><Clock size={10} /> {item.time}</span>
                    )}
                    {item.pricing?.estimated && (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold"><DollarSign size={10} /> {item.pricing.estimated}</span>
                    )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {item.content.replace(/---[\s\S]*?---/, '').split('\n').find(l => l.length > 30)?.replace(/[*#]/g, '')}
                </p>

                {/* Portal 2.0 Actions */}
                <div className="flex gap-2 mt-2 flex-wrap">
                    {item.links?.googleMaps && (
                        <a href={item.links.googleMaps} target="_blank" className="text-[10px] md:text-xs flex-1 min-w-[30%] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-2 rounded-lg border border-emerald-200 text-center font-bold transition-colors flex items-center justify-center gap-1">
                            <MapPin size={12} /> Mapa
                        </a>
                    )}
                    {item.links?.booking && (
                        <a href={item.links.booking} target="_blank" className="text-[10px] md:text-xs flex-1 min-w-[30%] bg-[var(--savanna-terracotta)] hover:bg-[var(--savanna-terracotta)]/90 text-white py-2 rounded-lg text-center font-bold transition-colors">
                            Reservar
                        </a>
                    )}
                    {item.links?.official && (
                        <a href={item.links.official} target="_blank" className="text-[10px] md:text-xs flex-1 min-w-[30%] bg-blue-50 hover:bg-blue-100 text-blue-800 py-2 rounded-lg text-center border border-blue-200 font-bold transition-colors flex items-center justify-center gap-1">
                            Site Oficial
                        </a>
                    )}
                    {item.visuals?.youtubeUrl && (
                        <a href={item.visuals.youtubeUrl} target="_blank" className="text-[10px] md:text-xs flex-1 min-w-[30%] bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg text-center border border-red-200 font-bold transition-colors flex items-center justify-center gap-1">
                            ▶ YouTube
                        </a>
                    )}
                    {item.links?.menu && (
                        <a href={item.links.menu} target="_blank" className="text-[10px] md:text-xs flex-1 min-w-[30%] bg-orange-100 hover:bg-orange-200 text-orange-800 py-2 rounded-lg text-center font-bold transition-colors flex items-center justify-center gap-1">
                            Ver Menu
                        </a>
                    )}
                </div>
            </div>

            {/* Accordion / Details Section (Portal 2.0) */}
            <details className="group border-t border-gray-100 bg-gray-50/50">
                <summary className="flex items-center justify-between w-full p-3 text-xs font-bold text-gray-500 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-colors select-none">
                    <span>Mais Detalhes</span>
                    <span className="group-open:rotate-180 transition-transform duration-200">▼</span>
                </summary>
                <div className="p-5 pt-2 text-sm space-y-4">

                    {item.details?.history && (
                        <div>
                            <h4 className="font-bold text-gray-900 text-xs uppercase mb-1 flex items-center gap-1">📜 História & Vibe</h4>
                            <p className="text-gray-600 leading-relaxed text-xs">{item.details.history}</p>
                        </div>
                    )}

                    {item.details?.pros && (
                        <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                            <h4 className="font-bold text-emerald-800 text-xs uppercase mb-2">✅ Pontos Fortes</h4>
                            <ul className="space-y-1">
                                {item.details.pros.map((p, i) => (
                                    <li key={i} className="text-emerald-700 text-xs flex items-start gap-1.5">
                                        <span className="mt-0.5 opacity-60">•</span> {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {item.details?.cons && (
                        <div className="bg-red-50/50 p-3 rounded-lg border border-red-100">
                            <h4 className="font-bold text-red-800 text-xs uppercase mb-2">⚠️ Pontos de Atenção</h4>
                            <ul className="space-y-1">
                                {item.details.cons.map((c, i) => (
                                    <li key={i} className="text-red-700 text-xs flex items-start gap-1.5">
                                        <span className="mt-0.5 opacity-60">•</span> {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {item.details?.tips && (
                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                            <h4 className="font-bold text-amber-800 text-xs uppercase mb-1">💡 Dica de Ouro</h4>
                            <p className="text-amber-900 text-xs italic">"{item.details.tips}"</p>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded text-gray-500">#{tag}</span>
                        ))}
                    </div>
                </div>
            </details>
        </div>
    )
}
