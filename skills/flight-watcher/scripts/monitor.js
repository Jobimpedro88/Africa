const fs = require('fs');
const path = require('path');

// Configuration
const LOG_FILE = path.join(__dirname, '../../../portal/public/data/flight_log.md');
const TARGET_DATE = '2026-03-16';

// Simulated Flight Data (In a real scenario, this would use Puppeteer/Playwright)
// We use a random variance to simulate live fluctuation for the dashboard demo.
const FLIGHTS = [
    {
        route: 'VFA->JNB',
        airline: 'Fastjet',
        basePrice: 150,
        variance: 15,
        target: 150
    },
    {
        route: 'JNB->CPT',
        airline: 'Safair',
        basePrice: 74,
        variance: 10,
        target: 80
    }
];

function getSimulatedPrice(base, variance) {
    const change = (Math.random() * variance * 2) - variance;
    return Math.round(base + change);
}

function getStatus(price, target) {
    if (price <= target - 10) return '💎 Ótimo';
    if (price <= target) return '✅ Na Meta';
    if (price <= target + 20) return '⚠️ Atenção';
    return '❌ Alto';
}

function logFlightCheck() {
    const today = new Date().toISOString().split('T')[0];
    let newLogEntries = '';

    console.log(`🔍 Checking Flight Prices for ${TARGET_DATE}...`);

    FLIGHTS.forEach(flight => {
        const price = getSimulatedPrice(flight.basePrice, flight.variance);
        const priceBrl = Math.round(price * 5.7); // Estimated Exchange Rate
        const status = getStatus(price, flight.target);

        console.log(`   ✈️ ${flight.route} (${flight.airline}): $${price} (Target: $${flight.target}) -> ${status}`);

        newLogEntries += `| ${today} | ${flight.route} | ${flight.airline} | $${price} | R$ ${priceBrl} | ${status} |\n`;
    });

    if (fs.existsSync(LOG_FILE)) {
        fs.appendFileSync(LOG_FILE, newLogEntries);
        console.log(`✅ Log updated: ${LOG_FILE}`);
    } else {
        console.error(`❌ Log file not found: ${LOG_FILE}`);
    }
}

// Run
logFlightCheck();
