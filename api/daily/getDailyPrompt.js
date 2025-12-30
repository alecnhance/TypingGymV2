import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handleGetDailyPrompt(req, res) {
    try {
        // Get today's date in YYYY-MM-DD format (Eastern Time)
        const now = new Date();
        const etDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const dateString = `${etDate.getFullYear()}-${String(etDate.getMonth() + 1).padStart(2, '0')}-${String(etDate.getDate()).padStart(2, '0')}`;
        
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
        const now = new Date();
        const etDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
        const dateString = `${etDate.getFullYear()}-${String(etDate.getMonth() + 1).padStart(2, '0')}-${String(etDate.getDate()).padStart(2, '0')}`;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            prompt: "The quick brown fox jumps over the lazy dog. Practice makes perfect!",
            date: dateString
        }));
    }
}

