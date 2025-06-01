import pg from 'pg';

import dotenv from 'dotenv';
dotenv.config();


const { Client } = pg;

const db = new Client({
  connectionString: process.env.DATABASE_URL
});

db.connect().catch(err => {
  console.error('Database connection error', err);
  process.exit(1);
});

export default db;
