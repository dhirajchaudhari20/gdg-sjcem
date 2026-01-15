import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import ImageWithLoader from './ImageWithLoader';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import './Organizers.css';

const Organizers = () => {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedOrganizer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedOrganizer]);

    const facultyAdvisor = [
        {
            name: 'Dr. Sunny Sall',
            role: 'Faculty Advisor & HOD Computer Engineering',
            image: 'https://i.ibb.co/RTNCNWTD/file-2.jpg',
            bio: 'Head of Department, Computer Engineering. Guiding the GDG on Campus chapter to excellence.',
            linkedin: 'https://www.linkedin.com/in/sunny-sall-12372b284/?originalSubdomain=in',
            googleScholar: 'https://scholar.google.com/citations?user=DV2d_v8AAAAJ&hl=en'
        }
    ];

    const coreTeam = [
        {
            name: 'Dhiraj Chaudhari',
            role: 'GDGoC Organizer',
            image: 'https://media.licdn.com/dms/image/v2/D4D22AQFrIHuwofHGkw/feedshare-shrink_2048_1536/B4DZXZcd5FHIAo-/0/1743109876086?e=1767830400&v=beta&t=7dPb6Dkl1IRdYF-YJ7Y5d_bz3sTpZHKkiv6YCB0HFec',
            twitter: 'https://twitter.com/DhirajC39511965',
            linkedin: 'https://www.linkedin.com/in/dhirajchaudhari20/',
            github: 'https://github.com/dhirajchaudhari20',
            instagram: 'https://www.instagram.com/the_alpha_engineer/',
            bio: 'Passionate about building communities and empowering students through technology.'
        },
        {
            name: 'Aayush Mahesh Bari',
            role: 'Co-Organizer',
            image: 'https://i.ibb.co/qFpsP4MF/Profile-Pic.jpg',
            linkedin: 'https://www.linkedin.com/in/aayush-bari/',
            github: 'https://github.com/Aayush0735',
            instagram: 'https://www.instagram.com/aayush.bari.585',
            twitter: 'https://x.com/aayush_bari01',
            bio: 'I work at the intersection of Agentic AI, TensorFlow, and RAG, building solutions that are scalable, performant, and meaningful. I enjoy sharing knowledge through workshops, events, and mentorship, helping students grow in emerging tech. As GDG Co-Organizer, I foster community innovation and hands-on learning.'
        }
    ];

    const departmentLeads = [
        {
            name: 'Abhijeet Rogye',
            role: 'Design & Media Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg',
            linkedin: 'https://www.linkedin.com/in/abhijeetrogye/'
        },
        {
            name: 'Sumedh Patil',
            role: 'Technical Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png',
            linkedin: 'https://www.linkedin.com/in/sumedh-patil-640512251/',
            github: 'https://github.com/Sumedh1102',
            instagram: 'https://www.instagram.com/sumedh1102'
        },
        {
            name: 'Rupesh Nandale',
            role: 'Events & Operations Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rupesh_nandale_eQDyo0t.jpeg',
            linkedin: 'https://www.linkedin.com/in/rupesh-nandale-287678277/',
            github: 'https://github.com/rupesh108-iebe',
            twitter: 'https://x.com/Anvayu108'
        },
        {
            name: 'Sahas Santosh Bochare',
            role: 'Community & Marketing Head',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg',
            linkedin: 'https://www.linkedin.com/in/sahasbochare',
            bio: 'Leading with passion | Growing with community 💖'
        },
        {
            name: 'Manasvi Kadu',
            role: 'Social Media Head',
            image: 'https://i.ibb.co/3yk1pRCB/IMG-20251206-153035.jpg',
            linkedin: 'https://www.linkedin.com/in/manasvi-kadu-8729b3286',
            github: 'https://github.com/AlgoWhizMk',
            twitter: 'https://x.com/manasvi52370?t=HBTufU3UyjMkyQP0ZwmUbA&s=09',
            instagram: 'https://www.instagram.com/_manasv.iii?igsh=MWl2MDA0eGk1NzgxOA==',
            bio: 'Bringing clean design, creative ideas, and an eye for trends to elevate GDG on Campus SJCEM’s social media identity.'
        },
        {
            name: 'Sejal Rai',
            role: 'PR & Outreach Lead',
            image: 'https://media.licdn.com/dms/image/v2/D4E03AQE0pqh_npE7bQ/profile-displayphoto-scale_200_200/B4EZlln7rdKQAY-/0/1758346591904?e=1766620800&v=beta&t=Z8phlcanXrqhmSGB_Q7PPxypHkc12KSHRogFe9aD4k0',
            linkedin: 'https://www.linkedin.com/in/sejal-rai-18334a321/'
        },
        {
            name: 'Aleena Maria Joji',
            role: 'Content Lead',
            image: 'https://i.ibb.co/ycV0QkCQ/1000153477.png',
            linkedin: 'https://www.linkedin.com/in/aleenajoji',
            instagram: 'https://www.instagram.com/_aleena21_?igsh=MXZhazlpMzdzYW9vdw=='
        },
        {
            name: 'Prathamesh Jakkula',
            role: 'AIML/DSA Lead',
            image: 'https://i.ibb.co/35jPBNjj/profile.jpg',
            linkedin: 'https://www.linkedin.com/in/prathamesh-jakkula-496a39285/',
            github: 'https://github.com/Prathamesh01110',
            twitter: 'https://x.com/Prathamesh01_',
            bio: "Started as a participant, became a finalist, then a winner; now I mentor and judge hackathons, with still a long way to go. I enjoy working with Google’s AI tools ,Building agents, and practical ML projects while helping others learn faster."
        }
    ];

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').substring(0, 2);
    };

    const renderOrganizerCard = (org, index) => (
        <Tilt
            key={index}
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            scale={1.02}
            transitionSpeed={400}
            className="organizer-tilt-card"
            data-aos="fade-up"
        >
            <li
                className="people-card general-card"
                onClick={() => setSelectedOrganizer(org)}
            >
                <div
                    className="organizer-avatar-bg"
                    style={{
                        backgroundColor: org.image ? 'transparent' : '#e8f0fe',
                        color: '#1a73e8'
                    }}
                >
                    {org.image ? (
                        <ImageWithLoader
                            src={getOptimizedImageUrl(org.image, 400)}
                            alt={org.name}
                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                        />
                    ) : (
                        <span className="initials">{getInitials(org.name)}</span>
                    )}
                </div>

                <div className="People-styles-info">
                    <h2 className="organizer-name-premium" dir="auto">{org.name}</h2>
                    <p className="organizer-role-premium" dir="auto">{org.role}</p>

                    <div className="card-socials" onClick={(e) => e.stopPropagation()}>
                        {org.linkedin && (
                            <a href={org.linkedin} target="_blank" rel="noreferrer" className="social-icon linkedin">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        )}
                        {org.github && (
                            <a href={org.github} target="_blank" rel="noreferrer" className="social-icon github">
                                <i className="fab fa-github"></i>
                            </a>
                        )}
                        {org.twitter && (
                            <a href={org.twitter} target="_blank" rel="noreferrer" className="social-icon twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                        )}
                        {org.instagram && (
                            <a href={org.instagram} target="_blank" rel="noreferrer" className="social-icon instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                        )}
                        {org.googleScholar && (
                            <a href={org.googleScholar} target="_blank" rel="noreferrer" className="social-icon google-scholar" title="Google Scholar">
                                <i className="fas fa-graduation-cap"></i>
                            </a>
                        )}
                    </div>
                </div>
            </li>
        </Tilt>
    );

    return (
        <section id="organizers" className="section organizers-section theme-provider-namespace-people-card">
            <div className="container">
                <h1 className="section-title" data-aos="fade-up">Visionary Leaders</h1>
                <ul className="organizers-grid faculty-grid">
                    {facultyAdvisor.map(renderOrganizerCard)}
                </ul>

                <h1 className="section-title" data-aos="fade-up" style={{ marginTop: '3rem' }}>Core Team</h1>
                <ul className="organizers-grid">
                    {coreTeam.map(renderOrganizerCard)}
                </ul>

                <h1 className="section-title" data-aos="fade-up" style={{ marginTop: '3rem', color: '#FBBC04' }}>Department Leads</h1>
                <ul className="organizers-grid team-grid">
                    {departmentLeads.map(renderOrganizerCard)}
                </ul>

                <div className="view-more-container" style={{ textAlign: 'center', marginTop: '60px' }} data-aos="fade-up">
                    <Link to="/team" className="btn btn-outline" style={{
                        padding: '16px 40px',
                        fontSize: '1.2rem',
                        borderRadius: '50px',
                        borderWidth: '2px',
                        fontWeight: '600'
                    }}>
                        Meet the Full Team →
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {selectedOrganizer && (
                <div className="organizer-modal-overlay" onClick={() => setSelectedOrganizer(null)}>
                    <div className="organizer-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedOrganizer(null)}>&times;</button>
                        <div className="modal-header">
                            <div className="modal-avatar"
                                style={{
                                    backgroundColor: selectedOrganizer.image ? 'transparent' : '#4285F4'
                                }}>
                                {selectedOrganizer.image ? (
                                    <ImageWithLoader
                                        src={getOptimizedImageUrl(selectedOrganizer.image, 600)}
                                        alt={selectedOrganizer.name}
                                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <span className="initials">{getInitials(selectedOrganizer.name)}</span>
                                )}
                            </div>
                        </div>
                        <div className="modal-body">
                            <h2 className="modal-name">{selectedOrganizer.name}</h2>
                            <p className="modal-role">{selectedOrganizer.role}</p>
                            {selectedOrganizer.bio && <p className="modal-bio">{selectedOrganizer.bio}</p>}
                            <div className="card-socials" style={{ justifyContent: 'center', marginTop: '1rem' }}>
                                {selectedOrganizer.linkedin && (
                                    <a href={selectedOrganizer.linkedin} target="_blank" rel="noreferrer" className="social-icon linkedin" title="LinkedIn">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                )}
                                {selectedOrganizer.github && (
                                    <a href={selectedOrganizer.github} target="_blank" rel="noreferrer" className="social-icon github" title="GitHub">
                                        <i className="fab fa-github"></i>
                                    </a>
                                )}
                                {selectedOrganizer.twitter && (
                                    <a href={selectedOrganizer.twitter} target="_blank" rel="noreferrer" className="social-icon twitter" title="Twitter/X">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                )}
                                {selectedOrganizer.instagram && (
                                    <a href={selectedOrganizer.instagram} target="_blank" rel="noreferrer" className="social-icon instagram" title="Instagram">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                )}
                                {selectedOrganizer.googleScholar && (
                                    <a href={selectedOrganizer.googleScholar} target="_blank" rel="noreferrer" className="social-icon google-scholar" title="Google Scholar">
                                        <i className="fas fa-graduation-cap"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Organizers;
