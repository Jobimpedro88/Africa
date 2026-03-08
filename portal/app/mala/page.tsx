"use client"

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Luggage, WalletCards, BriefcaseMedical, Camera, Shirt } from 'lucide-react';

type ChecklistItem = {
    id: string;
    label: string;
    desc?: string;
    done: boolean;
};

type ChecklistCategory = {
    id: string;
    icon: React.ElementType;
    title: string;
    items: ChecklistItem[];
};

const initialChecklist: ChecklistCategory[] = [
    {
        id: 'docs',
        icon: WalletCards,
        title: 'Documentos Essenciais',
        items: [
            { id: 'd1', label: 'Passaportes', desc: 'Válidos até mínimo setembro de 2026', done: false },
            { id: 'd2', label: 'CNH de ambos', done: false },
            { id: 'd3', label: 'PID (Permissão Internacional para Dirigir)', desc: 'Obrigatório para ambos', done: false },
            { id: 'd4', label: 'Seguro Viagem', desc: 'Impresso + celular', done: false },
            { id: 'd5', label: 'Cartões Físicos', desc: 'Wise, Nomad, Visa Infinite, Mastercard Black', done: false },
            { id: 'd6', label: 'ZAR 2.000 em dinheiro', desc: 'Sacar no aeroporto JNB', done: false },
            { id: 'd7', label: 'Vouchers e Passagens SAA/Latam', desc: 'Impressos', done: false },
            { id: 'd8', label: 'Carta de autorização cross-border (Eswatini)', done: false },
            { id: 'd9', label: 'Vacina de Febre Amarela', desc: 'Confirmar para Eswatini', done: false },
        ]
    },
    {
        id: 'jobim-mala',
        icon: Shirt,
        title: 'Mala de Jobim (8kg MAX)',
        items: [
            { id: 'j1', label: '2x Camiseta básica', desc: 'Branca/Off-White e Azul Marinho', done: false },
            { id: 'j2', label: '2x Polo shirt', desc: 'Azul Marinho e Khaki/Bege', done: false },
            { id: 'j3', label: '1x Camisa de linho', desc: 'Off-White/Cru', done: false },
            { id: 'j4', label: '1x Camiseta manga longa UV', desc: 'Olive Green', done: false },
            { id: 'j5', label: 'Calças e Shorts', desc: '1x Cargo convertível, 1x Chino slim (avião), 1x Short/Bermuda', done: false },
            { id: 'j6', label: 'Calçados', desc: '1x Tênis trail (avião), 1x Tênis casual, 1x Sandália/Chinelo', done: false },
            { id: 'j7', label: 'Agasalhos/Acessórios', desc: '1x Fleece leve, 1x Capa de chuva, 1x Boné, Óculos', done: false },
            { id: 'j8', label: 'Peças íntimas', desc: '7x Cuecas, 5x Meias, 1x Meia compressão, 1x Shorts dormir', done: false },
            { id: 'j9', label: 'Skincare e Higiene', desc: 'Proraso sólido, Gel/Espuma limpador, Sérum, Hidratante, Protetor labial', done: false },
        ]
    },
    {
        id: 'paula-mala',
        icon: Shirt,
        title: 'Mala de Paula (8kg MAX)',
        items: [
            { id: 'p1', label: '7x Tops e Blusas', desc: 'Branca, Terracota, Manga longa Bege, Blusa rosa seco, Regatas manga UV', done: false },
            { id: 'p2', label: '2x Vestidos', desc: 'Midi Terracota/Camel e Sundress', done: false },
            { id: 'p3', label: '3x Calças / Saias', desc: 'Wide-leg linho, Legging preta (avião), Saia midi', done: false },
            { id: 'p4', label: 'Calçados', desc: '1x Tênis branco (avião), 1x Sandália elegante, 1x Chinelo', done: false },
            { id: 'p5', label: 'Agasalhos/Acessórios', desc: '1x Cardigan, 1x Capa de chuva, 1x Lenço grande, 1x Chapéu/Boné, Óculos', done: false },
            { id: 'p6', label: 'Peças Íntimas e Praia', desc: '7x Calcinhas, Sutiãs, 4x Meias, 1x Meia compressão, 2x Biquínis, 1x Pijama', done: false },
            { id: 'p7', label: 'Skincare (Minis)', desc: 'Lenços demaquilantes, Limpador, Tônico, Vitamina C, Olhos, Hidratante', done: false },
            { id: 'p8', label: 'Maquiagem', desc: 'Rímel à prova d\'água, Lápis marrom, Batons Nude/Terracota, Blush, BB Cream, Pó, Pincéis', done: false },
            { id: 'p9', label: 'Cabelos', desc: 'Scrunchies de cetim, Escova dobrável, Leave-in 50ml', done: false },
        ]
    },
    {
        id: 'mochila',
        icon: Camera,
        title: 'Mochila (Eletrônicos)',
        items: [
            { id: 'm1', label: 'DJI Osmo Action + 2x Baterias', desc: 'Sem drone!', done: false },
            { id: 'm2', label: 'Acessórios Camera', desc: 'MicroSD 256GB x2, Filtros ND, Mini Tripé, Suporte Peito', done: false },
            { id: 'm3', label: 'iPad/Tablet e Notebook Ultrafino', done: false },
            { id: 'm4', label: 'Fones, Smartwatches, Smart Ring', done: false },
            { id: 'm5', label: 'Energia', desc: 'Carregador GaN, Power bank 20.000mAh, Cabos curtos e Hub USB-C', done: false },
            { id: 'm6', label: 'Adaptador Tomada Padrão M/N (África do Sul)', desc: 'Comprar antes: 3 pinos redondos em triângulo', done: false },
            { id: 'm7', label: 'Binóculo 8x42', desc: 'Nikon, Vanguard ou Celestron', done: false },
        ]
    },
    {
        id: 'saude',
        icon: BriefcaseMedical,
        title: 'Saúde, Remédios e Safari',
        items: [
            { id: 's1', label: 'Malarone e Repelente DEET', desc: 'Malarone prescrição médica, DEET 30-50% pump', done: false },
            { id: 's2', label: 'Básicos Farmácia', desc: 'Dipirona, Ibuprofeno, Loratadina, Dramamine (Enjoo)', done: false },
            { id: 's3', label: 'Gastro', desc: 'Loperamida (Imodium), Omeprazol, Soro oral, Enzimas (Paula), Antiácido s/ glúten', done: false },
            { id: 's4', label: 'Outros', desc: 'Melatonina 5mg, Soro nasal, Soro olhos, Antibiótico emergência', done: false },
            { id: 's5', label: 'Kit Primeiros Socorros', desc: 'Band-aids, Compeed (bolhas), Bepantol, Álcool gel', done: false },
            { id: 's6', label: 'Suplementos na Mala (Até 350ml/g)', desc: 'Whey Isolado (Paula), Creatina, Omega 3, D3/K2, Multivitamínico. (O restante despacho)', done: false },
            { id: 's7', label: 'Outros itens Safari', desc: 'Buffs (pescoço), Lanterna de cabeça, Sacolas de pano, Garrafa dobrável', done: false },
        ]
    }
];

