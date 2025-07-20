import db from '../../db.js';

export async function handleGetKeyAcc(req, res) {
    //console.log("Getting key accuracy");
    const userID = req.auth?.userId;
    if (!userID) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }
    const trackedPresses = 100;
    //console.log("USERID: ", userID);
    try {
        const result = await db.query(
            `WITH key_presses AS (
                SELECT 
                  k.key,
                  k.correct_presses,
                  k.total_presses,
                  t.ended_at,
                  SUM(k.total_presses) OVER (
                    PARTITION BY k.key 
                    ORDER BY t.ended_at DESC, k.typed_prompt_id DESC
                    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
                  ) AS running_press_count
                FROM key_accuracy_per_prompt k
                JOIN typed_prompts t ON k.typed_prompt_id = t.id
                WHERE t.user_id = $1
              )
              SELECT 
                key,
                SUM(correct_presses)::DECIMAL / SUM(total_presses) AS accuracy
              FROM key_presses
              WHERE running_press_count <= $2
              GROUP BY key`,
              [userID, trackedPresses]
        )
        if (!result?.rows || result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "No accuracy data for user" }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows));
    } catch (err) {
        console.error("Error fetching user key accuracy", err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error when fetching user key accuracy' }));
    }
}