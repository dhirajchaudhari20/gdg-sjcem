import React, { useState } from 'react';
import './ProjectIdeaModal.css';

const ProjectIdeaModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectTitle: '',
        description: '',
        videoLink: '',
        image: ''
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

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

    return (
        <div className="project-modal-overlay" onClick={onClose}>
            <div className="project-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-modal-btn" onClick={onClose}>&times;</button>

                {submitted ? (
                    <div className="success-content">
                        <span className="success-icon">🚀</span>
                        <h2 className="modal-title">Idea Submitted!</h2>
                        <p>We've received your project idea. Our team will review it and get back to you shortly!</p>
                        <button className="submit-btn" onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2 className="modal-title">Submit Your Idea 💡</h2>
                            <p className="modal-subtitle">Turn your vision into reality with GDG SJCEM</p>
                        </div>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g. John Doe"
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
                                <label>Description (MVP)</label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Describe the core features and problem it solves..."
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Project Image / Sketch</label>
                                <div className={`image-upload-box ${formData.image ? 'has-image' : ''}`}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="project-image"
                                        hidden
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="project-image" style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'block' }}>
                                        {uploading ? (
                                            <span>Uploading...</span>
                                        ) : formData.image ? (
                                            <>
                                                <img src={formData.image} alt="Preview" className="image-preview" />
                                                <span className="change-image-text">Click to Change</span>
                                            </>
                                        ) : (
                                            <div className="upload-placeholder">
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
                                <small style={{ color: '#6b7280', fontSize: '0.8rem' }}>Please make sure the link is shareable.</small>
                            </div>

                            <button type="submit" className="submit-btn" disabled={submitting || uploading}>
                                {submitting ? 'Submitting...' : 'Submit Idea 🚀'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectIdeaModal;
