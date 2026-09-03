import React, { useEffect } from 'react';
import './Gallery.css';

const Gallery = ({ preview = false }) => {
    useEffect(() => {
        if (!preview) {
            window.scrollTo(0, 0);
        }
    }, [preview]);

    const images = [
        "/images/techsprint-day1/uploaded_image_0_1765824705394.png",
        "/images/techsprint-day1/uploaded_image_1_1765824705394.png",
        "/images/techsprint-day1/uploaded_image_2_1765824705394.png",
        "/images/techsprint-day1/uploaded_image_3_1765824705394.png",
        "/images/techsprint-day1/uploaded_image_4_1765824705394.png",
        "https://i.ibb.co/xtMWG5bB/IMG-0354.avif",
        "https://i.ibb.co/mFBXVYTS/IMG-0370.avif",
        "https://i.ibb.co/ybtt9nh/IMG-0383.avif",
        "https://i.ibb.co/RGw3wqpg/IMG-0389.avif",
        "https://i.ibb.co/cKDyxhgw/IMG-0398.avif",
        "https://i.ibb.co/pjT400g4/IMG-20250924-151820514.jpg",
        "/images/event-1.webp",
        "/images/event-2.webp",
        "/images/event-3.webp",
        "/images/event-4.webp",
        "/images/event-5.webp"
    ];

    const displayImages = preview ? images.slice(0, 8) : images;

    return (
        <section className={`section gallery-section ${preview ? 'gallery-preview' : ''}`} id={preview ? 'gallery-preview' : 'gallery'}>
            <div className="container">
                <h1 className="section-title" data-aos="fade-down">{preview ? 'Moments that Matter' : 'Event Gallery'}</h1>
                <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                    {preview ? 'A snapshot of our vibrant community activities.' : 'A glimpse into our vibrant community events and workshops.'}
                </p>

                <div className="gallery-grid">
                    {displayImages.map((src, index) => (
                        <div key={index} className="gallery-item" data-aos="fade-up" data-aos-delay={index * 50}>
                            <img src={src} alt={`Gallery Event ${index + 1}`} loading="lazy" decoding="async" />
                            <div className="gallery-overlay">
                                <span>GDG Event</span>
                            </div>
                        </div>
                    ))}
                </div>

                {preview && (
                    <div className="view-all-container" data-aos="fade-up" style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a href="/gallery" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                            View Full Gallery 📸
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
