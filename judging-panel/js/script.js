import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// State
let isAuthenticated = false;
let scores = {
    idea: 0,
    innovation: 0,
    tech: 0,
    impact: 0,
    presentation: 0
};
let leaderboard = [];

// DOM Elements
const authContainer = document.getElementById('auth-container');
const mainPanel = document.getElementById('main-panel');
const passcodeInput = document.getElementById('passcode-input');
const loginBtn = document.getElementById('login-btn');
const judgeNameSelect = document.getElementById('judge-name');
const teamNameInput = document.getElementById('team-name');
const slidersContainer = document.getElementById('score-sliders');
const totalScoreDisplay = document.getElementById('total-score-display');
const statusDisplay = document.getElementById('status-display');
const submitScoreBtn = document.getElementById('submit-score-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');
const resetDataBtn = document.getElementById('reset-data-btn');
const leaderboardBody = document.getElementById('leaderboard-body');

// Auth Logic
const handleLogin = () => {
    if (passcodeInput.value === "judge2025") {
        isAuthenticated = true;
        authContainer.classList.add('hidden');
        mainPanel.classList.remove('hidden');
        initLeaderboardListener();
    } else {
        alert("Invalid Passcode");
    }
};

loginBtn.addEventListener('click', handleLogin);
passcodeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
});

// Score Slider Logic
const fields = ['idea', 'innovation', 'tech', 'impact', 'presentation'];

const updateScores = () => {
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    totalScoreDisplay.innerText = total;
};

fields.forEach(field => {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'hackathon-field';
    fieldDiv.innerHTML = `
        <label>
            ${field.charAt(0).toUpperCase() + field.slice(1)}
            <span class="hackathon-value" id="val-${field}">0</span>/10
        </label>
        <input
            type="range"
            class="hackathon-range"
            min="0"
            max="10"
            value="0"
            id="range-${field}"
        />
    `;
    slidersContainer.appendChild(fieldDiv);

    const rangeInput = fieldDiv.querySelector('input');
    const valueSpan = fieldDiv.querySelector('span');

    rangeInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        scores[field] = val;
        valueSpan.innerText = val;
        updateScores();
    });
});

// Firebase Realtime Listener
const initLeaderboardListener = () => {
    const scoresRef = ref(db, 'hackathon/scores');
    statusDisplay.innerText = "Status: Connecting to Firebase...";

    onValue(scoresRef, (snapshot) => {
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
            renderLeaderboard(ranking);
            statusDisplay.innerText = "Status: Live (Firebase)";
            statusDisplay.style.color = "green";
        } else {
            renderLeaderboard([]);
            statusDisplay.innerText = "Status: Live (No Data)";
            statusDisplay.style.color = "green";
        }
    }, (error) => {
        console.error(error);
        statusDisplay.innerText = "Status: Error connecting to Firebase";
        statusDisplay.style.color = "red";
    });
};

const renderLeaderboard = (ranking) => {
    leaderboardBody.innerHTML = '';
    ranking.forEach((item, index) => {
        const isWinner = index === 0 && item.avg > 0;
        const score1 = item.scores["Arun Sir"] || '-';
        const score2 = item.scores["Sunny Sir"] || '-';
        const score3 = item.scores["Ajay Sir"] || '-';

        const tr = document.createElement('tr');
        if (isWinner) tr.className = "winner-row";

        tr.innerHTML = `
            <td>${index + 1} ${isWinner ? '👑' : ''}</td>
            <td>${item.team}</td>
            <td>${score1}</td>
            <td>${score2}</td>
            <td>${score3}</td>
            <td><strong>${item.avg}</strong></td>
        `;
        leaderboardBody.appendChild(tr);
    });
};

// Save Score
submitScoreBtn.addEventListener('click', () => {
    const teamName = teamNameInput.value.trim();
    const judgeName = judgeNameSelect.value;
    const totalScore = parseInt(totalScoreDisplay.innerText);

    if (!teamName) {
        alert("Please enter a team name!");
        return;
    }

    const payload = {
        timestamp: new Date().toISOString(),
        team: teamName.toUpperCase(),
        judge: judgeName,
        ...scores,
        total: totalScore
    };

    const uniqueKey = `${payload.team.replace(/[^a-zA-Z0-9]/g, '_')}_${judgeName.replace(/\s/g, '_')}`;
    const recordRef = ref(db, `hackathon/scores/${uniqueKey}`);

    statusDisplay.innerText = "Status: Saving...";
    set(recordRef, payload)
        .then(() => {
            alert(`Score saved for ${payload.team} by ${judgeName}`);
            // Reset scores
            fields.forEach(field => {
                scores[field] = 0;
                document.getElementById(`range-${field}`).value = 0;
                document.getElementById(`val-${field}`).innerText = 0;
            });
            updateScores();
            statusDisplay.innerText = "Status: Live (Firebase)";
        })
        .catch((e) => {
            alert("Firebase Error: " + e.message);
            statusDisplay.innerText = "Status: Error Saving";
            statusDisplay.style.color = "red";
        });
});

// Export PDF
exportPdfBtn.addEventListener('click', () => {
    const element = document.getElementById("reportCard");
    const opt = {
        margin: 0.5,
        filename: 'Hackathon_Results.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});

// Clear Data (Safety Placeholder)
resetDataBtn.addEventListener('click', () => {
    if (confirm("To clear data, you must manually delete the 'hackathon' node in the Firebase Console. This button is a safety placeholder.")) {
        // No-op as per React version
    }
});
