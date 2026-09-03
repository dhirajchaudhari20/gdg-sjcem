import React, { useEffect } from 'react';
import './LegalPages.css';

const CommunityGuidelines = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <div className="container">
                <div className="legal-content">
                    <h1>Community Guidelines</h1>
                    <p className="last-updated">Last Updated: December 5, 2025</p>

                    <section>
                        <h2>1. Be Respectful</h2>
                        <p>
                            Treat everyone with respect, kindness, and empathy. We do not tolerate harassment, discrimination, or hate speech of any kind.
                        </p>
                    </section>

                    <section>
                        <h2>2. Foster Inclusivity</h2>
                        <p>
                            We are committed to providing a friendly, safe and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or social status.
                        </p>
                    </section>

                    <section>
                        <h2>3. Collaboration over Competition</h2>
                        <p>
                            Share your knowledge, help others learn, and be open to feedback. We grow faster when we grow together.
                        </p>
                    </section>

                    <section>
                        <h2>4. No Spam or Promotion</h2>
                        <p>
                            Keep the discussions relevant to technology and the community. Avoid unauthorized self-promotion, spam, or irrelevant links.
                        </p>
                    </section>

                    <section>
                        <h2>5. Report Issues</h2>
                        <p>
                            If you see something that violates these guidelines, please report it to the organizers immediately. We are here to help.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CommunityGuidelines;
