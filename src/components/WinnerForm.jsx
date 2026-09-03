import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, push, set } from 'firebase/database';
import './WinnerForm.css';

const WinnerForm = () => {
    const [formData, setFormData] = useState({
        position: '',
        teamName: '',
        leaderName: '',
        leaderEmail: '',
        teamSize: 1,
        googleTech: '',
        problemStatement: '',
        solutionDescription: '',
        demoVideo: '',
        githubLink: '',
        mvpLink: '',
        agreed: false
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        // Validation
        if (!formData.position) {
            setStatus({ type: 'error', message: 'Please select your winning position.' });
            return;
        }
        if (formData.teamSize < 1 || formData.teamSize > 4) {
            setStatus({ type: 'error', message: 'Team size must be between 1 and 4.' });
            return;
        }
        if (!formData.agreed) {
            setStatus({ type: 'error', message: 'You must agree to the terms.' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Create a submission object
            const submission = {
                title: `${formData.position} Submission`,
                ...formData,
                teamSize: Number(formData.teamSize),
                submittedAt: new Date().toISOString()
            };

            const winnersRef = ref(database, 'hackathon/winners');
            const newWinnerRef = push(winnersRef);
            await set(newWinnerRef, submission);

            setStatus({
                type: 'success',
                message: 'Submission Successful! Details have been recorded.'
            });

            // Clear form
            setFormData({
                position: '',
                teamName: '',
                leaderName: '',
                leaderEmail: '',
                teamSize: 1,
                googleTech: '',
                problemStatement: '',
                solutionDescription: '',
                demoVideo: '',
                githubLink: '',
                mvpLink: '',
                agreed: false
            });

        } catch (error) {
            console.error("Error submitting winner details: ", error);
            setStatus({ type: 'error', message: 'Failed to submit. Please try again or contact support.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="winner-form-container">
            <h2>🏆 Winner Details Submission</h2>
            <div className="winner-form-note">
                <strong>Important:</strong> Kindly fill out the details accurately. Submissions are final and cannot be edited.
            </div>

            <form onSubmit={handleSubmit}>
                <div className="winner-form-section">
                    <h3>Team Information</h3>

                    <div className="winner-form-field">
                        <label>Select Position *</label>
                        <select
                            name="position"
                            className="winner-form-select"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Your Position --</option>
                            <option value="Winner (1st Place)">Winner (1st Place)</option>
                            <option value="1st Runner Up (2nd Place)">1st Runner Up (2nd Place)</option>
                            <option value="2nd Runner Up (3rd Place)">2nd Runner Up (3rd Place)</option>
                        </select>
                    </div>

                    <div className="winner-form-field">
                        <label>Team Name *</label>
                        <input
                            type="text"
                            name="teamName"
                            className="winner-form-input"
                            value={formData.teamName}
                            onChange={handleChange}
                            placeholder="Enter exact team name"
                            required
                        />
                    </div>

                    <div className="winner-form-grid">
                        <div className="winner-form-field">
                            <label>Team Leader Name *</label>
                            <input
                                type="text"
                                name="leaderName"
                                className="winner-form-input"
                                value={formData.leaderName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>
                        <div className="winner-form-field">
                            <label>Team Leader Email *</label>
                            <input
                                type="email"
                                name="leaderEmail"
                                className="winner-form-input"
                                value={formData.leaderEmail}
                                onChange={handleChange}
                                placeholder="Email Address"
                                required
                            />
                        </div>
                    </div>

                    <div className="winner-form-field">
                        <label>Team Size (1-4) *</label>
                        <input
                            type="number"
                            name="teamSize"
                            className="winner-form-input"
                            value={formData.teamSize}
                            onChange={handleChange}
                            min="1"
                            max="4"
                            required
                        />
                        <small style={{ color: '#666' }}>If a team size exceeds this limit, we will not be able to accommodate any exceptions.</small>
                    </div>
                </div>

                <div className="winner-form-section">
                    <h3>Project Details</h3>

                    <div className="winner-form-field">
                        <label>Google Technologies Used *</label>
                        <textarea
                            name="googleTech"
                            className="winner-form-textarea"
                            value={formData.googleTech}
                            onChange={handleChange}
                            placeholder="List down the google technologies used in the project..."
                            required
                        />
                    </div>

                    <div className="winner-form-field">
                        <label>Problem Statement *</label>
                        <textarea
                            name="problemStatement"
                            className="winner-form-textarea"
                            value={formData.problemStatement}
                            onChange={handleChange}
                            placeholder="Describe the problem..."
                            required
                        />
                    </div>

                    <div className="winner-form-field">
                        <label>Description of the Solution *</label>
                        <textarea
                            name="solutionDescription"
                            className="winner-form-textarea"
                            value={formData.solutionDescription}
                            onChange={handleChange}
                            placeholder="Describe your solution..."
                            required
                        />
                    </div>
                </div>

                <div className="winner-form-section">
                    <h3>Links & Resources</h3>

                    <div className="winner-form-field">
                        <label>Project Demo Video Link *</label>
                        <input
                            type="url"
                            name="demoVideo"
                            className="winner-form-input"
                            value={formData.demoVideo}
                            onChange={handleChange}
                            placeholder="e.g., Google Drive / YouTube link"
                            required
                        />
                        <small style={{ display: 'block', marginTop: '5px', color: '#d32f2f' }}>
                            ⚠️ Ensure you provide viewer access to "gdgoncampus-india@hack2skill.com" and "gdg@sjcem.edu.in"
                        </small>
                    </div>

                    <div className="winner-form-grid">
                        <div className="winner-form-field">
                            <label>GitHub Repository Link *</label>
                            <input
                                type="url"
                                name="githubLink"
                                className="winner-form-input"
                                value={formData.githubLink}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                required
                            />
                        </div>
                        <div className="winner-form-field">
                            <label>MVP Link *</label>
                            <input
                                type="url"
                                name="mvpLink"
                                className="winner-form-input"
                                value={formData.mvpLink}
                                onChange={handleChange}
                                placeholder="Live Project URL"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="winner-form-checkbox-group">
                    <input
                        type="checkbox"
                        name="agreed"
                        id="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="agreed">
                        By checking the box above, I confirm that all details provided are accurate and final. No changes will be accommodated.
                    </label>
                </div>

                <button type="submit" className="winner-form-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Final Details'}
                </button>

                {status.message && (
                    <div className={`winner-form-status ${status.type === 'error' ? 'winner-form-error' : 'winner-form-success'}`}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default WinnerForm;
