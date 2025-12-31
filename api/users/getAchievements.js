import db from '../../db.js';

export async function handleGetAchievements(req, res) {
    const userId = req.auth?.userId;
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    try {
        const result = await db.query(
            `SELECT
            COUNT(*) AS total_prompts,
            MAX(wpm) AS max_wpm,
            COUNT(*) FILTER (WHERE accuracy = 100) AS perfect_accuracy_count,
            SUM(duration_seconds) AS total_duration_seconds,
            SUM(total_chars) AS total_chars,
            COUNT(*) FILTER (WHERE isdaily = true) AS daily_prompt_count
            FROM typed_prompts
            where user_id = $1`,
            [userId]
        );
        if (!result.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'Could not find achievements for user' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows[0] }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}