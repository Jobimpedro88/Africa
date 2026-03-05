const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const itemsDir = path.join(__dirname, 'content', 'items');

try {
    const files = fs.readdirSync(itemsDir);
    console.log(`Found ${files.length} files.`);

    files.forEach(file => {
        if (!file.endsWith('.md')) return;

        try {
            const filePath = path.join(itemsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const parsed = matter(content);

            // Check for coordinates format if present
            if (parsed.data.coordinates) {
                if (typeof parsed.data.coordinates.lat !== 'number' || typeof parsed.data.coordinates.lng !== 'number') {
                    console.error(`❌ [INVALID COORDS] ${file}: lat/lng must be numbers`);
                }
            }
        } catch (e) {
            console.error(`❌ [ERROR] ${file}: ${e.message}`);
        }
    });
    console.log("Validation complete.");
} catch (e) {
    console.error("Failed to read directory:", e);
}
