import db from '../../db.js';

export async function handleGetGraph(req, res) {
    const userId = req.auth?.userId;
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Unauthorized for getting graph" }));
        return;
    }
    try {
        const numPrompts = 50;
        const result = await db.query(
            ` WITH prompts as (SELECT 
                ended_at::DATE as day,
                AVG(wpm) OVER (
                    ORDER BY ended_at
                    ROWS BETWEEN $1 PRECEDING AND CURRENT ROW
                ) AS rolling_avg_wpm,
                ROW_NUMBER() OVER (PARTITION BY ended_at::DATE ORDER BY ended_at) as row
            FROM typed_prompts where user_id = $2)
            select distinct on (day) day, round(rolling_avg_wpm) as wpm, row
            from prompts
            order by day, row desc`,
            [numPrompts, userId]
        );
        if (!result?.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Could not find wpm data for user" }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error accessing database server' }));
    }
}