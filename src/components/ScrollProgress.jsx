import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const sh = document.documentElement.scrollHeight;
        const ch = document.documentElement.clientHeight;
        const scrolled = (scrollTop / (sh - ch)) * 100;
        setScrollWidth(scrolled);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${scrollWidth}%` }}></div>
        </div>
    );
};

export default ScrollProgress;
