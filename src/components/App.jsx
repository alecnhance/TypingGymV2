import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Practice from '../pages/Practice';
import Stats from '../pages/Stats';
import UserPage from "../pages/UserPage";
import SignInPage from "../pages/SignIn";
import '../styles/App.css';

// 1. AuthLayout Component
const AuthLayout = () => {
  const { isSignedIn } = useAuth(); // From Clerk
  
  return isSignedIn ? (
    <>
      <Header /> 
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/landing" replace />
  );
};

// 2. App Component
const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <Router>
      <div className="flex flex-col">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isSignedIn ? <Navigate to="/home" replace /> : <SignInPage/>} />
          <Route path="/signIn" element={<SignInPage />} />
          
          {/* Protected Routes Group */}
          <Route element={<AuthLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/user" element={<UserPage />}/>
            <Route path="/practice" element={<Practice />}/>
          </Route>
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );

};

export default App;