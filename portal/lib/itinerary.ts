import { getAllItems, KnowledgeItem } from '@/lib/knowledge';

export interface ScheduleEvent {
    time: string;
    title: string;
    description?: string;
    type: 'Accommodation' | 'Activity' | 'Dining' | 'Transport' | 'Tip' | 'Transit';
    slug?: string; // Optional link to a KnowledgeItem for map mapping
    youtubeLink?: string;
    bookingLink?: string;
    mapsLink?: string;
    officialLink?: string;
    price?: string;
    status?: 'Confirmado' | 'Previsto'; // Added for roteiro-sync tracking
    coordinates?: { lat: number; lng: number }; // For rendering path directly without a dedicated markdown file
}

export interface RichItineraryDay {
    day: number;
    date: string;
    location: string;
    summary: string;
    goldenTip?: string; // e.g. "Dica de Ouro"
    schedule: ScheduleEvent[];
    // We still keep standard connected items for the map's bounds calculation
    selectedItems: string[];
}

export const masterItinerary: RichItineraryDay[] = [
    {
        day: 0,
        date: "11/03/2026",
        location: "Partida - São Paulo / Joanesburgo",
        summary: "Início da jornada rumo ao cone sul africano. Logística de voos e preparativos de partida.",
        goldenTip: "Leve um casaco para o avião. O Plaza Premium no T2 de GRU é a melhor opção para a conexão doméstica final no retorno.",
        schedule: [
            { time: "15:00", title: "Voo BSB -> GRU", description: "Latam LA 3528. Sala VIP BSB Aeroportos VIP Club.", type: "Transport", slug: "voo-bsb-gru", status: 'Confirmado', coordinates: { lat: -15.8697, lng: -47.9208 } },
            { time: "22:45", title: "Voo GRU -> JNB", description: "Latam LA 8058. Sala VIP GRU T3 (Safra ou W Premium).", type: "Transport", slug: "voo-gru-jnb", status: 'Confirmado', coordinates: { lat: -23.4306, lng: -46.4731 } }
        ],
        selectedItems: ["jnb-greenmotion"]
    },
    {
        day: 1,
        date: "11/03/2026",
        location: "Brasil -> África",
        summary: "Início da jornada! Voos saindo do Brasil com conexão em Guarulhos rumo a Joanesburgo.",
        goldenTip: "Leve casaco para o avião. Use as Salas VIP: Aeroportos VIP Club em BSB (2º andar após raio-x, tem chuveiro) e Espaço Banco Safra ou W Premium Pier em GRU T3. Evite a do Mastercard Black no térreo que vive lotada.",
        schedule: [
            { time: "15:00", title: "Voo BSB -> GRU", description: "LA 3528 (Latam).", type: "Transport", status: 'Confirmado', coordinates: { lat: -15.8697, lng: -47.9208 } },
            { time: "22:45", title: "Voo GRU -> JNB", description: "LA 8058 (Latam).", type: "Transport", status: 'Confirmado', coordinates: { lat: -23.4306, lng: -46.4731 } }
        ],
        selectedItems: []
    },
    {
        day: 2,
        date: "12/03/2026",
        location: "Chegada em JNB & Dullstroom",
        summary: "Pousar e ir direto para Dullstroom é a escolha mais segura. Dirigir além disso na neblina à noite não é recomendado. Dullstroom é a 'bolha' perfeita para o primeiro dia.",
        goldenTip: "Na locadora GreenMotion, tire fotos de todos os arranhões no carro antes de sair. A parada no posto Alzu Petroport na estrada é obrigatória para ver rinocerontes! Procure o agente com a plaquinha GreenMotion / Pedro Jobim no Arrivals Hall.",
        schedule: [
            { time: "12:40", title: "Chegada em JNB", description: "O.R. Tambo. Saque ZAR 2.000 no aeroporto para pedágios e gorjetas (Car Guards/Frentistas).", type: "Transit", coordinates: { lat: -26.1384, lng: 28.2435 } },
            { time: "14:00", title: "Retirada Carro 1 (GreenMotion)", description: "Meet & Greet no Arrivals Hall. Contato: +27 87 095 8918. Pagamento Final £120.40.", type: "Transport", youtubeLink: "https://www.youtube.com/watch?v=7uC8W3Xz4iE", bookingLink: "https://greenmotion.com/", mapsLink: "https://maps.app.goo.gl/YtqFkP8Rz7nK4V9Z7", slug: "jnb-greenmotion", coordinates: { lat: -26.1384, lng: 28.2435 } },
            { time: "15:00", title: "Estrada N4 para Dullstroom", description: "Duração aproximada de 2h30. Use o Status Match da locadora online antes de viajar!", type: "Transit" },
            { time: "16:30", title: "Parada: Alzu Petroport", description: "Posto com vista para rinocerontes. Tem Nando's, Spur e banheiros limpos.", type: "Activity", slug: "alzu-petroport", youtubeLink: "https://www.youtube.com/watch?v=vV7YJm74xKs", mapsLink: "https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA", coordinates: { lat: -25.8327, lng: 29.7719 } },
            { time: "17:30", title: "Check-in: Cinzaco Accommodation", description: "186 De Waal Street. Recepção 7h-10h. Já pago em 12x no Hoteis.com.", type: "Accommodation", mapsLink: "https://www.google.com/maps/search/Cinzaco+Accommodation+Dullstroom", slug: "cinzaco-accommodation", bookingLink: "https://br.hoteis.com/ho667926944/cinzaco-dullstroom-dullstroom-africa-do-sul/", status: 'Confirmado', coordinates: { lat: -25.4184, lng: 30.1041 } },
            { time: "19:00", title: "Jantar: Mrs Simpson's", description: "Dullstroom Trout (Truta recheada com amêndoas) ou Lamb Shank. Reserve!", type: "Dining", slug: "mrs-simpsons", coordinates: { lat: -25.4190, lng: 30.1030 } }
        ],
        selectedItems: ["jnb-greenmotion", "alzu-petroport", "cinzaco-accommodation", "mrs-simpsons"]
    },
    {
        day: 3,
        date: "13/03/2026",
        location: "A Janela de Deus & Cachoeiras",
        summary: "Entrando na Panorama Route pela R532. Asfalto bom, mas com curvas na serra. Cuidado com neblina.",
        goldenTip: "Tenha moedas de ZAR 50 para a entrada da Mac Mac. Vá até a plataforma de observação para a melhor foto.",
        schedule: [
            { time: "09:00", title: "Saída de Dullstroom", description: "Direção Sabie via R37 e R532. (Long Tom Pass).", type: "Transit", coordinates: { lat: -25.4184, lng: 30.1041 } },
            { time: "11:00", title: "Mac Mac Falls", description: "ZAR 50 por pessoa (Cash). Trilha cimentada até The Cage.", type: "Activity", slug: "mac-mac-falls", youtubeLink: "https://www.youtube.com/watch?v=1ky-eXMUS90", coordinates: { lat: -25.0016, lng: 30.8174 } },
            { time: "12:30", title: "Almoço em Graskop", description: "The Glass House (Filet Steak) ou Harrie's Pancakes.", type: "Dining", coordinates: { lat: -24.9312, lng: 30.8415 } },
            { time: "14:00", title: "Graskop Gorge Lift", description: "ZAR 205 (Lift Experience). Desça 51m de elevador até a floresta.", type: "Activity", slug: "graskop-gorge-lift", youtubeLink: "https://www.youtube.com/watch?v=4vk46x1weMI", coordinates: { lat: -24.9455, lng: 30.8466 } },
            { time: "16:30", title: "Check-in: Angels View Hotel", description: "Ficaremos 2 noites aqui. Hotel Confirmado.", type: "Accommodation", slug: "angels-view-graskop", bookingLink: "https://angelsview.co.za/", status: "Confirmado", coordinates: { lat: -24.9547, lng: 30.8510 } },
            { time: "19:00", title: "Jantar: Hotel ou The Chubby Pig", description: "Mumsy's no próprio hotel é excelente.", type: "Dining", coordinates: { lat: -24.9547, lng: 30.8510 } }
        ],
        selectedItems: ["mac-mac-falls", "graskop-gorge-lift", "angels-view-graskop"]
    },
    {
        day: 4,
        date: "14/03/2026",
        location: "Panorama Route Completa",
        summary: "A rota inteira tem apenas 100km (ida e volta). Dia super tranquilo saindo às 09:00. Exploraremos formações rochosas incríveis e o grande cânion verde.",
        goldenTip: "Se estiver com MUITA neblina em God's Window, pule essa parada e vá direto para os Potholes que ficam mais baixos e costumam ter sol.",
        schedule: [
            { time: "09:00", title: "The Pinnacle Rock", description: "Torre de pedra gigante brotando da floresta.", type: "Activity", coordinates: { lat: -24.9040, lng: 30.8540 } },
            { time: "09:40", title: "God's Window & Wonder View", description: "ZAR 70. Vistas incríveis em dias claros. Suba a trilha Rain Forest no topo.", type: "Activity", slug: "gods-window", youtubeLink: "https://www.youtube.com/watch?v=zVvX6Kz1D2o", coordinates: { lat: -24.8760, lng: 30.8910 } },
            { time: "11:00", title: "Bourke's Luck Potholes", description: "ZAR 150. Encontro dos rios Treur (tristeza) e Blyde (alegria).", type: "Activity", slug: "bourkes-luck-potholes", youtubeLink: "https://www.youtube.com/watch?v=6xO9H_XvGXY", coordinates: { lat: -24.6750, lng: 30.8060 } },
            { time: "12:30", title: "Three Rondavels", description: "ZAR 90. Blyde River Canyon. A vista mais icônica da África do Sul.", type: "Activity", slug: "three-rondavels", youtubeLink: "https://www.youtube.com/watch?v=4d0U5G3Q3mU", coordinates: { lat: -24.5610, lng: 30.8010 } },
            { time: "13:30", title: "Almoço com Vista", description: "Potluck Boskombuis (se aberto) ou The Chubby Pig.", type: "Dining", coordinates: { lat: -24.6000, lng: 30.8000 } },
            { time: "15:00", title: "Tarde Livre: Angels View", description: "Piscina e pôr do sol no hotel.", type: "Accommodation", slug: "angels-view-graskop", coordinates: { lat: -24.9547, lng: 30.8510 } }
        ],
        selectedItems: ["gods-window", "bourkes-luck-potholes", "three-rondavels", "angels-view-graskop"]
    },
    {
        day: 5,
        date: "15/03/2026",
        location: "Kruger (Luxury Mdluli)",
        summary: "Mudança para a fase de Safári. Começamos com a experiência luxuosa (Self-Drive focado no Sul e centro-sul).",
        goldenTip: "ALERTA ROTA: NÃO entre pelo Numbi Gate por risco de assaltos. Dirija até Hazyview e entre obrigatoriamente pelo PHABENI GATE. É 100% seguro.",
        schedule: [
            { time: "10:00", title: "Saída de Graskop", description: "Direção Hazyview (75km).", type: "Transit", coordinates: { lat: -24.9312, lng: 30.8415 } },
            { time: "13:00", title: "Entrada: Phabeni Gate (Kruger)", description: "Conservation Fee: ZAR 602 pp/dia. Peça passaporte.", type: "Activity", coordinates: { lat: -25.0250, lng: 31.2400 } },
            { time: "13:00", title: "Self-Drive até Lodge", description: "50km de estrada no parque. Vel max 50km/h asfalto, 40km/h terra.", type: "Activity", coordinates: { lat: -25.0800, lng: 31.4000 } },
            { time: "15:00", title: "Check-in: Mdluli Safari Lodge", description: "Tendas de super luxo. Confirmado e Pago.", type: "Accommodation", slug: "mdluli-safari-lodge", bookingLink: "https://br.hoteis.com/ho1457492192/mdluli-safari-lodge-skukuza-africa-do-sul/", status: 'Confirmado', coordinates: { lat: -25.1325, lng: 31.5434 } },
            { time: "16:00", title: "Sunset Game Drive", description: "ZAR 1.170. Safári guiado pelo lodge com drinks no mato.", type: "Activity", slug: "mdluli-safari-lodge", coordinates: { lat: -25.1325, lng: 31.5434 } },
            { time: "19:30", title: "Boma Dinner", description: "Incluso. Jantar tradicional ao redor do fogo sob as estrelas.", type: "Dining", slug: "mdluli-safari-lodge", coordinates: { lat: -25.1325, lng: 31.5434 } }
        ],
        selectedItems: ["mdluli-safari-lodge"]
    },
    {
        day: 6,
        date: "16/03/2026",
        location: "O Dia Híbrido no Mdluli",
        summary: "Dia focado em maximizar a experiência luxuosa no lodge com Safáris e momentos exclusivos.",
        goldenTip: "A rádio dos rangers de manhã é a melhor chance de rastrear felinos caçando. Pague o Game Drive.",
        schedule: [
            { time: "06:00", title: "Early Morning Game Drive", description: "ZAR 1.170. Guiado.", type: "Activity", slug: "mdluli-safari-lodge", coordinates: { lat: -25.1325, lng: 31.5434 } },
            { time: "09:30", title: "Café da Manhã", description: "Farto no Mdluli.", type: "Dining", slug: "mdluli-safari-lodge", coordinates: { lat: -25.1325, lng: 31.5434 } },
            { time: "11:00", title: "Epicurean: Picnic on the rock", description: "ZAR 725/casal. Experiência exclusiva nas rochas.", type: "Activity", slug: "mdluli-safari-lodge", coordinates: { lat: -25.1325, lng: 31.5434 } },
            { time: "15:30", title: "Self-Drive (Skukuza)", description: "Saída no carro de aluguel para explorar H1-1.", type: "Activity", coordinates: { lat: -24.9946, lng: 31.5925 } },
            { time: "19:00", title: "Jantar", description: "No lodge (Incluso).", type: "Dining", slug: "mdluli-safari-lodge", coordinates: { lat: -25.1325, lng: 31.5434 } }
        ],
        selectedItems: ["mdluli-safari-lodge"]
    },
    {
        day: 7,
        date: "17/03/2026",
        location: "O Coração dos Leões (Transição Norte)",
        summary: "Transição inteligente do Kruger Sul para Orpen/Satara, o território com maior densidade de leões. A estrada inteira é um safári!",
        goldenTip: "No Tshokwane Picnic Site, experimente as famosas Wild Game Pies (Empanadas de carne de caça).",
        schedule: [
            { time: "08:00", title: "Check-out Mdluli", description: "Após o café da manhã.", type: "Accommodation", slug: "mdluli-safari-lodge", status: 'Confirmado' },
            { time: "09:30", title: "The Great Self-Drive (Sul->Norte)", description: "Trafegando de Skukuza até Satara. Foco nas savanas abertas.", type: "Activity" },
            { time: "12:30", title: "Almoço: Tshokwane Picnic Site", description: "A parada mais famosa do parque. Compre as tortas.", type: "Dining" },
            { time: "14:30", title: "Safári Região Satara (S100)", description: "Área de leões. A S100 é uma estrada de terra essencial.", type: "Activity" },
            { time: "17:30", title: "Check-in: SleepOver Orpen Gate", description: "Fora do portão do parque, cama excelente, banho quente, preço imbatível (~R$220).", type: "Accommodation", slug: "sleepover-orpen-gate", bookingLink: "https://br.hoteis.com/ho2057398240/sleepover-orpen-gate-acornhoek-africa-do-sul/", status: 'Previsto' },
            { time: "19:00", title: "Jantar Braai", description: "Churrasco DIY no modo mais tradicional sul-africano.", type: "Dining", slug: "sleepover-orpen-gate" }
        ],
        selectedItems: ["sleepover-orpen-gate"]
    },
    {
        day: 8,
        date: "18/03/2026",
        location: "Foco Total em Felinos",
        summary: "Aproveitando a base excelente de Orpen Gate para varrer as estradas vizinhas a Satara em busca de prides inteiros de leões logo de manhã.",
        goldenTip: "A S100 que beira o rio N'wanetsi é a sua melhor aposta no Kruger inteiro. Leve os rusks (biscoitos típicos) comprados em mercado para molhar no café às 5 da manhã.",
        schedule: [
            { time: "05:30", title: "Café Rápido", description: "Modo DIY com rusks sul-africanos no quarto.", type: "Dining", slug: "sleepover-orpen-gate" },
            { time: "06:00", title: "Abertura Orpen Gate", description: "Seja um dos primeiros na fila para o amanhecer.", type: "Activity" },
            { time: "06:30", title: "Rota S100", description: "\"Lion Road\". Alcatéias inteiras de leões descansando sob a sombra.", type: "Activity", slug: "kruger-s100-route" },
            { time: "11:00", title: "Break: Satara Rest Camp", description: "Parada para banheiro, lanche e café reforçado.", type: "Dining", slug: "satara-rest-camp" },
            { time: "13:00", title: "Represa Girivana e H1-4", description: "Região com grama baixa e alta densidade de pastadores.", type: "Activity" },
            { time: "17:00", title: "Retorno: SleepOver Orpen", description: "Retorno antes do fechamento dos portões.", type: "Transit", slug: "sleepover-orpen-gate" }
        ],
        selectedItems: ["sleepover-orpen-gate", "satara-rest-camp"]
    },
    {
        day: 9,
        date: "19/03/2026",
        location: "Reino de Eswatini (Nas Montanhas)",
        summary: "Sair da Savana e entrar nas montanhas. Eswatini (antiga Suazilândia) quebra a monotonia da viagem e revela um reino pitoresco com artesanatos lindos.",
        goldenTip: "Tudo na Ngwenya Glass é feito de vidro reciclado (até das janelas antigas de Johannesburgo). Compre lembranças aí, são únicas.",
        schedule: [
            { time: "08:00", title: "Saída Orpen (Kruger)", description: "Amanhecendo na estrada rumo a fronteira.", type: "Transit" },
            { time: "12:00", title: "Fronteira: Jeppe's Reef", description: "Tenha a autorização do aluguel do carro em mãos (custou R1.800).", type: "Transit" },
            { time: "13:00", title: "Ngwenya Glass", description: "Fábrica internacional de vidro reciclado baseada no reino.", type: "Activity", slug: "ngwenya-glass", youtubeLink: "https://www.youtube.com/watch?v=7M7n0J8q8wM", status: 'Previsto' },
            { time: "15:00", title: "Check-in Hotel Eswatini", description: "Opções: Summerfield (Jardim de luxo), Foresters Arms (Gastronomia) ou Mogi (Boutique view).", type: "Accommodation", slug: "summerfield-botanical-garden", bookingLink: "https://br.hoteis.com/ho451000/summerfield-botanical-garden-exclusive-resort-manzini-eswatini/", status: 'Previsto' },
            { time: "19:00", title: "Jantar no Hotel", description: "Relaxe nos jardins após a longa viagem.", type: "Dining" }
        ],
        selectedItems: ["ngwenya-glass", "summerfield-botanical-garden"]
    },
    {
        day: 10,
        date: "20/03/2026",
        location: "Cultura Swazi e Relaxamento",
        summary: "Dia inteiro focado em conhecer a cultura tribal local sem a correria da estrada. Eswatini vibra de um jeito calmo e rural.",
        goldenTip: "Apresentação de dança Sibhaca e polifonia em Mantenga acontece sempre perto das 11:15 da manhã. O almoço na Malandela's Farm é vizinho aos famosos Swazi Candles.",
        schedule: [
            { time: "09:00", title: "Café da manhã dos Reis", description: "Café da manhã na montanha (Mogi) ou no jardim Botânico (Summerfield).", type: "Dining" },
            { time: "10:30", title: "Mantenga Cultural Village", description: "Vila preservada, show tribal e cachoeira.", type: "Activity", slug: "mantenga-cultural-village" },
            { time: "12:30", title: "Almoço: Malandela's Farm", description: "No gramado, comida excelente.", type: "Dining" },
            { time: "14:00", title: "Swazi Candles", description: "Feito à mão, velas em formato de animais da savana maravilhosas.", type: "Activity", slug: "swazi-candles" },
            { time: "16:00", title: "Piscina e Cassino (Opcional)", description: "Aproveite o Royal Swazi Spa Casino.", type: "Activity" }
        ],
        selectedItems: ["mantenga-cultural-village", "swazi-candles", "summerfield-botanical-garden"]
    },
    {
        day: 11,
        date: "21/03/2026",
        location: "Voo para a Costa Sul (PLZ)",
        summary: "O grande 'Pulo do Gato' logístico. Cruzando a África de volta à civilização rumo às incríveis baías costeiras na entrada da Rota Jardim.",
        goldenTip: "Lembre-se do Status Match Visa Infinite/Mastercard Black na SIXT em PLZ ANTES da viagem para ganhar upgrade e pular a fila no balcão de aluguel.",
        schedule: [
            { time: "08:00", title: "Check-out e Estrada para JNB", description: "Atravessando a Oshoek Border Post de volta para a África do Sul.", type: "Transit" },
            { time: "12:30", title: "Devolução Carro 1 JNB", description: "Devolver focado no GreenMotion.", type: "Transport", status: 'Confirmado' },
            { time: "13:30", title: "Sala VIP: Bidvest Premier (JNB)", description: "Terminal B (Doméstico). Comer bem antes do voo.", type: "Dining" },
            { time: "11:25", title: "Voo SA405 (JNB-PLZ)", description: "SAA Airlines. Chegada prevista 13:00.", type: "Transport", status: 'Confirmado' },
            { time: "14:30", title: "Retirada Carro 2: SIXT", description: "Prédio em frente ao terminal em PLZ. Polo Vivo Automático.", type: "Transport", bookingLink: "https://www.sixt.com/", status: 'Previsto' },
            { time: "15:30", title: "Check-in (Port Elizabeth)", description: "Radisson Blu, The Beach Hotel ou Boardwalk.", type: "Accommodation", slug: "radisson-blu-port-elizabeth", bookingLink: "https://br.hoteis.com/ho365319/radisson-blu-hotel-port-elizabeth-gqeberha-africa-do-sul/", status: 'Previsto' },
            { time: "19:00", title: "Jantar: Ginger The Restaurant", description: "Fine dining na praia. Peça o 'Salt and Pepper Squid'.", type: "Dining" }
        ],
        selectedItems: ["radisson-blu-port-elizabeth"]
    },
    {
        day: 12,
        date: "22/03/2026",
        location: "Garden Route (As Pontes e Plett)",
        summary: "Dia icônico de costa selvagem, pontes suspensas vertiginosas, saltadores de bungee jump e assentamento na meca litorânea chamada Plettenberg Bay.",
        goldenTip: "Na Bloukrans, você NÃO precisa pular. Você assite os corajosos e caminha na passarela de metal debaixo da pista. Em Plett, fique no The Bungalow ('Pé na areia' premium).",
        schedule: [
            { time: "09:00", title: "Estrada PLZ para Tsitsikamma", description: "2h de estrada curta. Curta a paisagem costeira.", type: "Transit" },
            { time: "10:30", title: "Bloukrans Bridge", description: "Maior Bungee Jump de ponte do mundo (Face Adrenalin). Altura de 216m.", type: "Activity", slug: "bloukrans-bridge", youtubeLink: "https://www.youtube.com/watch?v=68T0j_1Kqg8", mapsLink: "https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA", status: 'Previsto' },
            { time: "13:00", title: "Tsitsikamma National Park", description: "Suspension Bridges do rio Storm. Caminhada suspensa imperdível.", type: "Activity", slug: "tsitsikamma-park", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", status: 'Previsto' },
            { time: "16:00", title: "Check-in: The Bungalow (Plett)", description: "3 noites. Vibe praiana chique no Hobie Beach.", type: "Accommodation", slug: "the-bungalow-plett", youtubeLink: "https://www.youtube.com/watch?v=xZ_sXoHwqD8", bookingLink: "https://br.hoteis.com/ho665977920/the-bungalow-by-raw-africa-boutique-collection-plettenberg-bay-africa-do-sul/", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", status: 'Previsto' },
            { time: "19:00", title: "Jantar no Centro de Plett", description: "The Hub para frutos do mar locais ou pizaria casual.", type: "Dining" }
        ],
        selectedItems: ["bloukrans-bridge", "tsitsikamma-park", "the-bungalow-plett"]
    },
    {
        day: 13,
        date: "23/03/2026",
        location: "A Península de Robberg",
        summary: "Dedicando o dia à Robberg Nature Reserve, amplamente reconhecida como a trilha costeira mais bonita da África. Encontro de leões-marinhos nas praias virgens.",
        goldenTip: "Beba do clássico 'Aperol/Espumante no pôr do sol' no jantar do Enrico's, lugar lotado, famoso e em frente às falésias.",
        schedule: [
            { time: "08:30", title: "Robberg Nature Reserve", description: "Faça a trilha circular média ('Witsand') nas dunas. Leve água mineral.", type: "Activity", slug: "robberg-nature-reserve", youtubeLink: "https://www.youtube.com/watch?v=e_k9bO3KqjM", status: 'Previsto' },
            { time: "13:00", title: "Tarde de Praia/Descanso", description: "Piscina The Bungalow ou Praia Central.", type: "Accommodation", slug: "the-bungalow-plett" },
            { time: "17:30", title: "Jantar: Enrico's", description: "Chegue ANTES das 18h se não quiser fila intensa. Vista pro mar.", type: "Dining", slug: "enricos-restaurant", status: 'Previsto' }
        ],
        selectedItems: ["robberg-nature-reserve", "enricos-restaurant", "the-bungalow-plett"]
    },
    {
        day: 14,
        date: "24/03/2026",
        location: "Knysna & Ostras",
        summary: "Pequeno bate-volta costeiro para conhecer as ricas enseadas da vizinha Knysna, ver The Heads e comer as amadas ostras da baía.",
        goldenTip: "O pôr do sol no rio Bitou bebendo e comendo no peculiar hotel/clube rústico de 'Emily Moon' é a dica secreta de mestre mais chique desse trecho.",
        schedule: [
            { time: "10:00", title: "Bate-Volta Knysna (30min de carro)", description: "Conhecer a estância de veraneio bilionária Thesen Island.", type: "Activity" },
            { time: "11:30", title: "Knysna Heads", description: "Mirante incrível das pedras de entrada para a lagoa. Mar perigoso para barcos.", type: "Activity", slug: "knysna-heads", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", status: 'Previsto' },
            { time: "13:00", title: "Almoço: 34 South ou The Fat Fish", description: "Peça meia dúzia de ostras frescas gigantes cultivadas ali mesmo.", type: "Dining", slug: "the-fat-fish-knysna", status: 'Previsto' },
            { time: "16:30", title: "Sunset Emily Moon (Plett)", description: "Vibe balinesa chique no rio Bitou. Lugar lindo de morrer.", type: "Dining", slug: "emily-moon-plett", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' }
        ],
        selectedItems: ["knysna-heads", "the-fat-fish-knysna", "emily-moon-plett", "the-bungalow-plett"]
    },
    {
        day: 15,
        date: "25/03/2026",
        location: "Estrada das Ondas & Baleias",
        summary: "Deixando a base da Garden Route e seguindo até a Rota 62/Oceans com parada visual em 'Wilderness' antes de atracar em Hermanus.",
        goldenTip: "Fique hospedado no The Marine, um clássico absoluto em cima da pedra. É verídico: as baleias (na temporada/finais de rabo) vêm bater bem perto das pedras do hotel.",
        schedule: [
            { time: "09:00", title: "Check-out Plett", description: "Saída na longa mas fantástica rodovia costeira da Rota N2.", type: "Transit" },
            { time: "10:30", title: "Map of Africa Viewpoint", description: "Em Wilderness. Rio desenha o mapa da África. Desvio de 15 min.", type: "Activity", slug: "map-of-africa-viewpoint", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' },
            { time: "14:00", title: "Chegada em Hermanus", description: "Capital mundial das baleias (avistamento de costa).", type: "Transit" },
            { time: "15:00", title: "Check-in: The Marine Hermanus", description: "Hospedagem 'Old Money' icônica. Vista direta pro mar.", type: "Accommodation", slug: "the-marine-hermanus", bookingLink: "https://br.hoteis.com/ho417614/the-marine-hermanus-africa-do-sul/", youtubeLink: "https://www.youtube.com/watch?v=bV7X_O5XvjI", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", status: 'Previsto' },
            { time: "19:00", title: "Jantar: Ficks ou Bientang's Cave", description: "Ficks é um pool park bar na rocha. Bientang's é literalmente numa caverna.", type: "Dining", slug: "ficks-hermanus", status: 'Previsto' }
        ],
        selectedItems: ["map-of-africa-viewpoint", "the-marine-hermanus", "ficks-hermanus"]
    },
    {
        day: 16,
        date: "26/03/2026",
        location: "Gastronomia & Rota Esculpida em Rocha (R44)",
        summary: "Conhecer a excelência da culinária de Creation Wines em Hemel-en-Aarde e então trafegar pela *Clarence Drive (R44)* – top 10 das estradas mais assustadoramente lindas do planeta. Não volte pela N2 esburacada e feia.",
        goldenTip: "A dica enfática da Carol é não piscar no Menu Confiança (Food Pairing) com vinhos da vinícola Creation. Em Cape Town, procure os bairros Camps Bay, para a vista das rochas.",
        schedule: [
            { time: "08:30", title: "Caminhada: Cliff Path (Hermanus)", description: "Passarela ecológica colada ao mar na encosta. Use tênis.", type: "Activity", slug: "cliff-path-hermanus", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' },
            { time: "12:00", title: "Almoço: Creation Wines", description: "Hemel-en-Aarde Valley. Reserve o menu degustação pareado.", type: "Dining", slug: "creation-wines", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", youtubeLink: "https://www.youtube.com/watch?v=8V7X_O5XvjI", status: 'Previsto' },
            { time: "14:30", title: "Drive da Vida: R44 Clarence Drive", description: "Top 10 estradas do mundo. Entre montanha e mar.", type: "Activity", slug: "clarence-drive", youtubeLink: "https://www.youtube.com/watch?v=9V7X_O5XvjI", status: 'Previsto' },
            { time: "17:00", title: "Check-in: The Marly Boutique", description: "Camps Bay. Luxo contemporâneo com vista pros 12 Apóstolos.", type: "Accommodation", slug: "marly-camps-bay", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", bookingLink: "https://br.hoteis.com/ho456722/the-marly-boutique-hotel-and-spa-cidade-do-cabo-africa-do-sul/", status: 'Previsto' }
        ],
        selectedItems: ["cliff-path-hermanus", "creation-wines", "clarence-drive", "marly-camps-bay"]
    },
    {
        day: 17,
        date: "27/03/2026",
        location: "Cape Town (Table Mountain Day)",
        summary: "A 'Mother City'. A regra suprema é focar na Table Mountain assim que abrir um céu azul impecável, já que as nuvens ('Toalha de Mesa') cancelam tudo.",
        goldenTip: "Jantar no Zeitz (MOCAA Waterfront, o galpão do milênio transformado num formigueiro de luz e luxo num antigo silo de grãos, e comer rodízio de Sushi japonês amado da Elena no porto).",
        schedule: [
            { time: "08:00", title: "Table Mountain", description: "Acordou sem vento e com Sol? Suba o bondinho AGORA.", type: "Activity", slug: "table-mountain", youtubeLink: "https://www.youtube.com/watch?v=3I0T2fN6Mlc", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", status: 'Previsto' },
            { time: "14:00", title: "V&A Waterfront", description: "Complexo de cais gigante cheio de lojinhas vitorianas e food markets.", type: "Activity", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8" },
            { time: "15:30", title: "Zeitz MOCAA", description: "Maravilha Arquitetônica Global. Museu de arte contemporânea.", type: "Activity", slug: "zeitz-mocaa", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", youtubeLink: "https://www.youtube.com/watch?v=3S_wH9H4eM8", status: 'Previsto' },
            { time: "20:00", title: "Willoughby & Co", description: "Opção recomendada pela Elena, sushis e cervejas frias na ala do Porto V&A.", type: "Dining", slug: "willoughby-and-co", status: 'Previsto' }
        ],
        selectedItems: ["table-mountain", "zeitz-mocaa", "willoughby-and-co"]
    },
    {
        day: 18,
        date: "28/03/2026",
        location: "Península do Cabo Sagrada",
        summary: "Contornar a Península: o dia rotulado como o mais dramático visualmente na viagem das encostas, avestruzes na areia e pinguins soltos nas pedras redondas.",
        goldenTip: "Reserve almoço para Harbour House colado ao mar e se molhe com as ondas de Kalk Bay!",
        schedule: [
            { time: "08:00", title: "Trilha Carro: Camps Bay & Hout", description: "Saída para o Sul costeando o Atlântico gelado azul-turquesa.", type: "Activity" },
            { time: "09:30", title: "Chapman's Peak Drive (Pedágio)", description: "Paga-se pra cruzar a corcunda majestosa à beira do precipício.", type: "Activity", slug: "chapmans-peak-drive", youtubeLink: "https://www.youtube.com/watch?v=9V7X_O5XvjI", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' },
            { time: "11:30", title: "Boa Esperança & Cape Point", description: "O fim do continente, cruzamento sombrio dos oceanos.", type: "Activity", slug: "cape-point", youtubeLink: "https://www.youtube.com/watch?v=8V7X_O5XvjI", mapsLink: "https://maps.app.goo.gl/wJ1qZ73X2D2g9M9Z8", status: 'Previsto' },
            { time: "15:00", title: "Boulders Beach Pinguins", description: "Passeie em passarelas e tome banho de sol com os pinguins.", type: "Activity", slug: "boulders-beach", youtubeLink: "https://www.youtube.com/watch?v=7V7X_O5XvjI", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' },
            { time: "17:30", title: "Almo-jantar: Harbour House (Kalk)", description: "Comer peixe recém-pescado observando as ondas batendo nas janelas.", type: "Dining", slug: "harbour-house-kalk-bay", status: 'Previsto' }
        ],
        selectedItems: ["chapmans-peak-drive", "cape-point", "boulders-beach", "harbour-house-kalk-bay"]
    },
    {
        day: 19,
        date: "29/03/2026",
        location: "Feiras e Vistas (Dia Livre CPT)",
        summary: "Descansar na vida pulsante urbana praiana. Se encontrar com amigos, passear sem cronômetro focado nas 'feirinhas' chiques agrícolas da África.",
        goldenTip: "A reserva do Restaurante 'The Pot Luck Club' abre aos mortais e esgota 4 meses completos de antecedência! Use a plataforma 'Dineplan'. O Oranjezicht City Farm rola só sábados e domingos no porto.",
        schedule: [
            { time: "10:00", title: "Oranjezicht City Farm Market", description: "Tendas alaranjadas, cheias de arte e bolos recém feitos. Local da elite para lanchar no V&A com doguinhos e roupas de grife.", type: "Activity", status: 'Previsto' },
            { time: "14:00", title: "Clifton 4th Beach ou Camps Bay", description: "Pegar Cor, a areia fofa branca para esquentar dos banhos com a calota polar.", type: "Activity", status: 'Previsto' },
            { time: "20:00", title: "The Pot Luck Club (Woodstock)", description: "Alta Gastronomia, Elevador Velho de Grãos de fábrica e vistas 360 do porto de lata sujo. Magnata!", type: "Dining", slug: "the-pot-luck-club-woodstock", status: 'Previsto' }
        ],
        selectedItems: ["the-pot-luck-club-woodstock"]
    },
    {
        day: 20,
        date: "30/03/2026",
        location: "Interior Colonial (Winelands)",
        summary: "Transitar da megalópole hipster colorida do porto marítimo e abraçar o ar gélido e romântico das Vinícolas de herança brasonada e refinada do domínio holandês franco dos vales interiores, os gigantes rurais: Franschhoek e Stellenbosch. Mudança e Check IN na grandiosidade máxima que seu orçamento pagar.",
        goldenTip: "A fazenda do Elon Musk (Babylonstoren) tem chalés exorbitantes agora (cerca R19.000) mas reservar um jantar nela com 9 a 2 meses antes, sem ser hóspede, garante desfrutar de lá a preços módicos, use Boschendal ou Lanzerac se ficar lotado.",
        schedule: [
            { time: "10:00", title: "Bye Cape Town", description: "Drive 1hora para as montanhas de vinha de Franschhoek.", type: "Transit" },
            { time: "12:00", title: "Almoço: The Werf Boschendal ou Babel", description: "Cozinha e Almoço farm-to-table literal.", type: "Dining", slug: "babel-restaurant", status: 'Previsto' },
            { time: "15:00", title: "Check-in: Babylonstoren / Lanzerac", description: "Mergulhe do luxo calmo dos séculos 15 a 18.", type: "Accommodation", slug: "babylonstoren", bookingLink: "https://br.hoteis.com/ho668149888/babylonstoren-franschhoek-africa-do-sul/", mapsLink: "https://maps.app.goo.gl/o1v4VjA3YhR4w3mF7", status: 'Previsto' },
            { time: "20:00", title: "Jantar na Fazenda / Lodge", description: "Dormindo sentindo a neblina dos alpes Sul.", type: "Dining" }
        ],
        selectedItems: ["babylonstoren", "babel-restaurant"]
    },
    {
        day: 21,
        date: "31/03/2026",
        location: "Bonde Escolar das Encostas Viticultoras",
        summary: "Não dirija de jeito algum; o dia inteiro é focado legalmente em provar tacinhas gigantes de Rosês em adegas subterrâneas enquanto uma Locomotiva da Era Vitoriana abertamente bucólica os transporta pelas macieiras e castas de Pinot.",
        goldenTip: "O 'Franschhoek Wine Tram' (Linhas Navy / Laranja são lendárias). Faça num dia no máximo 3 ou 4 quintas senão vira coma alcóolico com exaustão de caminhada. Não corra nas escalas no meio do Sol. Ao final Haute Cabriere entrega espumantes deitada acima num degrau da rocha vulcânica do vale!",
        schedule: [
            { time: "09:30", title: "Check-in Franschhoek Wine Tram", description: "Compre de casa antes de ir (ZAR 350+-) Roteiro laranja.", type: "Activity", slug: "franschhoek-wine-tram", youtubeLink: "https://winetram.co.za/", mapsLink: "https://maps.app.goo.gl/1U1sT2jJ6ZQ3nFjHA", status: 'Previsto' },
            { time: "11:00", title: "Alternativa Carro: Delaire Graff", description: "O AUGE das grifes chiques imponentes de ouros e diamantes.", type: "Activity" },
            { time: "15:00", title: "Alternativa: Kanonkop", description: "O Velho Pinot, vinhos pesados em adegas charmosas rústicas e fogueiras quentes no inverno de 30 anos atrás. Carol's Fav!", type: "Activity" },
            { time: "17:00", title: "Sunset Haute Cabrière", description: "O por do sol banha o grande vale rural por 30km adentro.", type: "Activity", slug: "haute-cabriere", status: 'Previsto' }
        ],
        selectedItems: ["franschhoek-wine-tram", "haute-cabriere"]
    },
    {
        day: 22,
        date: "01/04/2026",
        location: "Despedindo das Praias, Voando pra Metrópole Econômica",
        summary: "Bebendo com tempo final e calma o café da fazenda rural, devolvendo tudo, decolando e fechando o círculo chegando na selva corporativa africana mais agitada central. Transfer noturno focado absoluto e Sandton City. Hospedagem colada e dentro de gigantes Shoppings na riqueza.",
        goldenTip: "Mantenha rigor à noite: JNB em Sandton, Nelson Mandela Square, e Rosebank são ilhas e castelos seguros de primeiro mundo para flanar à pé na rua. Saiu dois muros de lá a pé? Vira Gotham City profunda noturna. Jamais atravesse escuro para fora se não for blindado/Uber lux. (A passarela de acrílico do hotel para as lojas chiques Rolex é tua principal rua).",
        schedule: [
            { time: "11:00", title: "Adeus CPT & Degustações", description: "Feche a conta.", type: "Transit" },
            { time: "18:30", title: "Devolução Sixt CPT Aeroporto", description: "Encerramento Locação 2.", type: "Transit", status: 'Confirmado' },
            { time: "20:25", title: "Voo SAA (SA 372) CPT -> JNB", description: "Embarque Noturno SAA. Voo Já PAGO. Chegada 22:25", type: "Transport", status: 'Confirmado' },
            { time: "23:00", title: "Uber Executivo JNB -> Sandton", description: "30 Minutos de tráfego vazio express high way de asfalto liso e largo.", type: "Transit" },
            { time: "23:50", title: "Checkin Hotel Sandton Sun", description: "Têm andares exclusivos para VIPs e passarela ligada direto para shopping gigante. Avisar do Late Checkin.", type: "Accommodation", slug: "sandton-sun", mapsLink: "https://maps.app.goo.gl/4Pj9R1fJ3ZQ3nFjHA", bookingLink: "https://br.hoteis.com/ho147021/sandton-sun-and-towers-joanesburgo-africa-do-sul/", status: 'Previsto' }
        ],
        selectedItems: ["sandton-sun"]
    },
    {
        day: 23,
        date: "02/04/2026",
        location: "O Ciclo Mandela: Apartheid e Ostentação.",
        summary: "Sentir visceralmente a segregação terrível e o peso brutal histórico do museu somado à casa dos lutadores prêmios nobel na imensa cidade negra do Soweto, tudo terminando depois sob os lustres da burguesia e shoppings imaculados caríssimos para selar as pedras de diamantes cortadas perfeitamente.",
        goldenTip: "O 'Diamond Walk' do lado de lá do Nelson Mandela Square ferve com Prada/Gucci caso precise ver joias e moda luxo local e se misturar lá com as Tribos urbanas hiper milionárias dos guetos de prata que passeiam lá. A reserva aos jantares de Marble ou Grillhouse são ouro fino para lombo de carnes altas.",
        schedule: [
            { time: "09:00", title: "Tour Histórico em Soweto", description: "História do Apartheid, Casa de Mandela e Desmond Tutu.", type: "Activity", slug: "soweto-tour", youtubeLink: "https://www.youtube.com/watch?v=H7J_A9j2eN0", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' },
            { time: "13:00", title: "Almoço: Vilakazi Street", description: "Heart of Soweto. Única rua do mundo com 2 prêmios Nobel.", type: "Dining", slug: "vilakazi-street", status: 'Previsto' },
            { time: "16:00", title: "Compras: Sandton City Mall", description: "Diamond Walk e as melhores marcas do mundo.", type: "Activity", slug: "sandton-city-mall", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", status: 'Previsto' },
            { time: "21:00", title: "Jantar: Marble Restaurant", description: "Cozinha no fogo (Live Fire). Vista panorâmica de JNB.", type: "Dining", slug: "marble-restaurant", mapsLink: "https://maps.app.goo.gl/C2h6X73X2D2g9M9Z8", bookingLink: "https://marble.restaurant/", status: 'Previsto' }
        ],
        selectedItems: ["soweto-tour", "sandton-city-mall", "marble-restaurant", "vilakazi-street"]
    },
    {
        day: 24,
        date: "03/04/2026",
        location: "O Êxodo (A Volta das Maravilhas)",
        summary: "Check outs, Uber e saguões em direção ao Atlântico escuro até amanhecer na Terra Natal dos passaportes tupiniquins.",
        goldenTip: "Ao Chegar na selva imensa do Aeroporto T3 e T2 em GRU São Paulo (Conexão longuíssima), o acesso melhor para deitar as canelas no final do esforço de 2 aviões seguidos será o Plaza Premium em domésticos apetrecho e quentinho!",
        schedule: [
            { time: "11:30", title: "Chegada JNB (OR Tambo)", description: "Transfer Final do Apartamento/Hotel na Torre para Portões A1-2 de Internacionais Despachos Malas Pés Firmes!", type: "Transit" },
            { time: "12:00", title: "Sala VIP: Bidvest Premier Intl", description: "Coma, reponha açúcares do café e refresque a viagem num último banho local quente luxo no Mezanino antes de embarcar 14hrs no avião escuro de tela brilhante!", type: "Dining", status: 'Previsto' },
            { time: "14:50", title: "Voo Continental LA8059 JNB->GRU", description: "Desaparecendo do Pôrs do Sol. Chegada 20:25pm, de noite paulistana chuvosa de outono, bagagens na esteirão.", type: "Transport", status: 'Confirmado' },
            { time: "22:00", title: "Plaza Premium Lounge (T2-GRU)", description: "Se recuperar tomando Guaraná no copão gelado depois do Raiox das federais aduaneiras de São Paulo correndo no labirinto T2 para os portões das madrugadas GOLS / LATAMS conectáveis Brasilia-Minas-Bahias!", type: "Dining", status: 'Previsto' },
            { time: "00:35", title: "(04/04) Madrugada Final Voo GRU->BSB", description: "Sábado adentro o Voo LA 4703 varando das 1h e chegando destruídos no DF e terminando The Smartest Route by AIGPS de 2026!", type: "Transport", status: 'Confirmado' },
            { time: "02:20", title: "ZzZz...", description: "Cama Absoluta...", type: "Transit" }
        ],
        selectedItems: []
    }
];

export function getItineraryWithDetails() {
    const allItems = getAllItems();

    return masterItinerary.map(day => {
        const details = day.schedule.map(ev => {
            // Find existing knowledge item
            const existing = ev.slug ? allItems.find(i => i.slug === ev.slug) : null;

            if (existing) return existing;

            // Otherwise, create a synthetic KnowledgeItem from the schedule event
            const synthetic: KnowledgeItem = {
                slug: ev.slug || `synthetic-${ev.title.toLowerCase().replace(/\s+/g, '-')}`,
                title: ev.title,
                type: ev.type === 'Transit' ? 'Tip' : ev.type, // Map Transit to Tip for Library filtering
                locations: [day.location],
                tags: [ev.type, 'Itinerary'],
                checklist: false,
                coordinates: undefined,
                time: ev.time,
                status: ev.status, // Link the roteiro status
                links: {
                    googleMaps: ev.mapsLink,
                    booking: ev.bookingLink,
                    official: ev.officialLink,
                    menu: undefined
                },
                pricing: {
                    estimated: ev.price
                },
                visuals: {
                    youtubeUrl: ev.youtubeLink
                },
                content: ev.description || '',
                details: {}
            };

            // Ensure coordinates get attached if provided on the inline level
            if (ev.coordinates) {
                synthetic.coordinates = ev.coordinates;
            }

            return synthetic;
        }).filter(Boolean);

        return {
            ...day,
            selectedDetails: details as KnowledgeItem[],
            alternativeDetails: []
        };
    });
}
