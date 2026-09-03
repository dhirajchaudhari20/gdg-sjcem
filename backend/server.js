const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin (Uses Application Default Credentials on Cloud Run)
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "dc-infotechpvt-1"  // Connect to the project with existing data
});

const db = admin.firestore();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for simplicity (or strict restrict to Netlify domain)
        methods: ["GET", "POST"]
    }
});

// Basic Health Check
app.get('/', (req, res) => {
    res.send('GDG Chat Backend is Running! 🚀');
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join a Codelab Room
    socket.on('join_room', async (codelabId) => {
        socket.join(codelabId);
        console.log(`User ${socket.id} joined room: ${codelabId}`);

        // --- 1. Presence: Emit new count ---
        const roomSize = io.sockets.adapter.rooms.get(codelabId)?.size || 0;
        io.to(codelabId).emit('presence_update', roomSize);

        // --- 2. Chat History ---
        try {
            const messagesRef = db.collection('codelabs').doc(codelabId).collection('chat_messages');
            const snapshot = await messagesRef.orderBy('timestamp', 'desc').limit(50).get();

            const history = [];
            snapshot.forEach(doc => {
                history.push({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate() || new Date()
                });
            });
            socket.emit('load_history', history.reverse());
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }

        // --- 3. Initial Votes ---
        try {
            const votesRef = db.collection('codelabs').doc(codelabId).collection('live_votes');
            const voteSnap = await votesRef.get();
            const votes = [];
            const counts = { yes: 0, no: 0, help: 0 };

            voteSnap.forEach(doc => {
                const data = doc.data();
                votes.push({ id: doc.id, ...data });
                if (data.status && counts[data.status] !== undefined) {
                    counts[data.status]++;
                }
            });
            socket.emit('initial_votes', { votes, counts });
        } catch (e) {
            console.error("Error fetching votes:", e);
        }
    });

    // Handle New Message
    socket.on('send_message', async (data) => {
        // ... (existing chat logic) ...
        console.log('📥 Received send_message event:', data);
        const { codelabId, ...messageContent } = data;

        if (!codelabId) return;

        try {
            const messageRef = await db.collection('codelabs').doc(codelabId).collection('chat_messages').add({
                ...messageContent,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });

            const savedMessage = {
                id: messageRef.id,
                ...messageContent,
                timestamp: new Date().toISOString()
            };

            io.to(codelabId).emit('receive_message', savedMessage);
        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    });

    // --- Handle Voting ---
    socket.on('cast_vote', async (data) => {
        // data: { codelabId, sessionId, status, uid, name, photoURL }
        const { codelabId, sessionId, status, ...voteData } = data;
        if (!codelabId || !sessionId) return;

        try {
            // Save to Firestore (Server-side)
            await db.collection('codelabs').doc(codelabId).collection('live_votes').doc(sessionId).set({
                status: status,
                ...voteData,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            // Recalculate Counts (Simplest way: fetch all. Optimize later if needed)
            const votesRef = db.collection('codelabs').doc(codelabId).collection('live_votes');
            const voteSnap = await votesRef.get();
            const votes = [];
            const counts = { yes: 0, no: 0, help: 0 };

            voteSnap.forEach(doc => {
                const v = doc.data();
                votes.push({ id: doc.id, ...v });
                if (v.status && counts[v.status] !== undefined) {
                    counts[v.status]++;
                }
            });

            // Broadcast to everyone
            io.to(codelabId).emit('vote_update', { votes, counts });

        } catch (e) {
            console.error("Error handling vote:", e);
        }
    });

    // --- Handle Reactions (Floating Emojis) ---
    socket.on('send_reaction', (data) => {
        const { codelabId, emoji, uid } = data;
        if (!codelabId) return;

        // Broadcast to EVERYONE (Reliability > Optimization)
        // Frontend will filter out own reactions to prevent duplicates
        io.to(codelabId).emit('receive_reaction', {
            emoji: emoji,
            uid: uid,
            id: `rxn_${Date.now()}_${Math.random()}`
        });
    });

    socket.on('disconnecting', () => {
        // "disconnecting" gives us access to socket.rooms BEFORE they leave
        // Use this to update presence for the rooms they were in
        for (const room of socket.rooms) {
            if (room !== socket.id) {
                // Calculate size AFTER leave (approximate by subtracting 1)
                const currentSize = io.sockets.adapter.rooms.get(room)?.size || 0;
                io.to(room).emit('presence_update', Math.max(0, currentSize - 1));
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
