const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content');
const itemsDir = path.join(contentDir, 'items');

if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true });
}

const items = [
    // --- Day 1 ---
    {
        slug: 'gru-latam',
        title: 'Voo Latam (GRU -> JNB)',
        type: 'Flight',
        coordinates: { lat: -23.4345, lng: -46.4692 },
        tags: ['Voo', 'VIP'],
        links: { official: 'https://www.latamairlines.com/br/pt/experiencia/prepare-sua-viagem/bagagem/bagagem-despachada' },
        details: { tips: 'Salas VIP: Aeroportos VIP Club (BSB), Safra ou W Premium (GRU). Voo LA 8058.' },
        content: 'Voo direto para Johannesburg. Lembre-se do fuso de +5h.'
    },
    // --- Day 2 ---
    {
        slug: 'jnb-greenmotion',
        title: 'Retirada Carro 1 - GreenMotion',
        type: 'Transport',
        coordinates: { lat: -26.1333, lng: 28.2307 },
        tags: ['Aluguel'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=Green+Motion+OR+Tambo+Airport' },
        details: { tips: 'Meet & Greet (Procure o agente no desembarque). Peça a Letter of Authority para Eswatini!' },
        content: 'Carro para a primeira etapa (Panorama e Kruger).'
    },
    {
        slug: 'alzu-petroport',
        title: 'Parada Alzu Petroport',
        type: 'Dining',
        coordinates: { lat: -25.8236, lng: 29.7892 },
        tags: ['Na Estrada'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=Alzu+Petroport+N4+South+Africa', official: 'https://www.alzu.co.za/petroport/' },
        details: { tips: "Peça um lanche no Nando's e veja os Rinocerontes na varanda!" },
        content: 'Melhor parada da N4, com mini-safari gratuito.'
    },
    {
        slug: 'cinzaco-accommodation',
        title: 'Cinzaco Accommodation',
        type: 'Accommodation',
        coordinates: { lat: -25.4200, lng: 30.1050 },
        tags: ['Dullstroom'],
        links: { official: 'https://cinzaco.co.za/' },
        details: { tips: 'Perto do centro de Dullstroom, ideal para descansar da viagem.' },
        content: 'Hospedagem confirmada em Dullstroom.'
    },
    {
        slug: 'mrs-simpsons',
        title: "Mrs Simpson's",
        type: 'Dining',
        coordinates: { lat: -25.4190, lng: 30.1030 },
        tags: ['Dullstroom', 'Premiado'],
        links: { official: 'https://mrssimpsons.co.za/' },
        details: { tips: 'Peça a Truta (especialidade local) ou o Lamb Shank. Reserve!' },
        content: 'Restaurante temático e muito acolhedor.'
    },
    // --- Day 3 ---
    {
        slug: 'mac-mac-falls',
        title: 'Mac Mac Falls',
        type: 'Activity',
        coordinates: { lat: -25.0000, lng: 30.8167 },
        tags: ['Natureza', 'Cachoeira'],
        details: { tips: 'ZAR 50 por pessoa. Vista linda da queda de 65m.' },
        content: 'Uma das cachoerias mais clássicas da região.'
    },
    {
        slug: 'the-glass-house',
        title: 'The Glass House',
        type: 'Dining',
        coordinates: { lat: -24.9310, lng: 30.8400 },
        tags: ['Graskop', 'Local'],
        details: { tips: 'Incrível Filet e Bobotie. O dono, Abe, é uma figura. Essencial reservar.' },
        content: 'Experiência gastronômica autêntica no "meio do nada".'
    },
    {
        slug: 'graskop-gorge',
        title: 'Graskop Gorge Lift',
        type: 'Activity',
        coordinates: { lat: -24.9450, lng: 30.8400 },
        tags: ['Aventura'],
        links: { official: 'https://www.graskopgorgeliftcompany.co.za/' },
        details: { tips: 'R205 para o elevador que desce no fundo do desfiladeiro.' },
        content: 'Elevador cênico e trilhas suspensas na floresta.'
    },
    {
        slug: 'angels-view',
        title: 'Angels View Hotel',
        type: 'Accommodation',
        coordinates: { lat: -24.9350, lng: 30.8427 },
        tags: ['Piscina', 'Vista'],
        links: { official: 'https://www.angelsview.co.za/' },
        details: { tips: 'A piscina de borda infinita para o vale é o ponto alto.' },
        content: 'Hotel de luxo em Graskop.'
    },
    // --- Day 4 ---
    {
        slug: 'gods-window',
        title: "God's Window",
        type: 'Activity',
        coordinates: { lat: -24.8778, lng: 30.8889 },
        tags: ['Mirante'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=God\'s+Window+Graskop' },
        details: { tips: 'Não pare no primeiro mirante, suba até a Rain Forest (Floresta Tropical). ZAR 70 (Cash).' },
        content: 'Vista panorâmica do Lowveld a 900m de altura. Melhor evitar se houver neblina.'
    },
    {
        slug: 'bourkes-luck',
        title: "Bourke's Luck Potholes",
        type: 'Activity',
        coordinates: { lat: -24.6738, lng: 30.8113 },
        tags: ['Natureza'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=Bourke\'s+Luck+Potholes' },
        details: { tips: 'ZAR 150. Encontro dos rios Treur (tristeza) e Blyde (alegria).' },
        content: 'Formações cilíndricas esculpidas pela erosão na pedra vermelha.'
    },
    {
        slug: 'three-rondavels',
        title: 'Three Rondavels',
        type: 'Activity',
        coordinates: { lat: -24.5684, lng: 30.8037 },
        tags: ['Mirante', 'Cânion'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=Three+Rondavels+Blyde+River+Canyon' },
        details: { tips: 'Chegue às 14:00 para a melhor luz fotográfica. ZAR 90.' },
        content: 'O terceiro maior cânion do mundo, com formações que lembram cabanas africanas.'
    },
    {
        slug: 'the-chubby-pig',
        title: 'The Chubby Pig',
        type: 'Dining',
        coordinates: { lat: -24.6700, lng: 30.8100 },
        tags: ['Panorama Route', 'Beira-Rio'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=The+Chubby+Pig+Bourke\'s+Luck' },
        details: { tips: 'Peça o T-Bone Steak ou o Chubby Burger. Milkshakes artesanais imperdíveis. R150-R280.' },
        content: 'Deck sobre o rio Treur com comida caseira de alta qualidade.'
    },
    {
        slug: 'kadisi-restaurant',
        title: 'Kadisi Restaurant',
        type: 'Dining',
        coordinates: { lat: -24.5600, lng: 30.8100 },
        tags: ['Panorama Route', 'Vista'],
        links: { googleMaps: 'https://www.google.com/maps/search/?api=1&query=Kadisi+Restaurant+Blyde+Canyon' },
        details: { tips: 'Dentro do Blyde Canyon Forever Resort. Vista espetacular do cânion.' },
        content: 'Ótima opção para almoço ou lanche com vista panorâmica.'
    },
    // --- Day 5-6 ---
    {
        slug: 'mdluli-safari',
        title: 'Mdluli Safari Lodge',
        type: 'Accommodation',
        coordinates: { lat: -25.0250, lng: 31.2400 },
        tags: ['Safari', 'Luxo'],
        links: { official: 'https://mdlulisafarilodge.co.za/' },
        details: { tips: 'Fale com o Ranger para ver o que você deseja. Não perca o picnic na rocha de granito!' },
        content: 'Hospedagem imersiva no Kruger.'
    },
    // --- Day 7-8 ---
    {
        slug: 'tshokwane-picnic',
        title: 'Tshokwane Picnic Site',
        type: 'Dining',
        coordinates: { lat: -24.7860, lng: 31.8610 },
        tags: ['Kruger', 'Histórico'],
        details: { tips: 'As "Wild Game Pies" (tortas de carne de caça) são lendárias.' },
        content: 'Parada estratégica no centro do Kruger.'
    },
    {
        slug: 'sleepover-orpen',
        title: 'SleepOver Orpen Gate',
        type: 'Accommodation',
        coordinates: { lat: -24.4752, lng: 31.3962 },
        tags: ['Kruger', 'Base'],
        details: { tips: 'Use a rota S100 perto de Satara para as melhores chances de ver felinos.' },
        content: 'Hospedagem prática próxima ao portão de Orpen.'
    },
    // --- Day 9-10 ---
    {
        slug: 'ngwenya-glass',
        title: 'Ngwenya Glass',
        type: 'Activity',
        coordinates: { lat: -26.2300, lng: 31.0200 },
        tags: ['Eswatini', 'Shopping'],
        links: { official: 'https://ngwenyaglass.sz/' },
        details: { tips: 'Vidros reciclados artesanais. Ótimo para lembranças.' },
        content: 'Fábrica de vidro famosa do Reino.'
    },
    {
        slug: 'summerfield-resort',
        title: 'Summerfield Botanical Garden',
        type: 'Accommodation',
        coordinates: { lat: -26.4674, lng: 31.1890 },
        tags: ['Eswatini', 'Luxo'],
        links: { official: 'https://summerfield.co.sz/' },
        details: { tips: 'Explore os jardins botânicos privativos do hotel.' },
        content: 'O hotel mais luxuoso do Eswatini.'
    },
    {
        slug: 'foresters-arms',
        title: "Foresters Arms",
        type: 'Accommodation',
        coordinates: { lat: -26.4670, lng: 31.1800 },
        tags: ['Eswatini', 'Montanha'],
        links: { official: 'https://forestersarms.co.za/' },
        details: { tips: 'O Sunday Buffet deles é uma das maiores tradições do país.' },
        content: 'Hotel de montanha clássico e charmoso.'
    },
    {
        slug: 'malandelas-farm',
        title: "Malandela's Farm",
        type: 'Dining',
        coordinates: { lat: -26.5070, lng: 31.1740 },
        tags: ['Eswatini', 'Cultura'],
        links: { official: 'https://malandelas.com/' },
        details: { tips: 'Comida internacional em um ambiente artístico e rural.' },
        content: 'Complexo com restaurante, teatro e artesanato.'
    },
    // --- Day 11 ---
    {
        slug: 'sixt-plz',
        title: 'Retirada Carro 2 - Sixt PLZ',
        type: 'Transport',
        coordinates: { lat: -33.9845, lng: 25.6118 },
        tags: ['Aluguel'],
        details: { tips: 'Aeroporto pequeno. Sixt fica no prédio anexo com as outras locadoras.' },
        content: 'Carro para a Garden Route até Cape Town.'
    },
    {
        slug: 'radisson-plz',
        title: 'Radisson Blu PLZ',
        type: 'Accommodation',
        coordinates: { lat: -33.9856, lng: 25.6661 },
        tags: ['Beachfront', 'Conforto'],
        links: { official: 'https://www.radissonhotels.com/en-us/hotels/radisson-blu-port-elizabeth' },
        details: { tips: 'Quartos com vista total para o mar de Summerstrand.' },
        content: 'Hotel premium em Port Elizabeth.'
    },
    {
        slug: 'ginger-restaurant',
        title: "Ginger Restaurant",
        type: 'Dining',
        coordinates: { lat: -33.9820, lng: 25.6600 },
        tags: ['PE', 'Fine Dining'],
        links: { official: 'https://ginger-restaurant.co.za/' },
        details: { tips: 'Cozinha moderna com ingredientes frescos de frente para o mar.' },
        content: 'Um dos melhores restaurantes de Port Elizabeth.'
    },
    // --- Day 12-14 ---
    {
        slug: 'bloukrans-bridge',
        title: 'Bloukrans Bridge Bungee',
        type: 'Activity',
        coordinates: { lat: -33.9663, lng: 23.6457 },
        tags: ['Aventura'],
        links: { official: 'https://www.faceadrenalin.com/' },
        details: { tips: 'Só de subir na ponte já dá um frio na barriga. 216m de altura.' },
        content: 'O maior bungee jump de ponte do mundo.'
    },
    {
        slug: 'bungalow-plett',
        title: 'The Bungalow Plett',
        type: 'Accommodation',
        coordinates: { lat: -34.0583, lng: 23.3769 },
        tags: ['Plett', 'Design'],
        links: { official: 'https://www.thebungalowplett.co.za/' },
        details: { tips: 'Aproveite o deck para drinks no final do dia. Pé na areia.' },
        content: 'Pousada boutique muito descolada.'
    },
    {
        slug: 'robberg',
        title: 'Robberg Nature Reserve',
        type: 'Activity',
        coordinates: { lat: -34.0984, lng: 23.3853 },
        tags: ['Trilha', 'Ocean'],
        details: { tips: 'Faça a trilha circular. Veja as focas e a "ilha" de areia no centro.' },
        content: 'Patrimônio Mundial da UNESCO.'
    },
    {
        slug: 'enricos-restaurant',
        title: "Enrico's Restaurant",
        type: 'Dining',
        coordinates: { lat: -34.0200, lng: 23.4680 },
        tags: ['Keurboomstrand', 'Vista'],
        links: { official: 'https://enricosrestaurant.co.za/' },
        details: { tips: 'Não aceitam reserva. Chegue cedo para pegar mesa no deck. Pizzas e frutos do mar.' },
        content: 'Considerado um dos pátios mais bonitos da África do Sul.'
    },
    {
        slug: 'emily-moon',
        title: "Emily Moon River Lodge",
        type: 'Dining',
        coordinates: { lat: -34.0150, lng: 23.3600 },
        tags: ['Plett', 'Pôr do Sol'],
        links: { official: 'https://emilymoon.co.za/' },
        details: { tips: 'Vá para o Simon’s Bar (no andar de cima) tomar um drink no pôr do sol.' },
        content: 'Ambiente eclético e comida fabulosa com vista para o pântano do Rio Bitou.'
    },
    // --- Day 15 ---
    {
        slug: 'marine-hermanus',
        title: 'The Marine Hermanus',
        type: 'Accommodation',
        coordinates: { lat: -34.4214, lng: 19.2435 },
        tags: ['Hermanus', 'Mar'],
        links: { official: 'https://themarinehotel.co.za/' },
        details: { tips: 'Cuidado para não ser levado pelo vento nas falésias em frente!' },
        content: 'O hotel mais icônico de Hermanus.'
    },
    // --- Day 16 ---
    {
        slug: 'creation-wines',
        title: 'Creation Wines',
        type: 'Dining',
        coordinates: { lat: -34.3310, lng: 19.3240 },
        tags: ['Vinho', 'Gastronomia'],
        links: { official: 'https://www.creationwines.com/' },
        details: { tips: 'O Tasting Menu é uma experiência sensorial impecável. Reserve com meses de antecedência.' },
        content: 'Famosa pela harmonização e inovação.'
    },
    {
        slug: 'marly-camps-bay',
        title: 'The Marly Boutique Hotel',
        type: 'Accommodation',
        coordinates: { lat: -33.9531, lng: 18.3789 },
        tags: ['Camps Bay', 'Trendy'],
        links: { official: 'https://themarly.co.za/' },
        details: { tips: 'O café da manhã no La Belle logo abaixo é excelente.' },
        content: 'Luxo contemporâneo de frente para o mar.'
    },
    // --- Day 17-19 ---
    {
        slug: 'table-mountain',
        title: 'Table Mountain Aerial Cableway',
        type: 'Activity',
        coordinates: { lat: -33.9573, lng: 18.4031 },
        tags: ['Mirante', 'Ícone'],
        links: { official: 'https://www.tablemountain.net/' },
        details: { tips: 'Monitore o vento pelo site oficial. Se estiver aberto e sem nuvens, vá na hora.' },
        content: 'Uma das Sete Maravilhas Naturais do Mundo.'
    },
    {
        slug: 'willoughby-and-co',
        title: "Willoughby & Co",
        type: 'Dining',
        coordinates: { lat: -33.9030, lng: 18.4210 },
        tags: ['V&A Waterfront', 'Sushi'],
        links: { official: 'https://www.willoughbyandco.co.za/' },
        details: { tips: 'Apesar de estar no corredor do shopping, é o melhor sushi de Cape Town.' },
        content: 'Famoso por filas constantes, mas vale cada minuto.'
    },
    {
        slug: 'harbour-house',
        title: "Harbour House",
        type: 'Dining',
        coordinates: { lat: -34.1290, lng: 18.4480 },
        tags: ['Kalk Bay', 'Seafood'],
        links: { official: 'https://www.harbourhouse.co.za/' },
        details: { tips: 'O de Kalk Bay é imbatível. A água bate no vidro da janela.' },
        content: 'Restaurante elegante com frutos do mar frescos.'
    },
    {
        slug: 'the-pot-luck-club',
        title: "The Pot Luck Club",
        type: 'Dining',
        coordinates: { lat: -33.9270, lng: 18.4480 },
        tags: ['CT', 'Luke Dale-Roberts'],
        links: { official: 'https://thepotluckclub.co.za/' },
        details: { tips: 'Pratos pequenos para compartilhar. Abre reserva 4 meses antes.' },
        content: 'Cozinha criativa no topo do Old Biscuit Mill.'
    },
    {
        slug: 'oranjezicht-market',
        title: "Oranjezicht City Farm Market",
        type: 'Activity',
        coordinates: { lat: -33.9040, lng: 18.4140 },
        tags: ['Mercado', 'Local'],
        details: { tips: 'Vá aos Sábados ou Domingos de manhã. Ótimo para café da manhã.' },
        content: 'Mercado de produtores locais com vibe incrível.'
    },
    // --- Day 20-21 ---
    {
        slug: 'babylonstoren',
        title: 'Babylonstoren',
        type: 'Accommodation',
        coordinates: { lat: -33.8266, lng: 18.9265 },
        tags: ['Winelands', 'Jardins'],
        links: { official: 'https://babylonstoren.com/' },
        details: { tips: 'Caminhe por TODO o jardim. Do pomar às estufas.' },
        content: 'Fazenda histórica do século XVII.'
    },
    {
        slug: 'babel',
        title: "Babel",
        type: 'Dining',
        coordinates: { lat: -33.8240, lng: 18.9270 },
        tags: ['Winelands', 'Farm-to-table'],
        links: { official: 'https://babylonstoren.com/babel' },
        details: { tips: 'As saladas são divididas por "cores". Fenomenal para almoço.' },
        content: 'Um dos restaurantes mais cobiçados da região.'
    },
    {
        slug: 'wine-tram',
        title: 'Franschhoek Wine Tram',
        type: 'Activity',
        coordinates: { lat: -33.9109, lng: 19.1166 },
        tags: ['Vinho', 'Lazer'],
        links: { official: 'https://winetram.co.za/' },
        details: { tips: 'Linha Navy ou Orange são ótimas seleções de vinícolas.' },
        content: 'Forma prática e divertida de conhecer Franschhoek.'
    },
    // --- Day 22-23 ---
    {
        slug: 'sandton-sun',
        title: 'Sandton Sun',
        type: 'Accommodation',
        coordinates: { lat: -26.1086, lng: 28.0526 },
        tags: ['Sandton', 'Conexão'],
        links: { official: 'https://www.southernsun.com/sandton-sun' },
        details: { tips: 'O acesso ao shopping permite jantar fora sem precisar de carro/uber.' },
        content: 'Hotel integrado ao complexo Nelson Mandela Square.'
    },
    {
        slug: 'the-grillhouse',
        title: "The Grillhouse Sandton",
        type: 'Dining',
        coordinates: { lat: -26.1070, lng: 28.0540 },
        tags: ['JNB', 'Steakhouse'],
        links: { official: 'https://thegrillhouse.co.za/' },
        details: { tips: 'Carne sul-africana de altíssimo nível. Clássico.' },
        content: 'Uma das churrascarias mais famosas de Johannesburg.'
    }
];

// Clean items dir - but be careful, we overwrite
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
${item.time ? `time: '${item.time}'` : ''}
links:
  googleMaps: '${item.links?.googleMaps || ""}'
  official: '${item.links?.official || ""}'
details:
  tips: >-
    ${item.details.tips}
---

${item.content}
`;
    fs.writeFileSync(path.join(itemsDir, `${item.slug}.md`), fileContent);
});

// Update itinerary.json to link to the new items properly
const itinerary = [
    { day: 1, date: "11/03/2026", location: "Brasil -> África", summary: "Em Trânsito", selectedItems: ["gru-latam"], alternativeItems: [] },
    { day: 2, date: "12/03/2026", location: "Dullstroom", summary: "Desembarque & Estrada", selectedItems: ["jnb-greenmotion", "alzu-petroport", "cinzaco-accommodation", "mrs-simpsons"], alternativeItems: [] },
    { day: 3, date: "13/03/2026", location: "Graskop", summary: "A Rota das Cachoeiras", selectedItems: ["mac-mac-falls", "the-glass-house", "graskop-gorge", "angels-view"], alternativeItems: [] },
    { day: 4, date: "14/03/2026", location: "Panorama Route", summary: "Mirantes Clássicos (Luz Ideal)", selectedItems: ["gods-window", "the-chubby-pig", "bourkes-luck", "three-rondavels"], alternativeItems: ["kadisi-restaurant"] },
    { day: 5, date: "15/03/2026", location: "Kruger Sul", summary: "Entrada e Phabeni", selectedItems: ["mdluli-safari"], alternativeItems: [] },
    { day: 6, date: "16/03/2026", location: "Kruger Sul", summary: "O Dia do Big 5", selectedItems: ["mdluli-safari"], alternativeItems: [] },
    { day: 7, date: "17/03/2026", location: "Kruger Central", summary: "Mudança para Satara", selectedItems: ["tshokwane-picnic", "sleepover-orpen"], alternativeItems: [] },
    { day: 8, date: "18/03/2026", location: "Kruger Central", summary: "Caça aos Felinos", selectedItems: ["sleepover-orpen"], alternativeItems: [] },
    { day: 9, date: "19/03/2026", location: "Eswatini", summary: "O Reino das Montanhas", selectedItems: ["ngwenya-glass", "summerfield-resort"], alternativeItems: ["foresters-arms"] },
    { day: 10, date: "20/03/2026", location: "Eswatini", summary: "Cultura Swazi", selectedItems: ["malandelas-farm", "summerfield-resort"], alternativeItems: [] },
    { day: 11, date: "21/03/2026", location: "Port Elizabeth", summary: "Voo & Chegada Garden Route", selectedItems: ["sixt-plz", "ginger-restaurant", "radisson-plz"], alternativeItems: [] },
    { day: 12, date: "22/03/2026", location: "Plettenberg Bay", summary: "Tsitsikamma", selectedItems: ["bloukrans-bridge", "bungalow-plett"], alternativeItems: [] },
    { day: 13, date: "23/03/2026", location: "Plettenberg Bay", summary: "Trilhas & Mirantes", selectedItems: ["robberg", "enricos-restaurant", "bungalow-plett"], alternativeItems: [] },
    { day: 14, date: "24/03/2026", location: "Plettenberg Bay", summary: "Knysna Ostras", selectedItems: ["emily-moon", "bungalow-plett"], alternativeItems: [] },
    { day: 15, date: "25/03/2026", location: "Hermanus", summary: "Baleias e Clima", selectedItems: ["marine-hermanus"], alternativeItems: [] },
    { day: 16, date: "26/03/2026", location: "Cape Town", summary: "R44 & Camps Bay", selectedItems: ["creation-wines", "marly-camps-bay"], alternativeItems: [] },
    { day: 17, date: "27/03/2026", location: "Cape Town", summary: "A Montanha & Cidade", selectedItems: ["table-mountain", "willoughby-and-co", "marly-camps-bay"], alternativeItems: [] },
    { day: 18, date: "28/03/2026", location: "Cape Town", summary: "Península do Cabo", selectedItems: ["harbour-house", "marly-camps-bay"], alternativeItems: [] },
    { day: 19, date: "29/03/2026", location: "Cape Town", summary: "Mercados", selectedItems: ["oranjezicht-market", "the-pot-luck-club", "marly-camps-bay"], alternativeItems: [] },
    { day: 20, date: "30/03/2026", location: "Winelands", summary: "Os Jardins de Babylonstoren", selectedItems: ["babel", "babylonstoren"], alternativeItems: [] },
    { day: 21, date: "31/03/2026", location: "Winelands", summary: "O Trem do Vinho", selectedItems: ["wine-tram", "babylonstoren"], alternativeItems: [] },
    { day: 22, date: "01/04/2026", location: "Johannesburg", summary: "O Retorno", selectedItems: ["sandton-sun"], alternativeItems: [] },
    { day: 23, date: "02/04/2026", location: "Johannesburg", summary: "Soweto & Sandton", selectedItems: ["the-grillhouse", "sandton-sun"], alternativeItems: [] },
    { day: 24, date: "03/04/2026", location: "Brasil", summary: "A Volta", selectedItems: ["gru-latam"], alternativeItems: [] }
];

fs.writeFileSync(path.join(contentDir, 'itinerary.json'), JSON.stringify(itinerary, null, 4));

console.log('✅ Synchronized Roteiro V5 with Portal content and itinerary.');
