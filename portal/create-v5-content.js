const fs = require('fs');
const path = require('path');

const itineraryDir = path.join(__dirname, 'content');
const itemsDir = path.join(__dirname, 'content', 'items');

// Clear existing items
if (fs.existsSync(itemsDir)) {
    fs.rmSync(itemsDir, { recursive: true, force: true });
}
fs.mkdirSync(itemsDir, { recursive: true });

const items = [
    { slug: 'gru-latam', title: 'Sala VIP GRU Latam T3', type: 'Flight', coordinates: { lat: -23.4345, lng: -46.4692 }, tags: ['Voo', 'VIP'], content: '**Onde:** Terminal 3 GRU. Voo LA 8058 para JNB.' },
    { slug: 'jnb-greenmotion', title: 'Retirada Carro 1 - GreenMotion', type: 'Transport', coordinates: { lat: -26.1333, lng: 28.2307 }, tags: ['Aluguel'], content: '**Onde:** O.R. Tambo Arrivals. Atenção com a Letter of Authority.' },
    { slug: 'alzu-petroport', title: 'Parada Alzu Petroport', type: 'Dining', coordinates: { lat: -25.8236, lng: 29.7892 }, tags: ['Na Estrada'], content: '**O Que É:** Posto com Nando\'s, recintos com rinocerontes e búfalos.' },
    { slug: 'walkerson-dullstroom', title: 'Walkersons Hotel & Spa', type: 'Accommodation', coordinates: { lat: -25.4184, lng: 30.1041 }, tags: ['Hotel'], content: 'Hospedagem chique em Dullstroom.' },
    { slug: 'mac-mac-falls', title: 'Mac Mac Falls', type: 'Activity', coordinates: { lat: -25.0000, lng: 30.8167 }, tags: ['Natureza', 'Cachoeira'], content: 'Entrada: ZAR 50. Cachoeira linda de 65m.' },
    { slug: 'graskop-gorge', title: 'Graskop Gorge Lift', type: 'Activity', coordinates: { lat: -24.9450, lng: 30.8400 }, tags: ['Aventura'], content: 'Elevador cênico para o fundo do desfiladeiro (R205).' },
    { slug: 'angels-view', title: 'Angels View Hotel', type: 'Accommodation', coordinates: { lat: -24.9350, lng: 30.8427 }, tags: ['Hotel', 'Piscina'], content: 'Novíssimo, piscina com borda infinita de cara para a fenda.' },
    { slug: 'gods-window', title: 'God\'s Window', type: 'Activity', coordinates: { lat: -24.8778, lng: 30.8889 }, tags: ['Mirante'], content: 'A Janela de Deus. Trilha para a Rain Forest também.' },
    { slug: 'bourkes-luck', title: 'Bourke\'s Luck Potholes', type: 'Activity', coordinates: { lat: -24.6738, lng: 30.8113 }, tags: ['Mirante', 'Rios'], content: 'Formações rochosas no encontro dos rios Treur e Blyde.' },
    { slug: 'three-rondavels', title: 'Three Rondavels', type: 'Activity', coordinates: { lat: -24.5684, lng: 30.8037 }, tags: ['Mirante', 'Cânion'], content: 'A vista mais clássica e icônica do Blyde River Canyon.' },
    { slug: 'mdluli-safari', title: 'Mdluli Safari Lodge', type: 'Accommodation', coordinates: { lat: -25.0250, lng: 31.2400 }, tags: ['Safari', 'Luxo'], content: 'Entre pelo Phabeni Gate. Inclui Game Drives a R1.170.' },
    { slug: 'sleepover-orpen', title: 'SleepOver Orpen Gate', type: 'Accommodation', coordinates: { lat: -24.4752, lng: 31.3962 }, tags: ['Econômico', 'Kruger'], content: 'Super perto dos portões de Orpen e região de Satara (Cat Camp).' },
    { slug: 'ngwenya-glass', title: 'Ngwenya Glass', type: 'Activity', coordinates: { lat: -26.2300, lng: 31.0200 }, tags: ['Artesanato'], content: 'Fábrica de vidro sustentável no Eswatini. Imperdível.' },
    { slug: 'summerfield-resort', title: 'Summerfield Botanical Garden', type: 'Accommodation', coordinates: { lat: -26.4674, lng: 31.1890 }, tags: ['Eswatini', 'Luxo'], content: 'Resort fenomenal escondido no vale.' },
    { slug: 'sixt-plz', title: 'Retirada Carro 2 - Sixt PLZ', type: 'Transport', coordinates: { lat: -33.9845, lng: 25.6118 }, tags: ['Aluguel'], content: 'Retirada Carro 2 em Port Elizabeth. Peça o Status Match.' },
    { slug: 'radisson-plz', title: 'Radisson Blu PLZ', type: 'Accommodation', coordinates: { lat: -33.9856, lng: 25.6661 }, tags: ['Hotel', 'Beach'], content: 'Frente mar em Port Elizabeth.' },
    { slug: 'bloukrans-bridge', title: 'Bloukrans Bridge Bungee', type: 'Activity', coordinates: { lat: -33.9663, lng: 23.6457 }, tags: ['Aventura'], content: 'O maior bungee de ponte do mundo (216m).' },
    { slug: 'bungalow-plett', title: 'The Bungalow Plett', type: 'Accommodation', coordinates: { lat: -34.0583, lng: 23.3769 }, tags: ['Beira-mar', 'Plett'], content: 'Pé na areia na Hobie Beach.' },
    { slug: 'robberg', title: 'Robberg Nature Reserve', type: 'Activity', coordinates: { lat: -34.0984, lng: 23.3853 }, tags: ['Trilha', 'Natureza'], content: 'Caminhada litorânea fantástica. Leve água e boné.' },
    { slug: 'marine-hermanus', title: 'The Marine Hermanus', type: 'Accommodation', coordinates: { lat: -34.4214, lng: 19.2435 }, tags: ['Luxo', 'Clássico'], content: 'De frente para o mar, o clássico de Hermanus.' },
    { slug: 'table-mountain', title: 'Table Mountain', type: 'Activity', coordinates: { lat: -33.9573, lng: 18.4031 }, tags: ['Mirante'], content: 'Bondinho giratório. Subiu, tá com sol? Zarpou.' },
    { slug: 'marly-camps-bay', title: 'The Marly Boutique Hotel', type: 'Accommodation', coordinates: { lat: -33.9531, lng: 18.3789 }, tags: ['Luxo', 'Cape Town'], content: 'Camps Bay, de frente para as praias e doze apóstolos.' },
    { slug: 'babylonstoren', title: 'Babylonstoren', type: 'Accommodation', coordinates: { lat: -33.8266, lng: 18.9265 }, tags: ['Vinho', 'Jardins'], content: 'Fazenda espetacular com jardins famosos. Reserva obrigatória.' },
    { slug: 'wine-tram', title: 'Franschhoek Wine Tram', type: 'Activity', coordinates: { lat: -33.9109, lng: 19.1166 }, tags: ['Vinho', 'Passeio'], content: 'Trem do vinho. Use linha Navy ou Orange/Grey.' },
    { slug: 'sandton-sun', title: 'Sandton Sun', type: 'Accommodation', coordinates: { lat: -26.1086, lng: 28.0526 }, tags: ['Luxo', 'Shopping'], content: 'Conectado no shopping Sandton City. Muito seguro e chique.' },
    { slug: 'soweto-tour', title: 'Soweto Tour', type: 'Activity', coordinates: { lat: -26.2485, lng: 27.8540 }, tags: ['Cultura', 'História'], content: 'Passeio guiado na casa de Mandela (Vilakazi St).' }
];

