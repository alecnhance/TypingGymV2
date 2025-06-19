import db from '../../db.js';
import { notifyUser } from '../../server.js';

export async function handleUserPost(req, res) {
    console.log("In USER POST");
    const userId = req.auth?.userId;
    
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    let body = '';
    for await (const chunk of req) {
        body += chunk;
    }

    try {
        const data = JSON.parse(body);
        const keyDict = data.keyDict;

        const promptCompletionInsert = await db.query(
            `INSERT INTO typed_prompts (user_id, started_at, ended_at, total_chars, wpm, accuracy)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [userId, data.start, data.end, data.numChars, data.wpm, data.acc]
        );
        
        const promptId = promptCompletionInsert.rows[0]?.id;
        if (!promptId) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Insert into prompts failed'}));
            return;
        }
        const values = [];
        const placeholders = [];
        let i = 0;

        for (const [key, stats] of Object.entries(keyDict)) {
            values.push(promptId, key, stats.total, stats.correct);
            placeholders.push(`($${++i}, $${++i}, $${++i}, $${++i})`)
        }

        const keyInsert = await db.query(
            `INSERT into key_accuracy_per_prompt (typed_prompt_id, key, total_presses, correct_presses)
                VALUES ${placeholders.join(', ')}`, values
        )
        if (keyInsert.rowCount === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Insert into key_accuracy failed' }));
            return;
        }

        notifyUser(userId, { type: 'keyAccuracyUpdated' });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(keyInsert.rows[0]));
    } catch (error) {
        console.error('Error updating user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}