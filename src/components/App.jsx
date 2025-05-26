import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth, ClerkLoaded } from '@clerk/clerk-react';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Practice from '../pages/Practice';
import Stats from '../pages/Stats';
import UserPage from "../pages/UserPage";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import Landing from "../pages/Landing";
import FreeTyping from './landing_components/FreeTyping';
import '../styles/App.css';
import LandingHeader from './landing_components/LandingHeader';

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

const UnsignedLayout = () => {
  return (
    <>
      <LandingHeader />
      <Outlet />
      <Footer/>
    </>
  );
}

// 2. App Component
const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <Router>
      <ClerkLoaded>
        <div className="flex flex-col">
          <Routes>
            <Route element={<UnsignedLayout />}>
              <Route path="/" element={isSignedIn ? <Navigate to="/home" replace /> : <Landing/>} />
              <Route path="/freeTyping" element={<FreeTyping />} />
            </Route>
            
            <Route path="/signIn" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            
            <Route element={<AuthLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/user" element={<UserPage />}/>
              <Route path="/practice" element={<Practice />}/>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </ClerkLoaded>
    </Router>
  );

};

export default App;