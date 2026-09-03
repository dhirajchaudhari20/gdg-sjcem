import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import './Events.css';
import CountdownTimer from './CountdownTimer';
import { upcomingEvents, pastEvents } from '../data/eventsData';

const Events = () => {
    // combine all events to sort dynamically
    const allEvents = useMemo(() => [...upcomingEvents, ...pastEvents], []);

    const navigate = useNavigate();

    // Navigate to separate gallery page
    const goToGallery = (event) => {
        if (!event.gallery || event.gallery.length === 0) return;
        navigate(`/events/gallery/${event.id}`);
    };

    // Helper to parse dates like "16 Dec 2025" or "16 Dec 2025 – 13 Jan 2026"
    const parseEventDate = (dateStr) => {
        try {
            // Handle ranges: "16 Dec 2025 – 13 Jan 2026"
            if (dateStr.includes('–')) {
                const parts = dateStr.split('–').map(s => s.trim());
                const endPart = parts[1];
                // Check if end part has year, if not assume same as start (though usually it does or implies next year logic if spans)
                // For simplicity, assume the provided strings in data are full enough or we parse aggressively.
                // Our data format: "16 Dec 2025 – 13 Jan 2026" -> both have year.
                // If "16-18 Dec 2025" -> split logic would differ? Assuming "start - end" format with full dates or at least parseable.
                return new Date(endPart);
            }
            return new Date(dateStr);
        } catch (e) {
            console.error("Date parse error", dateStr, e);
            return new Date(); // Fallback
        }
    };

    // Helper for "Event Started" status (Start Date <= Today <= End Date)
    const isEventActive = (dateStr) => {
        try {
            const now = new Date();
            if (dateStr.includes('–')) {
                const [startStr, endStr] = dateStr.split('–').map(s => s.trim());
                const startDate = new Date(startStr);
                const endDate = new Date(endStr);
                // Set end date to end of day
                endDate.setHours(23, 59, 59, 999);
                return now >= startDate && now <= endDate;
            } else {
                // Single day event
                const date = new Date(dateStr);
                return now.getDate() === date.getDate() &&
                    now.getMonth() === date.getMonth() &&
                    now.getFullYear() === date.getFullYear();
            }
        } catch (e) {
            return false;
        }
    };

    const sortedEvents = useMemo(() => {
        const now = new Date();
        // Reset time for cleaner day comparison if needed, but for "past", strictly < now is good.
        // Actually for events "ending today", they are still upcoming/active until day end.
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const upcoming = [];
        const past = [];

        // Sort by ID to ensure stability or Date if preferred
        // Let's filter first
        allEvents.forEach(event => {
            const endDate = parseEventDate(event.date);
            // If end date is effectively "before today" (yesterday or earlier), it's past.
            // We'll set the check time to end of the event day.
            endDate.setHours(23, 59, 59, 999);

            if (event.status === 'ended' || endDate < now) {
                past.push(event);
            } else {
                upcoming.push(event);
            }
        });

        // Sort upcoming by date (nearest first)
        upcoming.sort((a, b) => {
            const dateA = new Date(a.date.split('–')[0]); // Start date
            const dateB = new Date(b.date.split('–')[0]);
            return dateA - dateB;
        });

        // Sort past by date (most recent first)
        past.sort((a, b) => {
            const dateA = new Date(a.date.split('–')[0]);
            const dateB = new Date(b.date.split('–')[0]);
            return dateB - dateA;
        });

        return { upcoming, past };
    }, [allEvents]);

    return (
        <section id="events" className="section events-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-down" data-aos-duration="1000">Upcoming Events</h2>
                <div className="events-grid upcoming">
                    {sortedEvents.upcoming.length > 0 ? (
                        sortedEvents.upcoming.map((event, index) => {
                            const active = isEventActive(event.date);
                            const startDateParts = event.date.split('–')[0].trim().split(' ');
                            const day = startDateParts[0];
                            const month = startDateParts[1];

                            return (
                                <Tilt
                                    key={event.id}
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    scale={1.02}
                                    transitionSpeed={1500}
                                    className="tilt-card-wrapper"
                                >
                                    <div
                                        className="event-card upcoming-card"
                                        data-aos="zoom-in"
                                        data-aos-delay={index * 150}
                                        data-aos-duration="1200"
                                    >
                                        <div className="event-image">
                                            <img
                                                src={event.image || 'https://via.placeholder.com/400x200?text=No+Image'}
                                                alt={event.title}
                                                loading="lazy"
                                                decoding="async"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Image+Unavailable'; }}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                            />
                                            <div className="event-date-badge">
                                                <span className="day">{day}</span>
                                                <span className="month">{month}</span>
                                            </div>
                                        </div>
                                        {/* Clickable Image Overlay for Gallery */}
                                        {event.gallery && (
                                            <div
                                                className="clickable-overlay"
                                                onClick={() => goToGallery(event)}
                                                style={{
                                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '200px',
                                                    cursor: 'pointer', zIndex: 5
                                                }}
                                                title="View Photos"
                                            ></div>
                                        )}
                                        <div className="event-content">
                                            <span className="event-type">{event.type}</span>
                                            <h3 className="event-title">{event.title}</h3>

                                            {/* Show "Event Started!" only if actually active */}
                                            {active && (
                                                <div className="event-status-active">
                                                    <span className="pulsating-dot"></span> Event Started!
                                                </div>
                                            )}

                                            {/* Show Timer only if specifically enabled and NOT active yet? Or always? 
                                                User config 'showTimer': true logic. Usually we hide timer if started.
                                            */}
                                            {event.showTimer && !active && <CountdownTimer targetDate={`${event.date.split('–')[0]} 11:15:00`} />}

                                            <p className="event-desc">{event.description}</p>

                                            <div className="event-buttons">
                                                <Link
                                                    to={`/events/${event.id}`}
                                                    className="btn btn-primary view-details-btn"
                                                    style={{ textAlign: 'center', textDecoration: 'none', width: '100%' }}
                                                >
                                                    View Details →
                                                </Link>

                                                {(event.gallery || event.driveLink) && (
                                                    <div className="event-action-buttons">
                                                        {event.gallery && (
                                                            <button
                                                                onClick={() => goToGallery(event)}
                                                                className="event-btn-secondary"
                                                            >
                                                                🖼️ Photos
                                                            </button>
                                                        )}
                                                        {event.driveLink && (
                                                            <a
                                                                href={event.driveLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="event-btn-secondary"
                                                            >
                                                                📂 Drive
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Tilt>
                            );
                        })
                    ) : (
                        <div className="no-events-msg">
                            <p>No upcoming events at the moment. Stay tuned!</p>
                        </div>
                    )}
                </div>

                <h2 className="section-title past-title" data-aos="fade-right" data-aos-offset="200">Past Events</h2>
                <div className="events-list">
                    {sortedEvents.past.map((event, index) => (
                        <div
                            key={event.id}
                            className="event-row"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div
                                className="event-date-col clickable-image"
                                onClick={() => event.gallery && goToGallery(event)}
                                title={event.gallery ? "Click to view photos" : ""}
                                style={{ cursor: event.gallery ? 'pointer' : 'default' }}
                            >
                                <span className="date-text">{event.date}</span>
                                {/* Optional: Show small thumbnail if available logic permitted, preserving layout */}
                            </div>
                            <div className="event-info-col">
                                <span className="event-type-sm">{event.type}</span>
                                <h4 className="event-title-sm">{event.title}</h4>
                                <p className="event-location">{event.location}</p>
                                <div className="event-stats-row">
                                    <span className="badge-event-ended">
                                        Event Ended
                                    </span>
                                    <span className="reg-count-text">
                                        👥 {event.registrations}+ Registrations
                                    </span>
                                </div>
                            </div>
                            <div className="event-action-col event-action-col-inner">
                                <Link
                                    to={`/events/${event.id}`}
                                    className="btn-text"
                                >
                                    View Details
                                </Link>

                                <div className="event-action-buttons-past">
                                    {event.gallery && (
                                        <button
                                            onClick={() => goToGallery(event)}
                                            className="event-btn-secondary"
                                            style={{
                                                background: 'none',
                                                border: '1px solid var(--border-color)'
                                            }}
                                        >
                                            🖼️ Photos
                                        </button>
                                    )}
                                    {event.driveLink && (
                                        <a
                                            href={event.driveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="event-btn-secondary"
                                            style={{
                                                background: 'none',
                                                border: '1px solid var(--border-color)'
                                            }}
                                        >
                                            📂 Drive
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
};

export default Events;
