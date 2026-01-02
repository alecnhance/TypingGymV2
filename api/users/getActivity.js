import db from '../../db.js';

export async function handleGetActivity(req, res) {
    const userId = req.auth?.userId;
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    try {
        const result = await db.query(
            `select
                (
                    select ended_at AT TIME ZONE 'America/New_York'
                    from typed_prompts
                    where user_id = $1
                    order by wpm desc
                    limit 1
                ) as pr,
                (
                    select ended_at AT TIME ZONE 'America/New_York'
                    from typed_prompts
                    where user_id = $1
                    order by accuracy desc
                    limit 1
                ) as lastPerfect,
                (
                    select ended_at AT TIME ZONE 'America/New_York'
                    from typed_prompts
                    where user_id = $1
                    and isdaily = true
                    order by ended_at desc
                    limit 1
                ) as lastDaily,
                (
                    select MAX(wpm)
                    from typed_prompts
                    where user_id = $1
                ) as maxWpm`,
            [userId]
        );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows[0] }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}