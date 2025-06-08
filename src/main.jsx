import './styles/index.css';
import App from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { UserProvider } from './UserContext.jsx';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={clerkPubKey}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </ClerkProvider>
  </React.StrictMode>
);
