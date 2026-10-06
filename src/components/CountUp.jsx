import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const CountUp = ({ end, duration = 2000, suffix = '', delay = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;
        
        let startTime = null;
        let animationFrame;
        let timeoutId;
        
        const startAnimation = () => {
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = currentTime - startTime;

                if (progress < duration) {
                    const percentage = progress / duration;
                    const easedProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
                    setCount(Math.floor(easedProgress * end));
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };
            animationFrame = requestAnimationFrame(animate);
        };

        if (delay > 0) {
            timeoutId = setTimeout(startAnimation, delay);
        } else {
            startAnimation();
        }
        
        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(timeoutId);
        };
    }, [end, duration, isInView, delay]);

    return (
        <span ref={ref}>{count}{suffix}</span>
    );
};

export default CountUp;
