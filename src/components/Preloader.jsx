import React, { useState, useEffect } from 'react';
import preloaderVideo from '../assets/optimized_preloader.gif';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Since GIF loops or plays once without event, we set a fixed timer
        const timer = setTimeout(() => {
            setLoading(false);
            setTimeout(onFinish, 800); // Wait for fade out
        }, 3500); // 3.5 seconds display time

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`preloader ${!loading ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <img
                    src={preloaderVideo}
                    alt="Loading..."
                    className="preloader-video"
                />
            </div>
        </div>
    );
};

export default Preloader;
