const fs = require('fs');
const path = require('path');

// CONFIG
const PROJECT_ROOT = process.cwd();
const PORTAL_CONTENT_DIR = path.join(PROJECT_ROOT, 'portal/content');
const PORTAL_ITEMS_DIR = path.join(PORTAL_CONTENT_DIR, 'items');
const PORTAL_ITINERARY_JSON = path.join(PORTAL_CONTENT_DIR, 'itinerary.json');

const MASTER_ROTEIRO_PATH = path.join(PROJECT_ROOT, 'Roteiro_Viagem_Africa_2026.md');

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

function parseMasterItinerary(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Master Roteiro NOT found at: ${filePath}`);
        return null;
    }

    console.log(`📖 Reading Master Roteiro: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    const days = [];

    // Regex to find "### Dia X: Título" or "### Dias X-Y: Título"
    const daySectionRegex = /###\s+(Dias?)\s+(\d+)(?:-(\d+))?:\s*(.*?)(?:\r?\n|$)/g;
    let match;

    while ((match = daySectionRegex.exec(content)) !== null) {
        const isRange = !!match[3];
        const startDay = parseInt(match[2]);
        const endDay = isRange ? parseInt(match[3]) : startDay;
        const title = match[4].trim();

        // Find content for this section
        const startIndex = match.index + match[0].length;
        const remainingText = content.slice(startIndex);
        // Stop at next header (###) or end
        const nextHeaderIndex = remainingText.search(/(?:\r?\n)###\s+/);
        const sectionContent = nextHeaderIndex !== -1 ? remainingText.slice(0, nextHeaderIndex) : remainingText;

        // Parse Items
        const items = parseItemsFromContent(sectionContent);

        // Expand Range
        for (let d = startDay; d <= endDay; d++) {
            days.push({
                day: d,
                summary: title,
                sectionContent,
                items
            });
        }
    }

    return days;
}

function parseItemsFromContent(content) {
    const items = [];

    // Look for: * **Name:** or * **Name** (implied list items)
    const lines = content.split('\n');
    lines.forEach(line => {
        // Regex: Bullet point, bold text, optional colon/paren
        // matches: "* **Hotel Name:**" or "* **Restaurant**"
        const boldMatch = line.match(/^\s*\*\s+\*\*(.*?)\*\*(?:.*)/);

        if (boldMatch) {
            let name = boldMatch[1].trim();
            // Cleanup: "Nome do Lugar: Descrição" -> "Nome do Lugar"
            if (name.includes(':')) name = name.split(':')[0].trim();

            // Filter keywords that are NOT places
            const keywordsToIgnore = [
                'História', 'Contexto', 'Estratégia', 'O que pedir', 'Logística',
                'O que Comprar', 'Preços', 'Localização', 'Onde Dormir', 'Onde Comer',
                'Lugares', 'Transporte', 'Vento', 'Trazer', 'Shipping', 'Visto',
                'Dinheiro', 'Febre Amarela', 'Malária', 'Tomadas', 'Total', 'Day Trip',
                'Fronteira', 'Link de Reserva', 'Como Chegar', 'Vibe', 'Contra',
                'Por que', 'Nota', 'Budget Recap', 'Solução', 'Fonte', 'Opção'
            ];

            if (keywordsToIgnore.some(k => name.toLowerCase().includes(k.toLowerCase()) || k === name)) return;

            // Heuristic: Place names usually don't start with verbs or numbers alone
            if (name.length > 2) {
                items.push(name);
            }
        }
    });
    return items;
}

function updateItineraryJson(parsedDays) {
    if (!fs.existsSync(PORTAL_ITINERARY_JSON)) {
        console.error('❌ Itinerary JSON not found.');
        return;
    }

    const currentItinerary = JSON.parse(fs.readFileSync(PORTAL_ITINERARY_JSON, 'utf8'));
    let updates = 0;

    parsedDays.forEach(pDay => {
        const exDay = currentItinerary.find(d => d.day === pDay.day);
        if (exDay) {
            // Update Summary
            if (exDay.summary !== pDay.summary) {
                exDay.summary = pDay.summary;
            }

            // Sync Items
            pDay.items.forEach(itemName => {
                const slug = slugify(itemName);

                // Check if already linked
                const isLinked = exDay.selectedItems.includes(slug) || exDay.alternativeItems.includes(slug);
                if (!isLinked) {
                    exDay.selectedItems.push(slug);
                    updates++;
                    console.log(`   ➕ Day ${pDay.day}: Linked '${itemName}'`);
                }

                ensureItemFile(slug, itemName, pDay.summary);
            });
        }
    });

    if (updates > 0) {
        fs.writeFileSync(PORTAL_ITINERARY_JSON, JSON.stringify(currentItinerary, null, 4));
        console.log(`✅ Itinerary JSON updated with ${updates} new changes.`);
    } else {
        console.log(`✅ Itinerary JSON is up to date.`);
    }
}

function ensureItemFile(slug, name, context) {
    if (!fs.existsSync(PORTAL_ITEMS_DIR)) {
        fs.mkdirSync(PORTAL_ITEMS_DIR, { recursive: true });
    }

    const filename = `${slug}.md`;
    const filePath = path.join(PORTAL_ITEMS_DIR, filename);

    if (!fs.existsSync(filePath)) {
        let type = 'Activity';
        if (name.toLowerCase().match(/hotel|lodge|camp|pousada|resort/)) type = 'Accommodation';
        if (name.toLowerCase().match(/restaurante|cafe|bistro|kitchen|bar|pub|jantar/)) type = 'Dining';
        if (name.toLowerCase().match(/voo|transfer|uber|trem|shuttle/)) type = 'Transport';

        const scaffold = `---
title: "${name}"
type: ${type}
locations: ["Auto-Detected"] 
tags: ["From-Markdown"]
time: ""
pricing:
  estimated: ""
  currency: "USD"
links:
  googleMaps: ""
details:
  history: ""
  pros: []
  cons: []
  tips: ""
---

**Contexto do Roteiro:** ${context}

*Item importado automaticamente. Edite para adicionar detalhes.*
`;
        fs.writeFileSync(filePath, scaffold);
        console.log(`   ✨ Created Item File: ${filename}`);
    }
}

function sync() {
    console.log('🔄 Content Agent Started...');
    const parsedDays = parseMasterItinerary(MASTER_ROTEIRO_PATH);
    if (parsedDays) {
        updateItineraryJson(parsedDays);
    }
}

sync();
