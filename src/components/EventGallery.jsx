import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { upcomingEvents, pastEvents } from '../data/eventsData';
import './Events.css'; // Reusing existing styles

const EventGallery = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    // Find event in upcoming or past events
    const allEvents = [...upcomingEvents, ...pastEvents];
    const event = allEvents.find(e => e.id.toString() === id);

    if (!event) {
        return (
            <div style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Event not found</h2>
                <button
                    onClick={() => navigate('/events')}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        background: '#4285F4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Back to Events
                </button>
            </div>
        );
    }

    const openLightbox = (img) => {
        setSelectedImage(img);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const handleShare = async (imgUrl) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Check out this photo from ${event.title}`,
                    text: `Here is a photo from the ${event.title} gallery!`,
                    url: imgUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(imgUrl).then(() => {
                alert('Image link copied to clipboard!');
            });
        }
    };

    return (
        <section className="section" style={{ minHeight: '100vh', paddingTop: '100px' }}>
            <div className="container">
                <div className="gallery-header" style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <button
                        className="btn-back-gallery"
                        onClick={() => navigate('/#events')}
                        title="Go Back"
                        style={{ marginBottom: '15px' }}
                    >
                        ← Back to Events
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                        <h1 style={{ fontSize: '2rem', color: '#202124', margin: 0 }}>{event.title} - Gallery</h1>

                        {/* LinkedIn Share Button */}
                        {event.driveLink && (
                            <a
                                href={`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`Check out the photos from ${event.title}! 📸✨\n\nAccess the full gallery here: ${event.driveLink}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-share-linkedin"
                                title="Share Gallery on LinkedIn"
                            >
                                Share on LinkedIn 🔗
                            </a>
                        )}
                    </div>
                </div>

                {/* Gallery Grid */}
                {event.gallery && event.gallery.length > 0 ? (
                    <div className="gallery-grid-content">
                        {event.gallery.map((img, index) => (
                            <div key={index} className="gallery-grid-item" onClick={() => openLightbox(img)}>
                                <img src={img} alt={`Gallery ${index}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
                        <p>No photos available for this event yet.</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                        <img src={selectedImage} alt="Full size" className="lightbox-image" />
                        <a
                            href={selectedImage}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lightbox-download"
                            onClick={(e) => e.stopPropagation()}
                        >
                            ⬇️ Download
                        </a>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleShare(selectedImage); }}
                            className="lightbox-share"
                            style={{
                                position: 'absolute',
                                bottom: '-50px',
                                right: '160px',
                                left: 'auto',
                                margin: 'auto',
                                background: 'white',
                                color: '#333',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '25px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: 'fit-content',
                                opacity: 0.9,
                                transition: 'all 0.2s'
                            }}
                        >
                            🔗 Share
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default EventGallery;
