import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Practice from '../pages/Practice';
import UserPage from '../pages/UserPage';
import '../styles/App.css';

const App = () => {

  return (
    <Router>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/userpage" element={<UserPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
