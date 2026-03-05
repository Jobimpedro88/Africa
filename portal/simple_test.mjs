
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "models/gemini-1.5-flash"];

async function run() {
    for (const modelName of models) {
        console.log(`Testing ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello there");
            console.log(`SUCCESS with ${modelName}:`, result.response.text());
            return; // Found a working one
        } catch (e) {
            console.error(`FAILED ${modelName}: ${e.message.split('\n')[0]} (Status: ${e.status || 'unknown'})`);
        }
    }
    console.log("All models failed.");
}
run();
