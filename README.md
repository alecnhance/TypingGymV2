# Typing Gym

A modern typing practice app with progress tracking, daily challenges, and detailed stats (WPM graph, typing calendar, key accuracy). Built with React + Vite on the frontend and a lightweight Node HTTP server + Postgres on the backend, secured with Clerk authentication.

## Project status
- The database is currently offline to avoid hosting costs.
- Affected: sign-in, saving progress, stats/history/graphs, any user-specific data.
- Still works: the frontend UI and local/demo interactions.
- If you see "Network/500" errors, it's because the API depends on the database.

## Tech Stack
- **Frontend**: React 19, Vite, TailwindCSS, Recharts, Chart.js
- **Backend**: Node (native `http`), Postgres (`pg`)
- **Auth**: Clerk (`@clerk/clerk-react`, `@clerk/clerk-sdk-node`)
- **Webhooks**: Svix (for Clerk webhooks)

## Features
- **Typing practice** with accuracy and WPM tracking
- **Stats dashboard**: WPM over time, typing calendar, key accuracy
- **Daily challenge** and community distribution graph
- **User profiles** powered by Clerk

## Getting Started

### Prerequisites
- Node.js 18+
- Postgres database
- A Clerk application (to obtain publishable and secret keys)

### 1) Clone and install
```bash
git clone https://github.com/alecnhance/TypingGymV2.git
cd TypingGymV2/typing-gym
npm install
```

### 2) Configure environment
Create a `.env` file in the project root with:
```bash
# Postgres connection string
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME

# Clerk
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Frontend (Vite)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

- The frontend reads `VITE_CLERK_PUBLISHABLE_KEY` in `src/main.jsx`.
- The backend uses `CLERK_SECRET_KEY` for verifying JWTs and `CLERK_WEBHOOK_SECRET` for webhook verification.
- The DB client reads `DATABASE_URL` from `db.js`.

### 3) Run the app (two terminals)
- Terminal A: start the backend server (port `3000`)
```bash
node server.js
```
- Terminal B: start the Vite dev server (port `5173`)
```bash
npm run dev
```

Open the app at `http://localhost:5173`.

Notes:
- `vite.config.js` proxies `/api` and `/webhooks` to `http://localhost:3000`.
- `server.js` sets CORS to allow `http://localhost:5173` in development.

## Database
This project expects at least the following tables (inferred from usage):
```sql
-- Core typing sessions
CREATE TABLE IF NOT EXISTS typed_prompts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  total_chars INTEGER NOT NULL,
  wpm NUMERIC NOT NULL,
  accuracy NUMERIC NOT NULL
);

-- Per-key accuracy for each session
CREATE TABLE IF NOT EXISTS key_accuracy_per_prompt (
  id SERIAL PRIMARY KEY,
  typed_prompt_id INTEGER NOT NULL REFERENCES typed_prompts(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  total_presses INTEGER NOT NULL,
  correct_presses INTEGER NOT NULL
);
```
Adjust types/indexes as needed for your environment.

## Authentication
All protected API routes expect a **Bearer** token from Clerk. On the frontend, you can obtain a token via `useAuth().getToken()` and send it in the `Authorization` header.

## API Overview (dev URLs)
Base URL: `http://localhost:3000`

All endpoints below require `Authorization: Bearer <JWT>` unless stated.

- `GET /api/users/me` — returns the authenticated user profile/data used by the app
- `POST /api/users/me` — submits a completed typing session
  - Body example:
    ```json
    {
      "start": "2025-01-01T12:00:00.000Z",
      "end": "2025-01-01T12:01:00.000Z",
      "numChars": 250,
      "wpm": 70,
      "acc": 96,
      "keyDict": { "a": { "total": 10, "correct": 9 } }
    }
    ```
- `GET /api/users/me/keyAccuracy` — key accuracy stats aggregated for the user
- `GET /api/users/me/dates` — practice dates for the typing calendar
- `GET /api/users/me/wpmGraph` — time-series WPM data
- `GET /api/users/me/summaryStats` — summary metrics for the dashboard
- `POST /webhooks/clerk` — Clerk webhook endpoint (no auth; verified via `CLERK_WEBHOOK_SECRET`)

Example request (replace `TOKEN` with a valid Clerk JWT):
```bash
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/users/me/wpmGraph
```

## Development Notes
- Frontend config lives under `src/` (entry `src/main.jsx`, app root `src/components/App.jsx`)
- Backend is a minimal server in `server.js` using Node’s built-in `http` module
- CORS is set to allow `http://localhost:5173`; update for production as needed
- WebSockets provider exists but is currently commented out in `src/main.jsx`

## Scripts
```bash
npm run dev      # Start Vite dev server
npm run build    # Build frontend assets
npm run preview  # Preview production build
npm run lint     # Lint
```

## Project Structure (partial)
```
typing-gym/
  api/                # Backend API route handlers
  webhooks/           # Clerk webhook handler
  handlers/           # User lifecycle handlers (created/updated/deleted)
  src/                # Frontend React app
    components/
    hooks/
    pages/
    styles/
  server.js           # Node HTTP server (port 3000)
  db.js               # Postgres client (pg)
  vite.config.js      # Dev server + proxy config
```

## Deployment
- Provide production values for all env vars
- Update CORS in `server.js` to allow your deployed frontend URL
- Serve the built frontend (`npm run build`) via your preferred host and run the Node server (or containerize both)

## License
ISC
