import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { upcomingEvents, pastEvents } from '../data/eventsData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Virtual } from 'swiper/modules';
import 'swiper/css/virtual';
import 'swiper/css';
import 'swiper/css/navigation';
import './EventDetails.css';
import FeedbackModal from './FeedbackModal';
import BadgeGenerator from './BadgeGenerator';

import AOS from 'aos';
import Quiz from './Quiz';

// Helper to extract speaker info
const parseAgendaItem = (item) => {
    // If structured speakers exist, use them
    if (item.speakers && item.speakers.length > 0) {
        return {
            ...item,
            speakers: item.speakers,
            cleanDescription: item.description
        };
    }

    // Fallback: Regex Parsing
    let speakers = [];
    let desc = item.description;
    const speakerMatch = desc.match(/Speaker(?:s)?:?\s*(.*)/i);
    if (speakerMatch) {
        // Create simple speaker objects from string
        const names = speakerMatch[1].split(/&|,/).map(s => s.trim());
        speakers = names.map(name => ({ name, role: 'Speaker', image: null }));

        desc = desc.replace(/Speaker(?:s)?:?\s*.*$/i, '').trim();
        if (desc.endsWith(',') || desc.endsWith('.')) {
            desc = desc.slice(0, -1).trim();
        }
    }
    return { ...item, speakers, cleanDescription: desc };
};

