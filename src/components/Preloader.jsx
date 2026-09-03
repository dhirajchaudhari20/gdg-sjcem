import React, { useEffect } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) preloader.classList.add('fade-out');
            setTimeout(onFinish, 700);
        }, 2200);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="preloader">
            <div className="preloader-bg-glow"></div>
            <div className="loader-content">
                <div className="logo-ring-wrapper">
                    {/* Glowing orbit dots */}
                    <div className="orbit-dot dot-blue"></div>
                    <div className="orbit-dot dot-red"></div>
                    <div className="orbit-dot dot-yellow"></div>
                    <div className="orbit-dot dot-green"></div>

                    {/* Central GDG Logo */}
                    <div className="logo-box">
                        <img 
                            src="/gdg-sjc-logo.png" 
                            alt="GDG on Campus SJCEM Logo" 
                            className="preloader-logo-img"
                        />
                    </div>
                </div>

                <div className="brand-text-container">
                    <h2 className="preloader-title">GDG on Campus SJCEM</h2>
                    <p className="preloader-subtitle">Innovating & Building Together</p>
                </div>

                <div className="google-bar-loader">
                    <div className="bar-segment bar-blue"></div>
                    <div className="bar-segment bar-red"></div>
                    <div className="bar-segment bar-yellow"></div>
                    <div className="bar-segment bar-green"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
