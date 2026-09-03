import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, doc, setDoc, addDoc, deleteDoc, onSnapshot, query, orderBy, limit, writeBatch, getDocs, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import io from 'socket.io-client'; // Import Socket.io
import './LiveSessionPanel.css'; // Import CSS for Mentions

// ☁️ Production Backend URL (Google Cloud Run)
const BACKEND_URL = import.meta.env.VITE_CHAT_SERVER_URL || "https://gdg-chat-backend-1042751012948.us-central1.run.app";

const LiveSessionPanel = ({ codelabId, sessionId }) => {
    const { currentUser } = useAuth();
    const [votes, setVotes] = useState([]);
    const [counts, setCounts] = useState({ yes: 0, no: 0, help: 0 });
    const [myVote, setMyVote] = useState(null);
    const [presenceCount, setPresenceCount] = useState(0); // Added: Realtime user count
    const [connectionStatus, setConnectionStatus] = useState('connecting'); // connecting, connected, error

    // Chat State
    const [activeTab, setActiveTab] = useState('chat');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [attachedImage, setAttachedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState('');
    const chatEndRef = useRef(null);

    // Socket Ref
    const socketRef = useRef(null);

    // --- Reaction Logic (State & Handlers) ---
    const [floatingReactions, setFloatingReactions] = useState([]);

    const triggerFloatingReaction = (emoji) => {
        const id = Date.now() + Math.random();
        const left = Math.floor(Math.random() * 80) + 10;
        setFloatingReactions(prev => [...prev, { id, emoji, left }]);
        setTimeout(() => setFloatingReactions(prev => prev.filter(r => r.id !== id)), 2000);
    };

    const handleSendReaction = (emoji) => {
        triggerFloatingReaction(emoji);
        if (socketRef.current) {
            socketRef.current.emit('send_reaction', {
                codelabId,
                emoji,
                uid: currentUser?.uid
            });
        }
    };

    useEffect(() => {
        // Load offline messages if available
        if (codelabId) {
            const cached = localStorage.getItem(`chat_${codelabId}`);
            if (cached) {
                try {
                    setMessages(JSON.parse(cached));
                } catch (e) { console.error("Error parsing local chat", e); }
            }
        }
    }, [codelabId]);

    // Save to LocalStorage whenever messages change
    useEffect(() => {
        if (codelabId && messages.length > 0) {
            localStorage.setItem(`chat_${codelabId}`, JSON.stringify(messages));
        }
    }, [codelabId, messages]);

    useEffect(() => {
        if (!codelabId) return;

        // --- 1. Socket.io Connection ---
        setConnectionStatus('connecting');
        socketRef.current = io(BACKEND_URL);

        socketRef.current.on('connect', () => {
            console.log("✅ Custom Backend Connected");
            setConnectionStatus('connected');
            setError('');
            socketRef.current.emit('join_room', codelabId, {
                sessionId: sessionId,
                uid: currentUser.uid,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
            });
            console.log(`📥 Joined room: ${codelabId}`);
        });

        socketRef.current.on('connect_error', (err) => {
            console.warn("Socket Connection Error (Offline?):", err.message);
            setConnectionStatus('error');
        });

        // --- 2. Presence & Stats (from Socket) ---
        socketRef.current.on('presence_update', (count) => {
            setPresenceCount(count);
        });

        const handleVotesUpdate = ({ votes, counts }) => {
            setVotes(votes);
            setCounts(counts);
            // Find my vote
            const myVoteDoc = votes.find(v => v.id === sessionId);
            if (myVoteDoc) setMyVote(myVoteDoc.status);
        };

        socketRef.current.on('initial_votes', handleVotesUpdate);
        socketRef.current.on('vote_update', handleVotesUpdate);


        // --- 4. Floating Reactions ---
        socketRef.current.on('receive_reaction', (reaction) => {
            triggerFloatingReaction(reaction.emoji);
        });

        // --- 3. Chat Logic ---
        socketRef.current.on('load_history', (history) => {
            console.log(`📜 Loaded ${history.length} messages from history`);
            setMessages(prev => {
                const historyIds = new Set(history.map(m => m.id));
                const historyMyMsgs = history.filter(m => m.uid === currentUser?.uid);

                const uniqueLocal = prev.filter(localMsg => {
                    if (historyIds.has(localMsg.id)) return false;
                    if (localMsg.id.toString().startsWith('local_') && localMsg.uid === currentUser?.uid) {
                        const isDuplicate = historyMyMsgs.some(hMsg =>
                            hMsg.text === localMsg.text &&
                            hMsg.image === localMsg.image &&
                            Math.abs(new Date(hMsg.timestamp) - new Date(localMsg.timestamp)) < 10000
                        );
                        return !isDuplicate;
                    }
                    return true;
                });
                return [...history, ...uniqueLocal].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            });
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        socketRef.current.on('receive_message', (message) => {
            console.log('📨 Received message:', message);
            setMessages((prev) => {
                if (prev.some(m => m.id === message.id)) return prev;
                if (message.uid === currentUser?.uid) {
                    const pendingIdx = prev.findIndex(m =>
                        m.id.toString().startsWith('local_') &&
                        m.text === message.text &&
                        m.image === message.image
                    );
                    if (pendingIdx !== -1) {
                        const updated = [...prev];
                        updated[pendingIdx] = message;
                        return updated;
                    }
                }
                return [...prev, message];
            });
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        });

        // Cleanup
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [codelabId, currentUser, sessionId]);


    const handleVote = async (status) => {
        if (!currentUser) return;
        try {
            // Emitting vote to backend via Socket
            const voteData = {
                codelabId: codelabId,
                sessionId: sessionId,
                uid: currentUser.uid,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                status: status
            };
            socketRef.current.emit('cast_vote', voteData);

            // Optimistic Update?
            // We can wait for server 'vote_update' or simply set it locally for speed
            setMyVote(status);

        } catch (e) {
            console.error("Error sending vote:", e);
        }
    };

    const [showMentions, setShowMentions] = useState(false);
    const [mentionQuery, setMentionQuery] = useState('');

    const handleInputChange = (e) => {
        const val = e.target.value;
        setNewMessage(val);

        // Simple detection for mention triggers
        const lastWord = val.split(' ').pop();
        if (lastWord.startsWith('@') && lastWord.length > 1) {
            setShowMentions(true);
            setMentionQuery(lastWord.slice(1));
        } else {
            setShowMentions(false);
        }
    };

    const selectMention = (name) => {
        const words = newMessage.split(' ');
        words.pop(); // Remove the partial @mention
        setNewMessage([...words, `@${name} `].join(' '));
        setShowMentions(false);
        document.getElementById('chat-message-input')?.focus();
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

        setIsSending(true);
        setError('');

        const messageData = {
            codelabId: codelabId, // Room ID
            text: newMessage,
            image: attachedImage,
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            // Timestamp added by server
        };

        // Optimistic UI Update (Immediate feedback)
        setMessages(prev => [...prev, { ...messageData, id: `local_${Date.now()}`, timestamp: new Date().toISOString() }]);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

        // Emit to Backend
        if (socketRef.current && socketRef.current.connected) {
            console.log('📤 Sending message:', messageData);
            socketRef.current.emit('send_message', messageData);
            setNewMessage('');
            setAttachedImage(null);
            setIsSending(false);
        } else {
            console.error('❌ Cannot send: Socket not connected');
            setError("Cannot send: Backend disconnected.");
            setIsSending(false);
        }
    };

    const handleResetSession = async () => {
        if (!window.confirm("Are you sure you want to clear the session? This will delete all chat history and votes for everyone.")) return;

        try {
            const batch = writeBatch(db);

            // Delete Votes
            const votesSnap = await getDocs(collection(db, "codelabs", codelabId, "live_votes"));
            votesSnap.forEach((doc) => {
                batch.delete(doc.ref);
            });

            // Delete Chat Messages
            const chatSnap = await getDocs(collection(db, "codelabs", codelabId, "chat_messages"));
            chatSnap.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log("Session reset successfully");
        } catch (e) {
            console.error("Error resetting session:", e);
        }
    };

    return (
        <div className="gc-right-sidebar">
            {/* Persistent Header */}
            <div className="live-header" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Live Session 🔴</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#5f6368', fontWeight: 'bold' }}>
                            {presenceCount} Joined
                        </span>
                        <button
                            onClick={handleResetSession}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '4px',
                                color: '#5f6368'
                            }}
                            title="Reset Session (Clear All)"
                        >
                            🔄
                        </button>
                    </div>
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

                    <div className="session-status" style={{
                        textAlign: 'center',
                        padding: '12px',
                        marginBottom: '16px',
                        borderRadius: '8px',
                        backgroundColor: (counts.yes >= (counts.no + counts.help)) ? '#e6f4ea' : '#fce8e6',
                        color: (counts.yes >= (counts.no + counts.help)) ? '#137333' : '#c5221f',
                        fontWeight: 'bold',
                        border: '1px solid',
                        borderColor: (counts.yes >= (counts.no + counts.help)) ? '#ceead6' : '#fad2cf'
                    }}>
                        {(votes.length === 0) ? "Waiting for votes..." :
                            (counts.yes >= (counts.no + counts.help)) ? "🟢 Smooth Sailing" : "🔴 Slow Down / Help Needed"}
                    </div>

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
                <div className="chat-view animate-fade-in" style={{ position: 'relative' }}>
                    {/* Floating Reactions Layer */}
                    <div className="reactions-container">
                        <AnimatePresence>
                            {floatingReactions.map(reaction => (
                                <motion.div
                                    key={reaction.id}
                                    initial={{ opacity: 1, y: 0, scale: 0.5 }}
                                    animate={{ opacity: 0, y: -200, scale: 1.5 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="floating-emoji"
                                    style={{ left: `${reaction.left}%` }}
                                >
                                    {reaction.emoji}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Reaction Toolbar */}
                    <div className="reaction-toolbar">
                        {['❤️', '👍', '🎉', '🦀'].map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => handleSendReaction(emoji)}
                                className="reaction-btn"
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div style={{ padding: '8px', backgroundColor: '#fce8e6', color: '#c5221f', fontSize: '12px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="empty-chat">
                                <p>👋 <strong>You are the first one here!</strong></p>
                                <p style={{ fontSize: '0.9em', marginTop: '8px' }}>
                                    To test the real-time chat:<br />
                                    1. 📄 Open this page in a <strong>New Incognito Window</strong>.<br />
                                    2. 💬 Send a message from there.<br />
                                    3. ✨ See it appear here instantly!
                                </p>
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div key={msg.id} className={`chat-bubble ${msg.uid === currentUser?.uid ? 'mine' : 'theirs'}`}>
                                {msg.uid !== currentUser?.uid ? (
                                    <div className="chat-user-header">
                                        <img src={msg.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt="User" />
                                        <span>{msg.displayName}</span>
                                    </div>
                                ) : (
                                    <div className="chat-user-header" style={{ justifyContent: 'flex-end', gap: '6px' }}>
                                        <span>{msg.displayName}</span>
                                        <img src={msg.photoURL || "https://lh3.googleusercontent.com/a/default-user"} alt="Me" />
                                    </div>
                                )}
                                {msg.image && (
                                    <div className="chat-image">
                                        <img src={msg.image} alt="Attachment" onClick={() => window.open(msg.image, '_blank')} />
                                    </div>
                                )}
                                {msg.text && (
                                    <p className="chat-text">
                                        {msg.text.split(' ').map((word, i) => {
                                            if (word.startsWith('@')) {
                                                return <span key={i} className="mention-highlight">{word} </span>;
                                            }
                                            return word + ' ';
                                        })}
                                    </p>
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Mention List Popup */}
                    {showMentions && (
                        <div className="mention-popup">
                            {votes.filter(u => u.name?.toLowerCase().includes(mentionQuery.toLowerCase())).map(u => (
                                <div
                                    key={u.uid}
                                    className="mention-item"
                                    onClick={() => selectMention(u.name)}
                                >
                                    <img src={u.photoURL} alt={u.name} />
                                    <span>{u.name}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <form className="chat-input-area" onSubmit={handleSendMessage}>
                        {/* ... existing image preview ... */}
                        {attachedImage && (
                            <div className="image-preview">
                                <img src={attachedImage} alt="Preview" />
                                <button type="button" onClick={() => setAttachedImage(null)}>×</button>
                            </div>
                        )}
                        <div className="chat-input-form">
                            <div className="chat-input-wrapper">
                                <textarea
                                    id="chat-message-input"
                                    name="message"
                                    className="chat-input"
                                    placeholder="Type a message... (@ to mention)"
                                    value={newMessage}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                        if (showMentions) {
                                            // Handle arrow keys for mentions later if needed
                                        }
                                    }}
                                    rows={1}
                                    disabled={isSending}
                                />
                            </div>
                            <div className="chat-actions">
                                <label className="icon-btn" title="Upload image">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />
                                    {isUploading ? '⏳' : '📎'}
                                </label>
                                <button
                                    type="submit"
                                    className="icon-btn send-btn"
                                    disabled={(!newMessage.trim() && !attachedImage) || isSending}
                                    title="Send message"
                                >
                                    ➤
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LiveSessionPanel;