export default function PackingChecklistPage() {
    const [categories, setCategories] = useState<ChecklistCategory[]>(initialChecklist);

    // Carregar estado ao iniciar
    useEffect(() => {
        const saved = localStorage.getItem('africa-packing-checklist');
        if (saved) {
            try {
                setCategories(JSON.parse(saved));
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
        localStorage.setItem('africa-packing-checklist', JSON.stringify(newCategories));
    };

    const countDone = (items: ChecklistItem[]) => items.filter(i => i.done).length;

    return (
        <main className="min-h-screen bg-[var(--savanna-bg)] text-[var(--foreground)] font-sans pb-20">
            <div className="bg-[var(--savanna-card)] border-b border-[var(--savanna-sand)] py-12 px-8 shadow-sm">
                <div className="max-w-4xl mx-auto flex gap-4 items-center">
                    <Luggage className="text-[var(--savanna-terracotta)]" size={48} />
                    <div>
                        <h1 className="text-4xl font-bold text-[var(--savanna-terracotta)] font-serif">Mala da Viagem</h1>
                        <p className="text-gray-600 mt-2 text-lg">Guia definitivo da bagagem para The Smart Route. 1 mala de mão + mochila cada.</p>
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
                                    <button
                                        key={item.id}
                                        onClick={() => toggleItem(category.id, item.id)}
                                        className="w-full text-left p-4 sm:p-5 flex items-start gap-4 hover:bg-orange-50/30 transition-colors group"
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
                                ))}
                            </div>
                        </section>
                    );
                })}

                <section className="bg-orange-50 border border-orange-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">⚠️ O Que NÃO Levar (Deixe em casa)</h3>
                    <ul className="text-sm text-orange-700 space-y-2 list-disc pl-5">
                        <li><strong>Drone</strong> — Proibido no Kruger. Multa e apreensão.</li>
                        <li><strong>Jeans grosso/pesado</strong> — Pesa muito, seca devagar. O chino slim navy resolve.</li>
                        <li><strong>Blazer/Terno ou Salto alto</strong> — Smart casual e sandália plana dão conta de todos os eventos.</li>
                        <li><strong>Secador de cabelo, Ferro ou vaporizador</strong> — Hotéis fornecem, as roupas não devem amassar.</li>
                        <li><strong>Shampoo/condicionador tamanho normal</strong> — Compre no Clicks em JNB no 1º ou 2º dia.</li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
