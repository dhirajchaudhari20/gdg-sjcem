import React, { useState, useEffect } from 'react';
import './LaunchCountdown.css';

const LaunchCountdown = ({ targetDate, onFinished }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const timeLeft = calculateTimeLeft();
            setTimeLeft(timeLeft);

            const difference = +new Date(targetDate) - +new Date();
            if (difference <= 0) {
                clearInterval(timer);
                if (onFinished) onFinished();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onFinished]);

    return (
        <div className="launch-container">
            <div className="launch-bg-animation">
                <div className="launch-blob launch-blob-1"></div>
                <div className="launch-blob launch-blob-2"></div>
                <div className="launch-blob launch-blob-3"></div>
            </div>

            <div className="launch-content">
                {/* Replace with your actual logo if available, or just text */}
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>

                <h1 className="launch-title">Preparing for Liftoff</h1>
                <p className="launch-subtitle">We are launching something amazing. Stay tuned.</p>

                <div className="launch-timer">
                    <div className="timer-block">
                        <span className="timer-value">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="timer-label">Days</span>
                    </div>
                    <div className="timer-block">
                        <span className="timer-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="timer-label">Hours</span>
                    </div>
                    <div className="timer-block">
                        <span className="timer-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="timer-label">Mins</span>
                    </div>
                    <div className="timer-block">
                        <span className="timer-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="timer-label">Secs</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LaunchCountdown;
