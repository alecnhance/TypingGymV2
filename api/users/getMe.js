import db from '../../db.js';

export async function handleUserData(req, res) {
    console.log('handleUserData');
    const userId = req.auth?.userId;
    
    if (!userId) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
    }

    try {
        const result = await db.query(
            'select * from typer where clerk_id = $1',
            [userId]
        );
        
        if (result.rows.length === 0) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User not found'}));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows[0]));
        console.log(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
}
