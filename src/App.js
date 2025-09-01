import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './HomePageComponent/HomePage';
import StoreSection from './StorePageComponent/StoreComponent';
import SummerCampPage from './SummerCamp/SummerCamp';
import FounderPage from './HomeNavPages/FromFounderPage/FounderPage'; // Import the new founder page
import ProgramOverviewPage from './ProgramNavPages/ProgramOverView';
import PrivateFencingLessonsPage from './ProgramNavPages/PrivateTutoring';
import PoliciesPage from './HomeNavPages/FromFounderPage/PolicyPage';
import FencingLinksPage from './HomeNavPages/FromFounderPage/FencingLinksPage';
import OptOutPage from './HomeNavPages/FromFounderPage/OptOutPage';
import YouthFencingPage from './ProgramNavPages/YouthFencing';
import AdultFencingPage from './ProgramNavPages/AdultFencing';
import { CartProvider } from './StorePageComponent/Cart/CartContex';
import ContactPage from './HomeNavPages/ContactPage'; // Import the contact page
import ParentsRoleSafetyPage from './ParentsPageComponets/SafetyAndParentsRole';
import CompetitiveEdgePage from './ProgramNavPages/CompetitiveTraining';
import NewFencersIntroPage from './ProgramNavPages/NewFencers';
import AlumniCollegeFencingSection from './ParentsPageComponets/AlumniAndCollegeFencing';
import AcademyAndAlumniPage from './ParentsPageComponets/AlumniAndCollegeFencing';
import HomeschoolPELandingPage from './ProgramNavPages/HomeSchool';

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
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        <div className="App">
          <ScrollToTop /> {/* This ensures pages load from top when navigating */}
          
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/policies" element={<PoliciesPage />}/>
            <Route path="/fencinglinks" element={<FencingLinksPage />}/>
            <Route path="/optout" element={<OptOutPage />}/>
            <Route path="/store" element={<StoreSection />} /> {/* Updated to use StoreContainer */}
            <Route path="/summercamp" element={<SummerCampPage />} />
            <Route path="/founder" element={<FounderPage />} />
            <Route path="/program" element={<ProgramOverviewPage />} />
            <Route path="/privateLessons" element={<PrivateFencingLessonsPage />} />
            <Route path="/youthFencing" element={<YouthFencingPage />} />
            <Route path="/adultFencing" element={<AdultFencingPage />} />
            <Route path="/contact" element={<ContactPage />} /> {/* Added contact page route */}
            <Route path="/safety" element={<ParentsRoleSafetyPage />} /> {/* Cart route for store */}
            <Route path='/competitiveEdge' element={<CompetitiveEdgePage/>}/>
            <Route path="/introClasses" element={<NewFencersIntroPage />} /> {/* Fallback to Home for undefined routes */}
            <Route path="/alumni" element={<AcademyAndAlumniPage />} />\
            <Route path="/homeschool-pe" element={<HomeschoolPELandingPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}


export default App;
