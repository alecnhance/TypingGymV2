import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handleGetDailyPrompt(req, res) {
    try {
        // Get today's date in YYYY-MM-DD format (UTC)
        const today = new Date();
        const todayUTC = new Date(Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate()
        ));
        const dateString = todayUTC.toISOString().split('T')[0];
        
        // Read the daily prompts file
        const promptsPath = path.join(__dirname, '..', '..', 'data', 'dailyPrompts.json');
        const promptsData = fs.readFileSync(promptsPath, 'utf8');
        const prompts = JSON.parse(promptsData);
        
        // Get the prompt for today, or a default if not found
        const prompt = prompts[dateString] || "The quick brown fox jumps over the lazy dog. Practice makes perfect!";
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ prompt, date: dateString }));
    } catch (err) {
        console.error('Error retrieving daily prompt:', err);
        // Return a default prompt on error
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            prompt: "The quick brown fox jumps over the lazy dog. Practice makes perfect!",
            date: new Date().toISOString().split('T')[0]
        }));
    }
}

