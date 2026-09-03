import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;

            if (progress < duration) {
                const percentage = progress / duration;
                // Easing function (easeOutExpo)
                const easedProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);

                setCount(Math.floor(easedProgress * end));
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    return (
        <span>{count}{suffix}</span>
    );
};

export default CountUp;
