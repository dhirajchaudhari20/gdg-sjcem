import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      AOS.refresh();
    }
  }, [loading]);

  return (
    <Router>
      <div className="App">
        {loading && <Preloader onFinish={() => setLoading(false)} />}
        {!loading && (
          <>
            <ScrollProgress />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<Terms />} />
              <Route path="/community-guidelines" element={<CommunityGuidelines />} />
              <Route path="/join" element={<JoinTeam />} />
              <Route path="/team-directory" element={<TeamDirectory />} />
              <Route path="/emails" element={<TeamEmails />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
            <Footer />
            <BackToTop />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

// Force HMR update
