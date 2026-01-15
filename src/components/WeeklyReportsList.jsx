import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { motion } from 'framer-motion';
import './WeeklyReport.css';

const WeeklyReportsList = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWeek, setSelectedWeek] = useState('');

    useEffect(() => {
        const reportsRef = ref(database, 'weeklyReports');
        const unsubscribe = onValue(reportsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedReports = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                // Sort by weekEnding desc
                loadedReports.sort((a, b) => new Date(b.weekEnding) - new Date(a.weekEnding));
                setReports(loadedReports);
            } else {
                setReports([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching reports:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Unique weeks for filter
    const weeks = [...new Set(reports.map(r => r.weekEnding))];

    const filteredReports = selectedWeek
        ? reports.filter(r => r.weekEnding === selectedWeek)
        : reports;

    return (
        <div className="weekly-report-container" style={{ maxWidth: '1200px' }}>
            <div className="weekly-report-header">
                <h2>Team Performance Monitor</h2>
                <p>Review weekly submissions and progress.</p>
            </div>

            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <div style={{ position: 'relative', display: 'inline-block', width: '300px' }}>
                    <select
                        className="form-control"
                        style={{ width: '100%', appearance: 'none', cursor: 'pointer' }}
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                    >
                        <option value="">📅 All Weeks</option>
                        {weeks.map(week => (
                            <option key={week} value={week}>Week Ending: {week}</option>
                        ))}
                    </select>
                    <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666' }}>
                        ▼
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="loading-spinner" style={{
                        width: '40px', height: '40px', border: '3px solid #f3f3f3',
                        borderTop: '3px solid #4285F4', borderRadius: '50%', margin: '0 auto 20px',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <p>Loading reports...</p>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            ) : (
                <div className="reports-grid">
                    {filteredReports.map((report, index) => {
                        // Get initials
                        const initials = report.name
                            ? report.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                            : '??';

                        return (
                            <motion.div
                                key={report.id}
                                className="report-card-enhanced"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="report-header">
                                    <div className="user-info">
                                        <div className="user-avatar">{initials}</div>
                                        <div className="user-details">
                                            <h3>{report.name}</h3>
                                            {report.role && <span className="user-role">{report.role}</span>}
                                        </div>
                                    </div>
                                    <span className="report-date">{report.weekEnding}</span>
                                </div>

                                <div className="report-body">
                                    <div className="report-section section-completed">
                                        <div className="report-section-title">✅ Completed</div>
                                        <div className="section-content">{report.tasksCompleted}</div>
                                    </div>

                                    {report.challenges && (
                                        <div className="report-section section-challenges">
                                            <div className="report-section-title">🛑 Challenges</div>
                                            <div className="section-content">{report.challenges}</div>
                                        </div>
                                    )}

                                    {report.nextWeekPlan && (
                                        <div className="report-section section-plan">
                                            <div className="report-section-title">🔮 Next Week</div>
                                            <div className="section-content">{report.nextWeekPlan}</div>
                                        </div>
                                    )}
                                </div>

                                {report.prLinks && (
                                    <div className="report-footer">
                                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px', color: '#555' }}>
                                            🔗 Proof of Work
                                        </div>
                                        <div className="section-content" style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
                                            {report.prLinks}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}

                    {filteredReports.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'var(--card-bg)', borderRadius: '16px' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📭</div>
                            <h3>No Reports Found</h3>
                            <p style={{ color: '#888' }}>There are no weekly reports for the selected period.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeeklyReportsList;
