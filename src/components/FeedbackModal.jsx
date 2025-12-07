import React, { useState } from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ isOpen, onClose, eventName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        rating: 5,
        whatDidYouLike: '',
        improvements: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRating = (r) => {
        setFormData({ ...formData, rating: r });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API call or real submission
        // Ideally send to a sheet or database
        try {
            // Creating a form data object for Web3Forms or similar
            const data = new FormData();
            data.append("access_key", "98defd20-dee9-48a7-ac0f-e2fdd45d1f32"); // Reusing public key from EventDetails or generic
            data.append("subject", `Feedback for ${eventName}`);
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("message", `Rating: ${formData.rating}/5\nLiked: ${formData.whatDidYouLike}\nImprovements: ${formData.improvements}`);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                    onClose();
                    setFormData({
                        name: '',
                        email: '',
                        rating: 5,
                        whatDidYouLike: '',
                        improvements: ''
                    });
                }, 3000);
            } else {
                alert("Error sending feedback. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending feedback.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="feedback-modal-overlay" onClick={onClose}>
            <div className="feedback-modal-content" onClick={e => e.stopPropagation()} data-aos="zoom-in">
                <button className="close-btn" onClick={onClose}>&times;</button>

                {submitted ? (
                    <div className="feedback-success">
                        <div className="success-icon">🎉</div>
                        <h3>Thank You!</h3>
                        <p>Your feedback helps us make GDG events better.</p>
                    </div>
                ) : (
                    <>
                        <h2 className="feedback-title">Rate {eventName}</h2>
                        <p className="feedback-subtitle">
                            Tell us about your experience! <br />
                            <small style={{ display: 'block', marginTop: '5px', color: '#ea4335' }}>
                                3 Feedback Takes: The event will be hosted for 3 times
                            </small>
                        </p>

                        <form onSubmit={handleSubmit} className="feedback-form">
                            <div className="rating-container">
                                <label>How was the event?</label>
                                <div className="stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span
                                            key={star}
                                            className={`star ${star <= formData.rating ? 'filled' : ''}`}
                                            onClick={() => handleRating(star)}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name (Optional)"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="whatDidYouLike"
                                    placeholder="What did you like the most?"
                                    rows="2"
                                    value={formData.whatDidYouLike}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="improvements"
                                    placeholder="Any suggestions for improvement?"
                                    rows="2"
                                    value={formData.improvements}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" disabled={submitting} className="submit-feedback-btn">
                                {submitting ? 'Sending...' : 'Submit Feedback 🚀'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default FeedbackModal;
