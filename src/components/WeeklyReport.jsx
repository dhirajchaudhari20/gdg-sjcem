import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, push, set, serverTimestamp } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import './WeeklyReport.css';

const WeeklyReport = () => {
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        weekEnding: '',
        role: '',
        tasksCompleted: '',
        challenges: '',
        nextWeekPlan: '',
        prLinks: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                name: currentUser.displayName || '',
                email: currentUser.email || ''
            }));
        }

        // Set default week ending date to this Friday
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 is Sunday, 5 is Friday
        const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
        const nextFriday = new Date(today);
        nextFriday.setDate(today.getDate() + daysUntilFriday);
        setFormData(prev => ({
            ...prev,
            weekEnding: nextFriday.toISOString().split('T')[0]
        }));
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (!formData.name || !formData.role || !formData.tasksCompleted || !formData.weekEnding) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            setLoading(false);
            return;
        }

        try {
            const reportsRef = ref(database, 'weeklyReports');
            const newReportRef = push(reportsRef);
            await set(newReportRef, {
                ...formData,
                userId: currentUser ? currentUser.uid : 'anonymous',
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            });

            setMessage({ type: 'success', text: `Weekly Work Update submitted for ${formData.name}!` });
            setFormData(prev => ({
                ...prev,
                tasksCompleted: '',
                challenges: '',
                nextWeekPlan: '',
                prLinks: ''
            }));
        } catch (error) {
            console.error('Error submitting report:', error);
            setMessage({ type: 'error', text: 'Failed to submit report. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const commonRoles = [
        "Organizer", "Co-Organizer", "Technical Head", "Design & Media Head",
        "Events & Operations Head", "Community & Marketing Head", "Social Media Head",
        "Content Lead", "AIML/DSA Lead", "Web Development Lead", "App Lead",
        "Member", "Volunteer", "Technical Member", "Event Member", "Media Member"
    ];

    return (
        <div className="weekly-report-container">
            <motion.div
                className="weekly-report-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="weekly-report-header">
                    <h2>Weekly Work Update</h2>
                    <p>Mandatory performance tracking for all team members.</p>
                </div>

                {message.text && (
                    <div className={`message ${message.type === 'error' ? 'error-message' : 'success-message'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Team Member Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role in GDG on Campus *</label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleChange}
                            placeholder="e.g. Technical Head, Member, Volunteer"
                            list="rolesList"
                            required
                        />
                        <datalist id="rolesList">
                            {commonRoles.map(role => (
                                <option key={role} value={role} />
                            ))}
                        </datalist>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email (Optional)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weekEnding">Week Ending Date *</label>
                        <input
                            type="date"
                            id="weekEnding"
                            name="weekEnding"
                            className="form-control"
                            value={formData.weekEnding}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tasksCompleted">Tasks Completed This Week *</label>
                        <textarea
                            id="tasksCompleted"
                            name="tasksCompleted"
                            className="form-control"
                            value={formData.tasksCompleted}
                            onChange={handleChange}
                            placeholder="List the key tasks, features, or bug fixes you completed..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="prLinks">PR / Documentation Links (Proof of Work)</label>
                        <textarea
                            id="prLinks"
                            name="prLinks"
                            className="form-control"
                            value={formData.prLinks}
                            onChange={handleChange}
                            placeholder="Paste links to GitHub PRs, commit hashes, or design docs..."
                            style={{ minHeight: '80px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="challenges">Challenges & Blockers</label>
                        <textarea
                            id="challenges"
                            name="challenges"
                            className="form-control"
                            value={formData.challenges}
                            onChange={handleChange}
                            placeholder="Any issues blocking your progress or challenges faced..."
                            style={{ minHeight: '80px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nextWeekPlan">Plan for Next Week</label>
                        <textarea
                            id="nextWeekPlan"
                            name="nextWeekPlan"
                            className="form-control"
                            value={formData.nextWeekPlan}
                            onChange={handleChange}
                            placeholder="What are your goals for the upcoming week?"
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Weekly Report'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default WeeklyReport;
