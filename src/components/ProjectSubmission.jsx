import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProjectSubmission.css';

const ProjectSubmission = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: 'Dhiraj Chaudhari', // Pre-filled default
        email: '',
        userImage: '',
        bio: '',
        githubLink: '',
        instagramLink: '',
        projectTitle: '',
        description: '',
        videoLink: '',
        image: ''
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('image', file);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=3bc6dafa7ecd7c01a118fad187d32ca5', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (result.success) {
                setFormData(prev => ({ ...prev, [fieldName]: result.data.url }));
            } else {
                alert('Image upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error uploading image.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const formBody = new FormData();
        formBody.append("access_key", "98defd20-dee9-48a7-ac0f-e2fdd45d1f32");
        formBody.append("name", formData.name);
        formBody.append("email", formData.email);
        formBody.append("subject", `New Project Idea: ${formData.projectTitle}`);
        formBody.append("message", `
            Project Title: ${formData.projectTitle}
            
            USER DETAILS:
            Name: ${formData.name}
            Email: ${formData.email}
            Bio: ${formData.bio}
            User Photo: ${formData.userImage || 'N/A'}
            GitHub: ${formData.githubLink || 'N/A'}
            Instagram: ${formData.instagramLink || 'N/A'}

            PROJECT DETAILS:
            Description: ${formData.description}
            Video Link: ${formData.videoLink || 'N/A'}
            Project Image: ${formData.image || 'N/A'}

            ----- CODELAB JSON TEMPLATE (FOR ADMIN COPY-PASTE) -----
            {
                id: "${formData.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}",
                title: "${formData.projectTitle}",
                duration: "60 min",
                level: "Intermediate",
                author: {
                    name: "${formData.name}",
                    title: "Community Member | GDG On Campus SJCEM",
                    image: "${formData.userImage || 'https://lh3.googleusercontent.com/a/default-user'}"
                },
                steps: [
                    {
                        title: "Introduction",
                        duration: "5 mins",
                        content: (
                            <div className="gc-step-content">
                                <p>${formData.description.replace(/\n/g, ' ')}</p>
                                <div className="gc-info-box">
                                    <span className="gc-info-box-title">What you'll build</span>
                                    <p>${formData.projectTitle}</p>
                                </div>
                            </div>
                        )
                    }
                ]
            },
            --------------------------------------------------------
        `);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formBody
            });
            const result = await response.json();

            if (result.success) {
                setSubmitted(true);
            } else {
                alert("Submission failed: " + result.message);
            }
        } catch (error) {
            alert("Error sending idea. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <section className="project-submission-section">
                <div className="submission-container">
                    <div className="submission-card">
                        <div className="success-view">
                            <span className="success-emoji">🚀</span>
                            <h2 className="page-title">Idea Submitted!</h2>
                            <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '2rem' }}>
                                Thanks <strong>{formData.name}</strong>! We've received your project idea.<br />
                                Our team will review it and get back to you shortly.
                            </p>
                            <Link to="/projects" className="full-submit-btn" style={{ textDecoration: 'none', maxWidth: '300px', margin: '0 auto' }}>
                                Back to Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="project-submission-section">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="glow-orb orb-3"></div>

            <div className="submission-container">
                <div className="submission-card">
                    <div className="submission-header">
                        <h1 className="page-title">Submit Your Idea 💡</h1>
                        <p className="page-subtitle">Turn your vision into reality with GDG SJCEM expert mentorship.</p>
                    </div>

                    <form className="submission-form" onSubmit={handleSubmit}>
                        {/* User Details Section */}
                        <div className="form-group">
                            <h3 style={{ marginBottom: '1rem', color: '#4b5563', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>User Profile</h3>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Your Photo</label>
                                <div className={`image-upload-wrapper ${formData.userImage ? 'has-file' : ''}`} style={{ padding: '1rem' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="user-image-input"
                                        hidden
                                        onChange={(e) => handleImageUpload(e, 'userImage')}
                                    />
                                    <label htmlFor="user-image-input" style={{ width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        {formData.userImage ? (
                                            <>
                                                <img src={formData.userImage} alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                                <span style={{ fontSize: '0.9rem', color: '#34A853' }}>Change</span>
                                            </>
                                        ) : (
                                            <>
                                                <span style={{ fontSize: '1.5rem' }}>👤</span>
                                                <span style={{ fontSize: '0.9rem' }}>Upload Photo</span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Short Bio</label>
                                <textarea
                                    name="bio"
                                    rows="1" // Start small
                                    placeholder="Developer @ SJCEM..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                    style={{ resize: 'none', height: '52px' }}
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>GitHub Profile</label>
                                <input
                                    type="url"
                                    name="githubLink"
                                    placeholder="https://github.com/..."
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Instagram Handle / Link</label>
                                <input
                                    type="text"
                                    name="instagramLink"
                                    placeholder="@username or link"
                                    value={formData.instagramLink}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Project Details Section */}
                        <div className="form-group" style={{ marginTop: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#4b5563', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Project Details</h3>
                        </div>

                        <div className="form-group">
                            <label>Project Title</label>
                            <input
                                type="text"
                                name="projectTitle"
                                placeholder="e.g. Smart Campus App"
                                required
                                value={formData.projectTitle}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (MVP Features)</label>
                            <textarea
                                name="description"
                                rows="5"
                                placeholder="Describe the core features and the problem it solves..."
                                required
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Project Image / Sketch</label>
                                <div className={`image-upload-wrapper ${formData.image ? 'has-file' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="project-image-input"
                                        hidden
                                        onChange={(e) => handleImageUpload(e, 'image')}
                                    />
                                    <label htmlFor="project-image-input" style={{ width: '100%', cursor: 'pointer', display: 'block' }}>
                                        {uploading ? (
                                            <span>Uploading...</span>
                                        ) : formData.image ? (
                                            <div className="upload-content">
                                                <img src={formData.image} alt="Preview" className="preview-img" />
                                                <span style={{ color: '#34A853', fontWeight: 'bold' }}>Click to Change</span>
                                            </div>
                                        ) : (
                                            <div className="upload-content">
                                                <span className="upload-icon">📷</span>
                                                <span>Click to Upload Image</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Video Demo (Google Drive Link)</label>
                                <input
                                    type="url"
                                    name="videoLink"
                                    placeholder="https://drive.google.com/..."
                                    value={formData.videoLink}
                                    onChange={handleChange}
                                />
                                <small style={{ color: '#6b7280', fontSize: '0.85rem', marginTop: '0.5rem', display: 'block' }}>
                                    Please ensure the link is publicly accessible.
                                </small>
                            </div>
                        </div>

                        <button type="submit" className="full-submit-btn" disabled={submitting || uploading}>
                            {submitting ? (
                                <>
                                    <span className="loader-spinner" style={{ width: '24px', height: '24px', borderWidth: '3px' }}></span>
                                    Submitting...
                                </>
                            ) : 'Submit Idea 🚀'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ProjectSubmission;
