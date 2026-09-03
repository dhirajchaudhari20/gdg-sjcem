import React from 'react';
import './JoinTeam.css'; // Reusing the glassmorphism styles

const TeamEmails = () => {
    const emailGroups = [
        { name: 'Core Team', email: 'gdgcore@googlegroups.com', date: 'Sep 26, 2025' },
        { name: 'Events Team', email: 'gdgevent@googlegroups.com', date: 'Sep 27, 2025' },
        { name: 'Marketing Team', email: 'gdgmarketing@googlegroups.com', date: 'Sep 27, 2025' },
        { name: 'Media Team', email: 'gdgmedia@googlegroups.com', date: 'Sep 26, 2025' },
        { name: 'Study Jams', email: 'gdgstudyjams-1@googlegroups.com', date: 'Sep 26, 2025' },
        { name: 'Tech Team', email: 'gdgtech@googlegroups.com', date: 'Sep 26, 2025' }
    ];

    const copyToClipboard = (email) => {
        navigator.clipboard.writeText(email);
        alert(`Copied: ${email}`);
    };

    return (
        <section className="join-team-section" style={{ minHeight: '80vh' }}>
            <div className="join-container" data-aos="fade-up" style={{ maxWidth: '800px' }}>
                <h1 className="join-title">Internal Team Emails</h1>
                <p className="join-subtitle">Google Groups for internal communication. Keep these private! 🤫</p>

                <div className="email-list" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {emailGroups.map((group, index) => (
                        <div key={index} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '20px',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <div>
                                <h3 style={{ margin: '0 0 5px 0', color: '#4285F4' }}>{group.name}</h3>
                                <code style={{ color: '#ccc', fontSize: '1.1rem' }}>{group.email}</code>
                                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: '#666' }}>Created: {group.date}</p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(group.email)}
                                className="btn btn-outline"
                                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                            >
                                Copy
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                    <p style={{ color: '#EA4335', fontWeight: 'bold' }}>⚠️ Confidential: For Core Team Use Only</p>
                </div>
            </div>
        </section>
    );
};

export default TeamEmails;
