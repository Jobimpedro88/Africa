"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Circle, ArrowRight, Hotel, UtensilsCrossed, CalendarCheck, Plane } from 'lucide-react';

type ChecklistItem = {
    id: string;
    label: string;
    desc?: string;
    done: boolean;
    link?: string;
};

type ChecklistCategory = {
    id: string;
    icon: React.ElementType;
    title: string;
    items: ChecklistItem[];
};

const initialChecklist: ChecklistCategory[] = [
    {
        id: 'flights-logistics',
        icon: Plane,
        title: 'Voos & Logística de Estrada',
        items: [
            { id: 'v1', label: 'Voo Ida (BSB -> JNB)', desc: 'Latam (Confirmado)', done: true },
            { id: 'v2', label: 'Voos Internos (SAA)', desc: 'JNB->PLZ e CPT->JNB (Confirmados)', done: true },
            { id: 'v3', label: 'Voo Volta (JNB -> BSB)', desc: 'Latam (Confirmado)', done: true },
            { id: 'c1', label: 'Carro 1 (JNB - Kruger)', desc: 'GreenMotion ou Trocar para Avis/Woodford', done: false },
            { id: 'c2', label: 'Carro 2 (PLZ - CPT)', desc: 'Sixt - Fazer Status Match online', done: false, link: 'https://www.sixt.com/' },
            { id: 'c3', label: 'Carta de Fronteira (Eswatini)', desc: 'Solicitar na locadora 72h antes (~R1.800)', done: false },
        ]
    },
    {
        id: 'hotels',
        icon: Hotel,
        title: 'Hotéis Pendentes (Reservar Agora)',
        items: [
            { id: 'h1', label: 'Mdluli Safari Lodge (Kruger)', desc: 'Confirmado Reserva #72071022668342', done: true },
            { id: 'h2', label: 'Eswatini (19 a 21/03)', desc: 'Summerfield Botanical (~R$ 1.800), Foresters Arms ou Mogi', done: false, link: 'https://summerfield.co.sz/' },
            { id: 'h3', label: 'Port Elizabeth (21 a 22/03)', desc: 'Radisson Blu PE ou The Beach Hotel (~R$ 900)', done: false, link: 'https://www.radissonhotels.com/en-us/hotels/radisson-blu-port-elizabeth' },
            { id: 'h4', label: 'Plettenberg Bay (22 a 25/03)', desc: 'The Bungalow Plett (~R$ 1.500)', done: false, link: 'https://www.booking.com/hotel/za/the-bungalow-plettenberg-bay.html' },
            { id: 'h5', label: 'Hermanus (25 a 26/03)', desc: 'The Marine Hermanus (~R$ 2.500)', done: false, link: 'https://www.themarinehotel.co.za/' },
            { id: 'h6', label: 'Cape Town (26 a 30/03)', desc: 'The Marly Boutique, POD Camps Bay ou Airbnb (~R$ 2.800)', done: false, link: 'https://themarly.co.za/' },
            { id: 'h7', label: 'Winelands (30/03 a 01/04)', desc: 'Boschendal (~R$ 7.500) ou Lanzerac (~R$ 9.800)', done: false, link: 'https://www.booking.com/hotel/za/boschendal-farm-estate.html' },
            { id: 'h8', label: 'Johannesburg (01 a 03/04)', desc: 'Sandton Sun ou Davinci Hotel (~R$ 1.600)', done: false, link: 'https://www.booking.com/hotel/za/sandton-sun.html' },
        ]
    },
    {
        id: 'restaurants-tours',
        icon: UtensilsCrossed,
        title: 'Restaurantes & Passeios (Reservar Agora)',
        items: [
            { id: 'r1', label: 'Marble (Johannesburg - 02/04)', desc: 'Urgente! Abre 60 dias antes. Essencial para despedida.', done: false, link: 'https://www.dineplan.com/restaurants/marble' },
            { id: 'r2', label: 'The Pot Luck Club (Cape Town - 29/03)', desc: 'Urgente! Abre 4 meses antes.', done: false, link: 'https://www.dineplan.com/restaurants/the-pot-luck-club-cape-town' },
            { id: 'r3', label: 'Babel em Babylonstoren (Winelands - 30/03)', desc: 'Urgente! Abre 9 meses antes online.', done: false, link: 'https://babylonstoren.com/babel' },
            { id: 'r4', label: 'The Glass House (Graskop - 13/03)', desc: 'Indispensável. Esgota muito rápido. (+27 13 767 1108)', done: false },
            { id: 'r5', label: 'Mrs Simpson\'s (Dullstroom - 12/03)', desc: 'Recomendado para a primeira noite.', done: false, link: 'https://mrssimpsons.co.za/' },
            { id: 'r6', label: 'Ginger The Restaurant (Port Elizabeth - 21/03)', desc: 'Recomendado. Fine Dining beira-mar.', done: false, link: 'https://ginger-restaurant.co.za/' },
            { id: 'r7', label: 'Table Mountain (Cape Town)', desc: 'Compre dias antes se o tempo abrir (Evite vento).', done: false, link: 'https://www.webtickets.co.za/' },
            { id: 'r8', label: 'Wine Tram (Franschhoek)', desc: 'Compre antecipado. Linhas esgotam no verão.', done: false, link: 'https://winetram.co.za/' },
        ]
    }
];

