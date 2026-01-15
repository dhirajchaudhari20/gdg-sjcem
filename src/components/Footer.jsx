import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <footer id="contact" className={`footer ${isHomePage ? 'home-footer' : ''}`}>
            <div className="container">
                <div className="footer-top">
                    <div className="footer-col" data-aos="fade-up" data-aos-delay="100">
                        <div className="footer-logo-wrapper" style={{ marginLeft: '-5px' }}>
                            <img src="/gdg-sjc-logo.png" alt="GDG on Campus SJCEM" className="footer-logo-img" />
                        </div>
                        <p className="footer-desc">
                            St. John College of Engineering and Management (Autonomous), Palghar.
                        </p>
                        <div className="social-links">
                            <a href="https://www.instagram.com/gdg_sjcem/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://www.linkedin.com/company/gdsc-sjcem/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </a>
                            <a href="https://chat.whatsapp.com/JluIHbhKjkQDKs6tzuOad8" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp Community">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#about">About GDG</a></li>
                            <li><a href="#events">Upcoming Events</a></li>
                            <li><a href="#organizers">Organizers</a></li>
                            <li><a href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/" target="_blank" rel="noopener noreferrer">Community Page</a></li>
                            <li><Link to="/weekly-update">Team Weekly Report</Link></li>
                            <li><Link to="/team-performance">Performance Monitor</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
                        <h4 className="footer-heading">Legal</h4>
                        <ul className="footer-links">
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
                            <li><a href="#">Code of Conduct</a></li>
                        </ul>
                    </div>

                    {isHomePage && (
                        <div className="footer-col newsletter-col" data-aos="fade-up" data-aos-delay="400">
                            <h4 className="footer-heading">Stay Updated 🚀</h4>
                            <p className="footer-desc" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                                Get the latest updates on events and hackathons.
                            </p>
                            <form className="newsletter-form" onSubmit={(e) => {
                                e.preventDefault();
                                alert("Thanks for subscribing! We'll keep you posted.");
                                e.target.reset();
                            }}>
                                <div className="input-group">
                                    <input type="email" placeholder="Enter your email" required />
                                    <button type="submit" className="btn-subscribe">
                                        <span className="icon">➤</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className="footer-bottom" data-aos="fade-up" data-aos-delay="400">
                    <p>&copy; {new Date().getFullYear()} GDG on Campus SJCEM. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/community-guidelines">Community Guidelines</Link>
                    </div>
                </div>
                {/* Deployment Verification */}
                <div style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '10px' }}>
                    Last Updated: {typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'Local Dev'}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
