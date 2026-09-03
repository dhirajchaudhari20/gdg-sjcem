import React, { useEffect } from 'react';
import './LegalPages.css';

const Terms = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1 className="legal-title">Terms & Conditions</h1>
                <p className="last-updated">Last Updated: October 26, 2023</p>

                <section className="legal-section">
                    <h2>1. Agreement to Terms</h2>
                    <p>By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.</p>
                </section>

                <section className="legal-section">
                    <h2>2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials on GDG on Campus SJCEM's Website for personal, non-commercial transitory viewing only.</p>
                </section>

                <section className="legal-section">
                    <h2>3. Disclaimer</h2>
                    <p>All the materials on GDG on Campus SJCEM’s Website are provided "as is". GDG on Campus SJCEM makes no warranties, may it be expressed or implied, therefore negates all other warranties.</p>
                </section>

                <section className="legal-section">
                    <h2>4. Limitations</h2>
                    <p>GDG on Campus SJCEM or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on GDG on Campus SJCEM’s Website.</p>
                </section>

                <section className="legal-section">
                    <h2>5. Revisions and Errata</h2>
                    <p>The materials appearing on GDG on Campus SJCEM’s Website may include technical, typographical, or photographic errors. GDG on Campus SJCEM will not promise that any of the materials in this Website are accurate, complete, or current.</p>
                </section>

                <section className="legal-section">
                    <h2>6. Governing Law</h2>
                    <p>Any claim related to GDG on Campus SJCEM's Website shall be governed by the laws of India without regard to its conflict of law provisions.</p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
