import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get, update, remove } from 'firebase/database';
import './OrganizerApplicationsDashboard.css';

const PASSCODE = 'gdg2026'; // Admin Passcode to unlock dashboard

const OrganizerApplicationsDashboard = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [inputPasscode, setInputPasscode] = useState('');
    const [passcodeError, setPasscodeError] = useState(false);

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [filterYear, setFilterYear] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        const savedAuth = localStorage.getItem('gdg_admin_authenticated');
        if (savedAuth === 'true') {
            setAuthenticated(true);
            fetchApplications();
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (inputPasscode === PASSCODE) {
            setAuthenticated(true);
            setPasscodeError(false);
            localStorage.setItem('gdg_admin_authenticated', 'true');
            fetchApplications();
        } else {
            setPasscodeError(true);
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem('gdg_admin_authenticated');
    };

    const fetchApplications = async () => {
        setLoading(true);
        const appsMap = new Map();

        try {
            const rtdbRef = ref(database, 'organizer_applications_2026');
            const snapshot = await get(rtdbRef);
            if (snapshot.exists()) {
                const dataObj = snapshot.val();
                Object.keys(dataObj).forEach((key) => {
                    const item = dataObj[key];
                    const subCode = item.submissionCode || key;
                    appsMap.set(subCode, { id: key, ...item });
                });
            }
        } catch (rtdbErr) {
            console.error("Realtime DB fetch error:", rtdbErr);
        }

        setApplications(Array.from(appsMap.values()).sort((a, b) => (b.createdAtTimestamp || 0) - (a.createdAtTimestamp || 0)));
        setLoading(false);
    };

    const handleUpdateStatus = async (appId, newStatus) => {
        try {
            const appRef = ref(database, `organizer_applications_2026/${appId}`);
            await update(appRef, { status: newStatus });
            
            setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
            if (selectedApp && selectedApp.id === appId) {
                setSelectedApp(prev => ({ ...prev, status: newStatus }));
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Could not update candidate status.");
        }
    };

    const handleDelete = async (appId) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        try {
            await remove(ref(database, `organizer_applications_2026/${appId}`));
            setApplications(prev => prev.filter(a => a.id !== appId));
            if (selectedApp && selectedApp.id === appId) setSelectedApp(null);
        } catch (err) {
            console.error("Error deleting candidate:", err);
            alert("Failed to delete application.");
        }
    };

    const exportToCSV = () => {
        if (applications.length === 0) return;
        const headers = [
            "Ref Code", "Full Name", "College Email", "Personal Email", "Phone", "Gender", 
            "Year of Study", "Branch", "Primary Contribution", "Skills", "Time Commitment", 
            "Why Organizer", "Workshop Plan", "First Initiative", "Video Pitch Link", "Status", "Submitted Date"
        ];
        const rows = applications.map(a => [
            `"${a.submissionCode || ''}"`,
            `"${a.fullName || ''}"`,
            `"${a.collegeEmail || ''}"`,
            `"${a.personalEmail || ''}"`,
            `"${a.contactNumber || ''}"`,
            `"${a.gender || ''}"`,
            `"${a.currentYear || ''}"`,
            `"${a.branch || ''}"`,
            `"${a.primaryContribution || ''}"`,
            `"${(a.allSkills || []).join('; ')}"`,
            `"${a.timeCommitment || ''}"`,
            `"${(a.whyOrganizer || '').replace(/"/g, '""')}"`,
            `"${(a.workshopScenario || '').replace(/"/g, '""')}"`,
            `"${(a.firstInitiative || '').replace(/"/g, '""')}"`,
            `"${a.videoPitchUrl || ''}"`,
            `"${a.status || 'Under Review'}"`,
            `"${a.submittedAtString || ''}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `GDG_Organizer_Applications_2026-27.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredApps = applications.filter(app => {
        const matchesSearch = (app.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (app.collegeEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (app.submissionCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (app.branch || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = filterGender === 'all' || app.gender === filterGender;
        const matchesYear = filterYear === 'all' || app.currentYear === filterYear;
        const matchesStatus = filterStatus === 'all' || (app.status || 'Under Review') === filterStatus;
        return matchesSearch && matchesGender && matchesYear && matchesStatus;
    });

    // Counts for female & technical requirement validation
    const totalFemale = applications.filter(a => a.gender === 'Female').length;
    const totalPreFinal = applications.filter(a => a.currentYear === 'Pre-Final Year').length;
    const totalFinal = applications.filter(a => a.currentYear === 'Final Year').length;
    const selectedFemale = applications.filter(a => a.gender === 'Female' && a.status === 'Selected').length;

    if (!authenticated) {
        return (
            <div className="admin-lock-screen">
                <div className="lock-card" data-aos="zoom-in">
                    <div className="lock-icon">🔐</div>
                    <h2>GDG Organizer Portal</h2>
                    <p>Enter the admin passcode to access candidate applications & selection panel.</p>

                    <form onSubmit={handleLogin} className="lock-form">
                        <input 
                            type="password" 
                            placeholder="Enter Passcode (e.g. gdg2026)" 
                            value={inputPasscode}
                            onChange={(e) => setInputPasscode(e.target.value)}
                            className={passcodeError ? 'input-error' : ''}
                            autoFocus
                        />
                        {passcodeError && <span className="error-text">Incorrect Admin Passcode</span>}
                        <button type="submit" className="btn btn-primary btn-block">
                            Unlock Dashboard 🚀
                        </button>
                    </form>
                    <small className="hint-text">Default Passcode: <code>gdg2026</code></small>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-wrapper">
            {/* Top Bar Banner */}
            <div className="admin-top-header">
                <div className="container admin-header-flex">
                    <div>
                        <div className="admin-badge">
                            <span className="dot blue"></span>
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                            Internal Review Panel • 2026-27
                        </div>
                        <h1>Organizer Applications Dashboard</h1>
                        <p className="admin-subtext">Review responses, track team criteria compliance, and manage shortlist.</p>
                    </div>

                    <div className="admin-header-actions">
                        <button className="btn btn-outline" onClick={exportToCSV} disabled={applications.length === 0}>
                            📥 Export CSV ({applications.length})
                        </button>
                        <button className="btn btn-secondary" onClick={handleLogout}>
                            🔒 Lock Portal
                        </button>
                    </div>
                </div>
            </div>

            <div className="container admin-content-container">

                {/* Team Requirements Progress Cards */}
                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-title">Total Applications</div>
                        <div className="metric-value">{applications.length}</div>
                        <div className="metric-sub">Stored in Realtime Database</div>
                    </div>

                    <div className="metric-card highlight-metric">
                        <div className="metric-title">👩 Female Candidates</div>
                        <div className="metric-value">{totalFemale} <small>({selectedFemale} selected)</small></div>
                        <div className="metric-sub">Criteria: Min 1 Female Organizer</div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-title">🎓 Final Year Candidates</div>
                        <div className="metric-value">{totalFinal}</div>
                        <div className="metric-sub">Criteria: 1 Final Year</div>
                    </div>

                    <div className="metric-card">
                        <div className="metric-title">📚 Pre-Final Year Candidates</div>
                        <div className="metric-value">{totalPreFinal}</div>
                        <div className="metric-sub">Criteria: 2 Pre-Final Year</div>
                    </div>
                </div>

                {/* Toolbar Filters */}
                <div className="admin-filter-bar">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search by name, email, ref code, or branch..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filters-group">
                        <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                            <option value="all">All Genders</option>
                            <option value="Female">Female Candidates 👩</option>
                            <option value="Male">Male Candidates 👨</option>
                        </select>

                        <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
                            <option value="all">All Academic Years</option>
                            <option value="Pre-Final Year">Pre-Final Year</option>
                            <option value="Final Year">Final Year</option>
                            <option value="2nd Year">2nd Year</option>
                        </select>

                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">All Statuses</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                        <button className="btn btn-secondary" onClick={fetchApplications}>
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                {/* Applications Data Table */}
                {loading ? (
                    <div className="admin-loading-state">
                        <div className="spinner"></div>
                        <p>Loading candidate responses from Realtime Database...</p>
                    </div>
                ) : filteredApps.length === 0 ? (
                    <div className="admin-empty-card">
                        <div className="empty-icon">📂</div>
                        <h3>No Candidate Applications Found</h3>
                        <p>No candidate records match your current search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="table-wrapper-card">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Applicant Details</th>
                                    <th>Gender</th>
                                    <th>Year & Branch</th>
                                    <th>Primary Focus</th>
                                    <th>Top Skills</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map((app) => (
                                    <tr key={app.id} className={selectedApp?.id === app.id ? 'row-selected' : ''}>
                                        <td>
                                            <span className="ref-code-tag">{app.submissionCode}</span>
                                        </td>
                                        <td>
                                            <div className="applicant-name">{app.fullName}</div>
                                            <div className="applicant-email">{app.collegeEmail}</div>
                                            <div className="applicant-phone">📱 {app.contactNumber}</div>
                                        </td>
                                        <td>
                                            <span className={`gender-badge ${app.gender === 'Female' ? 'female' : ''}`}>
                                                {app.gender}
                                            </span>
                                        </td>
                                        <td>
                                            <strong>{app.currentYear}</strong>
                                            <div className="branch-text">{app.branch}</div>
                                        </td>
                                        <td>
                                            <div className="focus-pill">{app.primaryContribution}</div>
                                        </td>
                                        <td>
                                            <div className="skills-wrap">
                                                {(app.allSkills || []).slice(0, 3).map((skill, i) => (
                                                    <span key={i} className="skill-mini-chip">{skill}</span>
                                                ))}
                                                {(app.allSkills || []).length > 3 && (
                                                    <span className="skill-mini-chip count">+{app.allSkills.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`status-tag ${(app.status || 'Under Review').toLowerCase().replace(/\s+/g, '-')}`}>
                                                {app.status || 'Under Review'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons-group">
                                                <button className="btn-sm btn-info" onClick={() => setSelectedApp(app)}>
                                                    👁️ View
                                                </button>
                                                <select 
                                                    className="status-selector" 
                                                    value={app.status || 'Under Review'}
                                                    onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                                                >
                                                    <option value="Under Review">Under Review</option>
                                                    <option value="Shortlisted">Shortlisted</option>
                                                    <option value="Selected">Selected 🎉</option>
                                                    <option value="Rejected">Not Shortlisted</option>
                                                </select>
                                                <button className="btn-sm btn-danger-sm" onClick={() => handleDelete(app.id)} title="Delete Application">
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

            {/* Candidate Detail Modal */}
            {selectedApp && (
                <div className="modal-backdrop" onClick={() => setSelectedApp(null)}>
                    <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <span className="ref-code-tag">{selectedApp.submissionCode}</span>
                                <h2>{selectedApp.fullName}</h2>
                                <p>{selectedApp.collegeEmail} • {selectedApp.contactNumber}</p>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedApp(null)}>✕</button>
                        </div>

                        <div className="modal-body-scroll">
                            <div className="modal-meta-grid">
                                <div><strong>Gender:</strong> {selectedApp.gender}</div>
                                <div><strong>Academic Year:</strong> {selectedApp.currentYear}</div>
                                <div><strong>Branch:</strong> {selectedApp.branch}</div>
                                <div><strong>Time Commitment:</strong> {selectedApp.timeCommitment}</div>
                                <div><strong>Primary Area:</strong> {selectedApp.primaryContribution}</div>
                                <div><strong>Submitted On:</strong> {selectedApp.submittedAtString}</div>
                            </div>

                            <div className="modal-section">
                                <h3>Skills & Background</h3>
                                <div className="skills-wrap" style={{ marginBottom: '14px' }}>
                                    {(selectedApp.allSkills || []).map((s, idx) => (
                                        <span key={idx} className="skill-mini-chip">{s}</span>
                                    ))}
                                </div>
                                <p><strong>Proud Project / Technical Achievement:</strong></p>
                                <div className="response-box">{selectedApp.proudProject}</div>
                            </div>

                            <div className="modal-section">
                                <h3>GDG & Event Experience</h3>
                                <p><strong>Prior GDG Participant:</strong> {selectedApp.priorGdgParticipant}</p>
                                <p><strong>Prior Event Organizer:</strong> {selectedApp.priorEventOrganizer}</p>
                                {selectedApp.eventOrganizerDesc && (
                                    <div className="response-box">{selectedApp.eventOrganizerDesc}</div>
                                )}
                                {selectedApp.otherCommunitiesDesc && (
                                    <>
                                        <p style={{ marginTop: '10px' }}><strong>Other Communities/Clubs:</strong></p>
                                        <div className="response-box">{selectedApp.otherCommunitiesDesc}</div>
                                    </>
                                )}
                            </div>

                            <div className="modal-section">
                                <h3>Motivation & Scenario Responses</h3>
                                <p><strong>Why GDG Organizer?</strong></p>
                                <div className="response-box">{selectedApp.whyOrganizer}</div>

                                <p style={{ marginTop: '14px' }}><strong>Traits of a Good Community Organizer:</strong></p>
                                <div className="response-box">{selectedApp.goodOrganizerTraits}</div>

                                <p style={{ marginTop: '14px' }}><strong>Ideas for 2026-27 Tenure:</strong></p>
                                <div className="response-box">{selectedApp.ideasForTenure}</div>

                                <p style={{ marginTop: '14px' }}><strong>Scenario: 100+ Student Workshop Execution Plan:</strong></p>
                                <div className="response-box">{selectedApp.workshopScenario}</div>

                                <p style={{ marginTop: '14px' }}><strong>First Proposed Initiative:</strong></p>
                                <div className="response-box">{selectedApp.firstInitiative}</div>

                                {selectedApp.videoPitchUrl && (
                                    <div style={{ marginTop: '16px', background: '#e8f0fe', padding: '14px 18px', borderRadius: '10px', borderLeft: '4px solid #1a73e8' }}>
                                        <p style={{ margin: 0, fontWeight: 'bold', color: '#1a73e8' }}>📹 Candidate Self-Introduction Video Pitch:</p>
                                        <a href={selectedApp.videoPitchUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8', textDecoration: 'underline', wordBreak: 'break-all' }}>
                                            {selectedApp.videoPitchUrl} ↗
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <div className="status-change-box">
                                <span>Change Status: </span>
                                <select 
                                    value={selectedApp.status || 'Under Review'} 
                                    onChange={(e) => handleUpdateStatus(selectedApp.id, e.target.value)}
                                >
                                    <option value="Under Review">Under Review</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-danger" onClick={() => handleDelete(selectedApp.id)}>
                                    🗑️ Delete
                                </button>
                                <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganizerApplicationsDashboard;
