import { getItineraryWithDetails } from '@/lib/itinerary';
import type { KnowledgeItem } from '@/lib/knowledge';
import { Search } from 'lucide-react';
import CityContent from '@/components/CityContent';

export default function LibraryPage() {
    // Dynamically build the library items from the active itinerary 
    // to guarantee 100% sync with the Roteiro data structure.
    const itinerary = getItineraryWithDetails();

    // Extract unique knowledge items from all days, attaching the date
    const uniqueItemsMap = new Map<string, KnowledgeItem & { date?: string }>();

    itinerary.forEach(day => {
        if (day.selectedDetails) {
            day.selectedDetails.forEach(detail => {
                if (detail && !uniqueItemsMap.has(detail.slug)) {
                    // Attach the day's date to the generic knowledge item
                    const itemWithDate = { ...detail, date: day.date };
                    uniqueItemsMap.set(detail.slug, itemWithDate);
                }
            });
        }
    });

    const items = Array.from(uniqueItemsMap.values());

    // Split items for CityContent rendering
    const places = items.filter(i => ['Accommodation', 'Activity', 'Dining'].includes(i.type));
    const logistics = items.filter(i => ['Transport', 'Tip'].includes(i.type));

    return (
        <main className="min-h-screen bg-[var(--savanna-bg)] text-[var(--foreground)] font-sans">
            {/* Header */}
            <header className="relative h-[250px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1481487484168-9b995ecc1679?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
                <div className="relative z-10 text-center text-white px-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 mb-4">
                        <Search size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">Acervo Completo</span>
                    </div>
                    <h1 className="text-5xl font-bold font-serif mb-2">Biblioteca de Viagem</h1>
                    <p className="text-xl text-white/90">Todo o conhecimento acumulado em um só lugar.</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-4 lg:p-8 -mt-10 relative z-20">
                <CityContent places={places} logistics={logistics} />
            </div>
        </main>
    );
}
