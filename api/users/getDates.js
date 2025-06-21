import db from "../../db.js";

export async function handleGetDates(req, res) {
    const userID = req.auth?.userId;
    if (!userID) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    try {
        const result = await db.query(
            `select ended_at as date from typed_prompts where user_id = $1`,
            [userID]
        );
        if (!result?.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User dates not found' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error accessing database for user dates' }));
    }
}