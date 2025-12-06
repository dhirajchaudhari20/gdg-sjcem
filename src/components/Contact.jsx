import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const object = {};
        formData.forEach((value, key) => object[key] = value);
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://formsubmit.co/ajax/gdg@sjcem.edu.in", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();
            if (result.success === "true" || response.ok) {
                setSubmitted(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
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
                            <div className="check-icon">✓</div>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. We'll get back to you soon.</p>
                            <button className="btn btn-outline" onClick={() => setSubmitted(false)}>Send Another</button>
                        </div>
                    ) : (
                        <form
                            action="https://formsubmit.co/gdg@sjcem.edu.in"
                            method="POST"
                            className="contact-form"
                        >
                            <input type="hidden" name="_subject" value="New Submission from GDG Website" />
                            <input type="hidden" name="_captcha" value="false" />
                            {/* Redirect back to the same page after submission (optional, but good UX) */}
                            <input type="hidden" name="_next" value="http://localhost:5173/#contact" />

                            <div className="form-group">
                                <input type="text" name="name" placeholder="Your Name" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Your Email" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="subject" placeholder="Subject" required className="form-input" />
                            </div>
                            <div className="form-group">
                                <textarea name="message" rows="5" placeholder="Your Message" required className="form-input"></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn">
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
