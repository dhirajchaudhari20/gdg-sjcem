import React, { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import './TeamRegistration.css';

// Reuse the same config
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

// Initialize App
const registrationApp = initializeApp(firebaseConfig, "team-registration");
const db = getDatabase(registrationApp);

const BRANCHES = ["COMP", "IT", "AI", "DS", "EXTC", "MECH", "CIVIL", "ECS", "Auto", "Other"];
const YEARS = ["FE", "SE", "TE", "BE", "Other"];
const DIVISIONS = ["A", "B", "Other"];
const COLLEGES = ["St. John College of Engineering and Management (Autonomous) (SJCEM)", "Other"];

const TeamRegistration = () => {
    // Basic Info
    const [teamName, setTeamName] = useState("");
    const [projectTitle, setProjectTitle] = useState("");

    // Leader Info
    const [leader, setLeader] = useState({
        name: "",
        college: "St. John College of Engineering and Management (Autonomous) (SJCEM)",
        customCollege: "",
        branch: "COMP",
        customBranch: "",
        year: "TE",
        customYear: "",
        division: "A",
        customDivision: "",
        rollNo: ""
    });

    // Member Info (Transient state for adding)
    const [members, setMembers] = useState([]);
    const [currentMember, setCurrentMember] = useState({
        name: "",
        college: "St. John College of Engineering and Management (Autonomous) (SJCEM)",
        customCollege: "",
        branch: "COMP",
        customBranch: "",
        year: "TE",
        customYear: "",
        division: "A",
        customDivision: "",
        rollNo: ""
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLeaderChange = (e) => {
        const { name, value } = e.target;
        setLeader(prev => ({ ...prev, [name]: value }));
    };

    const handleMemberChange = (e) => {
        const { name, value } = e.target;
        setCurrentMember(prev => ({ ...prev, [name]: value }));
    };

    const addMember = () => {
        if (!currentMember.name) {
            alert("Member Name is required");
            return;
        }

        const isSJCEM = currentMember.college === "St. John College of Engineering and Management (Autonomous) (SJCEM)";

        // Process custom values before adding
        const finalMember = {
            name: currentMember.name,
            college: currentMember.college === "Other" ? currentMember.customCollege : currentMember.college,
            // Branch/Year always shown
            branch: currentMember.branch === "Other" ? currentMember.customBranch : currentMember.branch,
            year: currentMember.year === "Other" ? currentMember.customYear : currentMember.year,

            // Only include Div/Roll if SJCEM
            division: isSJCEM ? (currentMember.division === "Other" ? currentMember.customDivision : currentMember.division) : "N/A",
            rollNo: isSJCEM ? currentMember.rollNo : "N/A",
        };

        setMembers([...members, finalMember]);
        setCurrentMember({
            name: "",
            college: "St. John College of Engineering and Management (Autonomous) (SJCEM)",
            customCollege: "",
            branch: "COMP", customBranch: "",
            year: "TE", customYear: "",
            division: "A", customDivision: "",
            rollNo: ""
        });
    };

    const removeMember = (index) => {
        const newMembers = [...members];
        newMembers.splice(index, 1);
        setMembers(newMembers);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!teamName || !leader.name) {
            setStatus({ type: 'error', message: 'Team Name and Leader Name are required.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        const teamKey = teamName.trim().replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();

        const isLeaderSJCEM = leader.college === "St. John College of Engineering and Management (Autonomous) (SJCEM)";

        // Process Leader custom values
        const finalLeader = {
            name: leader.name,
            college: leader.college === "Other" ? leader.customCollege : leader.college,
            branch: leader.branch === "Other" ? leader.customBranch : leader.branch,
            year: leader.year === "Other" ? leader.customYear : leader.year,
            division: isLeaderSJCEM ? (leader.division === "Other" ? leader.customDivision : leader.division) : "N/A",
            rollNo: isLeaderSJCEM ? leader.rollNo : "N/A",
        };

        const payload = {
            teamName,
            projectTitle,
            teamLeader: finalLeader,
            members: members,
            registeredAt: new Date().toISOString()
        };

        const teamRef = ref(db, `hackathon/teams/${teamKey}`);

        set(teamRef, payload)
            .then(() => {
                setStatus({
                    type: 'success',
                    message: `Team "${teamName}" Registered Successfully! 🚀 We look forward to seeing you in person and helping you to win!`
                });
                setTeamName("");
                setProjectTitle("");
                setLeader({
                    name: "",
                    college: "St. John College of Engineering and Management (Autonomous) (SJCEM)", customCollege: "",
                    branch: "COMP", customBranch: "",
                    year: "TE", customYear: "",
                    division: "A", customDivision: "",
                    rollNo: ""
                });
                setMembers([]);
            })
            .catch((error) => {
                console.error(error);
                setStatus({ type: 'error', message: 'Failed to register. Please try again.' });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="team-reg-container">
            <h2>🚀 Team Registration</h2>

            <form onSubmit={handleSubmit}>
                {/* Team Details */}
                <div className="team-reg-section">
                    <h3>Team Details</h3>
                    <div className="team-reg-field">
                        <label>Team Name *</label>
                        <input
                            type="text"
                            className="team-reg-input"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="e.g. Logic Lords"
                            required
                        />
                    </div>
                    <div className="team-reg-field">
                        <label>Project Title (Optional)</label>
                        <input
                            type="text"
                            className="team-reg-input"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            placeholder="e.g. Quiz Generator for GDG 😂"
                        />
                    </div>
                </div>

                {/* Leader Details */}
                <div className="team-reg-section">
                    <h3>⚡ Team Leader</h3>
                    <div className="team-reg-field">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            className="team-reg-input"
                            value={leader.name}
                            onChange={handleLeaderChange}
                            placeholder="e.g. Dhiraj Chaudhari"
                            required
                        />
                    </div>

                    <div className="team-reg-field">
                        <label>College</label>
                        <select name="college" className="team-reg-select" value={leader.college} onChange={handleLeaderChange}>
                            {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {leader.college === "Other" && (
                            <input
                                type="text"
                                name="customCollege"
                                className="team-reg-input"
                                placeholder="Enter College Name"
                                style={{ marginTop: '5px' }}
                                value={leader.customCollege}
                                onChange={handleLeaderChange}
                            />
                        )}
                    </div>

                    <div className="team-reg-grid">
                        <div className="team-reg-field">
                            <label>Branch</label>
                            <select name="branch" className="team-reg-select" value={leader.branch} onChange={handleLeaderChange}>
                                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                            {leader.branch === "Other" && (
                                <input
                                    type="text"
                                    name="customBranch"
                                    className="team-reg-input"
                                    placeholder="Enter Branch"
                                    style={{ marginTop: '5px' }}
                                    value={leader.customBranch}
                                    onChange={handleLeaderChange}
                                />
                            )}
                        </div>

                        <div className="team-reg-field">
                            <label>Year</label>
                            <select name="year" className="team-reg-select" value={leader.year} onChange={handleLeaderChange}>
                                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            {leader.year === "Other" && (
                                <input
                                    type="text"
                                    name="customYear"
                                    className="team-reg-input"
                                    placeholder="Enter Year"
                                    style={{ marginTop: '5px' }}
                                    value={leader.customYear}
                                    onChange={handleLeaderChange}
                                />
                            )}
                        </div>

                        {/* Conditional Rendering for SJCEM Only */}
                        {leader.college === "St. John College of Engineering and Management (Autonomous) (SJCEM)" && (
                            <>
                                <div className="team-reg-field">
                                    <label>Division</label>
                                    <select name="division" className="team-reg-select" value={leader.division} onChange={handleLeaderChange}>
                                        {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                    {leader.division === "Other" && (
                                        <input
                                            type="text"
                                            name="customDivision"
                                            className="team-reg-input"
                                            placeholder="Enter Division"
                                            style={{ marginTop: '5px' }}
                                            value={leader.customDivision}
                                            onChange={handleLeaderChange}
                                        />
                                    )}
                                </div>

                                <div className="team-reg-field">
                                    <label>Roll No.</label>
                                    <input
                                        type="text"
                                        name="rollNo"
                                        className="team-reg-input"
                                        value={leader.rollNo}
                                        onChange={handleLeaderChange}
                                        placeholder="e.g. 12"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Team Members */}
                <div className="team-reg-section">
                    <h3>👥 Team Members ({members.length})</h3>

                    {members.map((m, idx) => (
                        <div key={idx} className="member-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4>{m.name}</h4>
                                <button type="button" className="team-reg-btn remove-member" onClick={() => removeMember(idx)}>Remove</button>
                            </div>
                            <p style={{ fontSize: '13px', color: '#555' }}>{m.college}</p>
                            <p>{m.year} {m.branch} {m.division !== "N/A" ? `${m.division} - ${m.rollNo}` : ""}</p>
                        </div>
                    ))}

                    <div style={{ marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '15px' }}>
                        <h4 style={{ marginTop: 0, marginBottom: '10px', color: '#666' }}>Add Member</h4>
                        <div className="team-reg-field">
                            <input
                                type="text"
                                name="name"
                                className="team-reg-input"
                                placeholder="Member Full Name"
                                value={currentMember.name}
                                onChange={handleMemberChange}
                            />
                        </div>

                        <div className="team-reg-field">
                            <label style={{ fontSize: '13px' }}>College</label>
                            <select name="college" className="team-reg-select" value={currentMember.college} onChange={handleMemberChange}>
                                {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {currentMember.college === "Other" && (
                                <input
                                    type="text"
                                    name="customCollege"
                                    className="team-reg-input"
                                    placeholder="Enter College Name"
                                    style={{ marginTop: '5px' }}
                                    value={currentMember.customCollege}
                                    onChange={handleMemberChange}
                                />
                            )}
                        </div>

                        <div className="team-reg-grid">
                            <div className="team-reg-field">
                                <select name="branch" className="team-reg-select" value={currentMember.branch} onChange={handleMemberChange}>
                                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                                {currentMember.branch === "Other" && (
                                    <input
                                        type="text"
                                        name="customBranch"
                                        className="team-reg-input"
                                        placeholder="Enter Branch"
                                        style={{ marginTop: '5px' }}
                                        value={currentMember.customBranch}
                                        onChange={handleMemberChange}
                                    />
                                )}
                            </div>

                            <div className="team-reg-field">
                                <select name="year" className="team-reg-select" value={currentMember.year} onChange={handleMemberChange}>
                                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                                {currentMember.year === "Other" && (
                                    <input
                                        type="text"
                                        name="customYear"
                                        className="team-reg-input"
                                        placeholder="Enter Year"
                                        style={{ marginTop: '5px' }}
                                        value={currentMember.customYear}
                                        onChange={handleMemberChange}
                                    />
                                )}
                            </div>

                            {/* Conditional Rendering using currentMember.college */}
                            {currentMember.college === "St. John College of Engineering and Management (Autonomous) (SJCEM)" && (
                                <>
                                    <div className="team-reg-field">
                                        <select name="division" className="team-reg-select" value={currentMember.division} onChange={handleMemberChange}>
                                            {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        {currentMember.division === "Other" && (
                                            <input
                                                type="text"
                                                name="customDivision"
                                                className="team-reg-input"
                                                placeholder="Enter Division"
                                                style={{ marginTop: '5px' }}
                                                value={currentMember.customDivision}
                                                onChange={handleMemberChange}
                                            />
                                        )}
                                    </div>

                                    <div className="team-reg-field">
                                        <input
                                            type="text"
                                            name="rollNo"
                                            className="team-reg-input"
                                            value={currentMember.rollNo}
                                            onChange={handleMemberChange}
                                            placeholder="Roll No"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <button type="button" className="team-reg-btn add-member" onClick={addMember}>+ Add Member</button>
                    </div>
                </div>

                <button type="submit" className="team-reg-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Submit Registration'}
                </button>

                {status.message && (
                    <div className={`team-reg-status ${status.type === 'error' ? 'team-reg-error' : 'team-reg-success'}`}>
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default TeamRegistration;
