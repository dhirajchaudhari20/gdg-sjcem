import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <div className="not-found-subtitle">Page Not Found</div>
                <p className="not-found-text">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="btn btn-primary not-found-btn">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
