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

    const handleImageUpload = async (e) => {
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
                setFormData(prev => ({ ...prev, image: result.data.url }));
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
            Description: ${formData.description}
            Video Link: ${formData.videoLink || 'N/A'}
            Image URL: ${formData.image || 'N/A'}
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
            <div className="submission-container">
                <div className="submission-card">
                    <div className="submission-header">
                        <h1 className="page-title">Submit Your Idea 💡</h1>
                        <p className="page-subtitle">Turn your vision into reality with GDG SJCEM expert mentorship.</p>
                    </div>

                    <form className="submission-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
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
                                        onChange={handleImageUpload}
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
