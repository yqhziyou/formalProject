import React, { useState } from 'react';
import { deleteChatHistory } from "../services/ApiService.js";

const SessionList = ({ sessionData: initialSessionData, onSelectSession, userid }) => {
    const [sessionData, setSessionData] = useState(initialSessionData);
    const [selectedSession, setSelectedSession] = useState(null);

    const handleSelectSession = (session) => {
        setSelectedSession(session);
        onSelectSession(session);
    };

    
    const handleDeleteSession = async (sessionId) => {
        try {
            await deleteChatHistory(userid, sessionId);
            console.log(`Session ${sessionId} deleted successfully`);
            // update the sessionData list
            setSessionData(prevData => prevData.filter(session => session._id !== sessionId));
        } catch (error) {
            console.error(`Error deleting session ${sessionId}:`, error);
        }
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Session List</h2>

                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {sessionData.map((session) => (
                        <li key={session._id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '16px',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
                            <div>
                                {/* display Session ID */}
                                <p style={{ fontSize: '14px', color: '#666' }}>
                                    <strong>Session ID:</strong> {session._id}
                                </p>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                    <button
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                                        onClick={() => handleSelectSession(session)}
                                    >
                                        Open Session
                                    </button>
                                    <button
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                                        onClick={() => handleDeleteSession(session._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedSession && (
                <div style={{
                    padding: '24px',
                    backgroundColor: '#f1f1f1',
                    borderRadius: '8px',
                    marginTop: '24px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Selected Session Details</h3>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                        <strong>Messages:</strong>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {selectedSession.content && selectedSession.content.length > 0 ? (
                                selectedSession.content.map((message, index) => (
                                    <li key={index} style={{
                                        padding: '8px',
                                        borderRadius: '4px',
                                        backgroundColor: message.role === 'user' ? '#007bff' : '#28a745',
                                        color: '#fff',
                                        marginBottom: '8px',
                                        textAlign: message.role === 'user' ? 'left' : 'right'
                                    }}>
                                        {message.content}
                                    </li>
                                ))
                            ) : (
                                <li>No messages yet</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SessionList;
