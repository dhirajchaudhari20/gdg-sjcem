import React, { useState, useEffect } from 'react';
import './JoinTeam.css';

const JoinTeam = () => {
    // Set Deadline: Sunday, Dec 7, 2025 at 8:00 PM
    const deadline = new Date("2025-12-07T20:00:00").getTime();
    const [isClosed, setIsClosed] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        role: '', // Changed to string input based on screenshot
        image: '',
        linkedin: '',
        github: '',
        instagram: '',
        twitter: '',
        bio: '',
        timestamp: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        const checkDeadline = () => {
            const now = new Date().getTime();
            if (now > deadline) {
                setIsClosed(true);
            }
        };

        checkDeadline();
        const interval = setInterval(checkDeadline, 1000 * 60); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
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
            console.error('Error uploading image:', error);
            alert('Error uploading image.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const submissionData = {
            ...formData,
            id: crypto.randomUUID(),
            timestamp: new Date().toLocaleString()
        };

        try {
            const response = await fetch('https://sheetdb.io/api/v1/kdq3tgljm208b', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [submissionData]
                })
            });

            if (response.ok) {
                setSubmitted(true);
                alert("Application Submitted Successfully! 🚀");
                // Reset form
                setFormData({
                    id: '',
                    name: '',
                    role: '',
                    image: '',
                    linkedin: '',
                    github: '',
                    instagram: '',
                    twitter: '',
                    bio: '',
                    timestamp: ''
                });
            } else {
                const errorText = await response.text();
                throw new Error(`Submission failed: ${response.status} ${response.statusText} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(`Error submitting application: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="join-team-section">
            <div className="join-container" data-aos="fade-up">

                {isClosed ? (
                    <div className="applications-closed-card" data-aos="zoom-in">
                        <div className="closed-icon">🔒</div>
                        <h2>Applications Are Closed</h2>
                        <p>We are no longer accepting responses for this recruitment phase.</p>
                        <p>
                            If you have any urgent queries, please contact us at: <br />
                            <a href="mailto:gdg@sjcem.edu.in" className="contact-link">gdg@sjcem.edu.in</a>
                        </p>
                    </div>
                ) : submitted ? (
                    <div className="success-message">
                        <div className="success-icon">🎉</div>
                        <h2>You're In!</h2>
                        <p>Thanks for applying, <strong>{formData.name}</strong>.<br />We've received your details and will review them shortly.</p>
                        <button className="reset-btn" onClick={() => setSubmitted(false)}>Submit Another Response</button>
                    </div>
                ) : (
                    <>
                        <div className="form-section">
                            <div className="form-card">
                                <h1 className="form-title">Join the <span className="highlight-text">Squad</span></h1>
                                <p className="form-subtitle">Fill in your details to get featured on our Team page.</p>

                                <form className="recruitment-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Dhiraj Chaudhari"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Role</label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Technical Head"
                                        />
                                        <small className="role-helper">
                                            Unsure of your role? <a href="/team-directory" className="contact-link" target="_blank">Check the Team Directory</a>
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label>Profile Photo</label>
                                        <div className={`image-upload-box ${formData.image ? 'has-image' : ''}`}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                id="image-input"
                                                hidden
                                            />
                                            <label htmlFor="image-input" className="image-upload-label">
                                                {uploadingImage ? (
                                                    <span className="loading-text">Uploading...</span>
                                                ) : formData.image ? (
                                                    <div className="preview-container">
                                                        <img src={formData.image} alt="Preview" className="image-preview" />
                                                        <span className="change-text">Change Image</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className="camera-icon">📷</span>
                                                        <span>Choose Image (Max 5MB)</span>
                                                    </>
                                                )}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Short Bio (Optional)</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows="3"
                                            placeholder="Tell us a bit about yourself..."
                                        ></textarea>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>LinkedIn URL</label>
                                            <input
                                                type="url"
                                                name="linkedin"
                                                value={formData.linkedin}
                                                onChange={handleChange}
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>GitHub URL</label>
                                            <input
                                                type="url"
                                                name="github"
                                                value={formData.github}
                                                onChange={handleChange}
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Instagram URL</label>
                                            <input
                                                type="url"
                                                name="instagram"
                                                value={formData.instagram}
                                                onChange={handleChange}
                                                placeholder="https://instagram.com/..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Twitter/X URL</label>
                                            <input
                                                type="url"
                                                name="twitter"
                                                value={formData.twitter}
                                                onChange={handleChange}
                                                placeholder="https://x.com/..."
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-btn" disabled={submitting || uploadingImage}>
                                        {submitting ? 'Submitting...' : 'Submit Profile 🚀'}
                                    </button>

                                    <p className="privacy-disclaimer">
                                        <strong>Note:</strong> The image and information provided will be used <u>strictly</u> for the Google Developer Group on Campus SJCEM website team page. Your data is secure and will not be shared elsewhere.
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Live Preview Section */}
                        <div className="preview-section">
                            <h3 className="preview-title">Live Card Preview</h3>
                            <div className="people-card" style={{ width: '100%' }}>
                                <div
                                    className="organizer-avatar-bg"
                                    style={{
                                        backgroundColor: formData.image ? 'transparent' : '#e8f0fe',
                                        color: '#1a73e8',
                                        backgroundImage: formData.image ? `url(${formData.image})` : 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {!formData.image && (formData.name ? formData.name.substring(0, 2).toUpperCase() : 'GD')}
                                </div>

                                <div className="People-styles-info">
                                    <h2 className="organizer-name-premium" dir="auto">{formData.name || 'Your Name'}</h2>
                                    <p className="organizer-role-premium" dir="auto">{formData.role || 'Your Role'}</p>

                                    <div className="card-socials">
                                        {formData.linkedin && (
                                            <a href="#" className="social-icon linkedin" onClick={(e) => e.preventDefault()}>
                                                <i className="fab fa-linkedin"></i>
                                            </a>
                                        )}
                                        {formData.github && (
                                            <a href="#" className="social-icon github" onClick={(e) => e.preventDefault()}>
                                                <i className="fab fa-github"></i>
                                            </a>
                                        )}
                                        {formData.instagram && (
                                            <a href="#" className="social-icon instagram" onClick={(e) => e.preventDefault()}>
                                                <i className="fab fa-instagram"></i>
                                            </a>
                                        )}
                                        {formData.twitter && (
                                            <a href="#" className="social-icon twitter" onClick={(e) => e.preventDefault()}>
                                                <i className="fab fa-twitter"></i>
                                            </a>
                                        )}
                                        {/* Show grayscale placeholders if all empty */}
                                        {!formData.linkedin && !formData.github && !formData.instagram && !formData.twitter && (
                                            <span style={{ fontSize: '0.8rem', color: '#ccc' }}>Social icons will appear here</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default JoinTeam;

