import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './GoogleCodelab.css';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { codelabs } from '../data/codelabs';
import LiveSessionPanel from './LiveSessionPanel';

const GoogleCodelab = () => {
    const { currentUser, logout } = useAuth();
    const { id } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [showBadgeOverlay, setShowBadgeOverlay] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60 * 60);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();
    const [codelab, setCodelab] = useState(null);

    // Unique session ID for multi-tab support
    const sessionId = useRef(`session_${Math.random().toString(36).substr(2, 9)}`).current;

    // Protect the route
    useEffect(() => {
        if (!currentUser) {
            navigate('/codelabs/login');
        }
    }, [currentUser, navigate]);

    useEffect(() => {
        const found = codelabs.find(c => c.id === (id || 'techsprint-1'));
        if (found) {
            setCodelab(found);
        } else {
            console.error("Codelab not found");
        }
    }, [id]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} min ${secs < 10 ? '0' : ''}${secs} s`;
    };

    const handleShare = (platform) => {
        const shareUrl = "https://developers.google.com/profile/badges/recognitions/learnings/";
        const text = "I just earned a new badge on the Agent Development Kit Codelab!";
        let url = "";

        switch (platform) {
            case 'linkedin':
                url = `https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch(err => console.error('Error copying:', err));
    };

    // Safe access to steps (always define strict order of hooks)
    const steps = codelab ? codelab.steps : [];

    // Save progress when finishing the codelab
    useEffect(() => {
        if (!codelab || !currentUser) return;

        // Scroll to top on step change
        const contentDiv = document.getElementById('gc-content-area');
        if (contentDiv) contentDiv.scrollTo(0, 0);

        if (steps.length > 0 && activeStep === steps.length - 1) {
            setShowBadgeOverlay(true);

            // Save to Firestore if user is logged in
            if (currentUser) {
                const saveProgress = async () => {
                    try {
                        const userRef = doc(db, "users", currentUser.uid);
                        // Save specifically for this codelab ID
                        await setDoc(doc(userRef, "progress", codelab.id), {
                            codelabId: codelab.id,
                            title: codelab.title,
                            completed: true,
                            completedAt: new Date(),
                            badge: "Learning"
                        }, { merge: true });
                        console.log("Progress saved!");
                    } catch (e) {
                        console.error("Error saving progress: ", e);
                    }
                };
                saveProgress();
            }
        }
    }, [activeStep, currentUser, steps.length, codelab]);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/codelabs/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const handleStepClick = (index) => {
        setActiveStep(index);
    };

    // Update Step in Firestore Live Presence
    useEffect(() => {
        if (!codelab || !currentUser) return;
        const updateStep = async () => {
            try {
                await setDoc(doc(db, "codelabs", codelab.id, "live_votes", sessionId), {
                    currentStep: activeStep + 1,
                    lastActive: new Date()
                }, { merge: true });
            } catch (e) {
                console.error("Error updating step:", e);
            }
        };
        updateStep();
    }, [activeStep, codelab, currentUser, sessionId]);

    // Conditional Rendering Checks - MUST be after all hooks
    if (!currentUser) return null; // redirect handled by useEffect
    if (!codelab) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><div className="loader"></div></div>;

    return (
        <div className="google-codelab-container">
            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="gc-toast"
                    >
                        Copied to clipboard
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Badge Award Popup Overlay */}
            <AnimatePresence>
                {showBadgeOverlay && (
                    <motion.div
                        className="badge-overlay"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="card">
                            <div className="card-content">
                                <div className="content-container">
                                    <div className="text-container">
                                        <div className="completed-title">You earned another <span className="badge-name">Learning</span> badge!</div>
                                        <div className="completed-text">The achievement has been awarded to your profile.</div>
                                    </div>

                                    <div className="illustration-container show animate">
                                        <img
                                            alt="Icon representing the granted badge"
                                            className="badge-icon"
                                            src="https://developers.google.com/static/profile/badges/recognitions/learnings/learnings.svg"
                                        />
                                        <img
                                            alt="Badge animation background"
                                            className="badge-animation"
                                            src="https://www.gstatic.com/devrel-devsite/prod/vc5f006f889cc1db1408e856ba3b3ed5c9ee7e9490e5b06b7170054e5ec4f4567/images/badge-award-animation.gif"
                                        />
                                    </div>
                                </div>

                                <div className="buttons-container">
                                    <div className="buttons sharing">
                                        <span>Share</span>
                                        <div className="share-buttons-container">
                                            <button className="share-twitter" title="Share on Twitter" onClick={() => handleShare('twitter')}>
                                                <img src="https://www.gstatic.com/devrel-devsite/prod/vc5f006f889cc1db1408e856ba3b3ed5c9ee7e9490e5b06b7170054e5ec4f4567/images/share_twitter.svg" alt="Twitter" />
                                            </button>
                                            <button className="share-facebook" title="Share on Facebook" onClick={() => handleShare('facebook')}>
                                                <img src="https://www.gstatic.com/devrel-devsite/prod/vc5f006f889cc1db1408e856ba3b3ed5c9ee7e9490e5b06b7170054e5ec4f4567/images/share_facebook.svg" alt="Facebook" />
                                            </button>
                                            <button className="share-linkedin" title="Share on LinkedIn" onClick={() => handleShare('linkedin')}>
                                                <img src="https://www.gstatic.com/devrel-devsite/prod/vc5f006f889cc1db1408e856ba3b3ed5c9ee7e9490e5b06b7170054e5ec4f4567/images/share_linkedin.svg" alt="LinkedIn" />
                                            </button>
                                            <button className="share-link" title="Copy Link" onClick={() => handleCopy(window.location.href)}>
                                                <i className="fas fa-link" style={{ color: '#5f6368' }}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="buttons actions">
                                        <a className="button button-primary view-profile-button" href="https://developers.google.com/profile" target="_blank" rel="noopener noreferrer">View profile</a>
                                        <button className="button dismiss" onClick={() => setShowBadgeOverlay(false)}>
                                            <div className="dismiss-text">Dismiss</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Bar */}
            <header className="gc-top-bar">
                <div className="gc-left-nav">
                    <Link to={currentUser ? "/codelabs" : "/events/1"} className="gc-back-btn">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <h1 className="gc-codelab-title">Build a Travel Agent using MCP & ADK</h1>
                </div>
                <div className="gc-top-right">
                    <div className="gc-meta-item">
                        <i className="far fa-clock"></i>
                        <span>Remaining: {formatTime(timeLeft)}</span>
                    </div>
                    <div className="gc-meta-item">
                        <i className="fas fa-globe"></i>
                        <span>English</span>
                    </div>

                    {currentUser ? (
                        <div className="gc-profile-container" style={{ position: 'relative' }}>
                            <div
                                className="gc-meta-item"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={currentUser.photoURL || "https://lh3.googleusercontent.com/a/default-user"}
                                    alt="Profile"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: showProfileMenu ? '2px solid #aecbfa' : 'none'
                                    }}
                                    title={currentUser.displayName}
                                />
                            </div>

                            {/* Profile Dropdown Menu */}
                            {showProfileMenu && (
                                <div className="gc-profile-menu" style={{
                                    position: 'absolute',
                                    top: '40px',
                                    right: '0',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                    width: '250px',
                                    zIndex: 2000,
                                    padding: '10px 0',
                                    border: '1px solid #dadce0'
                                }}>
                                    <div style={{ padding: '0 20px 10px', borderBottom: '1px solid #f1f3f4', textAlign: 'center' }}>
                                        <p style={{ margin: '10px 0 5px', fontWeight: '500', color: '#3c4043' }}>{currentUser.displayName}</p>
                                        <p style={{ margin: '0', fontSize: '12px', color: '#5f6368' }}>{currentUser.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            padding: '10px 20px',
                                            textAlign: 'left',
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '14px',
                                            color: '#3c4043',
                                            cursor: 'pointer',
                                            marginTop: '5px'
                                        }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#f1f3f4'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}

                            {/* Backdrop to close menu */}
                            {showProfileMenu && (
                                <div
                                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1999 }}
                                    onClick={() => setShowProfileMenu(false)}
                                ></div>
                            )}
                        </div>
                    ) : (
                        <div className="gc-profile-icon">
                            <img
                                src="https://i.pinimg.com/originals/0a/f3/c9/0af3c9613761d2d2394d99312aeba397.gif"
                                alt="Profile"
                                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                            />
                        </div>
                    )}
                </div>
            </header>

            {/* Main Layout */}
            <div className="gc-main-layout">
                {/* Sidebar */}
                <nav className="gc-sidebar">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`gc-step-item ${activeStep === index ? 'active' : ''}`}
                            onClick={() => handleStepClick(index)}
                        >
                            <div className="gc-step-number">{index + 1}</div>
                            <div className="gc-step-label">{step.title}</div>
                        </div>
                    ))}
                </nav>

                {/* Content Area */}
                <main className="gc-content" id="gc-content-area">
                    <div className="gc-step-header-mobile">
                        {/* Mobile only step indicator could go here */}
                    </div>

                    <h2 className="gc-step-title">{activeStep + 1}. {steps[activeStep].title}</h2>

                    <div className="gc-markdown-body">
                        {steps[activeStep].content}
                    </div>

                    <div className="gc-footer">
                        {activeStep < steps.length - 1 ? (
                            <button className="btn-gc-primary" onClick={handleNext}>Next</button>
                        ) : (
                            <Link to="/codelabs" className="btn-gc-primary">Mark as completed</Link>
                        )}
                    </div>
                </main>

                {/* Right Sidebar - Live Session */}
                <LiveSessionPanel codelabId={codelab.id} sessionId={sessionId} />
            </div>
        </div>
    );
};

export default GoogleCodelab;
