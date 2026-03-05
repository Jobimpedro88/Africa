import { getItineraryWithDetails } from '@/lib/itinerary';
import { cities } from '@/lib/cities';
import DayByDayMap from '@/components/map/DayByDayMap';

export default function Home() {
  const itinerary = getItineraryWithDetails();

  return (
    <main className="min-h-screen bg-[var(--savanna-bg)] text-[var(--foreground)] font-sans flex flex-col pt-16">

      {/* Header / Hero (Born from Roadmap) */}
      <header className="relative h-[280px] flex items-center justify-center bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2572&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-5xl md:text-6xl font-bold font-serif mb-2 drop-shadow-lg">Jobim & Paulinha</h1>
          <p className="text-xl md:text-2xl font-light tracking-widest uppercase text-[var(--savanna-gold)] drop-shadow-md">África 2026</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold bg-black/30 p-2 rounded-full backdrop-blur-md inline-flex">
            <span className="px-3 border-r border-white/30">24 Dias</span>
            <span className="px-3 border-r border-white/30">3 Países</span>
            <span className="px-3">Master Itinerary V5</span>
          </div>
        </div>
      </header>

      {/* Main Content Area: Split View Itinerary */}
      <div className="h-[700px] md:h-[calc(100vh-160px)] min-h-[600px] border-t border-[var(--savanna-sand)]">
        <DayByDayMap days={itinerary} cities={cities} />
      </div>

    </main>
  );
}
