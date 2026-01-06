# 🏋️ Typing Gym

> **A full-stack typing practice platform with gamification, real-time analytics, and social features**

## 🌐 **Live Application**

### **[👉 Try Typing Gym Now 👈](https://typinggymv2-production.up.railway.app/home)**

**Production URL:** https://typinggymv2-production.up.railway.app/home

---

## 📋 Overview

**Typing Gym** is a comprehensive, production-ready typing practice application that combines real-time performance tracking, gamification elements, and social features to help users improve their typing skills. Built with modern web technologies, the platform offers a complete typing experience from practice sessions to detailed analytics and competitive challenges.

## ✨ Key Features

### 🎯 **Core Functionality**
- **Customizable Typing Practice** - Practice with Random words, Jumble mode, or AI-generated prompts
- **Daily Challenges** - Compete in daily typing challenges with community leaderboards
- **Real-time Performance Tracking** - Live WPM (Words Per Minute) and accuracy calculations
- **Comprehensive Statistics Dashboard** - Track progress with detailed analytics

### 📊 **Analytics & Insights**
- **WPM Time-Series Graphs** - Visualize typing speed improvements over time using Chart.js
- **Typing Calendar** - Heatmap visualization of practice frequency
- **Key Accuracy Heatmap** - Interactive keyboard visualization showing accuracy per key
- **Summary Statistics** - Total practice time, average WPM, best WPM, and more

### 🏆 **Gamification**
- **Achievement System** - 20+ unlockable achievements for milestones (Speed Demon, Perfect Accuracy, Consistency Master, etc.)
- **Streak Tracking** - Daily practice streaks with visual indicators
- **Leaderboards** - Daily challenge rankings and community statistics
- **Activity Feed** - Recent typing sessions and accomplishments

### 👥 **Social & Community Features**
- **Community Graph** - Real-time visualization of community activity and average WPM
- **Daily Challenge Leaderboard** - See how you rank against other users
- **User Profiles** - Personalized profiles with statistics and achievements

### 🎨 **User Experience**
- **Modern, Responsive UI** - Built with TailwindCSS and Framer Motion animations
- **Smooth Animations** - Polished interactions and transitions throughout
- **Dark Theme** - Eye-friendly dark mode interface
- **Mobile-Responsive** - Works seamlessly across desktop and mobile devices

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Latest React with modern hooks and patterns
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **Chart.js & Recharts** - Data visualization libraries
- **React Router v7** - Client-side routing
- **Material-UI** - Component library for enhanced UI elements

### **Backend**
- **Node.js** - Native HTTP server (no Express overhead)
- **PostgreSQL** - Robust relational database
- **Clerk** - Enterprise-grade authentication and user management
- **Svix** - Webhook verification for secure event handling

### **Infrastructure & Deployment**
- **Railway** - Production deployment platform
- **WebSockets** - Real-time communication support (infrastructure ready)
- **RESTful API** - Well-structured API endpoints
- **CORS** - Properly configured for production

## 🏗️ Architecture

### **Frontend Architecture**
- Component-based React architecture with custom hooks
- Separation of concerns: pages, components, hooks, and utilities
- Custom hooks for data fetching and state management
- Context API for global state (user context)

### **Backend Architecture**
- Lightweight Node.js HTTP server
- RESTful API design with clear route structure
- Middleware-based authentication using Clerk
- Webhook handlers for user lifecycle events
- Database abstraction layer

### **Database Schema**
- **typed_prompts** - Core typing session data
- **key_accuracy_per_prompt** - Per-key accuracy tracking
- **Achievement tracking** - User milestone data
- **Daily challenge data** - Challenge submissions and leaderboards

## 📁 Project Structure

```
typing-gym/
├── api/                    # Backend API route handlers
│   ├── daily/             # Daily challenge endpoints
│   ├── practice/          # Practice session endpoints
│   ├── site/              # Site-wide statistics
│   └── users/             # User-specific endpoints
├── handlers/              # User lifecycle event handlers
├── webhooks/              # Clerk webhook handlers
├── src/
│   ├── components/        # React components
│   │   ├── home_components/    # Home page widgets
│   │   ├── landing_components/ # Landing page components
│   │   ├── stat_components/    # Statistics dashboard components
│   │   └── typing_area_comp/   # Typing interface components
│   ├── hooks/             # Custom React hooks
│   ├── pages/              # Page components
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── server.js              # Node.js HTTP server
└── db.js                  # PostgreSQL client
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alecnhance/TypingGymV2.git
cd TypingGymV2/typing-gym
npm install
```

