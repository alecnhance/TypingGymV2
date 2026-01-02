import http from 'http';
import webhookHandler from './webhooks/clerk.js';
import { handleUserData } from './api/users/getMe.js';
import { handleUserPost} from './api/users/postLogic.js';
import dotenv from 'dotenv';
import { parse } from 'url';
import { Clerk } from '@clerk/clerk-sdk-node';
import { clerkAuth } from './authMiddleware.js';
import { WebSocketServer } from 'ws';
import { handleGetKeyAcc } from './api/users/getKey.js';
import { addSeconds } from 'date-fns';
import { handleGetDates } from './api/users/getDates.js';
import { handleGetGraph } from './api/users/getGraph.js';
import { handleGetSummary } from './api/users/getSummary.js';
import { handleGetDaily } from './api/users/getDaily.js';
import { handleGetDailyStats } from './api/daily/getDailyStats.js';
import { handleGetDailyPrompt } from './api/daily/getDailyPrompt.js';
import { handleGetDailyLeaders } from './api/daily/getDailyLeaders.js';
import { handleGetAchievements } from './api/users/getAchievements.js';
import { handleGetActivity } from './api/users/getActivity.js';

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

const getPublicRoutes = {
  '/api/daily/prompt': handleGetDailyPrompt,
  '/api/daily/getDailyLeaders': handleGetDailyLeaders,
};

const getRoutes = {
  '/api/users/me': handleUserData,
  '/api/users/me/keyAccuracy': handleGetKeyAcc,
  '/api/users/me/dates': handleGetDates,
  '/api/users/me/wpmGraph': handleGetGraph,
  '/api/users/me/summaryStats': handleGetSummary,
  '/api/users/me/daily': handleGetDaily,
  '/api/daily/stats': handleGetDailyStats,
  '/api/users/me/achievements': handleGetAchievements,
  '/api/users/me/activity': handleGetActivity,
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

  if (req.method === 'GET' && getPublicRoutes[pathname]) {
    return getPublicRoutes[pathname](req, res);
  }

  if (req.method === 'GET' && getRoutes[pathname]) {
    const auth = await clerkAuth(req, res);
    if (!auth) return;
    req.auth = auth;
    return getRoutes[pathname](req, res);
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

// const wss = new WebSocketServer({ server });
// const userSockets = new Map();

// wss.on('connection', (ws) => {
//   console.log("New client connected");

//   ws.send(JSON.stringify({ type: 'connected', message: 'Welcome'}));

//   ws.on('message', (data) => {
//     const msg = JSON.parse(data);
//     console.log('Received from client', msg);
//     if (msg.type === 'register' && msg.clerkId) {
//       userSockets.set(msg.clerkId, ws);
//       ws.clerkId = msg.clerkId;
//     }
//   })

//   ws.broadcast = (data) => {
//     wss.clients.forEach((client) => {
//       if (client.readyState === ws.OPEN) {
//         client.send(JSON.stringify(data));
//       }
//     });
//   };

//   ws.on('close', () => {
//     if (ws.clerkId) {
//       userSockets.delete(ws.clerkId);
//     }
//     console.log("client disconnected");
//   })
// });

// export function notifyUser(clerkId, payload) {
//   const ws = userSockets.get(clerkId);
//   if (ws && ws.readyState === ws.OPEN) {
//     ws.send(JSON.stringify(payload));
//   }
// }


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});