import React from 'react';
import { motion } from 'framer-motion';
import './WeeklyReport.css';

const WeeklyReportsList = () => {
    return (
        <div className="weekly-report-container">
            <div className="weekly-report-header">
                <h2>Team Performance Monitor</h2>
                <p>Review weekly submissions and progress.</p>
            </div>

            <motion.div
                className="weekly-report-card"
                style={{ textAlign: 'center', padding: '60px 20px' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📧</div>
                <h3>Reports are Sent via Email</h3>
                <p style={{ maxWidth: '500px', margin: '10px auto', color: 'var(--text-secondary)' }}>
                    We have switched to an email-based submission system (Web3Forms) for reliability.
                    Submissions are sent directly to the organizer's inbox.
                </p>
                <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(66, 133, 244, 0.1)', borderRadius: '8px', display: 'inline-block' }}>
                    <strong>Note for Leads/Heads:</strong><br />
                    Please check your registered email for team submissions.
                </div>
            </motion.div>
        </div>
    );
};

export default WeeklyReportsList;
