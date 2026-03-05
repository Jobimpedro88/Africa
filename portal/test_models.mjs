
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function list() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        // There isn't a direct "list models" on the confusingly named client, but we can try to run a simple text prompt.
        // Actually, there IS a list models endpoint but maybe not exposed easily on the main class?
        // Let's looks for a simple generation to test connectivity.

        console.log("Testing simple generation with gemini-1.5-flash...");
        const result = await model.generateContent("Hello?");
        console.log("Success:", result.response.text());
    } catch (e) {
        console.error("1.5 Flash failed:", e.message);

        console.log("Testing gemini-pro...");
        try {
            const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
            const resultPro = await modelPro.generateContent("Hello?");
            console.log("Success with gemini-pro:", resultPro.response.text());
        } catch (e2) {
            console.error("gemini-pro failed:", e2.message);
        }
    }
}

list();
