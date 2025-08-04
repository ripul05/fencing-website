import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './HomePageComponent/HomePage';
import StoreSection from './StorePageComponent/StoreComponent';

// Component to handle scroll to top on route change
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop /> {/* This ensures pages load from top when navigating */}
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<StoreSection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