export default function ChecklistPage() {
    const [categories, setCategories] = useState<ChecklistCategory[]>(initialChecklist);

    // Load state on mount
    useEffect(() => {
        const saved = localStorage.getItem('africa-action-checklist');
        if (saved) {
            try {
                // Merge saved status with initial items to allow content updates
                const parsed = JSON.parse(saved);
                const merged = initialChecklist.map(initialCat => {
                    const savedCat = parsed.find((c: any) => c.id === initialCat.id);
                    if (!savedCat) return initialCat;
                    return {
                        ...initialCat,
                        items: initialCat.items.map(initialItem => {
                            const savedItem = savedCat.items.find((i: any) => i.id === initialItem.id);
                            return savedItem ? { ...initialItem, done: savedItem.done } : initialItem;
                        })
                    };
                });
                setCategories(merged);
            } catch (e) {
                console.error("Failed to parse checklist items:", e);
            }
        }
    }, []);

    const toggleItem = (categoryId: string, itemId: string) => {
        const newCategories = categories.map(cat => {
            if (cat.id !== categoryId) return cat;
            return {
                ...cat,
                items: cat.items.map(item =>
                    item.id === itemId ? { ...item, done: !item.done } : item
                )
            };
        });

        setCategories(newCategories);
        localStorage.setItem('africa-action-checklist', JSON.stringify(newCategories));
    };

    const countDone = (items: ChecklistItem[]) => items.filter(i => i.done).length;

    return (
        <main className="min-h-screen bg-[var(--savanna-bg)] text-[var(--foreground)] font-sans pb-20">
            <div className="bg-[var(--savanna-card)] border-b border-[var(--savanna-sand)] py-12 px-8 shadow-sm">
                <div className="max-w-4xl mx-auto flex gap-4 items-center">
                    <CalendarCheck className="text-[var(--savanna-terracotta)]" size={48} />
                    <div>
                        <h1 className="text-4xl font-bold text-[var(--savanna-terracotta)] font-serif">Checklist de Ações</h1>
                        <p className="text-gray-600 mt-2 text-lg">Acompanhe as reservas cruciais de hotéis, logísticas e restaurantes muito disputados.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 mt-4">
                {categories.map((category) => {
                    const doneCount = countDone(category.items);
                    const total = category.items.length;
                    const isAllDone = doneCount === total;
                    const Icon = category.icon;

                    return (
                        <section key={category.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-300 ${isAllDone ? 'border-emerald-200 bg-emerald-50/10' : 'border-gray-200'}`}>

                            <div className="bg-[var(--savanna-sand)]/20 p-5 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl text-white ${isAllDone ? 'bg-emerald-500' : 'bg-[var(--savanna-terracotta)]'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <h2 className={`font-bold text-lg ${isAllDone ? 'text-emerald-700' : 'text-gray-900'}`}>{category.title}</h2>
                                </div>
                                <div className="text-sm font-medium px-3 py-1 rounded-full bg-white/60 text-gray-600">
                                    {doneCount} / {total}
                                </div>
                            </div>

                            <div className="divide-y divide-gray-50/80">
                                {category.items.map(item => (
                                    <div key={item.id} className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-orange-50/30 transition-colors group">
                                        <button
                                            onClick={() => toggleItem(category.id, item.id)}
                                            className="flex-1 flex items-start gap-4 text-left focus:outline-none"
                                        >
                                            <div className="mt-0.5 shrink-0 transition-transform group-hover:scale-110">
                                                {item.done
                                                    ? <CheckCircle className="text-emerald-500 fill-emerald-100" size={24} />
                                                    : <Circle className="text-gray-300 group-hover:text-[var(--savanna-terracotta)]" size={24} />
                                                }
                                            </div>
                                            <div>
                                                <p className={`font-medium sm:text-lg transition-colors ${item.done ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-800'}`}>
                                                    {item.label}
                                                </p>
                                                {item.desc && (
                                                    <p className={`text-sm mt-1 transition-colors ${item.done ? 'text-gray-400' : 'text-gray-500'}`}>
                                                        {item.desc}
                                                    </p>
                                                )}
                                            </div>
                                        </button>

                                        {item.link && (
                                            <Link
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`shrink-0 flex items-center gap-1 text-sm font-medium transition-colors ${item.done ? 'text-gray-300 hover:text-gray-500' : 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg'}`}
                                            >
                                                Resolver <ArrowRight size={14} />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
