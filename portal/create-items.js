const fs = require('fs');
const path = require('path');

const items = [
    {
        slug: 'quills-restaurant',
        title: 'Quills Restaurant',
        type: 'Dining',
        locations: ['Johannesburg', 'O.R. Tambo'],
        coordinates: { lat: -26.1333, lng: 28.2307 },
        tags: ['Dining', 'African', 'Convenience'],
        content: '**Contexto:** Restaurante do InterContinental. Aberto 24h. Famoso pelas carnes de caça.'
    },
    {
        slug: 'zeitz-mocaa',
        title: 'Zeitz MOCAA',
        type: 'Activity',
        locations: ['Cape Town', 'Waterfront'],
        coordinates: { lat: -33.9083, lng: 18.4231 },
        tags: ['Art', 'Museum', 'Architecture', 'Must-Go'],
        content: '**Contexto:** O maior museu de arte contemporânea da África. A arquitetura (fábrica de silos) é impressionante.'
    },
    {
        slug: 'protea-hotel-franschhoek',
        title: 'Protea Hotel Franschhoek',
        type: 'Accommodation',
        locations: ['Winelands', 'Franschhoek'],
        coordinates: { lat: -33.9075, lng: 19.1174 },
        tags: ['Hotel', 'Central', 'Comfort'],
        content: '**Contexto:** Localização perfeita para explorar a vila a pé. Próximo ao terminal do Wine Tram.'
    },
    {
        slug: 'chefs-warehouse',
        title: 'Chefs Warehouse at Maison',
        type: 'Dining',
        locations: ['Winelands', 'Franschhoek'],
        coordinates: { lat: -33.8867, lng: 19.0772 },
        tags: ['Dining', 'Tapas', 'Fine Dining'],
        content: '**Contexto:** "Tapas for 2". Um dos melhores menus degustação da região em ambiente relaxado.'
    },
    {
        slug: 'stony-point-penguins',
        title: 'Stony Point Nature Reserve',
        type: 'Activity',
        locations: ['Betty\'s Bay'],
        coordinates: { lat: -34.3725, lng: 18.8933 },
        tags: ['Nature', 'Wildlife', 'Penguins'],
        content: '**Contexto:** Pinguins sem multidão (alternativa a Boulders Beach). Mais selvagem.'
    },
    {
        slug: 'bientangs-cave',
        title: 'Bientang\'s Cave',
        type: 'Dining',
        locations: ['Hermanus'],
        coordinates: { lat: -34.4195, lng: 19.2446 },
        tags: ['Dining', 'Seafood', 'Views', 'Unique'],
        content: '**Contexto:** Restaurante dentro de uma caverna na beira do mar. Melhor lugar para ver baleias (em temporada) comendo ostras.'
    },
    {
        slug: '7-on-marine',
        title: '7 on Marine',
        type: 'Accommodation',
        locations: ['Hermanus'],
        coordinates: { lat: -34.4219, lng: 19.2352 },
        tags: ['Hotel', 'Boutique', 'Views'],
        content: '**Contexto:** Hotel boutique moderno com vista para o oceano.'
    },
    {
        slug: 'map-of-africa-viewpoint',
        title: 'Map of Africa Viewpoint',
        type: 'Activity',
        locations: ['Wilderness'],
        coordinates: { lat: -33.9929, lng: 22.5608 },
        tags: ['Nature', 'Views', 'Scenic'],
        content: '**Contexto:** O rio forma o contorno exato do mapa da África. Parada rápida e clássica.'
    },
    {
        slug: 'mes-amis-guest-house',
        title: 'Mes Amis Beach Guest House',
        type: 'Accommodation',
        locations: ['Wilderness'],
        coordinates: { lat: -33.9940, lng: 22.5748 },
        tags: ['Guest House', 'Beach', 'Views'],
        content: '**Contexto:** Acesso direto à praia infinita de Wilderness. Café da manhã com vista.'
    },
    {
        slug: 'sky-villa-plett',
        title: 'Sky Villa Boutique Hotel',
        type: 'Accommodation',
        locations: ['Plettenberg Bay'],
        coordinates: { lat: -34.0405, lng: 23.3669 },
        tags: ['Hotel', 'Luxury', 'Views'],
        content: '**Contexto:** No topo da colina com vista 360º de Plett. Piscina incrível.'
    },
    {
        slug: 'emily-moon-river-lodge',
        title: 'Emily Moon River Lodge',
        type: 'Dining',
        locations: ['Plettenberg Bay'],
        coordinates: { lat: -34.006, lng: 23.37 },
        tags: ['Dining', 'Decor', 'Vibe'],
        content: '**Contexto:** Decoração africana eclética incrível. Jantar ao pôr do sol no rio é obrigatório.'
    },
    {
        slug: 'storms-river-bridge',
        title: 'Storms River Suspension Bridge',
        type: 'Activity',
        locations: ['Tsitsikamma'],
        coordinates: { lat: -34.0195, lng: 23.9035 },
        tags: ['Nature', 'Hiking', 'Must-Go'],
        content: '**Contexto:** A famosa ponte suspensa sobre a foz do rio. Trilha fácil (2km).'
    },
    {
        slug: 'addo-elephant-park',
        title: 'Addo Elephant National Park',
        type: 'Activity',
        locations: ['Eastern Cape'],
        coordinates: { lat: -33.4447, lng: 25.7458 },
        tags: ['Safari', 'Wildlife', 'Elephants'],
        content: '**Contexto:** A maior densidade de elefantes do mundo. Safari self-drive fácil e seguro.'
    }
];

const itemsDir = path.join(__dirname, 'content', 'items');

if (!fs.existsSync(itemsDir)) {
    fs.mkdirSync(itemsDir, { recursive: true });
}

items.forEach(item => {
    const filePath = path.join(itemsDir, `${item.slug}.md`);
    const fileContent = `---
title: "${item.title}"
type: "${item.type}"
locations: ${JSON.stringify(item.locations)}
coordinates:
  lat: ${item.coordinates.lat}
  lng: ${item.coordinates.lng}
tags: ${JSON.stringify(item.tags)}
checklist: true
rating: 5
---
${item.content}
`;

    try {
        fs.writeFileSync(filePath, fileContent);
        console.log(`✅ Created ${item.slug}.md`);
    } catch (err) {
        console.error(`❌ Error creating ${item.slug}.md:`, err);
    }
});
