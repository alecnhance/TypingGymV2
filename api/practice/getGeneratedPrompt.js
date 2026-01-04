import OpenAI from 'openai';
import { parse } from 'url';

export async function handleGetGeneratedPrompt(req, res) {
    const { query } = parse(req.url, true);
    const prompt = query.prompt;
    const promptLen = query.promptLen;
    const input = `Generate a typing practice text of exactly ${promptLen} words based on: ${prompt}. 

    IMPORTANT: Return ONLY the typing text itself. Do not include any explanations, introductions, quotes, or additional text. Just return the raw text that should be typed.`;
    const systemMessage = "You are a typing practice text generator. You generate clean, readable text for typing practice. Always return ONLY the text itself - no explanations, no quotes, no metadata, no formatting. Just the raw text.";
    try {
        const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            input: [
                {role: "developer", content: systemMessage},
                {role: "user", content: input}
            ]
        });
        const output = response.output_text;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ output: output }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}