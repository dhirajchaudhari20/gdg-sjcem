import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import CommunityGuidelines from './components/CommunityGuidelines';
import Team from './components/Team';
import JoinTeam from './components/JoinTeam';
import TeamEmails from './components/TeamEmails';
import Projects from './components/Projects';
import Leaderboard from './components/Leaderboard';
import FAQ from './components/FAQ';
import TeamDirectory from './components/TeamDirectory';
import Blog from './components/Blog';
import Newsletter from './components/Newsletter';
import EventDetails from './components/EventDetails';
import FeedbackList from './components/FeedbackList';
import EventGallery from './components/EventGallery';
import ProjectSubmission from './components/ProjectSubmission';
import PageTransition from './components/PageTransition';
import CodelabTabs from './components/CodelabTabs';
import GoogleCodelab from './components/GoogleCodelab';
import CodelabLogin from './components/CodelabLogin';
import CodelabDashboard from './components/CodelabDashboard';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import HackathonJudging from './components/HackathonJudging';
import TeamRegistration from './components/TeamRegistration';
import RegisteredTeams from './components/RegisteredTeams';
import WeeklyReport from './components/WeeklyReport';
import WeeklyReportsList from './components/WeeklyReportsList';

const Home = () => (
  <>
    <Hero />
    <Newsletter />
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/organizers" element={<PageTransition><Organizers /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />

        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/events/gallery/:id" element={<PageTransition><EventGallery /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-and-conditions" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/community-guidelines" element={<PageTransition><CommunityGuidelines /></PageTransition>} />
        <Route path="/join" element={<PageTransition><JoinTeam /></PageTransition>} />
        <Route path="/team-directory" element={<PageTransition><TeamDirectory /></PageTransition>} />
        <Route path="/emails" element={<PageTransition><TeamEmails /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/events/:id" element={<PageTransition><EventDetails /></PageTransition>} />
        <Route path="/events/:id/feedback" element={<PageTransition><FeedbackList /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/submit-idea" element={<PageTransition><ProjectSubmission /></PageTransition>} />
        <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
        <Route path="/hackathon-judging" element={<PageTransition><HackathonJudging /></PageTransition>} />
        <Route path="/register-team" element={<PageTransition><TeamRegistration /></PageTransition>} />
        <Route path="/registered-teams" element={<PageTransition><RegisteredTeams /></PageTransition>} />
        <Route path="/weekly-update" element={<PageTransition><WeeklyReport /></PageTransition>} />
        <Route path="/team-performance" element={<PageTransition><WeeklyReportsList /></PageTransition>} />

        {/* Codelab Routes */}
        <Route path="/codelab/:id" element={<PageTransition><GoogleCodelab /></PageTransition>} />
        <Route path="/codelab/techsprint" element={<PageTransition><GoogleCodelab /></PageTransition>} /> {/* Keep for backward compat if needed, but GoogleCodelab handles default */}
        <Route path="/CodelabTab" element={<PageTransition><CodelabTabs /></PageTransition>} />

        {/* Auth & Dashboard Routes */}
        <Route path="/codelabs/login" element={<PageTransition><CodelabLogin /></PageTransition>} />
        <Route path="/codelabs" element={<PageTransition><CodelabDashboard /></PageTransition>} />

        {/* 404 Route - Must be last */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence >
  );
};

// Layout component to handle conditional rendering of global elements
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide globals for codelab views AND dashboard views to keep them clean/app-like
  const isCodelabApp = location.pathname.startsWith('/codelab') || location.pathname.startsWith('/codelabs');

  return (
    <div className="App">
      {!isCodelabApp && <ScrollProgress />}
      {!isCodelabApp && <Navbar />}
      <ScrollToTop />
      {children}
      {(location.pathname === '/' || location.pathname === '/contact') && <Footer />}
      {!isCodelabApp && <BackToTop />}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);

  // Launch Date: Dec 16, 2025 11:35:00
  const launchDate = new Date('Dec 16, 2025 11:35:00');

  useEffect(() => {
    const checkLaunchStatus = () => {
      const now = new Date();
      const searchParams = new URLSearchParams(window.location.search);
      const bypass = searchParams.get('bypass');

      if (now >= launchDate || bypass === 'true') {
        setIsLaunched(true);
      } else {
        setIsLaunched(false);
      }
    };

    checkLaunchStatus();
    const interval = setInterval(checkLaunchStatus, 1000);

    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && isLaunched) {
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }
  }, [loading, isLaunched]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {loading && <Preloader onFinish={() => setLoading(false)} />}
          {!loading && (
            <Layout>
              <AnimatedRoutes />
            </Layout>
          )}
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
// Force HMR update
