import React, { useState } from 'react';
import './Blog.css';

const BlogSubmission = ({ onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        title: '',
        category: 'Web Dev',
        content: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const form = e.target;
        const formDataObj = new FormData(form);

        // Add content manually since it might be controlled state
        formDataObj.set('content', formData.content);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataObj
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
            } else {
                console.error("Web3Forms Blog Error:", data);
                alert("Something went wrong with the submission: " + data.message);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Error submitting article. Please check your connection.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="blog-section">
                <div className="blog-container submission-success">
                    <div className="success-icon">🎉</div>
                    <h2>Article Submitted!</h2>
                    <p>Thanks, <strong>{formData.name}</strong>. Your article "{formData.title}" has been sent for review.</p>
                    <button className="back-btn" onClick={onBack}>Back to Blog</button>
                    <button className="reset-btn" onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', title: '', category: 'Web Dev', content: '' });
                    }}>Submit Another</button>
                </div>
            </div>
        );
    }

    return (
        <section className="blog-section">
            <div className="blog-container">
                <button className="back-link" onClick={onBack}>← Back to Articles</button>

                <div className="submission-form-wrapper" data-aos="fade-up">
                    <h2 className="submission-title">Share Your Knowledge</h2>
                    <p className="submission-subtitle">Have something interesting to share? Write an article for the GDG community.</p>

                    {/* Hidden iframe for seamless submission */}
                    <form
                        className="blog-form"
                        onSubmit={handleSubmit}
                    >
                        {/* Hidden inputs for Web3Forms configuration */}
                        <input type="hidden" name="access_key" value="98defd20-dee9-48a7-ac0f-e2fdd45d1f32" />
                        <input type="hidden" name="subject" value={`New Blog Submission: ${formData.title}`} />
                        <input type="hidden" name="from_name" value="GDG Blog Submission" />
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                        <div className="form-row">
                            <div className="form-group">
                                <label>Author Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Article Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter a catchy title"
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="Web Dev">Web Development</option>
                                <option value="AI/ML">AI / Machine Learning</option>
                                <option value="Cloud">Cloud Computing</option>
                                <option value="Mobile">Mobile Dev</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Content (Markdown supported)</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                placeholder="Write your article content here..."
                                rows="10"
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-blog-btn" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Article'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default BlogSubmission;
