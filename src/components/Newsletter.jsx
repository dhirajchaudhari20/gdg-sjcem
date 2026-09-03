import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send to SheetDB
        setSubmitted(true);
        setTimeout(() => {
            setEmail('');
            setSubmitted(false);
        }, 3000);
    };

    return (
        <section className="newsletter-section">
            <div className="newsletter-container" data-aos="zoom-in">
                <div className="newsletter-content">
                    <h2 className="newsletter-title">Stay in the Loop ⚡</h2>
                    <p className="newsletter-desc">
                        Get the latest updates on Hackathons, Study Jams, and Tech Talks delivered to your inbox.
                    </p>
                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="newsletter-input"
                        />
                        <button type="submit" className="newsletter-btn">
                            {submitted ? 'Subscribed! 🎉' : 'Subscribe'}
                        </button>
                    </form>
                </div>
                <div className="newsletter-glow"></div>
            </div>
        </section>
    );
};

export default Newsletter;
