import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import './Events.css';
import CountdownTimer from './CountdownTimer';
import { upcomingEvents, pastEvents } from '../data/eventsData';

const Events = () => {
    // No more local state for modals

    return (
        <section id="events" className="section events-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-down" data-aos-duration="1000">Upcoming Events</h2>
                <div className="events-grid upcoming">
                    {upcomingEvents.map((event, index) => {
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
                                            src={event.image}
                                            alt={event.title}
                                            loading="lazy"
                                            decoding="async"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                                        />
                                        <div className="event-date-badge">
                                            <span className="day">{event.date.split(' ')[0]}</span>
                                            <span className="month">{event.date.split(' ')[1]}</span>
                                        </div>
                                    </div>
                                    <div className="event-content">
                                        <span className="event-type">{event.type}</span>
                                        <h3 className="event-title">{event.title}</h3>
                                        {event.showTimer && <CountdownTimer targetDate="Dec 13, 2025 10:00:00" />}
                                        <p className="event-desc">{event.description}</p>

                                        <div className="event-buttons">
                                            <Link
                                                to={`/events/${event.id}`}
                                                className="btn btn-primary view-details-btn"
                                                style={{ textAlign: 'center', textDecoration: 'none', width: '100%' }}
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        );
                    })}
                </div>

                <h2 className="section-title past-title" data-aos="fade-right" data-aos-offset="200">Past Events</h2>
                <div className="events-list">
                    {pastEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className="event-row"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="event-date-col">
                                <span className="date-text">{event.date}</span>
                            </div>
                            <div className="event-info-col">
                                <span className="event-type-sm">{event.type}</span>
                                <h4 className="event-title-sm">{event.title}</h4>
                                <p className="event-location">{event.location}</p>
                                <div className="event-stats-row" style={{ display: 'flex', gap: '15px', marginTop: '5px', alignItems: 'center' }}>
                                    <span className="badge-closed" style={{
                                        background: '#EA4335', color: 'white', padding: '2px 8px',
                                        borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600'
                                    }}>
                                        Registration Closed
                                    </span>
                                    <span className="reg-count" style={{ fontSize: '0.85rem', color: '#5f6368', fontWeight: '500' }}>
                                        👥 {event.registrations}+ Registrations
                                    </span>
                                </div>
                            </div>
                            <div className="event-action-col">
                                <Link
                                    to={`/events/${event.id}`}
                                    className="btn-text"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
