import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get, query, orderByChild } from 'firebase/database';
import html2pdf from 'html2pdf.js';
import './WinnerDashboard.css';

const WinnerDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        if (e) e.preventDefault();
        if (passcode === "judge2025" || passcode === "admin123") {
            setIsAuthenticated(true);
            fetchSubmissions();
        } else {
            alert("Invalid Passcode");
        }
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const winnersRef = ref(database, 'hackathon/winners');
            const snapshot = await get(winnersRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort manually since RTDB query sorting is limited to one child
                list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
                setSubmissions(list);
            } else {
                setSubmissions([]);
            }
        } catch (error) {
            console.error("Error fetching submissions:", error);
            alert("Failed to fetch data. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const exportPDF = () => {
        const element = document.getElementById("winner-report");
        const opt = {
            margin: 0.2,
            filename: 'TechSprint_Winners_Details.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'landscape', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

    if (!isAuthenticated) {
        return (
            <div className="winner-dashboard-container winner-dashboard-login">
                <h2>🔒 Admin Access</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        className="wd-input"
                        placeholder="Enter Passcode"
                        value={passcode}
                        onChange={(e) => setPasscode(e.target.value)}
                    />
                    <button type="submit" className="wd-btn login">View Dashboard</button>
                </form>
            </div>
        );
    }

    return (
        <div className="winner-dashboard-container">
            <div className="winner-dashboard-header">
                <h2>🏆 Winner Submissions ({submissions.length})</h2>
                <div>
                    <button className="wd-btn refresh" onClick={fetchSubmissions} disabled={loading}>
                        {loading ? 'Refreshing...' : '↻ Refresh Data'}
                    </button>
                    <button className="wd-btn export" onClick={exportPDF}>Download PDF Report</button>
                </div>
            </div>

            {loading && submissions.length === 0 ? (
                <p>Loading data...</p>
            ) : (
                <div id="winner-report" className="winner-table-wrapper">
                    <table className="winner-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Team Name</th>
                                <th>Leader</th>
                                <th>Size</th>
                                <th>Project & Tech</th>
                                <th>Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No submissions yet.</td>
                                </tr>
                            ) : (
                                submissions.map((sub, index) => (
                                    <tr key={sub.id}>
                                        <td style={{ fontWeight: 'bold', color: '#2563eb' }}>
                                            {sub.title ? sub.title.replace(' Submission', '') : 'N/A'}
                                        </td>
                                        <td style={{ fontWeight: '600' }}>{sub.teamName}</td>
                                        <td>
                                            <div>{sub.leaderName}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{sub.leaderEmail}</div>
                                        </td>
                                        <td>{sub.teamSize}</td>
                                        <td>
                                            <div style={{ maxWidth: '300px' }}>
                                                <strong>Tech:</strong> {sub.googleTech}<br />
                                                <strong>Prob:</strong> {sub.problemStatement}<br />
                                                <strong>Sol:</strong> {sub.solutionDescription}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <a href={sub.demoVideo} target="_blank" rel="noreferrer" className="winner-link">Video</a>
                                                <a href={sub.githubLink} target="_blank" rel="noreferrer" className="winner-link">GitHub</a>
                                                <a href={sub.mvpLink} target="_blank" rel="noreferrer" className="winner-link">MVP</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                        Report Generated on {new Date().toLocaleString()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WinnerDashboard;
