import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import Tilt from 'react-parallax-tilt';

const Projects = ({ preview = false }) => {
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false);

    const handleSubmitClick = (e) => {
        e.preventDefault();
        setIsNavigating(true);
        // Simulate loading for better UX before navigation
        setTimeout(() => {
            navigate('/submit-idea');
        }, 800);
    };

    const projects = [
        {
            id: 1,
            title: 'Style Share',
            description: 'A platform to create, explore, and share Tailwind CSS components. Built with TypeScript, Express, React, Recoil, Prisma, MongoDB, and Tailwind CSS.',
            image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            tags: ['React', 'TypeScript', 'Tailwind CSS', 'Prisma', 'MongoDB'],
            github: 'http://github.com/VaibhavArora314/StyleShare',
            demo: 'https://style-share.vercel.app/app/'
        },
        {
            id: 2,
            title: 'Mumbai University Paper Hub',
            description: 'A centralized platform for Mumbai University resources including question papers, syllabus, and solutions. Features a smart chatbot for efficient retrieval.',
            image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80',
            tags: ['PHP', 'Java', 'Web Dev', 'Chatbot'],
            github: 'https://github.com/dhirajchaudhari20/-Mumbai-University-Paper-Hub',
            demo: 'https://mupaperhub.netlify.app/index.html'
        }
    ];

    const displayProjects = preview ? projects.slice(0, 3) : projects;

    return (
        <section className="projects-section">
            <div className="projects-container">
                <h1 className="projects-title" data-aos="fade-down">Community Projects</h1>
                <p className="projects-subtitle" data-aos="fade-up" data-aos-delay="200">
                    Innovative solutions built by the bright minds of GDG SJCEM.
                </p>

                <div className="projects-grid">
                    {displayProjects.map((project, index) => (
                        <Tilt
                            key={project.id}
                            tiltMaxAngleX={5}
                            tiltMaxAngleY={5}
                            scale={1.02}
                            transitionSpeed={1500}
                            className="project-card-tilt"
                        >
                            <div
                                className="project-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="project-image-wrapper">
                                    <img src={project.image} alt={project.title} className="project-image" />
                                </div>
                                <div className="project-content">
                                    <div className="project-tags">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="tech-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="project-name">{project.title}</h3>
                                    <p className="project-desc">{project.description}</p>
                                    <div className="project-links">
                                        <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
                                            GitHub ↗
                                        </a>
                                        <a href={project.demo} className="project-link" target="_blank" rel="noreferrer">
                                            Live Demo ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    ))}
                </div>

                {preview && (
                    <div className="view-all-container" data-aos="fade-up">
                        <a href="/projects" className="view-all-btn">
                            View All Projects →
                        </a>
                    </div>
                )}

                <div className="submit-project-cta" data-aos="zoom-in" data-aos-delay="200">
                    <div className="cta-content">
                        <h2 className="cta-title">Have a Project Idea? 💡</h2>
                        <p className="cta-desc">
                            Work on real-world problems with our expert mentorship.
                            <br />
                            <strong>Perks:</strong> Get <span className="highlight">Certificates of Appreciation</span> & exclusive <span className="highlight">Google Swags</span> upon completion! 🏆🎁
                        </p>
                        <button
                            className="submit-btn"
                            onClick={handleSubmitClick}
                            disabled={isNavigating}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '1rem auto' }}
                        >
                            {isNavigating ? (
                                <>
                                    <span className="loader-spinner" style={{ width: '20px', height: '20px', border: '3px solid white', borderBottomColor: 'transparent' }}></span>
                                    Wait...
                                </>
                            ) : 'Submit Your Idea'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
