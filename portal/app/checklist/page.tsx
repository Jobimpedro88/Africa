import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

export default function ChecklistPage() {
    // This would ideally interact with a local file or DB.
    // For now, hardcoded critical items based on task.md
    const checklist = [
        {
            category: 'Documentação', items: [
                { id: 1, label: 'Passaporte (Válido > 1 mês da saída)', done: true },
                { id: 2, label: 'Vacina Febre Amarela (Inter)', done: true },
                { id: 3, label: 'Carta de Fronteira (Eswatini)', done: false, link: 'https://www.avis.co.za/' },
            ]
        },
        {
            category: 'Hospedagem', items: [
                { id: 9, label: 'Mdluli Safari Lodge (Confirmado #72071022668342)', done: true },
                { id: 10, label: 'Reserva Babylonstoren (Urgente)', done: false, link: 'https://www.booking.com/hotel/za/babylonstoren.html' },
                { id: 11, label: 'Reserva Sandton Sun (JNB Final)', done: false, link: 'https://www.booking.com/hotel/za/sandton-sun.html' },
                { id: 12, label: 'Reserva Plett (The Bungalow)', done: false, link: 'https://www.booking.com/hotel/za/the-bungalow-plettenberg-bay.html' },
            ]
        },
        {
            category: 'Voos Internos', items: [
                { id: 5, label: 'Voo BSB -> JNB (Latam) Confirmado', done: true },
                { id: 7, label: 'Voo JNB -> PLZ (SA405) Confirmado', done: true },
                { id: 8, label: 'Voo CPT -> JNB (SA372) Confirmado', done: true },
            ]
        },
        {
            category: 'Experiências', items: [
                { id: 13, label: 'Restaurante Marble (JNB)', done: false, link: 'https://www.dineplan.com/restaurants/marble' },
                { id: 14, label: 'Pot Luck Club (Cape Town)', done: false, link: 'https://www.dineplan.com/restaurants/the-pot-luck-club-cape-town' },
                { id: 15, label: 'Table Mountain Ticket (Monitorar Tempo)', done: false, link: 'https://www.webtickets.co.za/' },
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-[var(--savanna-bg)] text-[var(--foreground)] font-sans">
            {/* Navbar is in layout */}

            <div className="max-w-4xl mx-auto p-8">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-[var(--savanna-terracotta)] font-serif mb-2">Checklist de Viagem</h1>
                    <p className="text-gray-600">Acompanhe o progresso das suas reservas e documentos.</p>
                </header>

                <div className="space-y-8">
                    {checklist.map((section, idx) => (
                        <section key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <h2 className="bg-[var(--savanna-sand)]/30 p-4 font-bold text-[var(--savanna-terracotta)] uppercase tracking-wider text-sm border-b border-gray-100">
                                {section.category}
                            </h2>
                            <div className="divide-y divide-gray-50">
                                {section.items.map(item => (
                                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {item.done
                                                ? <CheckCircle className="text-emerald-500" size={20} />
                                                : <Circle className="text-gray-300" size={20} />
                                            }
                                            <span className={`${item.done ? 'text-gray-500 line-through decoration-emerald-200' : 'text-gray-800 font-medium'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        {item.link && (
                                            <Link href={item.link} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                                                Resolver <ArrowRight size={12} />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
