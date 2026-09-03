import React, { useEffect } from 'react';
import './Events.css';

const EventModal = ({ event, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!event) return null;

    return (
        <div className="event-modal-overlay" onClick={onClose}>
            <div className="event-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>&times;</button>

                {event.image && (
                    <div className="event-modal-image-wrapper">
                        <img src={event.image} alt={event.title} className="event-modal-image" />
                    </div>
                )}

                <div className="event-modal-details">
                    <span className="event-modal-type">{event.type}</span>
                    <h2 className="event-modal-title">{event.title}</h2>

                    <div className="event-meta">
                        <div className="meta-item">📅 {event.date}</div>
                        {event.location && <div className="meta-item">📍 {event.location}</div>}
                    </div>

                    <p className="event-modal-description">{event.description || "Join us for this exciting event where we will explore the latest technologies and connect with industry experts."}</p>

                    <div className="event-modal-actions">
                        <button className="btn btn-primary modal-action-btn">Register Now</button>
                        <div className="modal-secondary-actions">
                            <button className="btn btn-outline modal-action-btn">View Photos 📸</button>
                            {event.materialsLink && (
                                <a
                                    href={event.materialsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline modal-action-btn"
                                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    View Materials 📚
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;
