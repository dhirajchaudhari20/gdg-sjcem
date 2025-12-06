import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import ImageWithLoader from './ImageWithLoader';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import './Organizers.css';

const Team = () => {
    const [selectedOrganizer, setSelectedOrganizer] = useState(null);
    const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        window.scrollTo(0, 0);
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
            twitter: null
        }
    ];

    const coreTeam = [
        {
            name: 'Dhiraj Chaudhari',
            role: 'GDGoC Organizer',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/dhiraj_chaudhari.jpeg',
            twitter: 'https://twitter.com/DhirajC39511965',
            bio: 'Passionate about building communities and empowering students through technology.'
        },
        {
            name: 'Aayush Bari',
            role: 'Co-Organizer',
            image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/aayush_bari.jpg',
            twitter: 'https://twitter.com/aayush_bari02',
            bio: 'Tech enthusiast and community builder.'
        }
    ];

    const techTeam = [
        {
            name: "Furquan Saiyed",
            role: "Technical Member",
            image: "https://i.ibb.co/PsTLNkfk/1761723296279.jpg",
            twitter: "https://www.linkedin.com/in/furquan-s-9331372a6",
            bio: "I enjoy learning new technologies and helping others grow in the developer community"
        },
        { name: 'Sumedh Patil', role: 'Technical Head', image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sumedh_patil_CV1e5fD.png' },
        { name: 'Shashikant Rajput', role: 'Web Lead' },
        { name: 'Prathamesh Jakkula', role: 'AIML/DSA Lead', image: 'https://media.licdn.com/dms/image/v2/D4D03AQEq9KDUDMDm9g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1727442836862?e=2147483647&v=beta&t=jYbosW2CKm2-yxozapKCka6dc6NDoNAUi3iyc4wBTWY' },
        { name: 'Hitanshu Vaidya', role: 'AI/ML Lead' },
        { name: 'Ramesh Choudhary', role: 'Tech Coordinator' },
        { name: 'Prashant Yadav', role: 'App Lead' },
        {
            name: 'Satyam R Tiwari',
            role: 'Backend Developer',
            image: 'https://i.ibb.co/v6MmDcds/1000121746.jpg',
            linkedin: 'https://www.linkedin.com/in/satyam-tiwari-219583276/',
            github: 'https://github.com/Satyamrtiwari'
        },
        { name: 'Satyam Ashok Mahto', role: 'Volunteer' },
        { name: 'Rudra Kushal Jaikar', role: 'Volunteer' },
        {
            name: 'Kunal Bhandarkar',
            role: 'Technical Team Volunteer',
            image: 'https://i.ibb.co/fYyRkXS9/IMG-20250820-145505.jpg',
            linkedin: 'https://www.linkedin.com/in/kunal-bhandarkar-24ba3a2b3'
        },
        { name: 'Riya Singh', role: 'Tech Member' },
        { name: 'Sairaj Khade', role: 'Tech Member' },
        { name: 'Anushri Sane', role: 'Tech Member' },
        { name: 'Sakshi Mhatre', role: 'Volunteer' },
        { name: 'Saish Mekal', role: 'Web Dev Lead' }
    ];

    const eventsTeam = [
        { name: 'Rupesh Nandale', role: 'Events & Operations Head', image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rupesh_nandale_eQDyo0t.jpeg' },
        { name: 'Lokesh Rane', role: 'Outreach Coordinator' },
        { name: 'Sahil Dongre', role: 'Volunteer' },
        { name: 'Mihir Pimple', role: 'Logistic Manager' },
        { name: 'Darshan Repale', role: 'Volunteer' },
        { name: 'Kamlesh Choudhary', role: 'Volunteer' },
        { name: 'Vighnesh Rane', role: 'Member' },
        { name: 'Neha Parab', role: 'Coordinator' },
        { name: 'Jyoti Awasthi', role: 'Volunteer' },
        { name: 'Siddhant Koli', role: 'Manager' },
        { name: 'Smital Raut', role: 'Volunteer' },
        { name: 'Rajendra Rajput', role: 'Member' },
        { name: 'Shivprasad Umbare', role: 'Manager' },
        { name: 'Tejas Bhavthankar', role: 'Coordinator' },
        {
            name: 'Vidhi Jain',
            role: 'Event Volunteer',
            image: 'https://i.ibb.co/BH7Vc2rb/1000012426.jpg',
            bio: "I'm Vidhi, an event member who's passionate about decor and knows how to manage an event! Still learning and exploring.",
            linkedin: 'https://www.linkedin.com/in/vidhi-jain-b68418318',
            github: 'https://github.com/vidhii-24',
            instagram: 'https://www.instagram.com/vidhi_jain_._'
        },
        { name: 'Upasana Meher', role: 'Member' },
        { name: 'Jowin Mascarenhas', role: 'Media/Volunteer' },
        { name: 'Neej Patel', role: 'Member' }
    ];

    const communityTeam = [
        { name: 'Sahas Bochare', role: 'Community Head', image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg' },
        { name: 'Sejal Rai', role: 'Marketing Head', image: 'https://media.licdn.com/dms/image/v2/D4E03AQE0pqh_npE7bQ/profile-displayphoto-scale_200_200/B4EZlln7rdKQAY-/0/1758346591904?e=1766620800&v=beta&t=Z8phlcanXrqhmSGB_Q7PPxypHkc12KSHRogFe9aD4k0' },
        { name: 'Vaibhav Somanna', role: 'Community Coordinator' },
        { name: 'Vaishnavi Khandagale', role: 'PR Member' },
        { name: 'Tanaya Bagade', role: 'Member' },
        { name: 'Saanj Bari', role: 'PR Member' },
        { name: 'Sadaf Asar', role: 'Member' },
        { name: 'Prachi Rambriksh', role: 'Member' },
        { name: 'Pratishtha Upadhyay', role: 'Member' },
        { name: 'Devyani Jadhav', role: 'Volunteer' },
        { name: 'Rupali Kashid', role: 'Ambassador' },
        { name: 'S. Madhav', role: 'Volunteer' },
        { name: 'Priti Vishwakarma', role: 'PR Member' },
        { name: 'Dev Sehgal', role: 'PR & Outreach Manager' }
    ];

    const mediaTeam = [
        { name: 'Abhijeet Rogye', role: 'Design & Media Head', image: 'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/abhijeet_rogye_DhOJ3Wv.jpg' },
        { name: 'Manasvi Kadu', role: 'Social Media Head', image: 'https://media.licdn.com/dms/image/v2/D4D35AQEmVUB1ryOArA/profile-framedphoto-shrink_800_800/B4DZqM3HvqH0Ag-/0/1763299851612?e=1765569600&v=beta&t=8jkpW_MOY-oNMI8sTZGlbg_BIkk5ab_X3iAyXL2Th9s' },
        { name: 'Devanshu Pal', role: 'Social Media Manager' },
        { name: 'Sai Deepak Alim', role: 'Volunteer' },
        { name: 'Siddhant Meher', role: 'Media & Design Lead' },
        { name: 'Vidhisha Sonar', role: 'Design Member' },
        { name: 'Kushal Mali', role: 'Member', image: 'https://media.licdn.com/dms/image/v2/D4D03AQEnJP7XBOHz6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707369848628?e=1766620800&v=beta&t=tjxCvW6Wm9FvWWgvKd3B_rpR-hDgn5qWuui8xi8e6Ps' },
        { name: 'Juee Patil', role: 'Member' },
        {
            name: 'Viraj Tamhanekar',
            role: 'Media Member',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQHuJOwdR7GHIQ/profile-displayphoto-crop_800_800/B4DZqvjKeRIkAI-/0/1763881823603?e=1766620800&v=beta&t=bpxNqsH4OwnOTszb4C4Gd6hUe2yCYlfFqPZs3E3FZOE',
            linkedin: 'https://www.linkedin.com/in/viraj-tamhanekar/'
        },
        { name: 'Aarchi Pimple', role: 'Graphic Designer' },
        { name: 'Shivanshu Mishra', role: 'Media & Design Lead' },
        { name: 'Aarya Krup', role: 'Media Member', image: null },
        { name: 'Tanishka Gharat', role: 'Volunteer' },
        { name: 'Viren Soni', role: 'Member' },
        { name: 'Parveen Shaikh', role: 'Volunteer' }
    ];

    const contentTeam = [
        { name: 'Aleena Joji', role: 'Content Head' },
        {
            name: 'Siddhi Akre',
            role: 'Coordinator',
            image: 'https://media.licdn.com/dms/image/v2/D4D03AQH-31z--vjkSw/profile-displayphoto-scale_200_200/B4DZkfMzcHIEAY-/0/1757165075955?e=1766620800&v=beta&t=gKakyLie0g9SF8FrmGJLitpZhiOTb8kDfB9zBkqf-mc',
            linkedin: 'https://www.linkedin.com/in/siddhi-akre-1199b5250/'
        },
        { name: 'Rutuja Gharat', role: 'Technical Writer' },
        { name: 'Durvesh Vinherkar', role: 'Content Lead' },
        { name: 'Ilf Bhimani', role: 'Member' },
        { name: 'Ayushi Shukla', role: 'Member' },
        { name: 'Prem Nayi', role: 'Coordinator' },
        { name: 'Ritika Chaurasiya', role: 'Member' },
        { name: 'Rashmi Chaudhari', role: 'Member' }
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
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                    ) : (
                        <span className="initials">{getInitials(org.name)}</span>
                    )}
                </div>

                <div className="People-styles-info">
                    <h2 className="organizer-name-premium" dir="auto">{org.name}</h2>
                    <p className="organizer-role-premium" dir="auto">{org.role}</p>

                    {/* Social Icons on Card */}
                    <div className="card-socials" onClick={(e) => e.stopPropagation()}>
                        {org.linkedin && (
                            <a href={org.linkedin} target="_blank" rel="noreferrer" className="social-icon linkedin">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        )}
                        {org.github && (
                            <a href={org.github} target="_blank" rel="noreferrer" className="social-icon github">
                                <i className="fab fa-github"></i>
                            </a>
                        )}
                        {org.instagram && (
                            <a href={org.instagram} target="_blank" rel="noreferrer" className="social-icon instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                        )}
                        {org.twitter && (
                            <a href={org.twitter} target="_blank" rel="noreferrer" className="social-icon twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                        )}
                    </div>
                </div>
            </li>
        </Tilt>
    );

    return (
        <section className="section organizers-section theme-provider-namespace-people-card" style={{ paddingTop: '120px' }}>
            <div className="container">
                <h1 className="section-title" data-aos="fade-up">Visionary Leaders</h1>
                <ul className="organizers-grid faculty-grid">
                    {facultyAdvisor.map(renderOrganizerCard)}
                </ul>

                <h1 className="section-title" data-aos="fade-up" style={{ marginTop: '3rem' }}>Core Team</h1>
                <ul className="organizers-grid">
                    {coreTeam.map(renderOrganizerCard)}
                </ul>

                <div className="team-divider" style={{ margin: '4rem 0' }}></div>

                <h2 className="section-title team-title" data-aos="fade-right">Tech Wizards 💻</h2>
                <ul className="organizers-grid team-grid">
                    {techTeam.map(renderOrganizerCard)}
                </ul>

                <h2 className="section-title team-title" data-aos="fade-left" style={{ marginTop: '3rem' }}>Events & Operations 🚀</h2>
                <ul className="organizers-grid team-grid">
                    {eventsTeam.map(renderOrganizerCard)}
                </ul>

                <h2 className="section-title team-title" data-aos="fade-right" style={{ marginTop: '3rem' }}>Community & Marketing 🤝</h2>
                <ul className="organizers-grid team-grid">
                    {communityTeam.map(renderOrganizerCard)}
                </ul>

                <h2 className="section-title team-title" data-aos="fade-left" style={{ marginTop: '3rem' }}>Media & Design 🎨</h2>
                <ul className="organizers-grid team-grid">
                    {mediaTeam.map(renderOrganizerCard)}
                </ul>

                <h2 className="section-title team-title" data-aos="fade-right" style={{ marginTop: '3rem' }}>Content & Research 📝</h2>
                <ul className="organizers-grid team-grid">
                    {contentTeam.map(renderOrganizerCard)}
                </ul>
            </div>

            {/* Modal */}
            {selectedOrganizer && (
                <div className="organizer-modal-overlay" onClick={() => setSelectedOrganizer(null)}>
                    <div className="organizer-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedOrganizer(null)}>&times;</button>
                        <div className="modal-header">
                            <div
                                className="modal-avatar clickable"
                                onClick={() => setIsAvatarExpanded(true)}
                                style={{
                                    backgroundColor: selectedOrganizer.image ? 'transparent' : '#4285F4'
                                }}>
                                {selectedOrganizer.image ? (
                                    <ImageWithLoader
                                        src={getOptimizedImageUrl(selectedOrganizer.image, 600)}
                                        alt={selectedOrganizer.name}
                                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
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
                            {selectedOrganizer.linkedin && (
                                <a href={selectedOrganizer.linkedin} target="_blank" rel="noreferrer" className="modal-social-link">LinkedIn</a>
                            )}
                            {selectedOrganizer.github && (
                                <a href={selectedOrganizer.github} target="_blank" rel="noreferrer" className="modal-social-link">GitHub</a>
                            )}
                            {selectedOrganizer.instagram && (
                                <a href={selectedOrganizer.instagram} target="_blank" rel="noreferrer" className="modal-social-link">Instagram</a>
                            )}
                            {selectedOrganizer.twitter && (
                                <a href={selectedOrganizer.twitter} target="_blank" rel="noreferrer" className="modal-social-link">Twitter/X</a>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Avatar Lightbox */}
            {isAvatarExpanded && selectedOrganizer && selectedOrganizer.image && (
                <div
                    className="avatar-lightbox"
                    onClick={() => setIsAvatarExpanded(false)}
                >
                    <img
                        src={selectedOrganizer.image}
                        alt={selectedOrganizer.name}
                        className="lightbox-image"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                    />
                    <button className="lightbox-close-btn" onClick={() => setIsAvatarExpanded(false)}>&times;</button>
                </div>
            )}
        </section>
    );
};

export default Team;
