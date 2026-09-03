import React, { useState, useEffect, useRef } from 'react';
import preloaderVideo from '../assets/new_preloader.mp4';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    const videoRef = useRef(null);
    // Fixed timer for fallback + fade out logic
    useEffect(() => {
        const timer = setTimeout(() => {
            // Trigger fade out
            const preloader = document.querySelector('.preloader');
            if (preloader) preloader.classList.add('fade-out');

            setTimeout(onFinish, 800);
        }, 3500);

        return () => clearTimeout(timer);
    }, [onFinish]);

    useEffect(() => {
        if (videoRef.current) {
            // Attempt to set start time
            videoRef.current.currentTime = 2;
        }
    }, []);

    return (
        <div className="preloader">
            <div className="loader-content">
                <video
                    ref={videoRef}
                    src={preloaderVideo}
                    autoPlay
                    muted
                    playsInline
                    className="preloader-video"
                    style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
                />
            </div>
        </div>
    );
};

export default Preloader;
