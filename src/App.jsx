import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import ProjectSubmission from './components/ProjectSubmission';
import PageTransition from './components/PageTransition';

import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';

const Home = () => (
  <>
    <Hero />
    <About />
    <Events />
    <Projects preview={true} />
    <Leaderboard preview={true} />
    <Organizers />
    <FAQ />
    <Newsletter />
    <Contact />
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-and-conditions" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/community-guidelines" element={<PageTransition><CommunityGuidelines /></PageTransition>} />
        <Route path="/join" element={<PageTransition><JoinTeam /></PageTransition>} />
        <Route path="/team-directory" element={<PageTransition><TeamDirectory /></PageTransition>} />
        <Route path="/emails" element={<PageTransition><TeamEmails /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/events/:id" element={<PageTransition><EventDetails /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/submit-idea" element={<PageTransition><ProjectSubmission /></PageTransition>} />
        <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100,
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        AOS.refresh();
      }, 500); // Slight delay to Ensure DOM is ready after transition
    }
  }, [loading]);

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          {loading && <Preloader onFinish={() => setLoading(false)} />}
          {!loading && (
            <>
              <ScrollProgress />
              <Navbar />
              <ScrollToTop />
              <AnimatedRoutes />
              <Footer />
              <BackToTop />
            </>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

// Force HMR update
