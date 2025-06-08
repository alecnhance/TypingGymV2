// authMiddleware.js
import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export async function clerkAuth(req, res) {
  try {
    // Extract JWT from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized - Missing token' }));
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = await clerk.verifyToken(token); // Verify JWT
    return { userId: decoded.sub }; // Attach user ID
  } catch (error) {
    console.error('Auth error:', error);
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid token' }));
    return null;
  }
}