
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("Please provide GEMINI_API_KEY in .env file");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const audioDir = path.resolve("..", "Dicas carol");
const outputFile = path.resolve("..", "Dicas_Carol_Transcribed.md");

async function transcribeFolder() {
    console.log(`Scanning directory: ${audioDir}`);

    if (!fs.existsSync(audioDir)) {
        console.error(`Directory not found: ${audioDir}`);
        return;
    }

    const files = fs.readdirSync(audioDir).filter(file => file.toLowerCase().endsWith('.ogg') || file.toLowerCase().endsWith('.mp3') || file.toLowerCase().endsWith('.m4a'));

    if (files.length === 0) {
        console.log("No audio files found.");
        return;
    }

    let fullTranscription = "# Transcrições - Dicas da Carol\n\n";

    for (const file of files) {
        console.log(`Processing: ${file}...`);
        const filePath = path.join(audioDir, file);

        try {
            // Upload the file
            const uploadResult = await fileManager.uploadFile(filePath, {
                mimeType: "audio/ogg",
                displayName: file,
            });

            console.log(`  Uploaded ${file} as ${uploadResult.file.name}`);

            let fileUri = uploadResult.file.uri;
            let state = uploadResult.file.state;

            // Wait for processing if needed (video/audio usually quick but good to check)
            while (state === "PROCESSING") {
                process.stdout.write(".");
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const fileStatus = await fileManager.getFile(uploadResult.file.name);
                state = fileStatus.state;
            }

            if (state !== "ACTIVE") {
                console.error(`  File processing failed for ${file}`);
                continue;
            }

            const result = await model.generateContent([
                "Transcreva este áudio em detalhes. A falante é a Carol, dando dicas de viagem para a África do Sul. Organize por tópicos se possível.",
                {
                    fileData: {
                        fileUri: fileUri,
                        mimeType: "audio/ogg",
                    },
                },
            ]);

            const text = result.response.text();
            console.log(`  Transcribed ${file} (${text.length} chars)`);

            fullTranscription += `## Áudio: ${file}\n\n${text}\n\n---\n\n`;

        } catch (error) {
            console.error(`  Error processing ${file}:`, error);
            fs.appendFileSync('error_log.txt', `Error processing ${file}: ${JSON.stringify(error, null, 2)}\n\n`);
            fullTranscription += `## Áudio: ${file}\n\n[ERRO NA TRANSCRIÇÃO: ${error.message || error}]\n\n---\n\n`;
        }
    }

    fs.writeFileSync(outputFile, fullTranscription);
    console.log(`\nAll done! Saved to ${outputFile}`);
}

transcribeFolder();
