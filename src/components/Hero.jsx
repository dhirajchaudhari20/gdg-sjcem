import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const PARTICLES = [
    { cls: 'p1 particle-blue'  }, { cls: 'p2 particle-white'  }, { cls: 'p3 particle-red'   },
    { cls: 'p4 particle-green' }, { cls: 'p5 particle-yellow' }, { cls: 'p6 particle-blue'  },
    { cls: 'p7 particle-white' }, { cls: 'p8 particle-red'    }, { cls: 'p9 particle-green' },
    { cls: 'p10 particle-blue' }, { cls: 'p11 particle-yellow'}, { cls: 'p12 particle-white'},
    { cls: 'p13 particle-red'  }, { cls: 'p14 particle-blue'  }, { cls: 'p15 particle-green'},
    { cls: 'p16 particle-yellow'},{ cls: 'p17 particle-white' }, { cls: 'p18 particle-red'  },
    { cls: 'p19 particle-blue' }, { cls: 'p20 particle-green' },
];

const Hero = () => {
    return (
        <section id="hero" className="relative w-full min-h-screen text-white flex flex-col justify-between pt-28 sm:pt-32 pb-0 overflow-hidden border-b border-[rgba(255,255,255,0.08)] hero">
            {/* ── Aurora base ── */}
            <div className="hero-aurora" />

            {/* ── Animated orbs ── */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
            <div className="hero-orb hero-orb-4" />
            <div className="hero-orb hero-orb-5" />

            {/* ── Animated grid ── */}
            <div className="hero-grid" />

            {/* ── Floating particles ── */}
            <div className="hero-particles">
                {PARTICLES.map((p, i) => (
                    <div key={i} className={`particle ${p.cls}`} />
                ))}
            </div>

            {/* ── Shooting stars ── */}
            <div className="hero-stars">
                <div className="shooting-star ss1" />
                <div className="shooting-star ss2" />
                <div className="shooting-star ss3" />
                <div className="shooting-star ss4" />
                <div className="shooting-star ss5" />
                <div className="shooting-star ss6" />
            </div>

            {/* ── SVG orbit lines ── */}
            <div className="hero-orbits">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="none">
                    <path d="M -100 400 Q 280 150 600 380 T 1150 1000" fill="none" stroke="url(#orbitGold)" strokeWidth="1.4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke"></path>
                    <path d="M 1700 160 Q 1220 60 1050 380 T 1400 1000" fill="none" stroke="url(#orbitRedBlue)" strokeWidth="1.4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke"></path>
                    <defs>
                        <linearGradient id="orbitGold" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FBBC04" stopOpacity="1"></stop>
                            <stop offset="100%" stopColor="#FBBC04" stopOpacity="0.8"></stop>
                        </linearGradient>
                        <linearGradient id="orbitRedBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EA4335" stopOpacity="1"></stop>
                            <stop offset="50%" stopColor="#4285F4" stopOpacity="0.8"></stop>
                            <stop offset="100%" stopColor="#34A853" stopOpacity="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* ── Main Content ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center">
                <div className="w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">

                    {/* Chapter Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-xs font-mono uppercase tracking-[0.18em] text-zinc-400"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse"></span>
                        Google Developer Group · On Campus · SJCEM
                    </motion.div>

                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                    >
                        <img
                            src="/gdg-sjc-logo.png"
                            alt="GDG on Campus SJCEM"
                            className="h-20 sm:h-28 md:h-32 w-auto object-contain"
                            style={{ filter: 'drop-shadow(0 0 32px rgba(66,133,244,0.4)) drop-shadow(0 0 64px rgba(234,67,53,0.18))' }}
                        />
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="text-[2.6rem] min-[390px]:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.06] text-white"
                    >
                        Build.{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#9b72cb] to-[#4285F4]">
                            Learn.
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/60">
                            Grow Together.
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-sm sm:text-base md:text-lg text-[#a1a1aa] max-w-2xl font-normal leading-relaxed"
                    >
                        GDG on Campus SJCEM is a student-led developer community at St. John College of Engineering &amp; Management, Palghar — building the next generation of engineers through Google technologies, workshops, hackathons, and real-world projects.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-3 pt-2"
                    >
                        {/* Primary: Join */}
                        <a
                            href="https://gdg.community.dev/gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india/"
                            target="_blank" rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition-all duration-300 ease-out bg-white text-[#080808] hover:bg-[#4285F4] hover:text-white text-sm sm:text-base px-7 sm:px-9 py-3.5 shadow-2xl hover:shadow-[0_0_30px_rgba(66,133,244,0.55)] active:scale-95"
                        >
                            <span className="relative flex flex-col items-center justify-center overflow-hidden h-[1.3em]">
                                <span className="inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                    <span>Join the Community</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </span>
                                <span className="absolute top-0 inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
                                    <span>Join the Community</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                </span>
                            </span>
                        </a>

                        {/* Secondary: Explore Events */}
                        <a
                            href="#events"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 ease-out bg-[#141416]/80 hover:bg-[#1e1e24] border border-white/15 hover:border-[#4285F4]/50 text-white text-sm sm:text-base px-6 sm:px-8 py-3.5 backdrop-blur-md active:scale-95 shadow-md"
                        >
                            <span className="relative flex flex-col items-center justify-center overflow-hidden h-[1.3em]">
                                <span className="inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                                    <span>Explore Events</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-white transition-colors"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                                </span>
                                <span className="absolute top-0 inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-full group-hover:translate-y-0">
                                    <span>Explore Events</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                                </span>
                            </span>
                        </a>
                    </motion.div>

                    {/* Community Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.1 }}
                        className="flex items-center gap-6 sm:gap-10 pt-2 flex-wrap justify-center"
                    >
                        {[
                            { value: '1200+', label: 'Members', color: '#4285F4' },
                            { value: '33+',   label: 'Events',  color: '#EA4335' },
                            { value: '2000+', label: 'Attendees', color: '#34A853' },
                            { value: '3+',    label: 'Years Active', color: '#FBBC04' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl sm:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 mt-0.5">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom corner labels */}
                <div className="relative w-full flex items-end justify-between pt-12 pb-6 text-xs text-[#555]">
                    <div className="text-left space-y-0.5 font-mono">
                        <div>For developers.</div>
                        <div>By the community.</div>
                        <div className="w-8 h-[1px] bg-white/15 mt-1.5"></div>
                    </div>
                    <div className="text-right space-y-0.5 font-mono">
                        <div>Palghar, Maharashtra.</div>
                        <div>Est. 2021.</div>
                        <div className="w-8 h-[1px] bg-white/15 mt-1.5 ml-auto"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;