import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, addDoc, deleteDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const LiveSessionPanel = ({ codelabId, sessionId }) => {
    const { currentUser } = useAuth();
    const [votes, setVotes] = useState([]);
    const [counts, setCounts] = useState({ yes: 0, no: 0, help: 0 });
    const [myVote, setMyVote] = useState(null);

    // Chat State
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'stats'
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [attachedImage, setAttachedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (!codelabId) return;

        // Listen to live votes
        const qVotes = query(collection(db, "codelabs", codelabId, "live_votes"), orderBy("timestamp", "desc"));
        const unsubVotes = onSnapshot(qVotes, (snapshot) => {
            const newVotes = [];
            const newCounts = { yes: 0, no: 0, help: 0 };
            let myCurrentVote = null;

            snapshot.forEach((doc) => {
                const data = doc.data();
                newVotes.push({ id: doc.id, ...data });
                if (data.status && newCounts[data.status] !== undefined) {
                    newCounts[data.status]++;
                }
                // Check against sessionId instead of uid
                if (doc.id === sessionId) {
                    myCurrentVote = data.status;
                }
            });

            setVotes(newVotes);
            setCounts(newCounts);
            setMyVote(myCurrentVote);
        });

        // Listen to chat messages (Limit 50)
        // Listen to chat messages (Limit 50 latest)
        // Use 'desc' to get newest first, then reverse for display
        const qChat = query(collection(db, "codelabs", codelabId, "chat_messages"), orderBy("timestamp", "desc"), limit(50));
        const unsubChat = onSnapshot(qChat, (snapshot) => {
            const msgs = [];
            snapshot.forEach(doc => msgs.push({ id: doc.id, ...doc.data() }));
            // Reverse so oldest are at top, newest at bottom
            setMessages(msgs.reverse());
            // Scroll to bottom on new message
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        return () => {
            unsubVotes();
            unsubChat();
        };
    }, [codelabId, currentUser, sessionId]);

    // Auto-join on session enter & Cleanup on exit
    useEffect(() => {
        if (!currentUser || !codelabId || !sessionId) return;

        const presenceRef = doc(db, "codelabs", codelabId, "live_votes", sessionId);

        const joinSession = async () => {
            try {
                // Register presence using sessionId
                await setDoc(presenceRef, {
                    uid: currentUser.uid, // Store real UID for reference
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    timestamp: new Date()
                }, { merge: true });
            } catch (e) {
                console.error("Error joining session:", e);
            }
        };

        joinSession();

        // Cleanup on unmount or tab close
        const handleDisconnect = () => {
            deleteDoc(presenceRef).catch(err => console.error("Cleanup error", err));
        };

        window.addEventListener('beforeunload', handleDisconnect);

        return () => {
            handleDisconnect();
            window.removeEventListener('beforeunload', handleDisconnect);
        };
    }, [codelabId, currentUser, sessionId]);

    const handleVote = async (status) => {
        if (!currentUser) return;
        try {
            // Vote using sessionId
            await setDoc(doc(db, "codelabs", codelabId, "live_votes", sessionId), {
                uid: currentUser.uid,
                name: currentUser.displayName,
                status: status,
                photoURL: currentUser.photoURL,
                timestamp: new Date()
            }, { merge: true });
        } catch (e) {
            console.error("Error sending vote:", e);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const data = new FormData();
        data.append('image', file);

        try {
            // Reusing the key from ProjectSubmission (ImgBB)
            const response = await fetch('https://api.imgbb.com/1/upload?key=3bc6dafa7ecd7c01a118fad187d32ca5', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            if (result.success) {
                setAttachedImage(result.data.url);
            } else {
                alert('Details upload failed.');
            }
        } catch (error) {
            console.error('Error uploading:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && !attachedImage) || !currentUser) return;

        const messageData = {
            text: newMessage,
            image: attachedImage,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            timestamp: new Date()
        };

        setNewMessage('');
        setAttachedImage(null);

        try {
            await addDoc(collection(db, "codelabs", codelabId, "chat_messages"), messageData);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="gc-right-sidebar">
            {/* Persistent Header */}
            <div className="live-header" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Live Session 🔴</h3>
                    <span style={{ fontSize: '12px', color: '#5f6368', fontWeight: 'bold' }}>
                        {votes.length} Joined
                    </span>
                </div>
            </div>

            {/* Tabs */}
            <div className="panel-tabs">
                <button
                    className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                >
                    Chat 💬
                </button>
                <button
                    className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('stats')}
                >
                    Stats 📊
                </button>
            </div>

            {/* Content Switcher */}
            {activeTab === 'stats' ? (
                <div className="stats-view animate-fade-in">
                    <div className="vote-actions">
                        <button
                            className={`vote-btn yes ${myVote === 'yes' ? 'active' : ''}`}
                            onClick={() => handleVote('yes')}
                        >
                            <span className="emoji">👍</span>
                            <span className="label">Yes</span>
                        </button>
                        <button
                            className={`vote-btn no ${myVote === 'no' ? 'active' : ''}`}
                            onClick={() => handleVote('no')}
                        >
                            <span className="emoji">👎</span>
                            <span className="label">No</span>
                        </button>
                    </div>

                    <button
                        className={`help-btn ${myVote === 'help' ? 'active' : ''}`}
                        onClick={() => handleVote('help')}
                    >
                        ✋ I need help!
                    </button>

                    <div className="live-stats">
                        <div className="stat-card">
                            <div className="count green">{counts.yes}</div>
                            <div className="label">Following</div>
                        </div>
                        <div className="stat-card">
                            <div className="count red">{counts.no}</div>
                            <div className="label">Stuck</div>
                        </div>
                        <div className="stat-card">
                            <div className="count orange">{counts.help}</div>
                            <div className="label">Help Needed</div>
                        </div>
                    </div>

                    {counts.help > 0 && (
                        <div className="help-queue">
                            <h4>Help Queue ✋</h4>
                            <div className="queue-list">
                                {votes.filter(v => v.status === 'help').map((user) => (
                                    <motion.div
                                        key={user.id}
                                        className="queue-item"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <img src={user.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt={user.name} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{user.name}</span>
                                            {user.currentStep && <span style={{ fontSize: '10px', color: '#5f6368' }}>Step {user.currentStep}</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {counts.no > 0 && (
                        <div className="help-queue" style={{ marginTop: '24px' }}>
                            <h4 style={{ color: '#d93025' }}>Stuck Users 👎</h4>
                            <div className="queue-list">
                                {votes.filter(v => v.status === 'no').map((user) => (
                                    <motion.div
                                        key={user.id}
                                        className="queue-item"
                                        style={{ backgroundColor: '#fce8e6', color: '#d93025' }}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <img src={user.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt={user.name} />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span>{user.name}</span>
                                            {user.currentStep && <span style={{ fontSize: '10px', opacity: 0.8 }}>Step {user.currentStep}</span>}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="chat-view animate-fade-in">
                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="empty-chat">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-bubble ${msg.uid === currentUser?.uid ? 'mine' : 'theirs'}`}>
                                {msg.uid !== currentUser?.uid && (
                                    <div className="chat-user-header">
                                        <img src={msg.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt="User" />
                                        <span>{msg.displayName}</span>
                                    </div>
                                )}
                                {msg.image && (
                                    <div className="chat-image">
                                        <img src={msg.image} alt="Attachment" onClick={() => window.open(msg.image, '_blank')} />
                                    </div>
                                )}
                                {msg.text && <p className="chat-text">{msg.text}</p>}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                        {attachedImage && (
                            <div className="image-preview">
                                <img src={attachedImage} alt="Preview" />
                                <button type="button" onClick={() => setAttachedImage(null)}>×</button>
                            </div>
                        )}
                        <div className="input-row">
                            <label className="image-upload-btn">
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                {isUploading ? '...' : '📷'}
                            </label>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit" disabled={(!newMessage.trim() && !attachedImage) || isUploading}>
                                ➤
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LiveSessionPanel;
