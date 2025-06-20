import db from '../../db.js';

export async function handleGetSummary(req, res) {
    const userId = req.auth?.userId;
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized for summary' }));
    }
    try {
        const result = await db.query(
            `WITH recent_wpms AS (
                SELECT wpm
                FROM typed_prompts
                WHERE user_id = $1
                ORDER BY ended_at DESC
                LIMIT 100
              )
              
              SELECT 
                SUM(total_chars) AS tot_chars,
                COUNT(*) AS num_prompts,
                to_char(creation_date, 'YYYY-MM-DD') as creation_date,
                COUNT(*) FILTER (WHERE isDaily) AS daily_challenges,
                (SELECT round(AVG(wpm)) FROM recent_wpms) AS avg_recent_wpm
              FROM typer 
              JOIN typed_prompts ON typer.clerk_id = typed_prompts.user_id
              WHERE user_id = $1
              GROUP BY clerk_id, creation_date`,
              [userId]
        );
        if (!result?.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application.json' });
            res.end(JSON.stringify({ error: 'Could not find summary stats for user' }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows[0] }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Database server error' }));
    }
}