// lib/cities.ts - City-based Itinerary Data Structure (V5 FINAL)

export interface AccommodationOption {
    name: string;
    tier: 'primary' | 'alternative';
    pricePerNight: string;
    mapsLink: string;
    officialSite: string;
    youtubeReview: string;
    highlights: string[];
}

export interface Restaurant {
    name: string;
    cuisine: string;
    mustOrder: string;
    priceRange: string;
    mapsLink: string;
    officialSite: string;
    youtubeReview: string;
}

export interface Activity {
    name: string;
    duration: string;
    price: string;
    mapsLink: string;
    officialSite: string;
    youtubeVideo: string;
    tips: string;
}

export interface ScheduleItem {
    time: string;
    activity: string;
    location?: string;
    mapsLink?: string;
    notes?: string;
}

export interface DayPlan {
    date: string;
    dayNumber: number;
    title: string;
    schedule: ScheduleItem[];
    meals: {
        breakfast?: Restaurant;
        lunch?: Restaurant;
        dinner?: Restaurant;
    };
}

export interface City {
    id: string;
    name: string;
    country: string;
    countryFlag: string;
    dates: string;
    daysCount: number;
    climate: { temp: string; conditions: string };
    history: string;
    youtubeOverview: string;
    accommodation: {
        primary: AccommodationOption;
        alternatives: AccommodationOption[];
    };
    restaurants: Restaurant[];
    activities: Activity[];
    days: DayPlan[];
}

