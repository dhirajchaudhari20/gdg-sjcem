import React from 'react';
import { Link } from 'react-router-dom';
import './Leaderboard.css';

const Leaderboard = ({ preview = false }) => {
    // Real Data from Google Cloud Skills Boost
    const participants = [
        { id: 1, name: "Riya Umesh Singh", role: "Student", badges: 19, games: 1 },
        { id: 2, name: "Ramesh Choudhary", role: "Student", badges: 19, games: 1 },
        { id: 3, name: "Rupali Bharat Kashid", role: "Student", badges: 19, games: 1 },
        { id: 4, name: "Niv Jitendra Patel", role: "Student", badges: 19, games: 1 },
        { id: 5, name: "Priti Manoj Varma", role: "Student", badges: 19, games: 1 },
        { id: 6, name: "Shayan Abdul Salam Sayed", role: "Student", badges: 19, games: 1 },
        { id: 7, name: "Soham Kalidas Mane", role: "Student", badges: 11, games: 0 },
        { id: 8, name: "Sahas Santosh Bochare", role: "Student", badges: 5, games: 0, image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sahas_bochare_EIH7Urf.jpg" },
        { id: 9, name: "Mayuresh Prakash Dasure", role: "Student", badges: 4, games: 0 },
        { id: 10, name: "Anushri Amul Sane", role: "Student", badges: 4, games: 0 },
        { id: 11, name: "Saiyed Furquanahmed", role: "Student", badges: 2, games: 0 },
        { id: 12, name: "Sumit Chaurasiya", role: "Student", badges: 1, games: 1 },
        { id: 13, name: "Parth Ninad Chaudhari", role: "Student", badges: 1, games: 0 },
        { id: 14, name: "Vidhi Naresh Jain", role: "Student", badges: 1, games: 0 },
        { id: 15, name: "Asher Sandeep Carneiro", role: "Student", badges: 1, games: 0 }
    ].map(p => ({
        ...p,
        score: (p.badges * 500) + (p.games * 1000),
        avatar: p.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random&color=fff&bold=true`
    }));

    const sorted = [...participants].sort((a, b) => b.score - a.score);
    const top3 = [sorted[1], sorted[0], sorted[2]]; // Silver, Gold, Bronze order

    // If preview is true, show only next 2 (total 5: 3 on podium + 2 in list)
    const rest = preview ? sorted.slice(3, 5) : sorted.slice(3);

    return (
        <section className="leaderboard-section">
            <div className="leaderboard-container">
                <h1 className="leaderboard-title" data-aos="fade-down">GenAI Hall of Fame</h1>
                <p className="leaderboard-subtitle" data-aos="fade-up" data-aos-delay="200">
                    Top contributors and performers in our community.
                </p>

                {/* Podium for Desktop */}
                <div className="podium" data-aos="zoom-in">
                    {top3.map((p, i) => (
                        <div key={p.id} className={`podium-place rank-${i === 1 ? '1' : i === 0 ? '2' : '3'}`}>
                            <div className="podium-avatar-wrapper">
                                {i === 1 && <span className="crown">👑</span>}
                                <img src={p.avatar} alt={p.name} className="podium-avatar" />
                            </div>
                            <div className="podium-block">
                                <span className="podium-name">{p.name}</span>
                                <span className="podium-score">{p.score} XP</span>
                                <span className="podium-rank">#{i === 1 ? '1' : i === 0 ? '2' : '3'}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* List for Rest */}
                <div className="leaderboard-list">
                    {rest.map((p, index) => (
                        <div
                            key={p.id}
                            className="list-item"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <span className="list-rank">#{index + 4}</span>
                            <img src={p.avatar} alt={p.name} className="list-avatar" />
                            <div className="list-info">
                                <span className="list-name">{p.name}</span>
                                <span className="list-role">{p.role}</span>
                            </div>
                            <span className="list-score">{p.score} XP</span>
                        </div>
                    ))}
                </div>

                {preview && (
                    <div className="view-all-container" data-aos="fade-up">
                        <Link to="/leaderboard" className="view-all-btn">
                            View Full Leaderboard →
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Leaderboard;
