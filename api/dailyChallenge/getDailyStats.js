import db from '../../db.js';

export async function handleGetDailyStats(req, res) {
    const userId = req.auth?.userId;
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    try {
        const result = await db.query(
            `SELECT 
            CONCAT(FLOOR(wpm/10)*10, '-', FLOOR(wpm/10)*10 + 9) AS range,
            COUNT(*) AS count
          FROM typed_prompts
          WHERE isDaily = true 
          and (started_at AT TIME ZONE 'UTC')::date = (now() AT TIME ZONE 'UTC')::date
          GROUP BY FLOOR(wpm/10)
          ORDER BY FLOOR(wpm/10)`,
          []
        );
        if (!result.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Nothing returned for Daily Stats' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