items.forEach(item => {
    const fileContent = `---
title: "${item.title}"
type: "${item.type}"
locations: []
coordinates:
  lat: ${item.coordinates.lat}
  lng: ${item.coordinates.lng}
tags: ${JSON.stringify(item.tags)}
checklist: true
rating: 5
---

${item.content}
`;
    fs.writeFileSync(path.join(itemsDir, `${item.slug}.md`), fileContent);
});

const itinerary = [
    { day: 1, date: "11/03/2026", location: "Brasil -> África", summary: "Em Trânsito", selectedItems: ["gru-latam"], alternativeItems: [] },
    { day: 2, date: "12/03/2026", location: "Dullstroom", summary: "Desembarque & Estrada", selectedItems: ["jnb-greenmotion", "alzu-petroport", "walkerson-dullstroom"], alternativeItems: [] },
    { day: 3, date: "13/03/2026", location: "Graskop", summary: "A Rota das Cachoeiras", selectedItems: ["mac-mac-falls", "graskop-gorge", "angels-view"], alternativeItems: [] },
    { day: 4, date: "14/03/2026", location: "Panorama Route", summary: "Mirantes Clássicos", selectedItems: ["gods-window", "bourkes-luck", "three-rondavels", "angels-view"], alternativeItems: [] },
    { day: 5, date: "15/03/2026", location: "Kruger Sul", summary: "Entrada e Phabeni", selectedItems: ["mdluli-safari"], alternativeItems: [] },
    { day: 6, date: "16/03/2026", location: "Kruger Sul", summary: "O Dia do Big 5", selectedItems: ["mdluli-safari"], alternativeItems: [] },
    { day: 7, date: "17/03/2026", location: "Kruger Central", summary: "Mudança para Satara", selectedItems: ["sleepover-orpen"], alternativeItems: [] },
    { day: 8, date: "18/03/2026", location: "Kruger Central", summary: "Caça aos Felinos", selectedItems: ["sleepover-orpen"], alternativeItems: [] },
    { day: 9, date: "19/03/2026", location: "Eswatini", summary: "O Reino das Montanhas", selectedItems: ["ngwenya-glass", "summerfield-resort"], alternativeItems: [] },
    { day: 10, date: "20/03/2026", location: "Eswatini", summary: "Cultura Swazi", selectedItems: ["summerfield-resort"], alternativeItems: [] },
    { day: 11, date: "21/03/2026", location: "Port Elizabeth", summary: "Voo & Chegada Garden Route", selectedItems: ["sixt-plz", "radisson-plz"], alternativeItems: [] },
    { day: 12, date: "22/03/2026", location: "Plettenberg Bay", summary: "Tsitsikamma", selectedItems: ["bloukrans-bridge", "bungalow-plett"], alternativeItems: [] },
    { day: 13, date: "23/03/2026", location: "Plettenberg Bay", summary: "Trilhas & Mirantes", selectedItems: ["robberg", "bungalow-plett"], alternativeItems: [] },
    { day: 14, date: "24/03/2026", location: "Plettenberg Bay", summary: "Knysna Ostras", selectedItems: ["bungalow-plett"], alternativeItems: [] },
    { day: 15, date: "25/03/2026", location: "Hermanus", summary: "Baleias e Clima", selectedItems: ["marine-hermanus"], alternativeItems: [] },
    { day: 16, date: "26/03/2026", location: "Cape Town", summary: "R44 & Camps Bay", selectedItems: ["marly-camps-bay"], alternativeItems: [] },
    { day: 17, date: "27/03/2026", location: "Cape Town", summary: "A Montanha & Cidade", selectedItems: ["table-mountain", "marly-camps-bay"], alternativeItems: [] },
    { day: 18, date: "28/03/2026", location: "Cape Town", summary: "Península do Cabo", selectedItems: ["marly-camps-bay"], alternativeItems: [] },
    { day: 19, date: "29/03/2026", location: "Cape Town", summary: "Mercados", selectedItems: ["marly-camps-bay"], alternativeItems: [] },
    { day: 20, date: "30/03/2026", location: "Winelands", summary: "Os Jardins de Babylonstoren", selectedItems: ["babylonstoren"], alternativeItems: [] },
    { day: 21, date: "31/03/2026", location: "Winelands", summary: "O Trem do Vinho", selectedItems: ["wine-tram", "babylonstoren"], alternativeItems: [] },
    { day: 22, date: "01/04/2026", location: "Johannesburg", summary: "O Retorno", selectedItems: ["sandton-sun"], alternativeItems: [] },
    { day: 23, date: "02/04/2026", location: "Johannesburg", summary: "Soweto & Sandton", selectedItems: ["soweto-tour", "sandton-sun"], alternativeItems: [] },
    { day: 24, date: "03/04/2026", location: "Brasil", summary: "A Volta", selectedItems: ["gru-latam"], alternativeItems: [] }
];

fs.writeFileSync(path.join(itineraryDir, 'itinerary.json'), JSON.stringify(itinerary, null, 4));
console.log('✅ Generated V5 itinerary.json and items.');
