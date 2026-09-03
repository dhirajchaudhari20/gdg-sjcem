import React, { useEffect } from 'react';
import './LegalPages.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1 className="legal-title">Privacy Policy</h1>
                <p className="last-updated">Last Updated: October 26, 2023</p>

                <section className="legal-section">
                    <h2>1. Introduction</h2>
                    <p>Welcome to Google Developer Group on Campus SJCEM ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website.</p>
                </section>

                <section className="legal-section">
                    <h2>2. Information We Collect</h2>
                    <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site.</p>
                </section>

                <section className="legal-section">
                    <h2>3. How We Use Collected Information</h2>
                    <p>GDG on Campus SJCEM may collect and use Users personal information for the following purposes:</p>
                    <ul>
                        <li>To run and operate our Site</li>
                        <li>To improve customer service</li>
                        <li>To personalize user experience</li>
                        <li>To send periodic emails</li>
                    </ul>
                </section>

                <section className="legal-section">
                    <h2>4. Sharing Your Personal Information</h2>
                    <p>We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.</p>
                </section>

                <section className="legal-section">
                    <h2>5. Changes to This Privacy Policy</h2>
                    <p>GDG on Campus SJCEM has the discretion to update this privacy policy at any time. When we do, we will participate in any notification process we deem appropriate.</p>
                </section>

                <section className="legal-section">
                    <h2>6. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us.</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
