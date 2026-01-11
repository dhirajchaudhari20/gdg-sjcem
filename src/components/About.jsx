import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./About.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          About Us
        </motion.h2>

        {/* INFO BOXES */}
        <div className="about-box-grid">
          <motion.div
            className="about-box blue"
            variants={fadeUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
          >
            <h3>Who We Are</h3>
            <p>
              Google Developer Group (GDG) on Campus at St. John College of
              Engineering and Management (Autonomous), Palghar is a vibrant
              student community passionate about technology, learning, and
              innovation.
            </p>
          </motion.div>

          <motion.div
            className="about-box green"
            variants={fadeUp}
            whileInView="visible"
            initial="hidden"
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3>What We Explore</h3>
            <p>
              We explore Google technologies like{" "}
              <strong>Cloud, Android, Web, AI/ML, and Firebase</strong>, while
              strengthening leadership, collaboration, and problem-solving
              skills.
            </p>
          </motion.div>

          <motion.div
            className="about-box red"
            variants={fadeUp}
            whileInView="visible"
            initial="hidden"
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>How We Learn</h3>
            <p>
              Through hands-on workshops, hackathons, technical talks, and
              peer-to-peer learning, we build future-ready developers and
              community leaders.
            </p>
          </motion.div>
        </div>

        {/* TECH STACK */}
        <motion.div
          className="tech-stack"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div className="tech-pill cloud" variants={fadeUp}>
            Cloud
          </motion.div>
          <motion.div className="tech-pill android" variants={fadeUp}>
            Android
          </motion.div>
          <motion.div className="tech-pill web" variants={fadeUp}>
            Web
          </motion.div>
          <motion.div className="tech-pill ai" variants={fadeUp}>
            AI / ML
          </motion.div>
          <motion.div className="tech-pill firebase" variants={fadeUp}>
            Firebase
          </motion.div>
        </motion.div>

        {/* SLIDER */}
        <motion.div
          className="about-slider-container"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="section-tag">Previous Events & Memories</span>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            centeredSlides
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation
          >
            {[
              "/images/event-1.webp",
              "/images/event-2.webp",
              "/images/event-3.webp",
              "/images/event-4.webp",
            ].map((img, i) => (
              <SwiperSlide key={i}>
                <div className="swiper-slide-content">
                  <img src={img} alt={`Event ${i + 1}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
