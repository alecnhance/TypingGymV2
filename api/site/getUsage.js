import db from '../../db.js';

export async function handleGetUsage(req, res) {
    try {
        const result = await db.query(
            `select
                (select sum(total_chars) / 5 from typed_prompts) as total_words,
                (select count(*) from typer) as num_users,
                (
                    select count(*)
                    from typed_prompts
                    where isdaily = true
                        and (ended_at AT TIME ZONE 'America/New_York')::date
                            = (now() AT TIME ZONE 'America/New_York')::date
                ) as daily_challengers,
                (
                    select array_agg(pic_url)
                    from (
                        select pic_url
                        from typer
                        where pic_url is not null
                        order by random()
                        limit 3
                    ) t
                ) as random_pics`
        , []);
        if (!result.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'No usage data found' }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: result.rows[0] }));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}