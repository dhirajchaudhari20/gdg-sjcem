import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import './EventDetails.css'; // Reusing some styles

const FeedbackList = () => {
    const { id } = useParams();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                // Determine eventId to search for. 
                // Since our IDs in data are numbers (e.g. 2, 3), but Firestore might store strings or numbers. 
                // We'll try to match exact first.
                // Note: The FeedbackModal stores `eventId` as passed from props. In EventDetails, we passed `event.id` (number).
                const q = query(
                    collection(db, "feedback"),
                    where("eventId", "==", parseInt(id)),
                    orderBy("timestamp", "desc")
                );

                const querySnapshot = await getDocs(q);
                const feedbackData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Convert timestamp to date if it exists
                    createdAt: doc.data().timestamp?.toDate()
                }));
                setFeedback(feedbackData);
            } catch (err) {
                console.error("Error fetching feedback:", err);
                // Fallback attempt for string IDs if number failed or returned empty (optional but safer)
                if (loading) {
                    try {
                        const qString = query(
                            collection(db, "feedback"),
                            where("eventId", "==", id.toString()),
                            orderBy("timestamp", "desc")
                        );
                        const querySnapshotString = await getDocs(qString);
                        const feedbackDataString = querySnapshotString.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                            createdAt: doc.data().timestamp?.toDate()
                        }));
                        // Merge or set if found
                        if (feedbackDataString.length > 0) {
                            setFeedback(feedbackDataString);
                        }
                    } catch (retryErr) {
                        console.error("Retry failed", retryErr);
                        setError("Failed to load feedback.");
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, [id]);

    return (
        <div className="event-details-container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
            <div className="content-wrapper">
                <Link to={`/events/${id}`} className="back-nav-btn">← Back to Event</Link>
                <h1>Event Feedback (ID: {id})</h1>

                {loading && <p>Loading feedback...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && feedback.length === 0 && (
                    <div className="empty-state">
                        <p>No feedback submitted yet for this event.</p>
                    </div>
                )}

                {!loading && feedback.length > 0 && (
                    <div className="feedback-table-container" style={{ marginTop: '30px', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <thead style={{ background: '#f8f9fa' }}>
                                <tr>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Date</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Name</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Rating</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Liked</th>
                                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #eee' }}>Improvement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedback.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '15px', color: '#666', fontSize: '0.9rem' }}>
                                            {item.createdAt?.toLocaleDateString()} {item.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: '500' }}>
                                            {item.name || <span style={{ fontStyle: 'italic', color: '#aaa' }}>Anonymous</span>}
                                        </td>
                                        <td style={{ padding: '15px' }}>
                                            <span style={{ color: '#FBBC04', fontWeight: 'bold' }}>{item.rating} ★</span>
                                        </td>
                                        <td style={{ padding: '15px', maxWidth: '300px' }}>
                                            {item.whatDidYouLike ? (
                                                <span style={{ color: '#333' }}>{item.whatDidYouLike}</span>
                                            ) : (
                                                <span style={{ color: '#ccc' }}>-</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '15px', maxWidth: '300px' }}>
                                            {item.improvements ? (
                                                <span style={{ color: '#333' }}>{item.improvements}</span>
                                            ) : (
                                                <span style={{ color: '#ccc' }}>-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;
