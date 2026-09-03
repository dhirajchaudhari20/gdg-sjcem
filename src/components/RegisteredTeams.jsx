import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import html2pdf from 'html2pdf.js';
import './RegisteredTeams.css';

// Config same as others...
const firebaseConfig = {
    apiKey: "AIzaSyCohKlqNu0I1sXcLW4D_fv-OEw9x0S50q8",
    authDomain: "dc-infotechpvt-1-d1a4b.firebaseapp.com",
    projectId: "dc-infotechpvt-1-d1a4b",
    storageBucket: "dc-infotechpvt-1-d1a4b.firebasestorage.app",
    messagingSenderId: "622552457680",
    appId: "1:622552457680:web:4b80e21e14e2bB266f19d5",
    measurementId: "G-ZXPZGMNR44",
    databaseURL: "https://dc-infotechpvt-1-d1a4b-default-rtdb.firebaseio.com"
};

const teamsApp = initializeApp(firebaseConfig, "registered-teams-view");
const db = getDatabase(teamsApp);

const RegisteredTeams = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (passcode === "judge2025") {
            setIsAuthenticated(true);
            fetchTeams();
        } else {
            alert("Invalid Passcode");
        }
    };

    const fetchTeams = () => {
        setLoading(true);
        const teamsRef = ref(db, 'hackathon/teams');
        onValue(teamsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const teamList = Object.values(data).map(team => {
                    // Handle Leader Format
                    let leaderDisplay = "Unknown";
                    if (typeof team.teamLeader === 'object') {
                        const l = team.teamLeader;
                        const college = l.college === "St. John College of Engineering and Management (Autonomous) (SJCEM)" ? "SJCEM" : l.college;
                        const details = l.division !== "N/A" ? `${l.division}-${l.rollNo}` : "";
                        leaderDisplay = `${l.name} (${l.year} ${l.branch} ${details}) [${college}]`;
                    } else {
                        leaderDisplay = team.teamLeader || "Unknown"; // Backwards compat
                    }

                    // Handle Members Format
                    let membersDisplay = "None";
                    if (Array.isArray(team.members)) {
                        membersDisplay = team.members.map(m => {
                            if (typeof m === 'object') {
                                const college = m.college === "St. John College of Engineering and Management (Autonomous) (SJCEM)" ? "SJCEM" : m.college;
                                const details = m.division !== "N/A" ? `${m.division}-${m.rollNo}` : "";
                                return `${m.name} (${m.year} ${m.branch} ${details}) [${college}]`;
                            }
                            return m; // Backwards compat string
                        }).join(", ");
                    } else if (typeof team.teamMembers === 'string') {
                        membersDisplay = team.teamMembers; // Backwards compat
                    }

                    return {
                        ...team,
                        leaderDisplay,
                        membersDisplay
                    };
                });

                // Sort by newest first
                teamList.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
                setTeams(teamList);
            } else {
                setTeams([]);
            }
            setLoading(false);
        });
    };

    // Calculate Total Students
    const totalStudents = teams.reduce((acc, team) => {
        let memberCount = 0;
        if (Array.isArray(team.members)) {
            memberCount = team.members.length;
        } else if (typeof team.teamMembers === 'string' && team.teamMembers !== "None") {
            // Fallback estimate for comma separated strings if needed, though usually parsed
            memberCount = team.teamMembers.split(',').length;
        }
        return acc + 1 + memberCount; // +1 for Leader
    }, 0);

    const exportPDF = () => {
        const element = document.getElementById("printable-area");
        const opt = {
            margin: 0.2,
            filename: 'Registered_Teams_List.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'landscape', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const clearData = () => {
        if (confirm("⚠️ ARE YOU SURE? This will permanently delete ALL registered teams data. This action cannot be undone.")) {
            if (confirm("Really sure? Last chance to cancel.")) {
                const teamsRef = ref(db, 'hackathon/teams');
                remove(teamsRef)
                    .then(() => alert("All team data cleared."))
                    .catch((err) => alert("Error clearing data: " + err.message));
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="reg-teams-container reg-teams-login">
                <h2>🔒 Admin Access</h2>
                <input
                    type="password"
                    className="reg-teams-input"
                    placeholder="Enter Passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button className="reg-teams-btn" onClick={handleLogin}>View Teams</button>
            </div>
        );
    }

    return (
        <div className="reg-teams-container">
            <div className="reg-teams-header">
                <div>
                    <button className="reg-teams-btn export" onClick={exportPDF}>Download PDF</button>
                    <button className="reg-teams-btn delete" onClick={clearData}>Clear Data</button>
                </div>
            </div>

            <div id="printable-area" className="printable-content">
                <div className="report-header">
                    <h2>📋 Registered Teams Report</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-value">{teams.length}</span>
                            <span className="stat-label">Teams</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-value">{totalStudents}</span>
                            <span className="stat-label">Total Students</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading teams...</p>
                ) : (
                    <div className="reg-teams-table-wrapper">
                        <table className="reg-teams-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>#</th>
                                    <th>Team Name</th>
                                    <th>Project Title</th>
                                    <th style={{ width: '25%' }}>Leader Details</th>
                                    <th style={{ width: '35%' }}>Members</th>
                                    <th>Registered At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No teams registered yet.</td>
                                    </tr>
                                ) : (
                                    teams.map((team, index) => (
                                        <tr key={index}>
                                            <td>{teams.length - index}</td>
                                            <td style={{ fontWeight: '700', color: '#1a73e8' }}>{team.teamName}</td>
                                            <td>{team.projectTitle || '-'}</td>
                                            <td style={{ fontSize: '13px', lineHeight: '1.4' }}>{team.leaderDisplay}</td>
                                            <td style={{ fontSize: '13px', lineHeight: '1.4' }}>{team.membersDisplay}</td>
                                            <td style={{ fontSize: '11px', color: '#666', width: '90px' }}>
                                                {team.registeredAt ? new Date(team.registeredAt).toLocaleString() : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisteredTeams;
