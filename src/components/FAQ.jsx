import React, { useState } from 'react';
import './FAQ.css';

const FAQData = [
    {
        question: "How can I join GDG on Campus SJCEM?",
        answer: "You can become a member by clicking the 'Join Chapter' button, which redirects you to our official GDG community page. For core team roles, we open applications periodically!"
    },
    {
        question: "Is it free to join?",
        answer: "Yes! Joining the GDG chapter is completely free. Most of our events, workshops, and study jams are also free for students."
    },
    {
        question: "Do I get certificates for workshops?",
        answer: "Yes, for flagship events and specific workshops (like GenAI Study Jams), you will receive a Google-verified certificate upon completion."
    },
    {
        question: "Who can participate in hackathons?",
        answer: "Our hackathons are open to all students, regardless of their year or branch. We encourage diverse teams with mix of coding, design, and management skills."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section" id="faq">
            <div className="container" data-aos="fade-up">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {FAQData.map((item, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="faq-question">
                                {item.question}
                                <span className="arrow">▼</span>
                            </div>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
