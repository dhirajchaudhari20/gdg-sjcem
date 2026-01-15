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
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to determine if link is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return 'active';
    if (path !== '/' && location.pathname.startsWith(path)) return 'active';
    return '';
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="/gdg-sjc-logo.png" alt="Google Developer Group on Campus SJCEM" className="logo-img" />
          </motion.div>
        </Link>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link>
          <Link to="/about" className={isActive('/about')} onClick={closeMenu}>About</Link>
          <Link to="/events" className={isActive('/events')} onClick={closeMenu}>Events</Link>
          <Link to="/codelabs" className={isActive('/codelabs')} onClick={closeMenu}>Codelabs</Link>
          <Link to="/projects" className={isActive('/projects')} onClick={closeMenu}>Projects</Link>
          <Link to="/leaderboard" className={isActive('/leaderboard')} onClick={closeMenu}>Ranking</Link>
          <Link to="/gallery" className={isActive('/gallery')} onClick={closeMenu}>Gallery</Link>
          <Link to="/blog" className={isActive('/blog')} onClick={closeMenu}>Blog</Link>
          <Link to="/team" className={isActive('/team')} onClick={closeMenu}>Team</Link>
          <Link to="/organizers" className={isActive('/organizers')} onClick={closeMenu}>Organizers</Link>
          <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Contact</Link>

          <a
            href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary join-btn"
            onClick={closeMenu}
          >
            Join Chapter
          </a>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
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