const AgendaCard = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { time, title, speakers, cleanDescription, link, linkText } = parseAgendaItem(item);

    // Live Badge Logic
    const isLive = () => {
        // Parse time string "11:15 AM – 11:45 AM"
        try {
            const [startStr, endStr] = time.split('–').map(s => s.trim());
            const now = new Date();

            // For demo/testing: You might want to uncomment this to force a specific "now"
            // const now = new Date(); now.setHours(11, 30, 0); 

            const parseTime = (timeStr) => {
                const [time, period] = timeStr.split(' ');
                let [hours, minutes] = time.split(':').map(Number);
                if (period === 'PM' && hours !== 12) hours += 12;
                if (period === 'AM' && hours === 12) hours = 0;

                const date = new Date();
                date.setHours(hours, minutes, 0);
                return date;
            };

            const startTime = parseTime(startStr);
            const endTime = parseTime(endStr);

            return now >= startTime && now <= endTime;
        } catch (e) {
            return false;
        }
    };

    const liveStatus = isLive();

    return (
        <div className={`google-agenda-card ${isExpanded ? 'expanded' : ''} ${liveStatus ? 'live-item' : ''}`}>
            <div className="google-agenda-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="google-agenda-main-info">
                    <div className="agenda-title-row">
                        <h4 className="google-agenda-title">{title}</h4>
                        {liveStatus && (
                            <span className="live-badge">
                                <span className="live-dot"></span> Live
                            </span>
                        )}
                    </div>
                    {/* Speaker Preview (Names only) in Header */}
                    {speakers && speakers.length > 0 && (
                        <div className="google-agenda-speaker-preview">
                            {speakers.map(s => s.name).join(' & ')}
                        </div>
                    )}
                </div>
                <div className="google-agenda-toggle">
                    <i className={`google-material-icons icon ${isExpanded ? 'rotated' : ''}`}>keyboard_arrow_down</i>
                </div>
            </div>

            <div className="google-agenda-collapsed-info">
                <span className="google-agenda-time">{time}</span>
            </div>

            <div className={`google-agenda-body ${isExpanded ? 'show' : ''}`}>
                <div className="google-agenda-desc">
                    <p>{cleanDescription}</p>

                    {/* Action Link for Agenda Item */}
                    {link && (
                        <div style={{ marginTop: '15px', marginBottom: '10px' }}>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary-action"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    borderRadius: '8px'
                                }}
                            >
                                {linkText || 'View Details'} 🚀
                            </a>
                        </div>
                    )}

                    <div className="google-agenda-meta-detail">
                        <span className="meta-badge-time">⏰ {time}</span>
                    </div>

                    {/* Rich Speaker Details */}
                    {speakers && speakers.length > 0 && (
                        <div className="google-agenda-speakers-section">
                            {speakers.map((speaker, idx) => (
                                <div key={idx} className="google-speaker-card">
                                    <div className="google-speaker-avatar">
                                        {speaker.image ? (
                                            <img src={speaker.image} alt={speaker.name} />
                                        ) : (
                                            <div className="google-speaker-initial">{speaker.name.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="google-speaker-info">
                                        <div className="google-speaker-name">{speaker.name}</div>
                                        <div className="google-speaker-role">{speaker.role}</div>
                                        <div className="google-speaker-company">Google Developer Groups on Campus SJCEM</div>
                                    </div>
                                    {speaker.linkedin && speaker.linkedin !== '#' && (
                                        <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="google-speaker-social">
                                            <i className="fab fa-linkedin"></i>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isCodelabLoading, setIsCodelabLoading] = useState(false);

    // Reveal Strategy States
    const [revealTimeLeft, setRevealTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
    const [canReveal, setCanReveal] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const targetDate = new Date('Jan 05, 2026 13:00:00 GMT+0530').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setCanReveal(true);
                setRevealTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
            } else {
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setRevealTimeLeft({
                    hours: String(hours).padStart(2, '0'),
                    minutes: String(minutes).padStart(2, '0'),
                    seconds: String(seconds).padStart(2, '0')
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleReveal = () => {
        setIsRevealed(true);
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    };

    const handleStartCodelab = (e) => {
        e.preventDefault();
        setIsCodelabLoading(true);
        setTimeout(() => {
            navigate('/codelab/techsprint-1');
        }, 1500);
    };

    // Mentor/Judge Modal State
    const [selectedProfile, setSelectedProfile] = useState(null);

    // RSVP Count State
    const event = [...upcomingEvents, ...pastEvents].find(e => e.id.toString() === id);
    const [rsvpCount, setRsvpCount] = useState(event ? event.registrations : 0);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProfile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProfile]);

    // Fetch Real-time RSVP Count for TechSprint Hackathon (ID: 1)
    useEffect(() => {
        if (event && event.id === 1) {
            const fetchRsvpCount = async () => {
                const targetUrl = 'https://gdg.community.dev/events/details/google-gdg-on-campus-st-john-college-of-engineering-and-management-autonomous-palghar-india-presents-techsprint-hackathon-2025-kick-off-session-gdg-on-campus-sjcem/';

                // Try CodeTabs first (raw text)
                try {
                    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error('CodeTabs failed');
                    const text = await response.text();

                    // Regex to find "X RSVP'd" or similar
                    // The site typically renders: "6 RSVP'd" or "<span>6</span> RSVP'd"
                    // We look for a number followed closely by "RSVP"
                    const match = text.match(/(?:>|\s|^)(\d{1,4})(?:<|\s|&nbsp;)*RSVP/i);
                    if (match && match[1]) {
                        const count = parseInt(match[1], 10);
                        if (!isNaN(count) && count > 0) {
                            setRsvpCount(count);
                            return; // Success
                        }
                    }
                } catch (e) {
                    console.warn('CodeTabs proxy failed:', e);
                }

                // Fallback to AllOrigins (raw)
                try {
                    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error('AllOrigins failed');
                    const text = await response.text();

                    const match = text.match(/(?:>|\s|^)(\d{1,4})(?:<|\s|&nbsp;)*RSVP/i);
                    if (match && match[1]) {
                        const count = parseInt(match[1], 10);
                        if (!isNaN(count) && count > 0) {
                            setRsvpCount(count);
                        }
                    }
                } catch (e) {
                    console.error('All RSVP fetch attempts failed:', e);
                    // Optionally set a default or previous count if all attempts fail
                }
            };

            // fetchRsvpCount();
        }
    }, [event]);

    // Scroll Animation Effect
    useEffect(() => {
        // Only keep window scroll listener if needed for other things (like floating bar)
        // logic for timeline animation removed as we switched to cards
    }, [event, id]);

    // Scroll to top and refresh animations on load
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            AOS.refresh();
        }, 500); // Small delay to ensure DOM is ready
    }, []);



    // Event is already defined above

    // Registration Counter Animation
    const [displayCount, setDisplayCount] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        const formData = new FormData(e.target);
        formData.append("access_key", "98defd20-dee9-48a7-ac0f-e2fdd45d1f32");
        try {
            const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
            const data = await response.json();
            if (data.success) {
                setFormSubmitted(true);
                e.target.reset();
            } else {
                alert("Something went wrong: " + data.message);
            }
        } catch (error) {
            alert("Error sending message.");
        } finally {
            setFormLoading(false);
        }
    };
    const [activeFaq, setActiveFaq] = useState(null);
    const [swiperRef, setSwiperRef] = useState(null);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

    // Lightbox State
    const [selectedImage, setSelectedImage] = useState(null);
    // Gallery Grid State
    const [showGalleryGrid, setShowGalleryGrid] = useState(false);

    const openLightbox = (imgUrl) => {
        setSelectedImage(imgUrl);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        // Only restore scrolling if grid is CLOSED. If grid is open, keep hidden.
        if (!showGalleryGrid) {
            document.body.style.overflow = 'unset';
        }
    };

    // Grid Toggles
    const openGrid = () => {
        setShowGalleryGrid(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGrid = () => {
        setShowGalleryGrid(false);
        document.body.style.overflow = 'unset';
    };

    // Scroll Progress Logic
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScrollProgress(scroll * 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    useEffect(() => {
        if (event && event.registrations) {
            const end = event.registrations;

            // "Fetch" simulation - start counting after a brief delay
            // This emphasizes the "dynamic" nature requested by the user
            const startDelay = setTimeout(() => {
                let start = 0;
                if (start === end) {
                    setDisplayCount(end);
                    return;
                }

                let totalDuration = 2000;
                let incrementTime = Math.max(50, (totalDuration / end)); // Slow down for small numbers

                // For small numbers like 3, simple interval is fine
                const timer = setInterval(() => {
                    start += 1;
                    setDisplayCount(start);
                    if (start >= end) clearInterval(timer);
                }, 200); // 200ms per step for small numbers (0->1->2->3) takes 600ms effectively

                return () => clearInterval(timer);
            }, 500); // Wait 500ms before starting

            return () => clearTimeout(startDelay);
        }
    }, [event]);

    if (!event) {
        return (
            <div className="event-not-found">
                <h2>Event not found</h2>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        );
    }

    const [timeLeft, setTimeLeft] = useState({});
    const [showFloatingBar, setShowFloatingBar] = useState(false);

    // Countdown Logic
    useEffect(() => {
        if (!event) return;
        const calculateTimeLeft = () => {
            // Assume 10 AM start time for the date if not specified
            const eventDateTime = new Date(`${event.date} 11:15:00`);
            const difference = +eventDateTime - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        setTimeLeft(calculateTimeLeft()); // Initial call

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [event]);

    // Floating Bar Scroll Logic
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 600) {
                setShowFloatingBar(true);
            } else {
                setShowFloatingBar(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const addToGoogleCalendar = () => {
        if (!event) return;
        // Simple approximation for demo purposes
        const start = new Date(event.date).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(new Date(event.date).getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, ""); // 4 hours
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location || 'SJCEM')}&sf=true&output=xml`;
        window.open(url, '_blank');
    };

    const eventDate = new Date(event.date);

    return (
        <section className="event-details-section">
            {/* Scroll Progress Bar */}
            <div className="scroll-progress-container">
                <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            {/* Background Animations */}
            <div className="bg-shape shape-circle"></div>
            <div className="bg-shape shape-triangle"></div>
            <div className="bg-shape shape-square"></div>
            <Link to="/" className="back-nav-btn">← Back to Home</Link>

            <div className="event-details-hero">
                <img src={event.image} alt="Background" className="event-hero-bg" />
                <div className="event-hero-overlay">
                    <div className="event-hero-content" data-aos="fade-up">
                        <span className="event-badge">{event.type}</span>
                        <h1 className="event-hero-title">{event.title}</h1>
                        {/* Urgency Alert Banner */}
                        {event.registrationStatus && (
                            <div className="registration-alert-banner" data-aos="fade-down">
                                <span className="alert-icon">⚠️</span>
                                <p>{event.registrationStatus.message}</p>
                            </div>
                        )}
                        <div className="event-meta-row">
                            <span className="meta-icon-item">📅 {event.date}</span>
                            <span className="meta-icon-item">📍 {event.location || 'SJCEM Campus'}</span>
                            {event.registrations && (
                                <span className="meta-icon-item">👥 {rsvpCount}+ Registered</span>
                            )}
                            {event.teamSize && (
                                <span className="meta-icon-item">🧑‍🤝‍🧑 Team: {event.teamSize}</span>
                            )}
                            {event.lastDate && (
                                <span className="meta-icon-item">⏳ Deadline: {event.lastDate}</span>
                            )}
                        </div>

                        {timeLeft.days !== undefined && (
                            <div className="hero-countdown">
                                <div className="countdown-item">
                                    <span className="countdown-val">{timeLeft.days}</span>
                                    <span className="countdown-label">Days</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="countdown-val">{timeLeft.hours}</span>
                                    <span className="countdown-label">Hours</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="countdown-val">{timeLeft.minutes}</span>
                                    <span className="countdown-label">Mins</span>
                                </div>
                                <div className="countdown-item">
                                    <span className="countdown-val">{timeLeft.seconds}</span>
                                    <span className="countdown-label">Secs</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="event-details-container">
                <div className="event-main-content">
                    <div className="event-main-image">
                        {event.gallery && event.gallery.length > 0 ? (
                            <Swiper
                                onSwiper={setSwiperRef}
                                modules={[Navigation, Pagination, Autoplay, Virtual]}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                loop={true}
                                virtual
                                className="event-main-slider"
                            >
                                {event.gallery.map((item, index) => (
                                    <SwiperSlide key={item} virtualIndex={index}>
                                        <div className="main-slider-image-container">
                                            {item.endsWith('.mp4') ? (
                                                <video
                                                    src={item}
                                                    controls
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onPlay={() => swiperRef?.autoplay?.stop()}
                                                    onPause={() => swiperRef?.autoplay?.start()}
                                                    onEnded={() => swiperRef?.autoplay?.start()}
                                                />
                                            ) : (
                                                <img src={item} alt={`Event Highlight ${index + 1}`} loading="lazy" />
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <img src={event.image} alt={event.title} />
                        )}
                    </div>

                    <h3>About the Event</h3>
                    <div className="event-description" dangerouslySetInnerHTML={{ __html: event.longDescription || event.description }}></div>
                </div>

                <div className="event-sidebar">
                    <div className="event-action-card">
                        <h3 className="event-sidebar-title">Join Us</h3>

                        {/* High Visibility Codelab Button */}
                        <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e0e0e0' }}>
                            <button
                                onClick={(e) => {
                                    if (event.codelab?.isExternal) {
                                        window.open(event.codelab.link, '_blank');
                                    } else {
                                        handleStartCodelab(e);
                                    }
                                }}
                                className="sidebar-btn btn-primary-action"
                                disabled={isCodelabLoading}
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    width: '100%',
                                    cursor: isCodelabLoading ? 'wait' : 'pointer',
                                    opacity: isCodelabLoading ? 0.9 : 1,
                                    background: '#1a73e8', // Google Blue
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: '500'
                                }}
                            >
                                {isCodelabLoading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                border: '2px solid rgba(255,255,255,0.3)',
                                                borderTop: '2px solid #fff',
                                                borderRadius: '50%'
                                            }}
                                        />
                                        <span>Opening...</span>
                                    </>
                                ) : (
                                    <>{event.codelab?.buttonText || 'Start Codelab 🚀'}</>
                                )}
                            </button>
                            <p style={{ fontSize: '0.8rem', color: '#5f6368', textAlign: 'center', marginTop: '0.5rem', marginBottom: 0 }}>
                                *Hands-on Workshop
                            </p>
                        </div>

                        {event.buttons ? (
                            event.buttons.map((btn, index) => (
                                <a
                                    key={index}
                                    href={btn.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`sidebar-btn ${btn.style === 'primary' ? 'btn-primary-action' : 'btn-outline-action'}`}
                                >
                                    {btn.text}
                                </a>
                            ))
                        ) : (
                            <button className="sidebar-btn btn-outline-action" disabled>
                                Registrations Closed
                            </button>
                        )}

                        <button
                            onClick={addToGoogleCalendar}
                            className="sidebar-btn btn-outline-action btn-calendar"
                            style={{ marginTop: '0.5rem' }}
                        >
                            Add to Calendar 📅
                        </button>

                        <button
                            className="sidebar-btn btn-outline-action"
                            style={{ marginTop: '0.5rem', borderColor: '#FBBC04', color: '#B45309' }}
                            onClick={() => setIsFeedbackModalOpen(true)}
                        >
                            Share Feedback ⭐
                        </button>
                        <button
                            className="sidebar-btn btn-outline-action"
                            style={{ marginTop: '0.5rem' }}
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: event.title,
                                        text: `Check out ${event.title} at GDG on Campus SJCEM!`,
                                        url: window.location.href,
                                    }).catch(console.error);
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied to clipboard!");
                                }
                            }}
                        >
                            Share Event 🔗
                        </button>

                        {event.materialsLink && (
                            <a
                                href={event.materialsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sidebar-btn btn-outline-action"
                            >
                                View Materials 📚
                            </a>
                        )}

                        {event.resources && (
                            <div className="sidebar-resources">
                                <h4 className="sidebar-subtitle">Resources</h4>
                                {event.resources.map((res, index) => (
                                    <a
                                        key={index}
                                        href={res.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="sidebar-btn btn-outline-action"
                                    >
                                        {res.title} 📥
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Drive Link Logic */}
                        {event.driveLink && (
                            <button
                                className="sidebar-btn btn-outline-action"
                                style={{ marginTop: '0.5rem', borderColor: '#34A853', color: '#2D8B46' }}
                                onClick={() => setIsDriveModalOpen(true)}
                            >
                                View Event Photos 📸
                            </button>
                        )}

                        <div className="event-projects-promo" style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                            <h4 className="sidebar-subtitle">Event Projects 🛠️</h4>
                            <p style={{ fontSize: '0.9rem', color: '#5f6368', marginBottom: '1rem' }}>
                                checking out what others built?
                            </p>
                            <Link to="/projects" className="sidebar-btn btn-primary-action" style={{ textAlign: 'center', textDecoration: 'none' }}>
                                View Projects 🚀
                            </Link>
                            <Link to="/submit-idea" className="sidebar-btn btn-outline-action" style={{ marginTop: '0.5rem', textAlign: 'center', textDecoration: 'none' }}>
                                Submit Idea 💡
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="event-full-sections">
                {/* Agenda Section */}
                {event.agenda && (
                    <div className="event-agenda full-width-block">
                        <div className="content-wrapper">
                            <h3 className="agenda-title">Event Agenda</h3>

                            {/* Multi-Day Logic */}
                            {Array.isArray(event.agenda) && event.agenda.length > 0 && event.agenda[0].items ? (
                                // Multi-Day Format
                                <div className="agenda-tabs-container">
                                    <div className="agenda-tabs">
                                        {event.agenda.map((day, index) => (
                                            <button
                                                key={day.id}
                                                className={`agenda-tab-btn ${index === (activeFaq || 0) ? 'active' : ''}`}
                                                onClick={() => setActiveFaq(index)}
                                            >
                                                {day.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="agenda-list-container">
                                        {event.agenda[activeFaq || 0].items.map((item, index) => (
                                            <AgendaCard key={index} item={item} />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Single-Day/Legacy Format
                                <div className="agenda-list-container">
                                    {event.agenda.map((item, index) => (
                                        <AgendaCard key={index} item={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Codelab CTA Section (Dynamic) */}
                {(event.id === 1 || event.codelab) && (
                    <div className="full-width-block" id="codelabs-section">
                        <div className="content-wrapper">
                            <h3 className="section-title-premium">{event.codelab?.title || 'Hands-On Workshop Resources'}</h3>
                            <div className="codelab-cta-card" style={{
                                background: '#f8f9fa',
                                padding: '30px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: '1px solid #e0e0e0'
                            }}>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#202124' }}>
                                    {event.codelab?.description || 'Build a Travel Agent using MCP Toolbox & ADK'}
                                </h4>
                                <p style={{ color: '#5f6368', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                                    Follow this step-by-step codelab to build and deploy your multi-agent AI system.
                                </p>

                                <button
                                    onClick={(e) => {
                                        if (event.codelab?.isExternal) {
                                            window.open(event.codelab.link, '_blank');
                                        } else {
                                            handleStartCodelab(e);
                                        }
                                    }}
                                    className="btn-primary-action"
                                    disabled={isCodelabLoading}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        minWidth: '180px',
                                        cursor: isCodelabLoading ? 'wait' : 'pointer',
                                        opacity: isCodelabLoading ? 0.9 : 1
                                    }}
                                >
                                    {isCodelabLoading ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    border: '3px solid rgba(255,255,255,0.3)',
                                                    borderTop: '3px solid #fff',
                                                    borderRadius: '50%'
                                                }}
                                            />
                                            <span>Opening...</span>
                                        </>
                                    ) : (
                                        <>{event.codelab?.buttonText || 'Start Codelab 🚀'}</>
                                    )}
                                </button>
                            </div>


                            {/* Slides Button */}
                            {event.slides && (
                                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e0e0e0' }}>
                                    <a
                                        href={event.slides}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="sidebar-btn"
                                        style={{
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            width: '100%',
                                            background: '#fbbc04', // Google Yellow
                                            color: '#202124',
                                            fontWeight: '500',
                                            border: 'none'
                                        }}
                                    >
                                        <span>📑</span> View Slides
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Event Timeline (Redesigned) */}
                {event.timeline && (
                    <div className="event-timeline full-width-block">
                        <div className="content-wrapper">
                            <h3 className="agenda-title">TechSprint 2025 – Official Timeline</h3>
                            <div className="premium-vertical-timeline">
                                {event.timeline.map((item, index) => (
                                    <div key={index} className="pv-timeline-item" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <div className="pv-timeline-marker">
                                            <div className="pv-timeline-dot"></div>
                                            {index !== event.timeline.length - 1 && <div className="pv-timeline-line"></div>}
                                        </div>
                                        <div className="pv-timeline-content">
                                            <div className="pv-date-badge">{item.date}</div>
                                            <h4 className="pv-title">{item.title}</h4>
                                            <p className="pv-description">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Rules Section */}
                {event.rules && (
                    <div className="event-rules full-width-block">
                        <div className="content-wrapper">
                            <h3 className="rules-title">Rules & Guidelines</h3>
                            <div className="rules-grid">
                                {event.rules.map((rule, index) => (
                                    <div key={index} className="rule-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <h4 className="rule-title">{rule.title}</h4>
                                        <p className="rule-desc">{rule.description}</p>
                                        {rule.items && (
                                            <ul className="rule-items">
                                                {rule.items.map((item, idx) => (
                                                    <li key={idx}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Partners Section */}
                {event.partners && (
                    <div className="event-partners full-width-block">
                        <div className="content-wrapper">
                            <h3 className="partners-title">Partners</h3>
                            <div className="partners-grid-large">
                                {event.partners.map((partner, index) => (
                                    <div key={index} className="partner-card-large" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <img src={partner.logo} alt={partner.name} className="partner-logo-large" />
                                        <p className="partner-name-large">{partner.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Challenge Section */}
                {event.challenge && (
                    <div className="event-challenge full-width-block" data-aos="fade-up">
                        <div className="content-wrapper">
                            <h3 className="challenge-title">The Challenge: {event.challenge.title}</h3>
                            <div className="challenge-card-large">
                                <p className="challenge-desc-large">{event.challenge.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Event Quiz Section */}
                {event.quiz && (
                    <div className="full-width-block">
                        <div className="content-wrapper">
                            <Quiz data={event.quiz} />
                        </div>
                    </div>
                )}

                {/* Virtual Badge Generator Section */}
                <div className="full-width-block">
                    <div className="content-wrapper">
                        <BadgeGenerator
                            eventName={event.title}
                            subtitle={event.id === 3 ? 'Guidance Session' : 'Hackathon 2025'}
                            dateString={event.id === 3 ? 'Dec 20 • Online' : 'Dec 17-18 • SJCEM Palghar'}
                        />
                    </div>
                </div>

                {/* Prizes Section */}
                {event.prizes && (
                    <div className="event-prizes full-width-block">
                        <div className="content-wrapper">
                            <h3 className="section-title-premium">{event.prizes.title}</h3>
                            <p className="prizes-description">{event.prizes.description}</p>

                            <div className="prizes-grid">
                                {event.prizes.items.map((item, index) => (
                                    <div key={index} className="prize-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                                        <div className="prize-icon">{item.icon}</div>
                                        <h4 className="prize-title">{item.title}</h4>
                                        <p className="prize-desc">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="prizes-disclaimer">
                                <span className="info-icon">ℹ️</span>
                                <p>{event.prizes.disclaimer}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {event.results && (
                    <div className="event-results full-width-block">
                        <div className="content-wrapper">
                            <h3 className="results-title">Hackathon Results</h3>

                            {/* Top 10 Teams */}
                            <div className="results-block top-10" data-aos="fade-up">
                                <h4 className="results-subtitle">Top 10 Teams</h4>

                                {!isRevealed ? (
                                    <div className="reveal-container">
                                        {canReveal ? (
                                            <button className="reveal-button" onClick={handleReveal}>
                                                <span className="reveal-icon">🚀</span> Reveal Results
                                            </button>
                                        ) : (
                                            <div className="countdown-container">
                                                <p>Results Revealing In:</p>
                                                <div className="countdown-timer">
                                                    <div className="timer-box">
                                                        <span className="timer-value">{revealTimeLeft.hours}</span>
                                                        <span className="timer-label">Hours</span>
                                                    </div>
                                                    <div className="timer-separator">:</div>
                                                    <div className="timer-box">
                                                        <span className="timer-value">{revealTimeLeft.minutes}</span>
                                                        <span className="timer-label">Mins</span>
                                                    </div>
                                                    <div className="timer-separator">:</div>
                                                    <div className="timer-box">
                                                        <span className="timer-value">{revealTimeLeft.seconds}</span>
                                                        <span className="timer-label">Secs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    event.results.top10.length > 0 ? (
                                        <div className="teams-grid">
                                            {event.results.top10.map((team, index) => (
                                                <div key={index} className="team-result-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                                    <div className="team-rank">#{team.rank}</div>
                                                    <div className="team-info">
                                                        <h4 className="team-name">{team.team}</h4>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="results-pending-banner">
                                            <span className="pending-icon-large">🏆</span>
                                            <p>Top 10 Teams - To be Announced</p>
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Top 3 Teams */}
                            <div className="results-block top-3" data-aos="fade-up" data-aos-delay="100">
                                <h4 className="results-subtitle">Top 3 Winners</h4>
                                {event.results.top3.length > 0 ? (
                                    <div className="teams-grid">
                                        {/* Render winners here later */}
                                    </div>
                                ) : (
                                    <div className="results-pending-banner highlight-banner">
                                        <span className="pending-icon-large">🥇</span>
                                        <p>Top 3 Winners - To be Announced</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Judges / Mentors Section */}
                {(event.judges || event.mentors) && (
                    <div className="event-mentors full-width-block">
                        <div className="content-wrapper">
                            <h3 className="mentors-title">{event.judges ? 'Judges' : 'Mentors'}</h3>
                            <div className="mentors-grid-large">
                                {(event.judges || event.mentors).map((person, index) => (
                                    <div
                                        key={index}
                                        className="mentor-card-large clickable-card"
                                        data-aos="zoom-in"
                                        data-aos-delay={index * 100}
                                        onClick={() => setSelectedProfile(person)}
                                    >
                                        <img src={person.image} alt={person.name} className="mentor-image-large" />
                                        <div className="mentor-info">
                                            <h4 className="mentor-name-large">{person.name}</h4>
                                            <p className="mentor-role-large">{person.role}</p>

                                            {/* Social Links */}
                                            <div className="mentor-socials">
                                                {person.linkedin && (
                                                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="mentor-social-link linkedin" onClick={(e) => e.stopPropagation()}>
                                                        <i className="fab fa-linkedin-in"></i>
                                                    </a>
                                                )}
                                                {person.googleScholar && (
                                                    <a href={person.googleScholar} target="_blank" rel="noopener noreferrer" className="mentor-social-link google-scholar" onClick={(e) => e.stopPropagation()}>
                                                        <i className="fas fa-graduation-cap"></i>
                                                    </a>
                                                )}
                                            </div>

                                            {/* Short Bio */}
                                            {person.bio && (
                                                <p className="mentor-bio-short">{person.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                {event.faq && (
                    <div className="event-faq full-width-block">
                        <div className="content-wrapper">
                            <h3 className="faq-title">FAQs</h3>
                            <div className="faq-list">
                                {event.faq.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <div className="faq-question">
                                            {item.question}
                                            <span className="faq-icon">▼</span>
                                        </div>
                                        <div className={`faq-answer ${activeFaq === index ? 'show' : ''}`}>
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="faq-ask-question">
                                <h4 className="ask-title">Have more questions?</h4>
                                {formSubmitted ? (
                                    <div className="ask-success">
                                        <p>✅ Info sent! We'll get back to you at gdg@sjcem.edu.in</p>
                                        <button className="btn-reset" onClick={() => setFormSubmitted(false)}>Ask another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleFormSubmit} className="ask-form">
                                        <input type="hidden" name="subject" value="Event Question" />
                                        <div className="form-row">
                                            <input type="text" name="name" placeholder="Name" required />
                                            <input type="email" name="email" placeholder="Email" required />
                                        </div>
                                        <div className="form-row">
                                            <input type="tel" name="phone" placeholder="Phone Number (Optional)" />
                                        </div>
                                        <textarea name="message" placeholder="Your Question..." rows="3" required></textarea>
                                        <button type="submit" disabled={formLoading} className="btn-ask">
                                            {formLoading ? 'Sending...' : 'Ask Question'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Gallery Section - Full Bleed */}
            {
                event.gallery && (
                    <div className="event-gallery-full-bleed">
                        <div className="gallery-header-row">
                            <h3 className="gallery-title-center" style={{ marginBottom: 0 }}>Highlights</h3>
                            <button onClick={openGrid} className="btn-view-all">
                                <span className="icon">🖼️</span> View All Photos
                            </button>
                        </div>
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            navigation
                            autoplay={{ delay: 3000 }}
                            loop={true}
                            className="gallery-slider-full"
                        >
                            {event.gallery.map((img, index) => (
                                <SwiperSlide key={index} onClick={() => openLightbox(img)}>
                                    <div className="gallery-slide-container" style={{ cursor: 'pointer' }}>
                                        <img src={img} alt={`Gallery ${index}`} className="gallery-image-full" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            }

            {/* Drive Link Modal */}
            {isDriveModalOpen && (
                <div className="feedback-modal-overlay" onClick={() => setIsDriveModalOpen(false)}>
                    <div className="feedback-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
                        <button className="feedback-close-btn" onClick={() => setIsDriveModalOpen(false)}>&times;</button>
                        <h3 style={{ marginTop: 0, color: '#1a73e8' }}>Access Event Photos 📸</h3>
                        <p style={{ color: '#5f6368', margin: '20px 0' }}>
                            To view the full high-resolution gallery on Google Drive, we recommend using your <strong>SJCEM Email ID</strong> for seamless access.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <a
                                href={event.driveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary-action"
                                style={{ textDecoration: 'none', justifyContent: 'center' }}
                            >
                                Continue to Drive 📂
                            </a>

                            <button
                                className="btn-outline-action"
                                onClick={() => {
                                    setIsDriveModalOpen(false);
                                    // Scroll to gallery
                                    const gallery = document.querySelector('.event-main-image');
                                    if (gallery) gallery.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                View Photos Here 🖼️
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                eventName={event.title}
                eventId={event.id}
            />
            {/* Floating Registration Bar */}
            <div className={`floating-registration-bar ${showFloatingBar ? 'show' : ''}`}>
                <div className="floating-content">
                    <div className="floating-info">
                        <h4>{event.title}</h4>
                        <p>📅 {event.date} • 📍 {event.location || 'SJCEM'}</p>
                    </div>
                    {event.buttons && event.buttons[0] && (
                        <a
                            href={event.buttons[0].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="floating-btn"
                        >
                            Register Now 🚀
                        </a>
                    )}
                </div>
            </div>

            {/* Mentor/Judge Modal */}
            {
                selectedProfile && (
                    <div className="organizer-modal-overlay" onClick={() => setSelectedProfile(null)}>
                        <div className="organizer-modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close-btn" onClick={() => setSelectedProfile(null)}>&times;</button>
                            <div className="modal-header">
                                <div
                                    className="modal-avatar"
                                    style={{
                                        backgroundImage: `url(${selectedProfile.image})`
                                    }}
                                ></div>
                            </div>
                            <div className="modal-body">
                                <h2 className="modal-name">{selectedProfile.name}</h2>
                                <p className="modal-role">{selectedProfile.role}</p>
                                {selectedProfile.bio && <p className="modal-bio">{selectedProfile.bio}</p>}

                                <div className="modal-socials-container" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                    {selectedProfile.linkedin && (
                                        <a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer" className="modal-social-link">LinkedIn</a>
                                    )}
                                    {selectedProfile.googleScholar && (
                                        <a href={selectedProfile.googleScholar} target="_blank" rel="noopener noreferrer" className="modal-social-link">Google Scholar</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Gallery Grid Overlay */}
            {
                showGalleryGrid && event.gallery && (
                    <div className="gallery-grid-overlay">
                        <div className="gallery-grid-header">
                            <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#202124' }}>{event.title} - Gallery</h3>
                            <button className="btn-close-grid" onClick={closeGrid}>Close ✕</button>
                        </div>
                        <div className="gallery-grid-content">
                            {event.gallery.map((img, index) => (
                                <div key={index} className="gallery-grid-item" onClick={() => openLightbox(img)}>
                                    <img src={img} alt={`Gallery ${index}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            {/* Lightbox Modal */}
            {
                selectedImage && (
                    <div className="lightbox-overlay" onClick={closeLightbox}>
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                            <img src={selectedImage} alt="Full size" className="lightbox-image" />
                        </div>
                    </div>
                )
            }
        </section >
    );
};

export default EventDetails;
