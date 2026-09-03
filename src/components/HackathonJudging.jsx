import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import html2pdf from 'html2pdf.js';
import './HackathonJudging.css';

// Firebase Configuration (Specific to this component)
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

// Initialize Secondary Firebase App
const hackathonApp = initializeApp(firebaseConfig, "hackathon-judging");
const db = getDatabase(hackathonApp);

const HackathonJudging = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState("");

    const [judgeName, setJudgeName] = useState("Arun Sir");
    const [teamName, setTeamName] = useState("");

    const [scores, setScores] = useState({
        idea: 0,
        innovation: 0,
        tech: 0,
        impact: 0,
        presentation: 0
    });

    const [totalScore, setTotalScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [status, setStatus] = useState("Connecting...");

    // Auth check
    const handleLogin = () => {
        if (passcode === "judge2025") {
            setIsAuthenticated(true);
        } else {
            alert("Invalid Passcode");
        }
    };

    // Update total score when any individual score changes
    useEffect(() => {
        const sum = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
        setTotalScore(sum);
    }, [scores]);

    // Firebase Realtime Listener
    useEffect(() => {
        if (!isAuthenticated) return;

        const scoresRef = ref(db, 'hackathon/scores');
        setStatus("Connecting to Firebase...");

        const unsubscribe = onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tempScores = {};

                Object.values(data).forEach(record => {
                    const team = record.team.toUpperCase();
                    const judge = record.judge;
                    const total = record.total;

                    if (!tempScores[team]) tempScores[team] = {};
                    tempScores[team][judge] = total;
                });

                // Convert to array for ranking
                const ranking = Object.keys(tempScores).map(team => {
                    const teamScores = tempScores[team];
                    const judges = ["Arun Sir", "Sunny Sir", "Ajay Sir"];
                    let sum = 0;
                    let count = 0;

                    judges.forEach(j => {
                        if (teamScores[j] !== undefined) {
                            sum += teamScores[j];
                            count++;
                        }
                    });

                    const avg = count > 0 ? (sum / count).toFixed(1) : 0;
                    return { team, scores: teamScores, avg: parseFloat(avg) };
                });

                ranking.sort((a, b) => b.avg - a.avg);
                setLeaderboard(ranking);
                setStatus("Live (Firebase)");
            } else {
                setLeaderboard([]);
                setStatus("Live (No Data)");
            }
        }, (error) => {
            console.error(error);
            setStatus("Error connecting to Firebase");
        });

        return () => unsubscribe();
    }, [isAuthenticated]);

    const handleScoreChange = (field, value) => {
        setScores(prev => ({
            ...prev,
            [field]: parseInt(value)
        }));
    };

    const saveScore = () => {
        if (!teamName.trim()) {
            alert("Please enter a team name!");
            return;
        }

        const payload = {
            timestamp: new Date().toISOString(),
            team: teamName.trim().toUpperCase(),
            judge: judgeName,
            ...scores,
            total: totalScore
        };

        const uniqueKey = `${payload.team.replace(/[^a-zA-Z0-9]/g, '_')}_${judgeName.replace(/\s/g, '_')}`;
        const recordRef = ref(db, `hackathon/scores/${uniqueKey}`);

        setStatus("Saving...");
        set(recordRef, payload)
            .then(() => {
                alert(`Score saved for ${payload.team} by ${judgeName}`);
                setScores({
                    idea: 0,
                    innovation: 0,
                    tech: 0,
                    impact: 0,
                    presentation: 0
                });
                setStatus("Live (Firebase)");
            })
            .catch((e) => {
                alert("Firebase Error: " + e.message);
                setStatus("Error Saving");
            });
    };

    const exportPDF = () => {
        const element = document.getElementById("reportCard");
        const opt = {
            margin: 0.5,
            filename: 'Hackathon_Results.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const clearAll = () => {
        if (confirm("To clear data, you must manually delete the 'hackathon' node in the Firebase Console. This button is a safety placeholder.")) {
            // No-op
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="hackathon-judge-container hackathon-login">
                <h2>🔒 Judge Access</h2>
                <input
                    type="password"
                    className="hackathon-input"
                    placeholder="Enter Passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
                <button className="hackathon-btn save" onClick={handleLogin}>Enter Panel</button>
            </div>
        );
    }

    return (
        <div className="hackathon-judge-container" id="reportCard">
            <h2>🏆 Hackathon Judging Panel</h2>

            <div className="hackathon-field">
                <label>Select Judge</label>
                <select
                    className="hackathon-select"
                    value={judgeName}
                    onChange={(e) => setJudgeName(e.target.value)}
                >
                    <option value="Arun Sir">Arun Sir</option>
                    <option value="Sunny Sir">Sunny Sir</option>
                    <option value="Ajay Sir">Ajay Sir</option>
                </select>
            </div>

            <div className="hackathon-field">
                <label>Team Name</label>
                <input
                    type="text"
                    className="hackathon-input"
                    placeholder="Enter team name (e.g., Team Alpha)"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />
            </div>

            <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

            {['idea', 'innovation', 'tech', 'impact', 'presentation'].map(field => (
                <div className="hackathon-field" key={field}>
                    <label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                        <span className="hackathon-value">{scores[field]}</span>/10
                    </label>
                    <input
                        type="range"
                        className="hackathon-range"
                        min="0"
                        max="10"
                        value={scores[field]}
                        onChange={(e) => handleScoreChange(field, e.target.value)}
                    />
                </div>
            ))}

            <div className="hackathon-total">
                Current Score: <span>{totalScore}</span> / 50
                <div className="hackathon-status" style={{ color: status.includes("Error") ? "red" : "green" }}>
                    Status: {status}
                </div>
            </div>

            <div className="hackathon-btn-group">
                <button className="hackathon-btn save" onClick={saveScore}>Submit Score</button>
                <button className="hackathon-btn export" onClick={exportPDF}>Download Result PDF</button>
                <button className="hackathon-btn danger" onClick={clearAll}>Reset All Data</button>
            </div>

            <h3>📊 Live Leaderboard</h3>
            <div className="hackathon-table-container">
                <table className="hackathon-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team Name</th>
                            <th>Arun</th>
                            <th>Sunny</th>
                            <th>Ajay</th>
                            <th>Avg Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((item, index) => {
                            const isWinner = index === 0 && item.avg > 0;
                            const score1 = item.scores["Arun Sir"] || '-';
                            const score2 = item.scores["Sunny Sir"] || '-';
                            const score3 = item.scores["Ajay Sir"] || '-';

                            return (
                                <tr key={item.team} className={isWinner ? "winner-row" : ""}>
                                    <td>{index + 1} {isWinner ? '👑' : ''}</td>
                                    <td>{item.team}</td>
                                    <td>{score1}</td>
                                    <td>{score2}</td>
                                    <td>{score3}</td>
                                    <td><strong>{item.avg}</strong></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HackathonJudging;
