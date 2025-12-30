import db from '../../db.js';

export async function handleGetDailyLeaders(req, res) {
    try {
        const result = await db.query(
            `select tp.user_id, tp.wpm, tp.isDaily, u.username, u.pic_url
            from typed_prompts tp join typer u on tp.user_id = u.clerk_id
            where (tp.started_at AT TIME ZONE 'America/New_York')::date = (now() AT TIME ZONE 'America/New_York')::date
            order by tp.wpm desc
            limit 10`,
            []
        );
        if (!result.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No prompts completed today yet' }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}