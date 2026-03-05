import { getItemsByLocation } from '@/lib/knowledge';
import { masterItinerary } from '@/lib/itinerary'; // Import Itinerary
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import CityContent from '@/components/CityContent';
import Link from 'next/link';

// Using a dynamic route, but for static generating purposes we just look at the params
// In Next.js 15/16 params is a Promise
export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Decode slug because it might be "Cape%20Town"
    const cityName = decodeURIComponent(slug);
    const items = getItemsByLocation(cityName);

    const places = items.filter(i => ['Accommodation', 'Activity', 'Dining'].includes(i.type));
    const logistics = items.filter(i => ['Transport', 'Tip'].includes(i.type));

    // Filter Itinerary for this City
    // Normalize logic: "Victoria Falls" matches "Victoria Falls"
    const cityDays = masterItinerary.filter(day =>
        day.location.toLowerCase().includes(cityName.toLowerCase()) ||
        cityName.toLowerCase().includes(day.location.toLowerCase())
    );

    // Simple header image mapping (mocked for now, can be improved)
    const bgImages: Record<string, string> = {
        'Cape Town': 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2671&auto=format&fit=crop',
        'Winelands': 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=2601&auto=format&fit=crop',
        'Kruger': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop',
        'Victoria Falls': 'https://images.unsplash.com/photo-1534068590799-09895a701e3e?q=80&w=2520&auto=format&fit=crop',
    };

    const headerBg = bgImages[cityName] || 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2572&auto=format&fit=crop';

    return (
        <main className="min-h-screen bg-[var(--savanna-bg)] text-[var(--foreground)] font-sans">
            {/* Navbar is now in layout.tsx */}

            {/* City Hero */}
            <header className="relative h-[300px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url("${headerBg}")` }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                <div className="relative z-10 text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 mb-4">
                        <MapPin size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">{cityName}</span>
                    </div>
                    <h1 className="text-5xl font-bold font-serif mb-2">{cityName}</h1>
                    <p className="text-xl text-white/90">Guia de Viagem & Experiências</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-4 lg:p-8 -mt-10 relative z-20 space-y-12">

                {/* 1. ITINERARY SECTION (New) */}
                {cityDays.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-lg border border-[var(--savanna-sand)] overflow-hidden">
                        <div className="bg-[var(--savanna-terracotta)]/10 p-6 border-b border-[var(--savanna-terracotta)]/20 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[var(--savanna-terracotta)] flex items-center gap-2 font-serif">
                                <Calendar className="text-[var(--savanna-terracotta)]" />
                                Roteiro em {cityName}
                            </h2>
                            <Link href="/" className="text-sm font-bold text-[var(--savanna-terracotta)] hover:underline flex items-center gap-1">
                                Ver Completo <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {cityDays.map(day => (
                                <div key={day.day} className="p-6 hover:bg-gray-50 transition-colors group">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Date/Day Column */}
                                        <div className="md:w-32 flex-shrink-0">
                                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Dia {day.day}</span>
                                            <span className="block text-xl font-bold text-gray-800 font-serif">{day.date.split('/')[0]}/{day.date.split('/')[1]}</span>
                                            <span className="text-sm text-gray-500">2026</span>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{day.summary}</h3>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {day.selectedItems.map(slug => (
                                                    <span key={slug} className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--savanna-terracotta)]/10 text-[var(--savanna-terracotta)] text-xs rounded border border-[var(--savanna-terracotta)]/20 font-bold">
                                                        <Clock size={10} /> {items.find(i => i.slug === slug)?.title || slug}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 2. CONTENT LIST (Existing) */}
                <CityContent places={places} logistics={logistics} />
            </div>
        </main>
    );
}
