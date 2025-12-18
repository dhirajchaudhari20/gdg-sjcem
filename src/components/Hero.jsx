import React from 'react';
import Tilt from 'react-parallax-tilt';
import Typewriter from 'typewriter-effect';
import CountUp from './CountUp';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="contact-bg-animation" style={{ opacity: 0.5 }}>
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
                <div className="hero-video-wrapper">
                    <iframe
                        src="https://www.youtube.com/embed/9nVEfjmDlVk?autoplay=1&mute=1&controls=0&loop=1&playlist=9nVEfjmDlVk&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&start=10&vq=hd1080&enablejsapi=1"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Hero Background Video"
                    ></iframe>
                    <div className="hero-overlay"></div>
                </div>
            </div>
            <div className="container hero-content">
                <div className="hero-text">
                    <div
                        className="hero-badge"
                        data-aos="fade-down"
                        data-aos-delay="200"
                    >
                        ✨ Welcome to our community
                    </div>
                    <h1
                        className="hero-title"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        GDG on Campus SJCEM
                    </h1>
                    <div
                        className="hero-dynamic-text"
                        data-aos="fade-up"
                        data-aos-delay="350"
                        style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e3e3e3' }}
                    >
                        <Typewriter
                            options={{
                                strings: [
                                    'Google Developer Group',
                                    'Building the Future',
                                    'Innovating Together',
                                    'Learning & Growing'
                                ],
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 50,
                            }}
                        />
                    </div>
                    <p
                        className="hero-subtitle"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        St. John College of Engineering and Management (Autonomous) <br /> Palghar, India
                    </p>
                    <div
                        className="hero-stats"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div className="stat-item">
                            <span className="stat-number"><CountUp end={1172} suffix="+" /></span>
                            <span className="stat-label">Group Members</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number"><CountUp end={4} suffix="+" /></span>
                            <span className="stat-label">Events Hosted</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number"><CountUp end={2000} suffix="+" /></span>
                            <span className="stat-label">Participants</span>
                        </div>
                    </div>
                    <div
                        className="hero-actions"
                        data-aos="zoom-in"
                        data-aos-delay="600"
                    >
                        <a href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/" target="_blank" rel="noopener noreferrer" className="btn btn-primary hero-btn">Join Chapter</a>
                        <button className="btn btn-outline hero-btn-outline">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;