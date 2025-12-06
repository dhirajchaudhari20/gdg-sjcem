import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo">
          <img src="/gdg-logo.png" alt="GDG Logo" className="logo-img" />
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="/#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="/#events" onClick={() => setMenuOpen(false)}>Events</a>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Ranking</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/team" onClick={() => setMenuOpen(false)}>Team</Link>
          <a href="/#organizers" onClick={() => setMenuOpen(false)}>Organizers</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/" target="_blank" rel="noreferrer" className="btn btn-primary join-btn">Join Chapter</a>
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
