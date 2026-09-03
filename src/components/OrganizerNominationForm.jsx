import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, set } from "firebase/database";
import './OrganizerNominationForm.css';

const SKILL_OPTIONS = [
    'Google Cloud',
    'AI / Machine Learning',
    'Web Development',
    'App Development',
    'Cybersecurity',
    'Programming',
    'DevOps / Cloud',
    'UI/UX Design',
    'Public Speaking',
    'Event Management',
    'Social Media / Content',
    'Marketing / Outreach',
    'Community Management'
];

const OrganizerNominationForm = () => {
    const [viewMode, setViewMode] = useState('apply'); // 'apply' | 'guidelines'
    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        collegeEmail: '',
        personalEmail: '',
        contactNumber: '',
        gender: '',
        currentYear: '',
        branch: '',

        priorGdgParticipant: 'No',
        priorEventOrganizer: 'No',
        eventOrganizerDesc: '',
        otherCommunitiesDesc: '',

        skills: [],
        otherSkill: '',
        primaryContribution: '',
        proudProject: '',

        whyOrganizer: '',
        goodOrganizerTraits: '',
        ideasForTenure: '',
        timeCommitment: '',
        workshopScenario: '',
        firstInitiative: '',
        videoPitchUrl: '',
        
        agreedResponsibility: false,
        confirmedAccuracy: false
    });

    const [errors, setErrors] = useState({});

    const handleTextChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSkillToggle = (skill) => {
        setFormData(prev => {
            const exists = prev.skills.includes(skill);
            const updated = exists 
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills: updated };
        });
    };

    const validateStep = (step) => {
        const newErrors = {};
        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
            if (!formData.collegeEmail.trim()) {
                newErrors.collegeEmail = 'College Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.collegeEmail)) {
                newErrors.collegeEmail = 'Invalid email address';
            }
            if (!formData.personalEmail.trim()) {
                newErrors.personalEmail = 'Personal Email is required';
            }
            if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
            if (!formData.gender) newErrors.gender = 'Please select your gender';
            if (!formData.currentYear) newErrors.currentYear = 'Please select your current year';
            if (!formData.branch.trim()) newErrors.branch = 'Branch / Degree is required';
        }

        if (step === 2) {
            if (formData.priorEventOrganizer === 'Yes' && !formData.eventOrganizerDesc.trim()) {
                newErrors.eventOrganizerDesc = 'Please describe your organizing experience';
            }
        }

        if (step === 3) {
            if (formData.skills.length === 0 && !formData.otherSkill.trim()) {
                newErrors.skills = 'Please select at least one skill';
            }
            if (!formData.primaryContribution) newErrors.primaryContribution = 'Please select a primary contribution area';
            if (!formData.proudProject.trim()) newErrors.proudProject = 'Please describe a project or achievement you are proud of';
        }

        if (step === 4) {
            if (!formData.whyOrganizer.trim()) newErrors.whyOrganizer = 'Motivation is required';
            if (!formData.goodOrganizerTraits.trim()) newErrors.goodOrganizerTraits = 'Please fill out this field';
            if (!formData.ideasForTenure.trim()) newErrors.ideasForTenure = 'Please share your ideas for the 2026-27 tenure';
            if (!formData.timeCommitment) newErrors.timeCommitment = 'Please select your time commitment';
            if (!formData.workshopScenario.trim()) newErrors.workshopScenario = 'Workshop planning scenario response is required';
            if (!formData.firstInitiative.trim()) newErrors.firstInitiative = 'First initiative proposal is required';
            if (!formData.videoPitchUrl.trim()) {
                newErrors.videoPitchUrl = 'Video pitch link is required. Please share a YouTube, Google Drive, Loom, or Google Photos video link.';
            } else if (!/^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i.test(formData.videoPitchUrl)) {
                newErrors.videoPitchUrl = 'Please enter a valid URL starting with http:// or https://';
            }
        }

        if (step === 5) {
            if (!formData.agreedResponsibility) newErrors.agreedResponsibility = 'You must agree to the responsibility terms';
            if (!formData.confirmedAccuracy) newErrors.confirmedAccuracy = 'You must confirm that your data is accurate';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateAllSteps = () => {
        for (let s = 1; s <= 5; s++) {
            if (!validateStep(s)) {
                setCurrentStep(s);
                window.scrollTo({ top: 200, behavior: 'smooth' });
                return false;
            }
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 5));
            window.scrollTo({ top: 180, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 180, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateAllSteps()) return;

        setSubmitting(true);
        try {
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            const submissionCode = `GDG-2026-${randomCode}`;
            const submittedAtString = new Date().toLocaleString();
            const timestampKey = Date.now();
            
            const payload = {
                ...formData,
                allSkills: [...formData.skills, formData.otherSkill ? formData.otherSkill.trim() : ''].filter(Boolean),
                submissionCode,
                status: 'Under Review',
                submittedAtString,
                createdAtTimestamp: timestampKey
            };

            // Direct save to Firebase Realtime Database exported from firebase.js
            const applicationRef = ref(database, `organizer_applications_2026/APP_${timestampKey}`);
            await set(applicationRef, payload);

            setSubmittedData(payload);
            window.scrollTo({ top: 120, behavior: 'smooth' });
        } catch (err) {
            console.error("Firebase RTDB submission error:", err);
            alert(`Error submitting to Firebase: ${err.message || 'Network error'}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="nomination-page-wrapper">
            {/* GDG Top Header Banner */}
            <div className="gdg-header-hero">
                <div className="container">
                    <div className="gdg-badge">
                        <span className="dot blue"></span>
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        GDG on Campus SJCEM • 2026–27 Tenure
                    </div>
                    <h1>Student Organizer Application & Nomination Form</h1>
                    <p className="hero-desc">
                        Shape the future of developer culture at St. John College of Engineering and Management. Apply now to join the official 3 Student Organizer team!
                    </p>

                    {/* Public Navigation Tabs */}
                    <div className="view-toggle-bar">
                        <button 
                            className={`toggle-btn ${viewMode === 'apply' ? 'active' : ''}`}
                            onClick={() => setViewMode('apply')}
                        >
                            📝 Application Form
                        </button>
                        <button 
                            className={`toggle-btn ${viewMode === 'guidelines' ? 'active' : ''}`}
                            onClick={() => setViewMode('guidelines')}
                        >
                            📘 Tenure Playbook Guidelines
                        </button>
                    </div>
                </div>
            </div>

            <div className="container main-content-container">

                {/* VIEW 1: TENURE PLAYBOOK GUIDELINES */}
                {viewMode === 'guidelines' && (
                    <div className="guidelines-card" data-aos="fade-up">
                        <h2 className="section-heading">Official 2026–27 GDG on Campus Structure</h2>
                        <div className="guidelines-grid">
                            <div className="guide-box">
                                <div className="guide-icon">👥</div>
                                <h3>Team Composition</h3>
                                <p><strong>3 Student Organizers + 1 Faculty Organizer</strong></p>
                                <ul>
                                    <li><strong>1 Final Year Student</strong> (Leadership & experience)</li>
                                    <li><strong>2 Pre-Final Year Students</strong> (Continuity & drive)</li>
                                    <li><strong>1 Faculty Organizer</strong> (Institutional support)</li>
                                </ul>
                            </div>

                            <div className="guide-box">
                                <div className="guide-icon">⚖️</div>
                                <h3>One Team, Equal Standing</h3>
                                <p>All 3 student organizers are equal GDG on Campus Organizers without a single designated Lead. Responsibilities and ownership are shared across the team.</p>
                            </div>

                            <div className="guide-box highlight-box">
                                <div className="guide-icon">✨</div>
                                <h3>Mandatory Selection Criteria</h3>
                                <ul>
                                    <li><strong>Female Representation:</strong> At least 1 of the 3 Student Organizers MUST be female.</li>
                                    <li><strong>Technical Expertise:</strong> At least 1 Student Organizer MUST have a strong technical background.</li>
                                    <li><strong>Academic Diversity:</strong> Candidates can be from any branch or degree.</li>
                                    <li><strong>Merit & Passion:</strong> Avoid personal convenience; choose dedicated community builders.</li>
                                </ul>
                            </div>

                            <div className="guide-box">
                                <div className="guide-icon">📅</div>
                                <h3>Key Deadlines & Process</h3>
                                <p><strong>Submission Deadline:</strong> 15 September 2026</p>
                                <p><strong>Selection:</strong> Review of submissions → Shortlisting → Interview round → Advocu Official Onboarding.</p>
                            </div>
                        </div>

                        <div className="action-center">
                            <button className="btn btn-primary" onClick={() => setViewMode('apply')}>
                                Fill Out Application Form 🚀
                            </button>
                        </div>
                    </div>
                )}

                {/* VIEW 2: APPLICATION FORM */}
                {viewMode === 'apply' && (
                    <>
                        {submittedData ? (
                            <div className="success-card" data-aos="zoom-in">
                                <div className="success-badge-icon">🎉</div>
                                <h2>Application Submitted Successfully!</h2>
                                <p className="submission-code-badge">
                                    Reference ID: <strong>{submittedData.submissionCode}</strong>
                                </p>
                                <p className="success-body">
                                    Thank you, <strong>{submittedData.fullName}</strong>! Your application for GDG on Campus Student Organizer 2026–27 has been saved in Firebase Realtime Database.
                                </p>
                                <div className="info-summary-box">
                                    <p><strong>Email:</strong> {submittedData.collegeEmail}</p>
                                    <p><strong>Year & Branch:</strong> {submittedData.currentYear} - {submittedData.branch}</p>
                                    <p><strong>Primary Interest:</strong> {submittedData.primaryContribution}</p>
                                    <p><strong>Video Pitch:</strong> <a href={submittedData.videoPitchUrl} target="_blank" rel="noopener noreferrer">Watch Video Pitch 🎥</a></p>
                                    <p><strong>Status:</strong> <span className="status-tag review">{submittedData.status}</span></p>
                                </div>
                                <p className="next-steps-text">
                                    <strong>Next Steps:</strong> Shortlisted candidates will be contacted via email/WhatsApp for the interview round. If nominated by outgoing organizers, instructions for Advocu registration will follow.
                                </p>

                                <div className="btn-group" style={{ marginTop: '24px' }}>
                                    <button className="btn btn-primary" onClick={() => {
                                        setSubmittedData(null);
                                        setCurrentStep(1);
                                        setFormData({
                                            fullName: '', collegeEmail: '', personalEmail: '', contactNumber: '', gender: '', currentYear: '', branch: '',
                                            priorGdgParticipant: 'No', priorEventOrganizer: 'No', eventOrganizerDesc: '', otherCommunitiesDesc: '',
                                            skills: [], otherSkill: '', primaryContribution: '', proudProject: '',
                                            whyOrganizer: '', goodOrganizerTraits: '', ideasForTenure: '', timeCommitment: '', workshopScenario: '', firstInitiative: '', videoPitchUrl: '',
                                            agreedResponsibility: false, confirmedAccuracy: false
                                        });
                                    }}>
                                        Submit Another Response
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="form-card-container">
                                {/* Step Indicator */}
                                <div className="step-indicator-bar">
                                    <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                                        <div className="step-num">1</div>
                                        <span>Personal Details</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                                        <div className="step-num">2</div>
                                        <span>GDG Experience</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                                        <div className="step-num">3</div>
                                        <span>Skills & Tech</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}>
                                        <div className="step-num">4</div>
                                        <span>Motivation & Pitch</span>
                                    </div>
                                    <div className="step-line"></div>
                                    <div className={`step-item ${currentStep >= 5 ? 'active' : ''}`}>
                                        <div className="step-num">5</div>
                                        <span>Confirm</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="nomination-form">

                                    {/* STEP 1: PERSONAL & ACADEMIC DETAILS */}
                                    {currentStep === 1 && (
                                        <div className="form-step-pane" data-aos="fade-left">
                                            <h2 className="step-title">Section 1: Basic Information</h2>
                                            <p className="step-desc">Please provide your official contact details and academic background.</p>

                                            <div className="input-field-group">
                                                <label className="required">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    name="fullName" 
                                                    value={formData.fullName} 
                                                    onChange={handleTextChange} 
                                                    placeholder="e.g. Dhiraj Chaudhari" 
                                                    className={errors.fullName ? 'input-error' : ''}
                                                />
                                                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                                            </div>

                                            <div className="form-row-2">
                                                <div className="input-field-group">
                                                    <label className="required">College Email Address</label>
                                                    <input 
                                                        type="email" 
                                                        name="collegeEmail" 
                                                        value={formData.collegeEmail} 
                                                        onChange={handleTextChange} 
                                                        placeholder="student@sjcem.edu.in" 
                                                        className={errors.collegeEmail ? 'input-error' : ''}
                                                    />
                                                    {errors.collegeEmail && <span className="error-msg">{errors.collegeEmail}</span>}
                                                </div>

                                                <div className="input-field-group">
                                                    <label className="required">Personal Email Address</label>
                                                    <input 
                                                        type="email" 
                                                        name="personalEmail" 
                                                        value={formData.personalEmail} 
                                                        onChange={handleTextChange} 
                                                        placeholder="yourname@gmail.com" 
                                                        className={errors.personalEmail ? 'input-error' : ''}
                                                    />
                                                    {errors.personalEmail && <span className="error-msg">{errors.personalEmail}</span>}
                                                </div>
                                            </div>

                                            <div className="form-row-2">
                                                <div className="input-field-group">
                                                    <label className="required">WhatsApp / Contact Number</label>
                                                    <input 
                                                        type="tel" 
                                                        name="contactNumber" 
                                                        value={formData.contactNumber} 
                                                        onChange={handleTextChange} 
                                                        placeholder="+91 9876543210" 
                                                        className={errors.contactNumber ? 'input-error' : ''}
                                                    />
                                                    {errors.contactNumber && <span className="error-msg">{errors.contactNumber}</span>}
                                                </div>

                                                <div className="input-field-group">
                                                    <label className="required">Gender</label>
                                                    <select 
                                                        name="gender" 
                                                        value={formData.gender} 
                                                        onChange={handleTextChange}
                                                        className={errors.gender ? 'input-error' : ''}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Female">Female (Recommended for diversity criteria)</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Prefer not to say">Prefer not to say</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.gender && <span className="error-msg">{errors.gender}</span>}
                                                </div>
                                            </div>

                                            <div className="form-row-2">
                                                <div className="input-field-group">
                                                    <label className="required">Current Year of Study (for 2026-27)</label>
                                                    <select 
                                                        name="currentYear" 
                                                        value={formData.currentYear} 
                                                        onChange={handleTextChange}
                                                        className={errors.currentYear ? 'input-error' : ''}
                                                    >
                                                        <option value="">Select Year</option>
                                                        <option value="Pre-Final Year">Pre-Final Year (2 Positions)</option>
                                                        <option value="Final Year">Final Year (1 Position)</option>
                                                        <option value="2nd Year">2nd Year</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.currentYear && <span className="error-msg">{errors.currentYear}</span>}
                                                </div>

                                                <div className="input-field-group">
                                                    <label className="required">Branch / Degree</label>
                                                    <input 
                                                        type="text" 
                                                        name="branch" 
                                                        value={formData.branch} 
                                                        onChange={handleTextChange} 
                                                        placeholder="e.g. Computer Engineering / Artificial Intelligence" 
                                                        className={errors.branch ? 'input-error' : ''}
                                                    />
                                                    {errors.branch && <span className="error-msg">{errors.branch}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 2: GDG & COMMUNITY EXPERIENCE */}
                                    {currentStep === 2 && (
                                        <div className="form-step-pane" data-aos="fade-left">
                                            <h2 className="step-title">Section 2: GDG & Community Experience</h2>
                                            <p className="step-desc">Tell us about your background in tech events and community building.</p>

                                            <div className="input-field-group">
                                                <label className="required">Have you previously participated in GDG on Campus activities?</label>
                                                <div className="radio-pill-group">
                                                    <label className={`radio-pill ${formData.priorGdgParticipant === 'Yes' ? 'selected' : ''}`}>
                                                        <input 
                                                            type="radio" 
                                                            name="priorGdgParticipant" 
                                                            value="Yes" 
                                                            checked={formData.priorGdgParticipant === 'Yes'} 
                                                            onChange={handleTextChange} 
                                                        />
                                                        Yes
                                                    </label>
                                                    <label className={`radio-pill ${formData.priorGdgParticipant === 'No' ? 'selected' : ''}`}>
                                                        <input 
                                                            type="radio" 
                                                            name="priorGdgParticipant" 
                                                            value="No" 
                                                            checked={formData.priorGdgParticipant === 'No'} 
                                                            onChange={handleTextChange} 
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">Have you organized any technical or community events before?</label>
                                                <div className="radio-pill-group">
                                                    <label className={`radio-pill ${formData.priorEventOrganizer === 'Yes' ? 'selected' : ''}`}>
                                                        <input 
                                                            type="radio" 
                                                            name="priorEventOrganizer" 
                                                            value="Yes" 
                                                            checked={formData.priorEventOrganizer === 'Yes'} 
                                                            onChange={handleTextChange} 
                                                        />
                                                        Yes
                                                    </label>
                                                    <label className={`radio-pill ${formData.priorEventOrganizer === 'No' ? 'selected' : ''}`}>
                                                        <input 
                                                            type="radio" 
                                                            name="priorEventOrganizer" 
                                                            value="No" 
                                                            checked={formData.priorEventOrganizer === 'No'} 
                                                            onChange={handleTextChange} 
                                                        />
                                                        No
                                                    </label>
                                                </div>
                                            </div>

                                            {formData.priorEventOrganizer === 'Yes' && (
                                                <div className="input-field-group">
                                                    <label className="required">Briefly describe your event organizing experience</label>
                                                    <textarea 
                                                        name="eventOrganizerDesc" 
                                                        value={formData.eventOrganizerDesc} 
                                                        onChange={handleTextChange} 
                                                        rows="3" 
                                                        placeholder="Describe your role, event scale, challenges faced..."
                                                        className={errors.eventOrganizerDesc ? 'input-error' : ''}
                                                    ></textarea>
                                                    {errors.eventOrganizerDesc && <span className="error-msg">{errors.eventOrganizerDesc}</span>}
                                                </div>
                                            )}

                                            <div className="input-field-group">
                                                <label>Have you been part of any other technical communities, clubs, or student organizations? (Optional)</label>
                                                <textarea 
                                                    name="otherCommunitiesDesc" 
                                                    value={formData.otherCommunitiesDesc} 
                                                    onChange={handleTextChange} 
                                                    rows="3" 
                                                    placeholder="e.g. IEEE, CSI, Google Developer Groups, Open Source..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 3: SKILLS & TECHNICAL BACKGROUND */}
                                    {currentStep === 3 && (
                                        <div className="form-step-pane" data-aos="fade-left">
                                            <h2 className="step-title">Section 3: Skills & Technical Expertise</h2>
                                            <p className="step-desc">Identify your technical and management competencies (at least 1 organizer must have a strong technical background).</p>

                                            <div className="input-field-group">
                                                <label className="required">What are your strongest skills?</label>
                                                <p className="sub-label">Select all that apply:</p>
                                                <div className="checkbox-grid">
                                                    {SKILL_OPTIONS.map(skill => (
                                                        <label key={skill} className={`checkbox-chip ${formData.skills.includes(skill) ? 'checked' : ''}`}>
                                                            <input 
                                                                type="checkbox" 
                                                                checked={formData.skills.includes(skill)} 
                                                                onChange={() => handleSkillToggle(skill)} 
                                                            />
                                                            {skill}
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.skills && <span className="error-msg">{errors.skills}</span>}

                                                <div style={{ marginTop: '14px' }}>
                                                    <input 
                                                        type="text" 
                                                        name="otherSkill" 
                                                        value={formData.otherSkill} 
                                                        onChange={handleTextChange} 
                                                        placeholder="Other skill (e.g. Flutter, Kotlin, Docker, Video Editing)..." 
                                                    />
                                                </div>
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">Which area would you primarily like to contribute to?</label>
                                                <select 
                                                    name="primaryContribution" 
                                                    value={formData.primaryContribution} 
                                                    onChange={handleTextChange}
                                                    className={errors.primaryContribution ? 'input-error' : ''}
                                                >
                                                    <option value="">Select Contribution Area</option>
                                                    <option value="Technical (Workshops, Hackathons, Code Reviews)">Technical (Workshops, Hackathons, Code Reviews)</option>
                                                    <option value="Community & Events (Logistics, Anchoring, Member Experience)">Community & Events (Logistics, Anchoring, Member Experience)</option>
                                                    <option value="Content & Social Media (Design, Reels, Blogs, Graphics)">Content & Social Media (Design, Reels, Blogs, Graphics)</option>
                                                    <option value="Outreach & Partnerships (Sponsorships, Collaborations, PR)">Outreach & Partnerships (Sponsorships, Collaborations, PR)</option>
                                                    <option value="Cross-functional (Can contribute across all areas)">Cross-functional (Can contribute across all areas)</option>
                                                </select>
                                                {errors.primaryContribution && <span className="error-msg">{errors.primaryContribution}</span>}
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">Tell us about one technical project, achievement, certification, or activity you are proud of</label>
                                                <textarea 
                                                    name="proudProject" 
                                                    value={formData.proudProject} 
                                                    onChange={handleTextChange} 
                                                    rows="4" 
                                                    placeholder="Share links, tech stack, what you built, or any accomplishments..."
                                                    className={errors.proudProject ? 'input-error' : ''}
                                                ></textarea>
                                                {errors.proudProject && <span className="error-msg">{errors.proudProject}</span>}
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 4: MOTIVATION, SCENARIOS & VIDEO PITCH */}
                                    {currentStep === 4 && (
                                        <div className="form-step-pane" data-aos="fade-left">
                                            <h2 className="step-title">Section 4: Organizer Motivation, Scenarios & Video Pitch</h2>
                                            <p className="step-desc">Showcase your leadership vision, problem-solving mindset, and introduce yourself in a short video.</p>

                                            <div className="input-field-group">
                                                <label className="required">Why do you want to become a GDG on Campus Organizer?</label>
                                                <textarea 
                                                    name="whyOrganizer" 
                                                    value={formData.whyOrganizer} 
                                                    onChange={handleTextChange} 
                                                    rows="3" 
                                                    placeholder="Explain your drive and what you hope to achieve for SJCEM students..."
                                                    className={errors.whyOrganizer ? 'input-error' : ''}
                                                ></textarea>
                                                {errors.whyOrganizer && <span className="error-msg">{errors.whyOrganizer}</span>}
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">What do you think makes a good community organizer?</label>
                                                <textarea 
                                                    name="goodOrganizerTraits" 
                                                    value={formData.goodOrganizerTraits} 
                                                    onChange={handleTextChange} 
                                                    rows="3" 
                                                    placeholder="Traits like empathy, consistency, execution, technical knowledge..."
                                                    className={errors.goodOrganizerTraits ? 'input-error' : ''}
                                                ></textarea>
                                                {errors.goodOrganizerTraits && <span className="error-msg">{errors.goodOrganizerTraits}</span>}
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">What ideas would you like to bring to the GDG on Campus community during 2026–27?</label>
                                                <textarea 
                                                    name="ideasForTenure" 
                                                    value={formData.ideasForTenure} 
                                                    onChange={handleTextChange} 
                                                    rows="3" 
                                                    placeholder="Hackathons, AI Study Jams, Cloud Workshops, Open Source projects..."
                                                    className={errors.ideasForTenure ? 'input-error' : ''}
                                                ></textarea>
                                                {errors.ideasForTenure && <span className="error-msg">{errors.ideasForTenure}</span>}
                                            </div>

                                            <div className="form-row-2">
                                                <div className="input-field-group">
                                                    <label className="required">Realistically, how much time can you contribute weekly?</label>
                                                    <select 
                                                        name="timeCommitment" 
                                                        value={formData.timeCommitment} 
                                                        onChange={handleTextChange}
                                                        className={errors.timeCommitment ? 'input-error' : ''}
                                                    >
                                                        <option value="">Select Time Commitment</option>
                                                        <option value="1–2 hours per week">1–2 hours per week</option>
                                                        <option value="3–5 hours per week">3–5 hours per week (Recommended)</option>
                                                        <option value="5–8 hours per week">5–8 hours per week</option>
                                                        <option value="8+ hours per week">8+ hours per week</option>
                                                    </select>
                                                    {errors.timeCommitment && <span className="error-msg">{errors.timeCommitment}</span>}
                                                </div>
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">Scenario: How would you plan and execute a technical workshop with 100+ students?</label>
                                                <textarea 
                                                    name="workshopScenario" 
                                                    value={formData.workshopScenario} 
                                                    onChange={handleTextChange} 
                                                    rows="3" 
                                                    placeholder="Detail speaker booking, venue/labs, marketing, setup, feedback..."
                                                    className={errors.workshopScenario ? 'input-error' : ''}
                                                ></textarea>
                                                {errors.workshopScenario && <span className="error-msg">{errors.workshopScenario}</span>}
                                            </div>

                                            <div className="input-field-group">
                                                <label className="required">If selected, what would be your very first initiative for the chapter?</label>
                                                <textarea 
                                                    name="firstInitiative" 
                                                    value={formData.firstInitiative} 
                                                    onChange={handleTextChange} 
                                                    rows="3" 
                                                    placeholder="Describe your flagship week-1 project or workshop..."
                                                    className={errors.firstInitiative ? 'input-error' : ''}
                                                ></textarea>
                                                {errors.firstInitiative && <span className="error-msg">{errors.firstInitiative}</span>}
                                            </div>

                                            {/* Dedicated Video Pitch Section */}
                                            <div className="input-field-group highlight-input-card" style={{ background: '#f8fafd', border: '1px dashed #4285f4', padding: '24px', borderRadius: '14px', marginTop: '28px' }}>
                                                <label className="required" style={{ color: '#1a73e8', fontSize: '1.15rem', fontWeight: '700' }}>
                                                    📹 Self-Introduction & Leadership Video Pitch Link
                                                </label>
                                                <p className="sub-label" style={{ color: '#3c4043', marginTop: '8px', marginBottom: '16px', lineHeight: '1.6' }}>
                                                    Please record a <strong>1 to 2-minute short video</strong> introducing yourself. In your video, cover the following points:
                                                    <br />
                                                    🎥 <strong>1. Introduction:</strong> Who you are, your academic background & tech passion.
                                                    <br />
                                                    💡 <strong>2. Motivation:</strong> Why you want to be a GDG on Campus Student Organizer.
                                                    <br />
                                                    🧩 <strong>3. Situation Tackling:</strong> Share an example of a challenging community event or team situation and how you will tackle it.
                                                    <br />
                                                    <span style={{ fontSize: '0.88rem', color: '#5f6368', display: 'inline-block', marginTop: '6px' }}>
                                                        (Upload your video to YouTube, Google Drive, Loom, or Google Photos and paste the public viewable link below)
                                                    </span>
                                                </p>
                                                <input 
                                                    type="url" 
                                                    name="videoPitchUrl" 
                                                    value={formData.videoPitchUrl} 
                                                    onChange={handleTextChange} 
                                                    placeholder="https://youtube.com/watch?v=... OR https://drive.google.com/file/d/..." 
                                                    className={errors.videoPitchUrl ? 'input-error' : ''}
                                                />
                                                {errors.videoPitchUrl && <span className="error-msg">{errors.videoPitchUrl}</span>}
                                            </div>
                                        </div>
                                    )}

                                    {/* STEP 5: CONFIRMATIONS & SUBMIT */}
                                    {currentStep === 5 && (
                                        <div className="form-step-pane" data-aos="fade-left">
                                            <h2 className="step-title">Section 5: Commitment & Final Confirmation</h2>
                                            <p className="step-desc">Please review your commitment before submitting your application to Firebase.</p>

                                            <div className="confirmation-terms-box">
                                                <label className="checkbox-term">
                                                    <input 
                                                        type="checkbox" 
                                                        name="agreedResponsibility" 
                                                        checked={formData.agreedResponsibility} 
                                                        onChange={handleTextChange} 
                                                    />
                                                    <span>
                                                        I understand that becoming a GDG on Campus Organizer requires genuine participation, teamwork, responsibility, and consistent contribution throughout the 2026–27 tenure.
                                                    </span>
                                                </label>
                                                {errors.agreedResponsibility && <span className="error-msg d-block">{errors.agreedResponsibility}</span>}

                                                <label className="checkbox-term" style={{ marginTop: '18px' }}>
                                                    <input 
                                                        type="checkbox" 
                                                        name="confirmedAccuracy" 
                                                        checked={formData.confirmedAccuracy} 
                                                        onChange={handleTextChange} 
                                                    />
                                                    <span>
                                                        I confirm that all information provided is accurate and that I am applying because I genuinely want to contribute to building the GDG community.
                                                    </span>
                                                </label>
                                                {errors.confirmedAccuracy && <span className="error-msg d-block">{errors.confirmedAccuracy}</span>}
                                            </div>

                                            <div className="advocu-note-card">
                                                <h4>📩 Advocu Nomination Requirement Note</h4>
                                                <p>
                                                    If you are being nominated by an outgoing 2025–26 Organizer (Case 2: Graduating/Stepping down), please ensure your exact college email (<strong>{formData.collegeEmail || 'your email'}</strong>) is submitted in the official GDG nomination form so you receive the Advocu application link directly.
                                                </p>
                                            </div>

                                            <div className="summary-preview-card">
                                                <h3>Summary of Application</h3>
                                                <div className="summary-grid">
                                                    <div><strong>Name:</strong> {formData.fullName || 'N/A'}</div>
                                                    <div><strong>Email:</strong> {formData.collegeEmail || 'N/A'}</div>
                                                    <div><strong>Gender:</strong> {formData.gender || 'N/A'}</div>
                                                    <div><strong>Year:</strong> {formData.currentYear || 'N/A'} ({formData.branch})</div>
                                                    <div><strong>Primary Area:</strong> {formData.primaryContribution || 'N/A'}</div>
                                                    <div><strong>Video Pitch:</strong> {formData.videoPitchUrl ? <a href={formData.videoPitchUrl} target="_blank" rel="noopener noreferrer">Link Attached 🎥</a> : 'Not provided'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation Buttons */}
                                    <div className="form-action-nav">
                                        {currentStep > 1 && (
                                            <button type="button" className="btn btn-secondary" onClick={handlePrev} disabled={submitting}>
                                                ← Previous Step
                                            </button>
                                        )}

                                        {currentStep < 5 ? (
                                            <button type="button" className="btn btn-primary" onClick={handleNext}>
                                                Next Step →
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-success submit-glow-btn" disabled={submitting}>
                                                {submitting ? 'Submitting to Firebase...' : 'Submit Application to Firebase 🚀'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default OrganizerNominationForm;
