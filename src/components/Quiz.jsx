import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import confetti from 'canvas-confetti';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, onSnapshot, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';

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
    const [roomId, setRoomId] = useState('techsprint'); // Default room
    const [currentDocId, setCurrentDocId] = useState(null); // Track the document created on start
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [startingQuiz, setStartingQuiz] = useState(false); // For spinner
    const [submittingScore, setSubmittingScore] = useState(false);
    const [scoreSubmitted, setScoreSubmitted] = useState(false);
    const [leaderboardError, setLeaderboardError] = useState(null);

    const quizCollectionRef = collection(db, 'techsprint_quiz_beta_1');

    // Fetch Leaderboard & Active Users (Filtered by Room ID)
    useEffect(() => {
        // Query both active and completed in the current room
        const q = query(
            quizCollectionRef,
            where('roomId', '==', roomId.toLowerCase().trim()),
            orderBy('score', 'desc'),
            limit(100)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const rawData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

                // Filter Computed/Active
                const completed = rawData.filter(d => d.status === 'completed');
                const active = rawData.filter(d => d.status === 'active');

                // Sort Completed: Score > Time
                const sortedLeaderboard = completed.sort((a, b) => {
                    if (b.score !== a.score) return b.score - a.score;
                    return (a.timeTaken || 9999) - (b.timeTaken || 9999);
                });

                setLeaderboard(sortedLeaderboard);
                setActiveUsersCount(active.length);
                setLeaderboardError(null);
            } catch (err) {
                console.error("Error processing data:", err);
                // setLeaderboardError("Failed to process data."); // Suppress to avoid UI clutter
            }
        }, (error) => {
            console.error("Fetch error:", error);
            if (error.code !== 'failed-precondition') {
                setLeaderboardError(`Error: ${error.message} (Check your API Key)`);
            }
            if (error.code === 'permission-denied' || error.message.includes('permission')) {
                setLeaderboardError('⚠️ API Key Revoked or Permission Denied. Please regenerate your API key in Google Cloud Console.');
            }
        });

        return () => unsubscribe();
    }, [roomId]);

    // Keep a ref to leaderboard for async access (fixing stale closure in submitScore)
    const leaderboardRef = useRef(leaderboard);
    useEffect(() => {
        leaderboardRef.current = leaderboard;
    }, [leaderboard]);

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

        // OPTIMISTIC START: Don't wait for network!
        setStartingQuiz(true);
        setLeaderboardError(null);

        // 1. Setup Game State Immediately
        const shuffled = shuffleArray(questions);
        setActiveQuestions(shuffled);
        setNameSubmitted(true);
        setStarted(true);
        setStartTime(Date.now());
        setTimeLeft(10);
        setStartingQuiz(false);

        // 2. Fire-and-Forget Firestore (Background)
        // If config is missing, skip Firestore entirely to avoid crashes
        if (!db || !db._app) {
            addLog("⚠️ Firebase API Key missing. Running in Offline Mode.");
            setLeaderboardError("Offline Mode: Score won't be saved (Config Error)");
            return;
        }
        addDoc(quizCollectionRef, {
            name: userName,
            roomId: roomId.toLowerCase().trim(),
            status: 'active',
            score: 0,
            createdAt: serverTimestamp()
        })
            .then((docRef) => {
                setCurrentDocId(docRef.id);
                addLog("Background: Session created! ID: " + docRef.id);
            })
            .catch((error) => {
                console.warn("Background session creation failed (will sync at end):", error);
                // Silent fail for background creation - user can still play
                addLog("Background creation failed. Offline mode active.");
            });
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
            // Create a timeout promise (Increased to 15s for slower networks)
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out (15s)")), 15000)
            );

            // Race the updateDoc/addDoc against the timeout
            addLog(currentDocId ? "Updating Firestore doc..." : "Creating completion doc...");

            const dbOperation = currentDocId
                ? updateDoc(doc(db, 'techsprint_quiz_beta_1', currentDocId), {
                    score: score,
                    timeTaken: timeTaken,
                    status: 'completed',
                    completedAt: serverTimestamp()
                })
                : addDoc(quizCollectionRef, {
                    name: userName,
                    roomId: roomId.toLowerCase().trim(),
                    status: 'completed',
                    score: score,
                    timeTaken: timeTaken,
                    createdAt: serverTimestamp(),
                    completedAt: serverTimestamp()
                });

            await Promise.race([
                dbOperation,
                timeoutPromise
            ]);

            addLog("Submission successful!");
            setScoreSubmitted(true);
        } catch (error) {
            // If it failed/timed out, double check if it actually made it (race condition)
            // Use REF to get the latest data, not the stale closure state
            const entryExists = leaderboardRef.current.some(entry =>
                entry.name === userName &&
                entry.score === score
            );

            if (entryExists) {
                addLog("Submission verified via leaderboard!");
                setScoreSubmitted(true);
                return;
            }

            addLog(`Error: ${error.message}`);
            console.error("Error submitting score: ", error);

            alert("Submission failed: " + error.message + ". Please try again.");
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
                        <label className="quiz-input-label">Enter your details:</label>
                        <input
                            type="text"
                            className="quiz-input"
                            placeholder="Your Name (e.g. John Doe)"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <input
                            type="text"
                            className="quiz-input"
                            placeholder="Room ID (Default: techsprint)"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleStart}
                        className="quiz-start-btn"
                        disabled={startingQuiz}
                    >
                        {startingQuiz ? <span className="spinner-small"></span> : 'Start Quiz 🚀'}
                    </button>

                    {/* Mini Leaderboard Preview */}
                    <div className="leaderboard-container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4 style={{ margin: 0, color: '#202124' }}>🏆 Leaderboard: {roomId}</h4>
                            <div style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                                <span style={{ color: '#34a853' }}>🟢 {activeUsersCount} Active</span>
                                <span style={{ color: '#1a73e8' }}>🏁 {leaderboard.length} Done</span>
                            </div>
                        </div>
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

                    {/* Debug Log Hidden for Clean User Experience */}
                </div>

                {/* Leaderboard */}
                <div className="leaderboard-container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h4 style={{ margin: 0, color: '#202124' }}>🏆 Standings: {roomId}</h4>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.9rem', fontWeight: 600 }}>
                            <span style={{ color: '#34a853' }}>🟢 {activeUsersCount} Active</span>
                            <span style={{ color: '#1a73e8' }}>🏁 {leaderboard.length} Done</span>
                        </div>
                    </div>
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

            {/* Progress Bar */}
            <div className="progress-bar-container">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            <div className="quiz-question-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div className="question-progress">
                        Question {currentQuestionIndex + 1} / {questions.length}
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
                        } else if (selectedOption === option) {
                            btnClass += " selected";
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
