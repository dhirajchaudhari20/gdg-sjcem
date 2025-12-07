import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { upcomingEvents, pastEvents } from '../data/eventsData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './EventDetails.css';
import FeedbackModal from './FeedbackModal';

import AOS from 'aos';

const EventDetails = () => {
    const { id } = useParams();

    // Find event in either list - Moved up for access in hooks
    const event = [...upcomingEvents, ...pastEvents].find(e => e.id.toString() === id);

    const agendaRef = useRef(null);
    const progressLineRef = useRef(null);
    const timelineRef = useRef(null);
    const timelineProgressRef = useRef(null);

    // Function to handle timeline animation (reused for both Agenda and Timeline)
    const handleTimelineAnimation = (containerRef, lineRef) => {
        if (!containerRef.current || !lineRef.current) return;

        const container = containerRef.current;
        const progressLine = lineRef.current;
        const items = container.querySelectorAll('.agenda-item');
        const windowHeight = window.innerHeight;

        let maxActiveTop = 0;

        items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            if (itemRect.top < windowHeight * 0.75) {
                item.classList.add('active');
                const dotOffset = 36;
                maxActiveTop = (item.offsetTop + dotOffset);
            } else {
                item.classList.remove('active');
            }
        });

        if (maxActiveTop > 0) {
            progressLine.style.height = `${maxActiveTop}px`;
        } else {
            progressLine.style.height = '0px';
        }
    };

    // Scroll Animation Effect
    useEffect(() => {
        const handleScroll = () => {
            handleTimelineAnimation(agendaRef, progressLineRef);
            handleTimelineAnimation(timelineRef, timelineProgressRef);
        };

        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);

        return () => window.removeEventListener('scroll', handleScroll);
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
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

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
            const eventDateTime = new Date(`${event.date} 10:00:00`);
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
                                <span className="meta-icon-item">👥 {displayCount}+ Registered</span>
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
                        <img src={event.image} alt={event.title} />
                    </div>

                    <h3>About the Event</h3>
                    <div className="event-description">
                        {event.longDescription ? event.longDescription : event.description}
                    </div>
                </div>

                <div className="event-sidebar">
                    <div className="event-action-card">
                        <h3 className="event-sidebar-title">Join Us</h3>

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
                    </div>
                </div>
            </div>

            <div className="event-full-sections">
                {/* Agenda Section */}
                {event.agenda && (
                    <div className="event-agenda full-width-block">
                        <div className="content-wrapper">
                            <h3 className="agenda-title">Event Agenda</h3>
                            <div className="agenda-timeline" ref={agendaRef}>
                                <div className="agenda-progress-line" ref={progressLineRef}></div>
                                {event.agenda.map((item, index) => (
                                    <div
                                        key={index}
                                        className="agenda-item"
                                    >
                                        <div className="agenda-time">{item.time}</div>
                                        <div className="agenda-event-title">{item.title}</div>
                                        <div className="agenda-desc">{item.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Event Timeline (Redesigned) */}
                {event.timeline && (
                    <div className="event-timeline full-width-block">
                        <div className="content-wrapper">
                            <h3 className="agenda-title">Hackathon Timeline (Tentative)</h3>
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
                                {event.results.top10.length > 0 ? (
                                    <div className="teams-grid">
                                        {/* Render teams here later */}
                                    </div>
                                ) : (
                                    <div className="results-pending-banner">
                                        <span className="pending-icon-large">🏆</span>
                                        <p>Top 10 Teams - To be Announced</p>
                                    </div>
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

                {/* Mentors Section */}
                {event.mentors && (
                    <div className="event-mentors full-width-block">
                        <div className="content-wrapper">
                            <h3 className="mentors-title">Mentors</h3>
                            <div className="mentors-grid-large">
                                {event.mentors.map((mentor, index) => (
                                    <div key={index} className="mentor-card-large" data-aos="zoom-in" data-aos-delay={index * 100}>
                                        <img src={mentor.image} alt={mentor.name} className="mentor-image-large" />
                                        <div className="mentor-info">
                                            <h4 className="mentor-name-large">{mentor.name}</h4>
                                            <p className="mentor-role-large">{mentor.role}</p>
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
            {event.gallery && (
                <div className="event-gallery-full-bleed">
                    <h3 className="gallery-title-center">Highlights</h3>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        className="gallery-slider-full"
                    >
                        {event.gallery.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="gallery-slide-container">
                                    <img src={img} alt={`Gallery ${index}`} className="gallery-image-full" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
                eventName={event.title}
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
        </section>
    );
};

export default EventDetails;
