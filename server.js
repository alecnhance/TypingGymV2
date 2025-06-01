import http from 'http';
import webhookHandler from './routes/webhook.js';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    webhookHandler(req, res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running\n');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
