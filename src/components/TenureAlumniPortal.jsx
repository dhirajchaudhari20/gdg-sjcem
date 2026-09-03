import React, { useState } from 'react';
import { teamData } from '../data/teamData';
import './TenureAlumniPortal.css';

// Enhanced Alumni & Tenure Data mapping
const TENURE_YEARS = [
    { id: '2025-26', label: '2025–26 Tenure (Current)', badge: 'Active Chapter' },
    { id: '2024-25', label: '2024–25 Tenure (Founding Team)', badge: 'Pioneer Alumni' },
    { id: '2026-27', label: '2026–27 Tenure (Incoming)', badge: 'Next Generation' }
];

const TenureAlumniPortal = () => {
    const [selectedTenure, setSelectedTenure] = useState('2025-26');
    const [activeDepartment, setActiveDepartment] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMemberCertificate, setSelectedMemberCertificate] = useState(null);

    // Categories
    const departments = ['All', 'Tech', 'Events', 'Community', 'Media', 'Content'];

    // Filter members
    const filteredMembers = teamData.filter(member => {
        const matchesDept = activeDepartment === 'All' || member.department === activeDepartment;
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              member.role.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDept && matchesSearch;
    });

    const handlePrintCertificate = () => {
        window.print();
    };

    return (
        <div className="alumni-portal-wrapper">
            {/* Top Hero Banner */}
            <div className="alumni-hero-header">
                <div className="container text-center">
                    <div className="alumni-badge-pill" data-aos="fade-down">
                        <span className="dot blue"></span>
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        Official GDG on Campus SJCEM • Member & Alumni Portal
                    </div>
                    <h1 data-aos="fade-up">Organizer & Team Tenure Portal</h1>
                    <p className="alumni-subheading" data-aos="fade-up" data-aos-delay="100">
                        Honoring the leaders, organizers, and active members who built and sustained the developer community at St. John College of Engineering and Management.
                    </p>

                    {/* Tenure Tabs */}
                    <div className="tenure-tabs-container" data-aos="zoom-in" data-aos-delay="200">
                        {TENURE_YEARS.map(tenure => (
                            <button
                                key={tenure.id}
                                className={`tenure-tab-btn ${selectedTenure === tenure.id ? 'active' : ''}`}
                                onClick={() => setSelectedTenure(tenure.id)}
                            >
                                <span className="tenure-label">{tenure.label}</span>
                                <span className="tenure-badge">{tenure.badge}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container alumni-content-container">

                {/* Chapter Verification Header Box */}
                <div className="official-verification-card" data-aos="fade-up">
                    <div className="card-left-brand">
                        <img 
                            src="/images/event-1.webp" 
                            alt="GDG Logo" 
                            className="gdg-chapter-logo"
                            onError={(e) => { e.target.src = 'https://i.ibb.co/Ng0NCJvj/blob-Pca-Hqc5.webp'; }}
                        />
                        <div>
                            <h3>Google Developer Group on Campus</h3>
                            <p className="chapter-subtitle">St. John College of Engineering and Management (Autonomous) • Palghar</p>
                            <div className="verification-seal">
                                🛡️ Verified Chapter Tenure Registry ({selectedTenure})
                            </div>
                        </div>
                    </div>

                    <div className="card-right-signatures">
                        <div className="sig-item">
                            <div className="digital-signature-text">Dhiraj Chaudhari</div>
                            <div className="sig-line"></div>
                            <span className="sig-title">Dhiraj K. Chaudhari</span>
                            <span className="sig-role">GDG Chapter Lead / Organizer</span>
                        </div>
                        <div className="sig-item">
                            <div className="digital-signature-text faculty">Dr. Sunny Sall</div>
                            <div className="sig-line"></div>
                            <span className="sig-title">Dr. Sunny Sall</span>
                            <span className="sig-role">Faculty Coordinator & Mentor</span>
                        </div>
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="alumni-toolbar">
                    <div className="dept-pills">
                        {departments.map(dept => (
                            <button 
                                key={dept}
                                className={`dept-pill ${activeDepartment === dept ? 'active' : ''}`}
                                onClick={() => setActiveDepartment(dept)}
                            >
                                {dept} {dept === 'All' ? `(${teamData.length})` : ''}
                            </button>
                        ))}
                    </div>

                    <div className="search-input-box">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search member name or role..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Members Grid */}
                <div className="members-grid-container">
                    {filteredMembers.map((member, idx) => (
                        <div 
                            key={idx} 
                            className="member-card"
                            data-aos="fade-up"
                            data-aos-delay={(idx % 6) * 50}
                        >
                            <div className="member-avatar-circle">
                                {member.name.charAt(0)}
                            </div>
                            <div className="member-info">
                                <h3 className="member-name">{member.name}</h3>
                                <div className="member-role-badge">{member.role}</div>
                                <span className={`dept-tag ${member.department.toLowerCase()}`}>
                                    {member.department} Department
                                </span>
                                <div className="tenure-period-text">
                                    Tenure: <strong>{selectedTenure}</strong>
                                </div>
                            </div>

                            <button 
                                className="btn-verify-certificate"
                                onClick={() => setSelectedMemberCertificate(member)}
                            >
                                📜 Verify Tenure Certificate
                            </button>
                        </div>
                    ))}
                </div>

            </div>

            {/* Official Certificate Verification Modal */}
            {selectedMemberCertificate && (
                <div className="certificate-modal-overlay" onClick={() => setSelectedMemberCertificate(null)}>
                    <div className="certificate-paper-card" onClick={(e) => e.stopPropagation()}>
                        
                        <button className="cert-close-btn" onClick={() => setSelectedMemberCertificate(null)}>✕</button>

                        <div className="certificate-printable-area">
                            {/* Certificate Border */}
                            <div className="certificate-inner-border">
                                <div className="cert-header">
                                    <div className="cert-gdg-dots">
                                        <span className="dot blue"></span>
                                        <span className="dot red"></span>
                                        <span className="dot yellow"></span>
                                        <span className="dot green"></span>
                                    </div>
                                    <h4 className="cert-org-name">Google Developer Groups on Campus</h4>
                                    <p className="cert-college">St. John College of Engineering and Management (Autonomous), Palghar</p>
                                </div>

                                <div className="cert-title-block">
                                    <h2>Certificate of Recognition & Tenure</h2>
                                    <p className="cert-subtext">PROUDLY PRESENTED TO</p>
                                </div>

                                <h1 className="cert-recipient-name">{selectedMemberCertificate.name}</h1>

                                <p className="cert-body-text">
                                    In sincere appreciation of your dedicated service, leadership, and outstanding contributions as 
                                    <br />
                                    <strong>{selectedMemberCertificate.role} ({selectedMemberCertificate.department} Department)</strong>
                                    <br />
                                    during the official <strong>{selectedTenure} Tenure</strong> at GDG on Campus SJCEM.
                                </p>

                                <div className="cert-footer-flex">
                                    <div className="cert-signature-box">
                                        <div className="handwritten-sig">Dhiraj Chaudhari</div>
                                        <div className="sig-divider"></div>
                                        <strong>Dhiraj Kishor Chaudhari</strong>
                                        <span>GDG Chapter Lead / Organizer</span>
                                    </div>

                                    <div className="cert-official-seal">
                                        <div className="seal-circle">
                                            <span>VERIFIED</span>
                                            <span className="seal-year">{selectedTenure}</span>
                                            <span>GDG SJCEM</span>
                                        </div>
                                    </div>

                                    <div className="cert-signature-box">
                                        <div className="handwritten-sig faculty">DR SUNNY SALL</div>
                                        <div className="sig-divider"></div>
                                        <strong>Faculty Coordinator</strong>
                                        <span>GDG SJCEM Mentor</span>
                                    </div>
                                </div>

                                <div className="cert-id-footer">
                                    Official Certificate ID: <code>GDG-SJCEM-{selectedTenure}-{selectedMemberCertificate.name.replace(/\s+/g, '').toUpperCase().slice(0, 8)}</code>
                                </div>
                            </div>
                        </div>

                        <div className="modal-cert-actions">
                            <button className="btn btn-primary" onClick={handlePrintCertificate}>
                                🖨️ Download / Print Official Certificate
                            </button>
                            <button className="btn btn-secondary" onClick={() => setSelectedMemberCertificate(null)}>
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default TenureAlumniPortal;
