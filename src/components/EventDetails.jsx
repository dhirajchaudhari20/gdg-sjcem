import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { upcomingEvents, pastEvents } from '../data/eventsData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './EventDetails.css';

import AOS from 'aos';

const EventDetails = () => {
    const { id } = useParams();

    // Scroll to top and refresh animations on load
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            AOS.refresh();
        }, 500); // Small delay to ensure DOM is ready
    }, []);

    // Find event in either list
    const event = [...upcomingEvents, ...pastEvents].find(e => e.id.toString() === id);

    if (!event) {
        return (
            <div className="event-not-found">
                <h2>Event not found</h2>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        );
    }

    const eventDate = new Date(event.date);

    return (
        <section className="event-details-section">
            <Link to="/" className="back-nav-btn">← Back to Home</Link>

            <div className="event-details-hero">
                <img src={event.image} alt="Background" className="event-hero-bg" />
                <div className="event-hero-overlay">
                    <div className="event-hero-content" data-aos="fade-up">
                        <span className="event-badge">{event.type}</span>
                        <h1 className="event-hero-title">{event.title}</h1>
                        <div className="event-meta-row">
                            <span className="meta-icon-item">📅 {event.date}</span>
                            <span className="meta-icon-item">📍 {event.location || 'SJCEM Campus'}</span>
                            {event.registrations && (
                                <span className="meta-icon-item">👥 {event.registrations}+ Registered</span>
                            )}
                        </div>
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

                    {event.agenda && (
                        <div className="event-agenda">
                            <h3 className="agenda-title">Event Agenda</h3>
                            <div className="agenda-timeline">
                                {event.agenda.map((item, index) => (
                                    <div key={index} className="agenda-item">
                                        <div className="agenda-time">{item.time}</div>
                                        <div className="agenda-event-title">{item.title}</div>
                                        <div className="agenda-desc">{item.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {event.gallery && (
                        <div className="event-gallery">
                            <h3 className="gallery-title">Highlights</h3>
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000 }}
                                loop={true}
                                className="gallery-slider"
                            >
                                {event.gallery.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={img} alt={`Gallery ${index}`} className="gallery-image" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetails;
