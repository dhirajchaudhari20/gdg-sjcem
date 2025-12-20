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
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            centeredSlides={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            navigation={true}
                            loop={true}
                            className="about-swiper"
                        >
                            {[
                                "/videos/Kickoff V2.mp4",
                                "/images/techsprint/kickoff/IMG_7930.JPG",
                                "/images/techsprint/kickoff/IMG_7955.JPG",

                                "https://media.licdn.com/dms/image/v2/D5622AQHB4kn72S0XDw/feedshare-shrink_2048_1536/B56ZsqwQtoIEAw-/0/1765948951225?e=1767830400&v=beta&t=BlvY6ceoqyxT7es-XSJ5Cetl7x9Hb6CgvA-EeViIHl0",

                                "https://media.licdn.com/dms/image/v2/D5622AQHhR2AZqev7ow/feedshare-shrink_2048_1536/B56ZsqwQu8IAAw-/0/1765948955675?e=1767830400&v=beta&t=vkoVv6zFEi-JG8K6RreINsxhx80vTiGHkpYSCj73Ijk",
                                "https://media.licdn.com/dms/image/v2/D5622AQEzwc6sjy_9Ew/feedshare-shrink_2048_1536/B56ZsqwQtYJ8Aw-/0/1765948941362?e=1767830400&v=beta&t=a6D7bb3iP1p9XQOgdKoJ9zQcHyjIuq_IRwtOrAWFMgU",

                                "https://media.licdn.com/dms/image/v2/D5622AQGD3OaHaFjaKQ/feedshare-shrink_2048_1536/B56ZsqwQxVJsAw-/0/1765948954327?e=1767830400&v=beta&t=2uulNLxO2qCg_kx5kyhR7zp9OtwmenxbyKk6rZ8plrY",
                                "https://media.licdn.com/dms/image/v2/D5622AQG1I1VGUEKbTw/feedshare-shrink_2048_1536/B56ZsqwQxxKEAw-/0/1765948955314?e=1767830400&v=beta&t=RfP8lOmeHJUdviwdyPIdOtiOJI_C7MPMzUZD7IqNVAc",

                                "/images/techsprint/kickoff/IMG_7967.JPG",


                                "/images/techsprint/kickoff/IMG_8069.JPG",


                                "https://media.licdn.com/dms/image/v2/D5622AQEQf33OsGpzNw/feedshare-shrink_2048_1536/B56ZsqwQy3I0Aw-/0/1765948954407?e=1767830400&v=beta&t=CZ6nGdT_19LbgyyiZx5lDEBMFPi9R45rnnSALeX_Drk",






                                "https://media.licdn.com/dms/image/v2/D5622AQEP-jHa3GY7uQ/feedshare-shrink_2048_1536/B56ZsqwQ0sG8Aw-/0/1765948958286?e=1767830400&v=beta&t=ACIwxsYYWfMa68Qc-FFkWoFr51WFSwfYJwHezxkmNGA",

                                "https://media.licdn.com/dms/image/v2/D5622AQELeCChP4AxEA/feedshare-shrink_2048_1536/B56ZsqwQzGJwAw-/0/1765948953980?e=1767830400&v=beta&t=8rKz2D_GWibd5IroXMMfaklZWJ8NnWfSEmDUJMwkanw",


                                "https://media.licdn.com/dms/image/v2/D5622AQF40D_9H_auLw/feedshare-shrink_2048_1536/B56ZsqwQzqGgAw-/0/1765948956839?e=1767830400&v=beta&t=3IvA7DQxqyih92_DWHcEw8IHGsf6FPvnK03rOo46PhU",




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
                                "/images/event-4.webp"
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
