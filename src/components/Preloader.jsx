import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fast counter from 0 to 100 for premium feel
        let start = 0;
        const duration = 1500;
        const interval = 15;
        const step = 100 / (duration / interval);
        
        const counter = setInterval(() => {
            start += step;
            if (start >= 100) {
                setProgress(100);
                clearInterval(counter);
            } else {
                setProgress(Math.floor(start));
            }
        }, interval);

        const timer = setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) preloader.classList.add('fade-out');
            setTimeout(onFinish, 800);
        }, 2200);

        return () => {
            clearInterval(counter);
            clearTimeout(timer);
        };
    }, [onFinish]);

    return (
        <div className="preloader">
            <div className="preloader-content">
                <div className="logo-pulse-container">
                    <img 
                        src="/gdg-sjc-logo.png" 
                        alt="GDG on Campus SJCEM" 
                        className="preloader-logo-minimal"
                    />
                    <div className="preloader-ring"></div>
                </div>
                
                <div className="preloader-progress-wrapper">
                    <div className="preloader-progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                
                <div className="preloader-footer">
                    <span className="preloader-percentage">{progress}%</span>
                    <span className="preloader-text">Loading Experience</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
