import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
      }
    };

    if (location.pathname !== '/') {
      setScrolled(true);
    } else {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/gdg-logo.png" alt="GDG Logo" className="logo-img" />
        </motion.div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="/#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#events" onClick={() => setMenuOpen(false)}>Events</a>
          <Link to="/codelabs" onClick={() => setMenuOpen(false)}>Codelabs</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Ranking</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/team" onClick={() => setMenuOpen(false)}>Team</Link>
          <a href="/#organizers" onClick={() => setMenuOpen(false)}>Organizers</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a
            href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary join-btn"
          >
            Join Chapter
          </a>

          {/* ====== DAY–NIGHT TOGGLE ====== */}
          <button
            className={`day-night-toggle ${theme === 'dark' ? 'night' : 'day'}`}
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            <div className="toggle-bg"></div>
            <div className="sun"></div>
            <div class="moon"></div>
          </button>
          {/* ====== END TOGGLE ====== */}

        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
