import Navbar from '@/components/Navbar';
import { Plane, Calendar, Clock, CheckCircle } from 'lucide-react';

interface ConfirmedFlight {
    id: string;
    route: string;
    date: string;
    time: string;
    airline: string;
    flightCode: string;
    status: string;
}

const confirmedFlights: ConfirmedFlight[] = [
    {
        id: "f1",
        route: "Brasília (BSB) → São Paulo (GRU)",
        date: "2026-03-11",
        time: "15:00 - 16:45",
        airline: "LATAM",
        flightCode: "LA 3528",
        status: "confirmed"
    },
    {
        id: "f2",
        route: "São Paulo (GRU) → Joanesburgo (JNB)",
        date: "2026-03-11",
        time: "22:45 - 12:40 (+1)",
        airline: "LATAM",
        flightCode: "LA 8058",
        status: "confirmed"
    },
    {
        id: "f3",
        route: "Joanesburgo (JNB) → Port Elizabeth (PLZ)",
        date: "2026-03-21",
        time: "11:25 - 13:00",
        airline: "South African Airways",
        flightCode: "SA 405",
        status: "confirmed"
    },
    {
        id: "f4",
        route: "Cape Town (CPT) → Joanesburgo (JNB)",
        date: "2026-04-01",
        time: "20:25 - 22:25",
        airline: "South African Airways",
        flightCode: "SA 372",
        status: "confirmed"
    },
    {
        id: "f5",
        route: "Joanesburgo (JNB) → São Paulo (GRU)",
        date: "2026-04-03",
        time: "14:50 - 20:25",
        airline: "LATAM",
        flightCode: "LA 8059",
        status: "confirmed"
    },
    {
        id: "f6",
        route: "São Paulo (GRU) → Brasília (BSB)",
        date: "2026-04-04",
        time: "00:35 - 02:20",
        airline: "LATAM",
        flightCode: "LA 4703",
        status: "confirmed"
    }
];

export default function FlightsPage() {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T12:00:00');
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-[var(--foreground)] font-sans">
            <div className="max-w-4xl mx-auto p-6 md:p-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                            <Plane className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Itinerário de Voos</h1>
                            <p className="text-gray-500 text-sm">Resumo confirmado das rotas aéreas</p>
                        </div>
                    </div>
                </header>

                {/* Confirmed Flights */}
                <section className="mb-10">
                    <div className="grid grid-cols-1 gap-4">
                        {confirmedFlights.map((flight) => (
                            <div key={flight.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-bold text-lg md:text-xl text-gray-900">{flight.route}</span>
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                                            <CheckCircle size={10} /> Confirmado
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1 font-medium"><Calendar size={14} className="text-indigo-400" /> {formatDate(flight.date)}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} className="text-indigo-400" /> {flight.time}</span>
                                    </div>
                                </div>
                                <div className="text-left md:text-right bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <div className="font-bold text-gray-800">{flight.airline}</div>
                                    <div className="text-sm text-gray-500 font-mono">{flight.flightCode}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
