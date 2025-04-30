import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import Practice from '../pages/Practice';
import Stats from '../pages/Stats';
import '../styles/App.css';

const App = () => {

  return (
    <Router>
      <div className="flex flex-col">
        <Header />
        <main className="p-4 flex-grow min-h-screen bg-mainBackground">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