2. **Configure environment variables**
Create a `.env` file in the project root:
```bash
# Database
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DB_NAME

# Clerk Authentication
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

3. **Set up the database**
Run the SQL schema to create necessary tables (see Database section below).

4. **Start the development servers**

Terminal 1 - Backend:
```bash
node server.js
```

Terminal 2 - Frontend:
```bash
npm run dev
```

5. **Open the application**
Navigate to `http://localhost:5173`

## 📊 API Endpoints

### Public Endpoints
- `GET /api/daily/prompt` - Get today's daily challenge prompt
- `GET /api/daily/getDailyLeaders` - Get daily challenge leaderboard
- `GET /api/site/usage` - Get site-wide usage statistics
- `GET /api/practice/getGeneratedPrompt` - Generate AI typing prompt

### Authenticated Endpoints
- `GET /api/users/me` - Get authenticated user profile
- `POST /api/users/me` - Submit completed typing session
- `GET /api/users/me/keyAccuracy` - Get per-key accuracy statistics
- `GET /api/users/me/dates` - Get practice dates for calendar
- `GET /api/users/me/wpmGraph` - Get WPM time-series data
- `GET /api/users/me/summaryStats` - Get summary statistics
- `GET /api/users/me/daily` - Get user's daily challenge status
- `GET /api/users/me/achievements` - Get user achievements
- `GET /api/users/me/activity` - Get recent activity
- `GET /api/daily/stats` - Get daily challenge statistics

### Webhooks
- `POST /webhooks/clerk` - Clerk user lifecycle webhooks

## 🗄️ Database Schema

```sql
-- Core typing sessions
CREATE TABLE typed_prompts (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ NOT NULL,
  total_chars INTEGER NOT NULL,
  wpm NUMERIC NOT NULL,
  accuracy NUMERIC NOT NULL
);

-- Per-key accuracy tracking
CREATE TABLE key_accuracy_per_prompt (
  id SERIAL PRIMARY KEY,
  typed_prompt_id INTEGER NOT NULL REFERENCES typed_prompts(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  total_presses INTEGER NOT NULL,
  correct_presses INTEGER NOT NULL
);
```

## 🔐 Authentication

The application uses **Clerk** for authentication:
- Secure JWT-based authentication
- Protected API routes with Bearer token validation
- User profile management
- Webhook integration for user lifecycle events

All protected endpoints require an `Authorization: Bearer <JWT>` header.

## 🎯 Key Accomplishments

- ✅ **Full-stack application** - Complete frontend and backend implementation
- ✅ **Production deployment** - Live on Railway with proper CORS and security
- ✅ **Real-time analytics** - Comprehensive data visualization and tracking
- ✅ **Gamification system** - Achievement system with 20+ milestones
- ✅ **Social features** - Leaderboards and community statistics
- ✅ **Modern UI/UX** - Polished interface with animations and responsive design
- ✅ **Scalable architecture** - Clean code structure and separation of concerns
- ✅ **Performance optimized** - Efficient data fetching and state management
- ✅ **Type-safe patterns** - Well-structured React components and hooks

## 📈 Performance Features

- Optimized re-renders with React hooks
- Efficient database queries with proper indexing
- Lazy loading and code splitting ready
- Responsive design for all screen sizes
- Fast API responses with native Node.js HTTP

## 🔮 Future Enhancements

- WebSocket integration for real-time multiplayer typing races
- Additional practice modes (code typing, programming languages)
- Social features (friends, challenges, sharing)
- Mobile app version
- Advanced analytics and insights

## 📝 Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📄 License

ISC

## 👤 Author

Built with ❤️ by [alecnhance](https://github.com/alecnhance)

---

**⭐ If you find this project interesting, please consider giving it a star!**
