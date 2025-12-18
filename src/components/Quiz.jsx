import React, { useState, useEffect } from 'react';
import './Quiz.css';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// Fisher-Yates Shuffle
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const Quiz = ({ data = {} }) => {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question

    const [activeQuestions, setActiveQuestions] = useState([]);
    const [debugLog, setDebugLog] = useState([]); // Visual debug log for user

    const addLog = (msg) => {
        console.log(msg);
        setDebugLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    };
    const { title, description, questions = [] } = data;
    // Use activeQuestions if started, otherwise fallback/placeholder
    // FIX: If activeQuestions is empty after start (weird bug), default to raw questions
    const currentQuestion = started
        ? (activeQuestions.length > 0 ? activeQuestions[currentQuestionIndex] : (questions.length > 0 ? questions[currentQuestionIndex] : null))
        : (questions.length > 0 ? questions[0] : null);

    const [userName, setUserName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [submittingScore, setSubmittingScore] = useState(false);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
    const [leaderboardError, setLeaderboardError] = useState(null);

    const quizCollectionRef = collection(db, 'techsprint_quiz_beta_1');

    // Fetch Leaderboard
    useEffect(() => {
        // SIMPLIFIED QUERY: Only order by score desc. 
        // Secondary sort (timeTaken) will be done client-side to avoid "Composite Index" errors.
        // Increased limit to 100.
        const q = query(quizCollectionRef, orderBy('score', 'desc'), limit(100));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const rawData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                // CLIENT-SIDE SORT:
                // 1. Score (High to Low) - handled by query largely, but good to reinforce
                // 2. Time (Low to High) - for ties in score
                const sortedData = rawData.sort((a, b) => {
                    if (b.score !== a.score) return b.score - a.score;
                    return (a.timeTaken || 9999) - (b.timeTaken || 9999);
                });

                setLeaderboard(sortedData);
                setLeaderboardError(null);
            } catch (err) {
                console.error("Error processing leaderboard data:", err);
                setLeaderboardError("Failed to process leaderboard data.");
            }
        }, (error) => {
            console.error("Leaderboard fetch error:", error);
            // Show the actual error message to the user/developer for debugging
            setLeaderboardError(`Error: ${error.message} (Check console for details)`);
        });

        return () => unsubscribe();
    }, []);

    // Timer Logic
    useEffect(() => {
        let timer;
        if (started && !isAnswered && !showResult && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isAnswered) {
            // Time's up! Treat as incorrect/skipped
            handleOptionClick(null, true);
        }
        return () => clearInterval(timer);
    }, [started, isAnswered, showResult, timeLeft]);

    const handleStart = () => {
        if (!questions || questions.length === 0) {
            alert("No questions available for this quiz!");
            return;
        }

        if (!userName.trim()) {
            alert("Please enter your name first!");
            return;
        }

        // Shuffle questions
        const shuffled = shuffleArray(questions);
        setActiveQuestions(shuffled);

        setNameSubmitted(true);
        setStarted(true);
        setStartTime(Date.now());
        setTimeLeft(10); // Reset timer for first question
    };

    const handleOptionClick = (option, isTimeout = false) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (!isTimeout && option === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
            if (currentQuestionIndex === questions.length - 1) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }

        // Auto advance after short delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswered(false);
                setTimeLeft(10); // Reset timer for next question
            } else {
                setEndTime(Date.now());
                setShowResult(true);
            }
        }, 1200);
    };

    const handleRestart = () => {
        setStarted(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowResult(false);
        setStartTime(null);
        setEndTime(null);
        setScoreSubmitted(false);
        setSubmittingScore(false); // Ensure this is reset too
        setTimeLeft(10);
        setDebugLog([]); // Clear log
        // Keep name for convenience
    };

    // Auto-detect if score was successfully added (via real-time listener)
    useEffect(() => {
        if (showResult && !scoreSubmitted && userName) {
            // Simplified check: Name and Score matching is enough for this context
            // to assume it's the current user's submission showing up.
            const entryExists = leaderboard.some(entry =>
                entry.name === userName &&
                entry.score === score
            );

            if (entryExists) {
                addLog("Auto-detected score on leaderboard!");
                setScoreSubmitted(true);
                setSubmittingScore(false);
            }
        }
    }, [leaderboard, showResult, scoreSubmitted, userName, score]);

    const submitScore = async () => {
        if (submittingScore || scoreSubmitted) return;
        setSubmittingScore(true);
        addLog("Starting submission...");

        const timeTaken = (endTime - startTime) / 1000;

        try {
            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out (10s)")), 10000)
            );

            // Race the addDoc against the timeout
            addLog("Sending to Firestore...");
            await Promise.race([
                addDoc(quizCollectionRef, {
                    name: userName,
                    score: score,
                    timeTaken: timeTaken,
                    createdAt: serverTimestamp()
                }),
                timeoutPromise
            ]);

            addLog("Submission successful!");
            setScoreSubmitted(true);
        } catch (error) {
            addLog(`Error: ${error.message}`);
            console.error("Error submitting score: ", error);

            // If it failed/timed out, double check if it actually made it (race condition)
            const entryExists = leaderboard.some(entry =>
                entry.name === userName &&
                entry.score === score
            );

            if (entryExists) {
                addLog("Found entry despite error. Success.");
                setScoreSubmitted(true);
            } else {
                addLog("Submission failed. Retrying manually might help.");
                alert("Submission failed: " + error.message);
            }
        } finally {
            setSubmittingScore(false);
        }
    };

    if (!started) {
        return (
            <div className="quiz-section" data-aos="fade-up">
                <div className="quiz-header">
                    <h3>{title}</h3>
                    <p className="quiz-description">{description}</p>

                    <div className="name-input-container">
                        <label className="quiz-input-label">Enter your name to start:</label>
                        <input
                            type="text"
                            className="quiz-input"
                            placeholder="Your Name (e.g. John Doe)"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <button onClick={handleStart} className="quiz-start-btn">Start Quiz 🚀</button>

                    {/* Mini Leaderboard Preview */}
                    <div className="leaderboard-container">
                        <div className="leaderboard-header">
                            <span>Rank</span>
                            <span>Name</span>
                            <span>Score</span>
                            <span>Time</span>
                        </div>
                        <div className="leaderboard-list">
                            {leaderboardError ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#ea4335' }}>
                                    ⚠️ {leaderboardError}
                                </div>
                            ) : leaderboard.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No scores yet. Be the first!</div>
                            ) : (
                                leaderboard.map((entry, index) => (
                                    <div key={entry.id} className={`leaderboard-item rank-${index + 1}`}>
                                        <div className="rank-col">
                                            <span className="rank-badge">{index + 1}</span>
                                        </div>
                                        <div className="name-col">{entry.name}</div>
                                        <div className="score-col">{entry.score}/{questions.length}</div>
                                        <div className="time-col time-val">{entry.timeTaken?.toFixed(1)}s</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    if (showResult) {
        const percentage = (score / questions.length) * 100;
        let message = "";
        let emoji = "🤔";

        if (percentage === 100) {
            message = "Perfect Score! You are a TechSprint Expert! 🏆";
            emoji = "🤩";
        } else if (percentage >= 80) {
            message = "Great job! You know your stuff! 🔥";
            emoji = "😎";
        } else if (percentage >= 50) {
            message = "Not bad! But you might want to read the rules again. 😉";
            emoji = "🙂";
        } else {
            message = "Oops! Time to check the event details thoroughly! 📚";
            emoji = "😅";
        }

        const atomicTimeTaken = ((endTime - startTime) / 1000).toFixed(1);

        return (
            <div className="quiz-section" data-aos="zoom-in">
                <div className="quiz-score-card">
                    <span className="score-emoji">{emoji}</span>
                    <h3 className="score-title">Quiz Completed!</h3>
                    <span className="score-value">{score} / {questions.length}</span>
                    <p className="score-message">{message}</p>
                    <p style={{ marginBottom: '1rem', color: '#5f6368' }}>Total Time: <strong>{atomicTimeTaken}s</strong></p>

                    {!scoreSubmitted ? (
                        <button
                            onClick={submitScore}
                            className="submit-score-btn"
                            disabled={submittingScore}
                        >
                            {submittingScore ? 'Submitting...' : 'Submit Score to Leaderboard 🏆'}
                        </button>
                    ) : (
                        <div style={{ color: '#34a853', fontWeight: 'bold', margin: '1rem 0' }}>
                            ✅ Score Submitted! Check the leaderboard below.
                        </div>
                    )}

                    <button onClick={handleRestart} className="restart-btn" style={{ marginTop: '1rem' }}>Play Again 🔄</button>

                    {/* Debug Log (Visible only if there are logs) */}
                    {debugLog.length > 0 && (
                        <div style={{ marginTop: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '5px', fontSize: '0.8rem', color: '#666', textAlign: 'left', maxHeight: '100px', overflowY: 'auto' }}>
                            <strong>Debug Log:</strong>
                            {debugLog.map((log, i) => <div key={i}>{log}</div>)}
                        </div>
                    )}
                </div>

                {/* Leaderboard */}
                <div className="leaderboard-container">
                    <div className="leaderboard-header">
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Score</span>
                        <span>Time</span>
                    </div>
                    <div className="leaderboard-list">
                        {leaderboard.map((entry, index) => (
                            <div key={entry.id} className={`leaderboard-item rank-${index + 1} ${entry.name === userName && entry.score === score ? 'highlight' : ''}`}>
                                <div className="rank-col">
                                    <span className="rank-badge">{index + 1}</span>
                                </div>
                                <div className="name-col">{entry.name}</div>
                                <div className="score-col">{entry.score}/{questions.length}</div>
                                <div className="time-col time-val">{entry.timeTaken?.toFixed(1)}s</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="quiz-section" data-aos="fade-up">
            <div className="quiz-question-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="question-progress">
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </div>
                    <div className={`timer-badge ${timeLeft <= 3 ? 'danger' : ''}`}>
                        ⏱️ {timeLeft}s
                    </div>
                </div>

                <h4 className="question-text">{currentQuestion?.question || "Question not found"}</h4>

                <div className="quiz-options">
                    {currentQuestion?.options?.map((option, index) => {
                        let btnClass = "quiz-option-btn";
                        if (isAnswered) {
                            if (option === currentQuestion.correctAnswer) {
                                btnClass += " correct";
                            } else if (option === selectedOption) {
                                btnClass += " incorrect";
                            }
                        }

                        return (
                            <button
                                key={index}
                                className={btnClass}
                                onClick={() => handleOptionClick(option)}
                                disabled={isAnswered}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
