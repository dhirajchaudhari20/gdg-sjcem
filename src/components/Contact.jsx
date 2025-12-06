import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        // Access Key for Web3Forms
        formData.append("access_key", "98defd20-dee9-48a7-ac0f-e2fdd45d1f32");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                e.target.reset(); // Reset form fields
            } else {
                console.error("Web3Forms Error:", data);
                alert("Something went wrong. Please try again: " + data.message);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Error sending message. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="contact-bg-animation">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
            </div>
            <div className="container">
                <h2 className="section-title" data-aos="fade-up">Contact Us</h2>
                <div className="contact-wrapper" data-aos="fade-up" data-aos-delay="200">
                    {submitted ? (
                        <div className="success-message">
                            <img
                                src="https://i.pinimg.com/originals/fe/c2/39/fec23921611cc3abb6db1774e284a251.gif"
                                alt="Success"
                                className="success-gif"
                            />
                            <h3>Message Sent Successfully!</h3>
                            <p>Thanks for reaching out. We'll get back to you soon.</p>
                            <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another Message</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            {/* Hidden inputs for Web3Forms configuration */}
                            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                            <input type="hidden" name="subject" value="New Submission from GDG Website" />
                            <input type="hidden" name="from_name" value="GDG Website Contact" />

                            <div className="form-group">
                                <input type="text" name="name" placeholder="Your Name" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Your Email" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="subject_display" placeholder="Subject" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <textarea name="message" rows="5" placeholder="Your Message" required className="form-input"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="loader-spinner"></span>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
