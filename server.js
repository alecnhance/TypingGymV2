import http from 'http';
import webhookHandler from './webhooks/clerk.js';
import { handleUserData } from './api/users/getMe.js';
import { handleUserPost} from './api/users/postLogic.js';
import dotenv from 'dotenv';
import { parse } from 'url';
import { Clerk } from '@clerk/clerk-sdk-node';
import { clerkAuth } from './authMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Clerk with your secret key
const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400', // 24 hours
};

const server = http.createServer(async (req, res) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Add CORS headers to all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const { pathname } = parse(req.url, true);

  // Skip auth for webhook endpoint
  if (req.method === 'POST' && pathname === '/webhooks/clerk') {
    return webhookHandler(req, res);
  }

  if (req.method === 'GET' && pathname === '/api/users/me') {
    const auth = await clerkAuth(req, res);
    if (!auth) {
      return;
    }
    req.auth = auth;
    return handleUserData(req, res);
  }

  if (req.method === 'POST' && pathname === '/api/users/me') {
    const auth = await clerkAuth(req, res);
    if (!auth) {
      return;
    }
    req.auth = auth;
    return handleUserPost(req, res);
  }

  // Handle unmatched routes
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});