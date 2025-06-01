import { Webhook } from 'svix';
import { userCreatedHandler } from '../handlers/userCreated.js';

export default function webhookHandler(req, res) {
    console.log("Webhook received!");
    let body = '';

    req.on('data', chunk => (body += chunk.toString()));

    req.on('end', async () => {
    try {
        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const event = wh.verify(body, {
        'svix-id': req.headers['svix-id'],
        'svix-timestamp': req.headers['svix-timestamp'],
        'svix-signature': req.headers['svix-signature']
        });

        if (event.type === 'user.created') {
        await userCreatedHandler(event.data);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
        } else {
        res.writeHead(200);
        res.end();
        }
    } catch (err) {
        console.error('Webhook error:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid Request' }));
    }
    });
}
