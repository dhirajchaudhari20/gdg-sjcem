// src/components/CodelabLogin.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CodelabLogin = () => {
    const { loginWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // If already logged in, redirect to dashboard
    useEffect(() => {
        if (currentUser) {
            navigate('/codelabs');
        }
    }, [currentUser, navigate]);

    async function handleLogin() {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/codelabs');
        } catch (err) {
            console.error("Firebase Login Error:", err);
            console.error("Error Code:", err.code);
            console.error("Error Message:", err.message);

            let msg = 'Failed to sign in.';
            if (err.code === 'auth/operation-not-allowed') {
                msg = 'Email/Password or Google Sign-In is not enabled in Firebase Console.';
            } else if (err.code === 'auth/popup-closed-by-user') {
                msg = 'Sign-in popup was closed before completing.';
            } else if (err.code === 'auth/unauthorized-domain') {
                msg = `Domain not authorized. Add '${window.location.hostname}' to Firebase Auth > Settings > Authorized domains.`;
            }

            setError(msg + ' (Check console for details)');
        }
        setLoading(false);
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.logoContainer}>
                    <img
                        src="/gdg-sjc-logo.png"
                        alt="GDG On Campus SJCEM"
                        style={{ height: '72px', maxWidth: '100%', objectFit: 'contain' }}
                    />
                </div>

                <h2 style={styles.title}>Sign in to Codelabs</h2>
                <p style={styles.subtitle}>Track your progress and earn badges</p>

                {error && <div style={styles.alert}>{error}</div>}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={styles.googleBtn}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google G"
                        style={styles.googleIcon}
                    />
                    <span style={styles.btnText}>Sign in with Google</span>
                </button>
            </div>
            <footer style={styles.footer}>
                © 2025 Designed and Developed by GDG On Campus SJCEM
            </footer>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Google Sans', Roboto, sans-serif"
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px 0 rgba(60,64,67,0.3)',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    logoContainer: {
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        fontSize: '28px',
        fontWeight: '400',
        color: '#202124',
        margin: '0 0 12px 0'
    },
    subtitle: {
        fontSize: '16px',
        color: '#5f6368',
        margin: '0 0 40px 0',
        lineHeight: '1.5'
    },
    alert: {
        backgroundColor: '#fce8e6',
        color: '#c5221f',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '24px',
        fontSize: '14px',
        textAlign: 'left'
    },
    googleBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        color: '#3c4043',
        border: '1px solid #dadce0',
        borderRadius: '24px',
        padding: '3px 12px 3px 3px', // Special padding for Google icon alignment
        height: '48px',
        width: '100%',
        maxWidth: '300px', // constrain button width
        margin: '0 auto',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        fontFamily: "'Google Sans', sans-serif",
        transition: 'all .2s',
        boxShadow: 'none'
    },
    googleIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '12px'
    },
    btnText: {
        flexGrow: 1,
        textAlign: 'center',
        paddingRight: '12px' // Balance the icon padding
    },
    footer: {
        position: 'absolute',
        bottom: '20px',
        color: '#5f6368',
        fontSize: '12px'
    }
};

export default CodelabLogin;
