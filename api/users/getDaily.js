import db from '../../db.js';

export async function handleGetDaily(req, res) {
    const userId = req.auth?.userId;
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    try {
        const result = await db.query(
            `select ended_at, wpm from typed_prompts
            where user_id = $1
            and isdaily = true order by ended_at desc`,
            [userId]
        );
        if (!result.rows) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Could not retrieve daily challenge status for user' }));
            return;
        }
        if (result.rows.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ rows: false }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ rows: true, data: result.rows }));
        }
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}