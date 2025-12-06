import React, { useState } from 'react';
import './Blog.css';
import BlogSubmission from './BlogSubmission';

const Blog = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    // Placeholder data for blog posts with GDG-relevant topics
    const blogPosts = [
        {
            id: 1,
            title: "Exploring the Future of AI with Gemini",
            author: "Techno Geek",
            date: "Oct 15, 2024",
            category: "AI/ML",
            excerpt: "Dive deep into the capabilities of Google's Gemini models and how they are reshaping the landscape of artificial intelligence development.",
            content: `
                <p>Artificial Intelligence is evolving at a breakneck pace, and Google's Gemini models are at the forefront of this revolution. Built from the ground up to be multimodal, Gemini can generalize and seamlessly understand, operate across, and combine different types of information including text, code, audio, image, and video.</p>
                
                <h3>What makes Gemini different?</h3>
                <p>Unlike previous models, Gemini comes in three sizes: Ultra, Pro, and Nano. This allows developers to deploy AI in everything from massive data centers to mobile devices. The flexibility it offers is unprecedented.</p>

                <h3>Coding with Gemini</h3>
                <p>One of the most exciting capabilities is its proficiency in coding. It can understand, explain, and generate high-quality code in the world's most popular programming languages, like Python, Java, C++, and Go.</p>

                <p>As we move forward, integrating these models into our applications will become standard practice for GDG developers.</p>
            `,
            image: "https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_v0jB2gTyM-t7m9X7vF8Z8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8Zl8=s0-d"
        },
        {
            id: 2,
            title: "Getting Started with Google Cloud Platform",
            author: "Cloud Ninja",
            date: "Nov 02, 2024",
            category: "Cloud",
            excerpt: "A beginner's guide to navigating GCP, setting up your first project, and deploying a scalable web application.",
            content: `
                <p>Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally. For students and developers, it offers a playground to build, test, and deploy applications.</p>

                <h3>Key Services to Know</h3>
                <ul>
                    <li><strong>Compute Engine:</strong> Virtual machines running in Google's data centers.</li>
                    <li><strong>App Engine:</strong> A platform for building scalable web applications and mobile backends.</li>
                    <li><strong>Cloud Storage:</strong> Unified object storage for developers and enterprises.</li>
                </ul>

                <p>Starting with GCP is easier than you think. The free tier offers enough resources to host your portfolio or a small project for free!</p>
            `,
            image: "https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uy_7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7z7=s0-d"
        },
        {
            id: 3,
            title: "Web Development Trends in 2025",
            author: "Web Wizard",
            date: "Dec 05, 2024",
            category: "Web Dev",
            excerpt: "From AI-driven UI to 3D interactive elements, discover the top trends that will define the next generation of web experiences.",
            content: `
                <p>As we approach 2025, web development is shifting towards more immersive and intelligent experiences. The days of static pages are long gone.</p>

                <h3>1. AI-Driven Personalization</h3>
                <p>Websites are becoming smarter. They now adapt content and layout based on user behavior in real-time, thanks to AI algorithms running in the background.</p>

                <h3>2. 3D and Immersive Experiences</h3>
                <p>With libraries like Three.js and Spline becoming more accessible, 3D elements are no longer just for gaming sites. They are being used to create engaging hero sections and interactive product showcases.</p>

                <h3>3. Bento Grids</h3>
                <p>Inspired by Apple's promotional materials, the Bento Grid layout allows for a clean, organized, yet visually rich way to present information.</p>
            `,
            image: "https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_x9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9_9=s0-d"
        }
    ];

    if (showSubmissionForm) {
        return <BlogSubmission onBack={() => setShowSubmissionForm(false)} />;
    }

    if (selectedPost) {
        return (
            <section className="blog-section">
                <div className="blog-container">
                    <button className="back-link" onClick={() => setSelectedPost(null)}>← Back to Articles</button>
                    <div className="article-view" data-aos="fade-up">
                        <span className="blog-category">{selectedPost.category}</span>
                        <h1 className="article-title">{selectedPost.title}</h1>
                        <div className="blog-meta article-meta">
                            <span>{selectedPost.date}</span> • <span>by {selectedPost.author}</span>
                        </div>
                        <div className="article-content" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-section">
            <div className="blog-container">
                <div className="blog-header" data-aos="fade-down">
                    <h1 className="blog-title">Tech <span className="highlight-text">Insights</span></h1>
                    <p className="blog-subtitle">Read the latest articles from our community or share your own knowledge.</p>
                    <button
                        className="write-btn"
                        onClick={() => setShowSubmissionForm(true)}
                    >
                        ✍️ Write for Us
                    </button>
                </div>

                <div className="blog-grid">
                    {blogPosts.map((post, index) => (
                        <div key={post.id} className="blog-card" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="blog-image-placeholder">
                                <span className="blog-category">{post.category}</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">{post.date}</span>
                                    <span className="blog-author">by {post.author}</span>
                                </div>
                                <h3 className="blog-card-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <button className="read-more-btn" onClick={() => setSelectedPost(post)}>Read Article →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
