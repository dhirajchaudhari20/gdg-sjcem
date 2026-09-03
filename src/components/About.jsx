import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import './About.css';

const About = () => {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [swiperRef, setSwiperRef] = React.useState(null);

    const openLightbox = (imgUrl) => {
        setSelectedImage(imgUrl);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'unset'; // Restore scrolling
    };

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">About Us</h2>
                <div className="about-content">
                    <div className="about-text" data-aos="fade-up" data-aos-delay="200">
                        <p>
                            Google Developer Group (GDG) on Campus at St. John College of Engineering and Management (Autonomous), Palghar is a vibrant student community passionate about technology, learning, and innovation.
                        </p>
                        <p>
                            As part of the global GDG network, we create opportunities for students to explore Google technologies such as <strong>Cloud, Android, Web, AI/ML, and Firebase</strong>, while also building essential skills in problem-solving, leadership, and collaboration.
                        </p>
                        <p>
                            Through hands-on workshops, hackathons, technical talks, and peer-to-peer learning, we aim to bridge the gap between academic knowledge and real-world application empowering students to grow into future-ready developers, creators, and community leaders.
                        </p>
                    </div>
                    <div className="tech-stack">
                        <div className="tech-item cloud" data-aos="fade-up" data-aos-delay="300">Cloud</div>
                        <div className="tech-item android" data-aos="fade-up" data-aos-delay="350">Android</div>
                        <div className="tech-item web" data-aos="fade-up" data-aos-delay="400">Web</div>
                        <div className="tech-item ai" data-aos="fade-up" data-aos-delay="450">AI/ML</div>
                        <div className="tech-item firebase" data-aos="fade-up" data-aos-delay="500">Firebase</div>
                    </div>

                    <div className="about-slider-container" data-aos="fade-up" data-aos-delay="600">
                        <div className="slider-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <span className="section-tag">Previous Events & Memories</span>
                        </div>
                        <Swiper
                            onSwiper={setSwiperRef}
                            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 120,
                                modifier: 2,
                                slideShadows: false,
                            }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            navigation={true}
                            loop={true}
                            loopAdditionalSlides={3}
                            className="about-swiper"
                        >
                            {[
                                "/images/event-1.webp",
                                "/images/event-2.webp",
                                "/images/event-3.webp",
                                "/images/event-4.webp",
                                "/images/techsprint/kickoff/IMG_7930.JPG",
                                "/images/techsprint/kickoff/IMG_7955.JPG",
                                "/images/techsprint/kickoff/IMG_7967.JPG",
                                "/images/techsprint/kickoff/IMG_8069.JPG",
                                "https://i.ibb.co/xtMWG5bB/IMG-0354.avif",
                                "https://i.ibb.co/mFBXVYTS/IMG-0370.avif",
                                "https://i.ibb.co/ybtt9nh/IMG-0383.avif",
                                "https://i.ibb.co/RGw3wqpg/IMG-0389.avif",
                                "https://i.ibb.co/cKDyxhgw/IMG-0398.avif",
                                "https://i.ibb.co/pjT400g4/IMG-20250924-151820514.jpg"
                            ].map((item, index) => (
                                <SwiperSlide key={index} onClick={() => !item.endsWith('.mp4') && openLightbox(item)}>
                                    <div className="swiper-slide-content">
                                        {item.endsWith('.mp4') ? (
                                            <video
                                                src={item}
                                                controls
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
                                                onClick={(e) => e.stopPropagation()}
                                                onPlay={() => swiperRef?.autoplay?.stop()}
                                                onPause={() => swiperRef?.autoplay?.start()}
                                                onEnded={() => swiperRef?.autoplay?.start()}
                                            />
                                        ) : (
                                            <img src={item} alt={`Community Event ${index + 1}`} />
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                        <img src={selectedImage} alt="Full size" className="lightbox-image" />
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
