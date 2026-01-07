import ConfidenceBuilder from "./components/ConfidenceBuilder";
import LearningOutcomes from "./components/LearningOutcomes";
import PersonalizedEntry from "./components/PersonalizedEntry";
import WhyJoinGDG from "./components/WhyJoinGDG";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

/* Context Providers */
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

/* Core Layout & Utilities */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";

/* Home Page Sections */
import Hero from "./components/Hero";
import GDGJourney from "./components/GDGJourney";
import EventsTimeline from "./components/EventsTimeline";
import About from "./components/About";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Leaderboard from "./components/Leaderboard";
import Organizers from "./components/Organizers";
import FAQ from "./components/FAQ";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";

/* Pages */
import Team from "./components/Team";
import JoinTeam from "./components/JoinTeam";
import TeamEmails from "./components/TeamEmails";
import TeamDirectory from "./components/TeamDirectory";
import Blog from "./components/Blog";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Terms from "./components/Terms";
import CommunityGuidelines from "./components/CommunityGuidelines";
import EventDetails from "./components/EventDetails";
import FeedbackList from "./components/FeedbackList";
import EventGallery from "./components/EventGallery";
import ProjectSubmission from "./components/ProjectSubmission";
import HackathonJudging from "./components/HackathonJudging";
import TeamRegistration from "./components/TeamRegistration";
import RegisteredTeams from "./components/RegisteredTeams";
import WeeklyReport from "./components/WeeklyReport";
import WeeklyReportsList from "./components/WeeklyReportsList";
import NotFound from "./components/NotFound";

/* Codelab */
import CodelabTabs from "./components/CodelabTabs";
import GoogleCodelab from "./components/GoogleCodelab";
import CodelabLogin from "./components/CodelabLogin";
import CodelabDashboard from "./components/CodelabDashboard";

/* Page Transition Wrapper */
import PageTransition from "./components/PageTransition";

/* ---------------- HOME ---------------- */
const Home = () => (
  <>
    <Hero />
    <PersonalizedEntry />
    <WhyJoinGDG />
    <LearningOutcomes />
    <ConfidenceBuilder />
    <GDGJourney />
    <EventsTimeline />
    <About />
    <Events />
    <Gallery preview />
    <Projects preview />
    <Leaderboard preview />
    <Organizers />
    <FAQ />
    <Newsletter />
    <Contact />
  </>
);

/* ---------------- ROUTES ---------------- */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/events/gallery/:id" element={<PageTransition><EventGallery /></PageTransition>} />
        <Route path="/events/:id" element={<PageTransition><EventDetails /></PageTransition>} />
        <Route path="/events/:id/feedback" element={<PageTransition><FeedbackList /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/submit-idea" element={<PageTransition><ProjectSubmission /></PageTransition>} />
        <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/join" element={<PageTransition><JoinTeam /></PageTransition>} />
        <Route path="/team-directory" element={<PageTransition><TeamDirectory /></PageTransition>} />
        <Route path="/emails" element={<PageTransition><TeamEmails /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-and-conditions" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/community-guidelines" element={<PageTransition><CommunityGuidelines /></PageTransition>} />
        <Route path="/hackathon-judging" element={<PageTransition><HackathonJudging /></PageTransition>} />
        <Route path="/register-team" element={<PageTransition><TeamRegistration /></PageTransition>} />
        <Route path="/registered-teams" element={<PageTransition><RegisteredTeams /></PageTransition>} />
        <Route path="/weekly-update" element={<PageTransition><WeeklyReport /></PageTransition>} />
        <Route path="/team-performance" element={<PageTransition><WeeklyReportsList /></PageTransition>} />

        {/* Codelab */}
        <Route path="/codelab/:id" element={<PageTransition><GoogleCodelab /></PageTransition>} />
        <Route path="/codelabs/login" element={<PageTransition><CodelabLogin /></PageTransition>} />
        <Route path="/codelabs" element={<PageTransition><CodelabDashboard /></PageTransition>} />
        <Route path="/CodelabTab" element={<PageTransition><CodelabTabs /></PageTransition>} />

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

/* ---------------- LAYOUT ---------------- */
const Layout = ({ children }) => {
  const location = useLocation();
  const isCodelabApp =
    location.pathname.startsWith("/codelab") ||
    location.pathname.startsWith("/codelabs");

  return (
    <div className="App">
      {!isCodelabApp && <ScrollProgress />}
      {!isCodelabApp && <Navbar />}
      <ScrollToTop />
      {children}
      {!isCodelabApp && <Footer />}
      {!isCodelabApp && <BackToTop />}
    </div>
  );
};

/* ---------------- APP ---------------- */
function App() {
  const [loading, setLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);

  const launchDate = new Date("Dec 16, 2025 11:35:00");

  useEffect(() => {
    const checkLaunchStatus = () => {
      const now = new Date();
      const bypass = new URLSearchParams(window.location.search).get("bypass");
      setIsLaunched(now >= launchDate || bypass === "true");
    };

    checkLaunchStatus();
    const interval = setInterval(checkLaunchStatus, 1000);

    if (!loading) {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 100,
      });
    }

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!loading && isLaunched) {
      setTimeout(() => AOS.refresh(), 500);
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
//Force HMR update