export const cities: City[] = [
    // ============================================
    // 1. DULLSTROOM & PANORAMA (Dias 2-4)
    // ============================================
    {
        id: 'panorama',
        name: 'Panorama Route',
        country: 'África do Sul',
        countryFlag: '🇿🇦',
        dates: '12-14 Mar',
        daysCount: 3,
        climate: { temp: '15°C - 25°C', conditions: 'Montanha e Neblina' },
        history: 'A rota cênica mais famosa do país, cheia de cachoeiras e o incrível Blyde River Canyon.',
        youtubeOverview: 'https://www.youtube.com/watch?v=Hu1Sj9vO_jU',
        accommodation: {
            primary: {
                name: 'Angels View (Graskop)',
                tier: 'primary',
                pricePerNight: 'R$ 800',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Angels+View+Hotel+Graskop',
                officialSite: 'https://angelsview.co.za/',
                youtubeReview: 'https://www.youtube.com/results?search_query=angels+view+hotel+graskop',
                highlights: ['Vista do Canyon', 'Moderno', 'Perto do God\'s Window']
            },
            alternatives: []
        },
        restaurants: [
            {
                name: 'Mrs Simpson\'s',
                cuisine: 'Internacional',
                mustOrder: 'Truta de Dullstroom',
                priceRange: 'R$ 150',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Mrs+Simpsons+Dullstroom',
                officialSite: 'https://mrssimpsons.co.za/',
                youtubeReview: ''
            }
        ],
        activities: [
            {
                name: 'Three Rondavels',
                duration: '1 hora',
                price: 'R$ 50',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Three+Rondavels+Viewpoint',
                officialSite: '',
                youtubeVideo: '',
                tips: 'A vista mais icônica. Vá à tarde para melhor luz.'
            }
        ],
        days: [
            {
                date: '12/03',
                dayNumber: 2,
                title: 'Chegada e Dullstroom',
                schedule: [
                    { time: '12:40', activity: 'Pouso JNB & Pegar Carro' },
                    { time: '16:00', activity: 'Chegada em Dullstroom' },
                    { time: '19:00', activity: 'Jantar Mrs Simpson\'s' }
                ],
                meals: {}
            },
            {
                date: '13/03',
                dayNumber: 3,
                title: 'Cachoeiras e Graskop',
                schedule: [
                    { time: '10:00', activity: 'Mac Mac Falls' },
                    { time: '14:00', activity: 'Graskop Gorge Lift' }
                ],
                meals: {}
            },
            {
                date: '14/03',
                dayNumber: 4,
                title: 'Blyde River Canyon',
                schedule: [
                    { time: '09:00', activity: 'God\'s Window' },
                    { time: '11:00', activity: 'Bourke\'s Luck Potholes' },
                    { time: '15:00', activity: 'Three Rondavels' }
                ],
                meals: {}
            }
        ]
    },
    // ============================================
    // 2. KRUGER SAFARI (Dias 5-8)
    // ============================================
    {
        id: 'kruger',
        name: 'Kruger National Park',
        country: 'África do Sul',
        countryFlag: '🇿🇦',
        dates: '15-18 Mar',
        daysCount: 4,
        climate: { temp: '18°C - 32°C', conditions: 'Quente e Selvagem' },
        history: 'O santuário dos Big 5. Mdluli para luxo e Satara para leões.',
        youtubeOverview: 'https://www.youtube.com/watch?v=pAnR9y6pE-g',
        accommodation: {
            primary: {
                name: 'Mdluli Safari Lodge',
                tier: 'primary',
                pricePerNight: 'Incluso (Half Board)',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Mdluli+Safari+Lodge',
                officialSite: 'https://mdlulisafarilodge.co.za/',
                youtubeReview: 'https://www.youtube.com/results?search_query=mdluli+safari+lodge+review',
                highlights: ['Luxo em Tendas', 'Dentro do Parque', 'Jantar Boma']
            },
            alternatives: [
                {
                    name: 'Kruger Shalati Train',
                    tier: 'alternative',
                    pricePerNight: '$$$$',
                    mapsLink: '',
                    officialSite: '',
                    youtubeReview: '',
                    highlights: ['Trem na Ponte', 'Experiência Única']
                }
            ]
        },
        restaurants: [],
        activities: [
            {
                name: 'Game Drive Mdluli',
                duration: '3-4 horas',
                price: 'R$ 1.170/pp',
                mapsLink: '',
                officialSite: '',
                youtubeVideo: '',
                tips: 'Reserve com antecedência por e-mail.'
            }
        ],
        days: [
            {
                date: '15/03',
                dayNumber: 5,
                title: 'Entrada Phabeni Gate',
                schedule: [
                    { time: '12:00', activity: 'Check-in Mdluli' },
                    { time: '16:00', activity: 'Sunset Drive (Opcional)' }
                ],
                meals: {}
            },
            {
                date: '16/03',
                dayNumber: 6,
                title: 'Dia de Big 5',
                schedule: [
                    { time: '05:30', activity: 'Morning Drive' },
                    { time: '13:00', activity: 'Piscina/Relax' },
                    { time: '19:00', activity: 'Jantar Boma' }
                ],
                meals: {}
            },
            {
                date: '17/03',
                dayNumber: 7,
                title: 'Self-Drive para o Norte',
                schedule: [
                    { time: '10:00', activity: 'Estrada para Satara' },
                    { time: '14:00', activity: 'Check-in SleepOver Orpen' }
                ],
                meals: {}
            }
        ]
    },
    // ============================================
    // 3. ESWATINI (Dias 9-10)
    // ============================================
    {
        id: 'eswatini',
        name: 'Eswatini (Suazilândia)',
        country: 'Eswatini',
        countryFlag: '🇸🇿',
        dates: '19-20 Mar',
        daysCount: 2,
        climate: { temp: '20°C - 30°C', conditions: 'Tropical de Altitude' },
        history: 'Um reino independente dentro da África do Sul, famoso por seu artesanato.',
        youtubeOverview: 'https://www.youtube.com/results?search_query=eswatini+travel',
        accommodation: {
            primary: {
                name: 'Summerfield Botanical',
                tier: 'primary',
                pricePerNight: 'R$ 1.200',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Summerfield+Botanical+Garden',
                officialSite: 'https://summerfieldresort.com/',
                youtubeReview: '',
                highlights: ['Jardim Botânico', 'Luxo Tropical', 'Café da Manhã Incrível']
            },
            alternatives: []
        },
        restaurants: [],
        activities: [
            {
                name: 'Ngwenya Glass',
                duration: '2 horas',
                price: 'Grátis',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Ngwenya+Glass',
                officialSite: '',
                youtubeVideo: '',
                tips: 'Compre os copos de vidro reciclado.'
            }
        ],
        days: [
            {
                date: '19/03',
                dayNumber: 9,
                title: 'Reino de Eswatini',
                schedule: [
                    { time: '10:00', activity: 'Fronteira Jeppes Reef' },
                    { time: '14:00', activity: 'Ngwenya Glass' }
                ],
                meals: {}
            },
            {
                date: '20/03',
                dayNumber: 10,
                title: 'Cultura Swazi',
                schedule: [
                    { time: '10:00', activity: 'Mantenga Cultural Village' },
                    { time: '14:00', activity: 'Swazi Candles' }
                ],
                meals: {}
            }
        ]
    },
    // ============================================
    // 4. GARDEN ROUTE & CPT (Dias 11-19)
    // ============================================
    {
        id: 'gardenroute',
        name: 'Garden Route & Cape Town',
        country: 'África do Sul',
        countryFlag: '🇿🇦',
        dates: '21-29 Mar',
        daysCount: 9,
        climate: { temp: '15°C - 26°C', conditions: 'Costa e Praia' },
        history: 'De Port Elizabeth a Cape Town, a rota costeira mais bonita da África.',
        youtubeOverview: 'https://www.youtube.com/watch?v=irpEmE540sk',
        accommodation: {
            primary: {
                name: 'Radisson RED (CPT)',
                tier: 'primary',
                pricePerNight: 'R$ 1.800',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Radisson+RED+VA+Waterfront+Cape+Town',
                officialSite: 'https://www.radissonhotels.com/en-us/hotels/radisson-red-cape-town-waterfront',
                youtubeReview: '',
                highlights: ['Waterfront', 'Moderno', 'Rooftop']
            },
            alternatives: []
        },
        restaurants: [
            {
                name: 'Enrico\'s (Plett)',
                cuisine: 'Italiano/Peixes',
                mustOrder: 'Bomba (Focaccia)',
                priceRange: 'R$ 200',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Enrico+Ristorante+Plettenberg+Bay',
                officialSite: '',
                youtubeReview: ''
            }
        ],
        activities: [
            {
                name: 'Robberg Reserve',
                duration: '4 horas',
                price: 'R$ 50',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Robberg+Nature+Reserve',
                officialSite: '',
                youtubeVideo: '',
                tips: 'A trilha mais bonita da viagem. Leve água.'
            }
        ],
        days: [
            {
                date: '21/03',
                dayNumber: 11,
                title: 'Voo para o Sul',
                schedule: [
                    { time: '11:25', activity: 'Voo JNB → PLZ (SA405)' },
                    { time: '13:00', activity: 'Chegada PLZ & Pegar Carro' },
                    { time: '19:00', activity: 'Noite em Port Elizabeth' }
                ],
                meals: {}
            },
            {
                date: '22/03',
                dayNumber: 12,
                title: 'Tsitsikamma & Pontes',
                schedule: [
                    { time: '10:00', activity: 'Bloukrans Bridge' },
                    { time: '14:00', activity: 'Storms River Mouth' }
                ],
                meals: {}
            },
            {
                date: '27/03',
                dayNumber: 17,
                title: 'Table Mountain',
                schedule: [
                    { time: '08:00', activity: 'Table Mountain Cableway' },
                    { time: '14:00', activity: 'V&A Waterfront' }
                ],
                meals: {}
            }
        ]
    },
    // ============================================
    // 5. WINELANDS (Dias 20-22)
    // ============================================
    {
        id: 'winelands',
        name: 'Winelands (Franschhoek)',
        country: 'África do Sul',
        countryFlag: '🇿🇦',
        dates: '30 Mar - 01 Abr',
        daysCount: 3,
        climate: { temp: '14°C - 28°C', conditions: 'Outono Dourado' },
        history: 'O vale dos vinhos com herança francesa. Gastronomia de ponta.',
        youtubeOverview: 'https://www.youtube.com/watch?v=rFaMtfPJYwU',
        accommodation: {
            primary: {
                name: 'Babylonstoren',
                tier: 'primary',
                pricePerNight: 'R$ 3.500',
                mapsLink: 'https://www.google.com/maps/search/?api=1&query=Babylonstoren',
                officialSite: 'https://babylonstoren.com/',
                youtubeReview: 'https://www.youtube.com/results?search_query=babylonstoren+vlog',
                highlights: ['Jardins', 'Farm Hotel', 'Vinhos']
            },
            alternatives: []
        },
        restaurants: [
            {
                name: 'Babel',
                cuisine: 'Farm-to-Table',
                mustOrder: 'Salada Colorida',
                priceRange: 'R$ 400',
                mapsLink: '',
                officialSite: '',
                youtubeReview: ''
            }
        ],
        activities: [
            {
                name: 'Wine Tram',
                duration: 'Dia todo',
                price: 'R$ 350',
                mapsLink: '',
                officialSite: 'https://winetram.co.za/',
                youtubeVideo: '',
                tips: 'Linha Navy ou Orange.'
            }
        ],
        days: [
            {
                date: '31/03',
                dayNumber: 21,
                title: 'Wine Tram Experience',
                schedule: [
                    { time: '10:00', activity: 'Embarque no Tram' },
                    { time: '17:00', activity: 'Pôr do Sol Haute Cabrière' }
                ],
                meals: {}
            },
            {
                date: '01/04',
                dayNumber: 22,
                title: 'Despedida de Cape Town',
                schedule: [
                    { time: '18:30', activity: 'Devolução Carro CPT' },
                    { time: '20:25', activity: 'Voo SA372 → JNB' },
                    { time: '23:30', activity: 'Check-in Sandton Sun' }
                ],
                meals: {}
            }
        ]
    }
];

export default cities;
