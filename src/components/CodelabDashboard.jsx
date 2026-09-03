// src/components/CodelabDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const CodelabDashboard = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [completedCount, setCompletedCount] = useState(0);
    const [progressData, setProgressData] = useState({}); // Map of codelabId -> data

    async function handleLogout() {
        try {
            await logout();
            navigate('/codelabs/login');
        } catch {
            console.error("Failed to log out");
        }
    }

    useEffect(() => {
        if (currentUser) {
            const fetchProgress = async () => {
                try {
                    const progressRef = collection(db, "users", currentUser.uid, "progress");
                    const q = query(progressRef, where("completed", "==", true));
                    const querySnapshot = await getDocs(q);

                    setCompletedCount(querySnapshot.size);

                    const data = {};
                    querySnapshot.forEach((doc) => {
                        data[doc.id] = doc.data();
                    });
                    setProgressData(data);
                } catch (error) {
                    console.error("Error fetching progress:", error);
                }
            };
            fetchProgress();
        }
    }, [currentUser]);

    if (!currentUser) {
        // Redirect if not logged in (safety check, though route should handle it)
        setTimeout(() => navigate('/codelabs/login'), 100);
        return null;
    }

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.brand}>
                        <img
                            src="/gdg-sjc-logo.png"
                            alt="GDG On Campus SJCEM"
                            style={{ height: '48px', marginRight: '16px', objectFit: 'contain' }}
                        />
                        <div style={{ width: '1px', height: '24px', backgroundColor: '#dadce0', marginRight: '16px' }}></div>
                        <span style={styles.productName}>Codelabs</span>
                    </div>
                    <div style={styles.userControls}>
                        <img
                            src={currentUser.photoURL || "https://lh3.googleusercontent.com/a/default-user"}
                            alt="Profile"
                            style={styles.avatar}
                        />
                        <button onClick={handleLogout} style={styles.logoutBtn}>
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <main style={styles.main}>
                <div style={styles.welcomeSection}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <h1>✨ Welcome, {currentUser.displayName}!</h1>
                            <p style={{ color: '#5f6368', marginTop: '8px' }}>Continue your learning journey.</p>
                        </div>

                        {/* Progress Stats Card */}
                        <div style={styles.statsCard}>
                            <div style={styles.statItem}>
                                <div style={styles.statValue}>{completedCount}</div>
                                <div style={styles.statLabel}>Codelabs Completed</div>
                            </div>
                            <div style={styles.statItem}>
                                <div style={styles.statValue}>{completedCount > 0 ? '1' : '0'}</div>
                                <div style={styles.statLabel}>Badges Earned</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.grid}>
                    {/* Codelab Card 1 - The TechSprint Codelab */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.cardIcon}>
                                <img src="/colab/mcp.svg" alt="MCP" style={{ height: '40px' }} onError={(e) => e.target.style.display = 'none'} />
                                {/* Fallback icon if image fails */}
                                <i className="fas fa-code" style={{ fontSize: '24px', color: '#1a73e8', display: 'none' }}></i>
                            </div>
                            <div style={styles.cardMeta}>
                                <span style={styles.duration}>
                                    <i className="far fa-clock" style={{ marginRight: '4px' }}></i>
                                    60 min
                                </span>
                                <span style={styles.level}>Intermediate</span>
                            </div>
                        </div>
                        <div style={styles.cardBody}>
                            <h3 style={styles.cardTitle}>Build a Travel Agent using MCP & ADK</h3>
                            <p style={styles.cardDesc}>
                                Create a multi-agent system using Google's Agent Development Kit and connect it to a Cloud SQL database using the Model Context Protocol (MCP).
                            </p>
                        </div>
                        <div style={styles.cardFooter}>
                            {progressData['techsprint-1'] ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', color: '#188038', fontWeight: '500', fontSize: '14px' }}>
                                        <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i>
                                        Completed
                                    </div>
                                    <Link to="/codelab/techsprint-1" style={{ ...styles.startBtn, fontSize: '12px', color: '#1a73e8' }}>
                                        Do it again
                                    </Link>
                                </div>
                            ) : (
                                <Link to="/codelab/techsprint-1" style={styles.startBtn}>
                                    Start Codelab
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Placeholder for future codelabs */}
                    <div style={{ ...styles.card, opacity: 0.6, pointerEvents: 'none' }}>
                        <div style={styles.cardHeader}>
                            <div style={{ ...styles.cardIcon, backgroundColor: '#e8eaed' }}></div>
                        </div>
                        <div style={styles.cardBody}>
                            <h3 style={styles.cardTitle}>More Codelabs Coming Soon</h3>
                            <p style={styles.cardDesc}>Check back later for more hands-on tutorials on GenAI, Cloud, and Web.</p>
                        </div>
                    </div>
                </div>

                {/* Help/Support Section */}
                <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #dadce0', paddingTop: '40px' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '16px', color: '#202124', margin: '0 0 8px 0' }}>Have an idea?</h4>
                        <p style={{ color: '#5f6368', fontSize: '14px', margin: 0 }}>
                            <Link to="/submit-idea" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: '500' }}>Submit it</Link>
                            {' '}and we will feature it as a Codelab!
                        </p>
                    </div>

                    <p style={{ color: '#5f6368', fontSize: '14px' }}>
                        Need help with Project Submission or Codelabs?
                        <br />
                        <span style={{ fontWeight: '500', color: '#3c4043' }}>Contact us at: </span>
                        <a href="mailto:gdg@sjcem.edu.in" style={{ color: '#1a73e8', textDecoration: 'none' }}>gdg@sjcem.edu.in</a>
                    </p>
                    <div style={{ marginTop: '40px', borderTop: '1px solid #dadce0', paddingTop: '20px' }}>
                        <p style={{ color: '#5f6368', fontSize: '13px' }}>
                            © 2025 Designed and Developed by GDG On Campus SJCEM
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Google Sans', Roboto, sans-serif"
    },
    header: {
        backgroundColor: 'white',
        borderBottom: '1px solid #dadce0',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        color: '#5f6368'
    },
    brandSeparator: {
        margin: '0 12px',
        color: '#dadce0'
    },
    productName: {
        fontSize: '20px',
        color: '#5f6368',
        fontWeight: '400'
    },
    userControls: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    logoutBtn: {
        background: 'none',
        border: '1px solid #dadce0',
        borderRadius: '4px',
        padding: '6px 12px',
        color: '#1a73e8',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
    },
    main: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px'
    },
    welcomeSection: {
        marginBottom: '40px'
    },
    statsCard: {
        display: 'flex',
        gap: '24px',
        backgroundColor: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        border: '1px solid #dadce0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    statItem: {
        textAlign: 'center'
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '500', // Google Sans Medium usually
        color: '#1a73e8'
    },
    statLabel: {
        fontSize: '12px',
        color: '#5f6368',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginTop: '4px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #dadce0',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
        overflow: 'hidden'
    },
    cardHeader: {
        padding: '24px 24px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
    },
    cardIcon: {
        width: '48px',
        height: '48px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardMeta: {
        fontSize: '12px',
        color: '#5f6368',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px'
    },
    cardBody: {
        padding: '0 24px 24px',
        flex: 1
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: '500',
        color: '#202124',
        margin: '0 0 8px 0',
        lineHeight: '1.5'
    },
    cardDesc: {
        fontSize: '14px',
        color: '#5f6368',
        lineHeight: '1.6',
        margin: 0
    },
    cardFooter: {
        padding: '16px 24px',
        borderTop: '1px solid #f1f3f4',
        backgroundColor: 'white'
    },
    startBtn: {
        display: 'inline-block',
        color: '#1a73e8',
        textDecoration: 'none',
        fontWeight: '500',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    }
};

export default CodelabDashboard;
