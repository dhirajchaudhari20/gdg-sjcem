import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const images = [
    "https://i.ibb.co/xtMWG5bB/IMG-0354.avif",
    "https://i.ibb.co/mFBXVYTS/IMG-0370.avif",
    "https://i.ibb.co/ybtt9nh/IMG-0383.avif",
    "https://i.ibb.co/RGw3wqpg/IMG-0389.avif",
    "https://i.ibb.co/cKDyxhgw/IMG-0398.avif",
    "/images/event-1.webp",
    "/images/event-2.webp",
    "/images/event-3.webp",
];

export default function Gallery() {
    const containerRef = useRef(null);
    const dragX = useMotionValue(0);
    const dragVelocity = useMotionValue(0);
    
    // Smooth the drag with a spring
    const springConfig = { damping: 50, stiffness: 400, mass: 1 };
    const smoothX = useSpring(dragX, springConfig);

    // Map the horizontal drag pixel distance to a rotation angle in degrees
    // We make 1 pixel of drag = 0.2 degrees of rotation, so it feels natural
    const rotateY = useTransform(smoothX, (x) => x * 0.2);

    // Autoplay logic
    useEffect(() => {
        let animationFrame;
        let lastTime;
        let autoPlayVelocity = 0.02; // pixels per ms
        let isDragging = false;

        const animate = (time) => {
            if (lastTime !== undefined && !isDragging) {
                const delta = time - lastTime;
                dragX.set(dragX.get() - (delta * autoPlayVelocity));
            }
            lastTime = time;
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);

        const handlePointerDown = () => { isDragging = true; };
        const handlePointerUp = () => { isDragging = false; lastTime = undefined; };

        const el = containerRef.current;
        if (el) {
            el.addEventListener('pointerdown', handlePointerDown);
            window.addEventListener('pointerup', handlePointerUp);
        }

        return () => {
            cancelAnimationFrame(animationFrame);
            if (el) el.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [dragX]);

    const numCols = 13; // 13 items per row to make a full 360 circle (360/13 = 27.6923)
    const angleStep = 360 / numCols;
    const items = [];

    let imageIndex = 0;
    const getImage = () => {
        const img = images[imageIndex % images.length];
        imageIndex++;
        return img;
    };

    // Generate the grid items based on the math extracted from CCD Mumbai HTML
    for (let col = 0; col < numCols; col++) {
        const baseAngle = col * angleStep;

        // Row 1 (Top)
        items.push({
            id: `r1-${col}`,
            src: getImage(),
            rotateY: baseAngle,
            rotateX: -17.5,
        });

        // Row 2 (Middle) - Offset by half a step
        items.push({
            id: `r2-${col}`,
            src: getImage(),
            rotateY: baseAngle + (angleStep / 2),
            rotateX: 0,
        });

        // Row 3 (Bottom)
        items.push({
            id: `r3-${col}`,
            src: getImage(),
            rotateY: baseAngle,
            rotateX: 17.5,
        });
    }

    return (
        <section id="gallery" className="py-20 sm:py-28 border-b border-[rgba(255,255,255,0.08)] bg-[#080808] relative overflow-hidden">
            <div className="container mb-8 sm:mb-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="section-tag block text-[#ea4335] font-mono uppercase text-xs tracking-wider font-bold">
                        Photo Gallery
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-2" style={{ fontFamily: 'var(--font-main)' }}>
                        2025 in Highlights
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-400 font-normal">
                        <span>Interactive 3D Dome • High-Res Photos & Video Reels • Drag to rotate</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[650px] sm:h-[750px] md:h-[820px] lg:h-[880px] relative bg-gradient-to-b from-[#080808] via-[#0c0c0e] to-[#080808]">
                <div 
                    ref={containerRef}
                    className="relative w-full h-full overflow-hidden select-none touch-none cursor-grab active:cursor-grabbing" 
                    style={{ perspective: '837px', perspectiveOrigin: '50% 50%' }}
                >
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
                        
                        {/* The rotatable container wrapped in motion.div */}
                        <motion.div 
                            className="relative w-0 h-0 will-change-transform pointer-events-auto" 
                            style={{ 
                                transformStyle: 'preserve-3d', 
                                z: 558, // translateZ(558px) mapped to z for clearer Framer Motion handling
                                rotateY: rotateY
                            }}
                            drag="x"
                            dragConstraints={{ left: -10000, right: 10000 }} // Infinite drag
                            dragElastic={0}
                            dragMomentum={true}
                            onDrag={(e, info) => {
                                dragX.set(dragX.get() + info.delta.x);
                            }}
                        >
                            {items.map((item, i) => (
                                <div 
                                    key={item.id}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ease-out" 
                                    style={{ 
                                        width: '237px', 
                                        height: '154px', 
                                        transform: `rotateY(${item.rotateY}deg) rotateX(${item.rotateX}deg) translateZ(-558px) scale(1)`, 
                                        transformStyle: 'preserve-3d', 
                                        backfaceVisibility: 'hidden', 
                                        willChange: 'transform', 
                                        contain: 'layout paint', 
                                        zIndex: 1 
                                    }}
                                >
                                    <div className="relative w-full h-full rounded-[14px] overflow-hidden transition-all duration-300 shadow-xl border bg-[#121214] border-white/15 hover:border-white/40">
                                        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/60">
                                            <img 
                                                alt="Dome Gallery Item" 
                                                decoding="async" 
                                                width="237" 
                                                height="154" 
                                                className="w-full h-full object-cover transition-transform duration-500 pointer-events-none grayscale-0 scale-100" 
                                                loading="lazy" 
                                                draggable="false" 
                                                src={item.src} 
                                            />
                                        </div>
                                        <div className="hidden sm:flex absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-6 pb-2 px-2.5 pointer-events-none z-10 items-end justify-between gap-1">
                                            <p className="text-[11px] sm:text-xs font-semibold text-white truncate drop-shadow-md">GDG SJCEM</p>
                                            <span className="text-[9px] font-mono text-zinc-400 shrink-0 hidden sm:inline-block">2025</span>
                                        </div>
                                        <div className="absolute inset-0 bg-[#4285f4]/15 pointer-events-none transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-white/80 text-[10px] sm:text-xs font-normal whitespace-nowrap shadow-lg">
                    <span>Drag to rotate • Hover to inspect</span>
                </div>
            </div>
        </section>
    );
}
