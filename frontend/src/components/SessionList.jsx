import React from 'react';
//import './SessionList.css';

const SessionList = ({ sessions, onSessionSelect, onDeleteSession, onNewSession }) => {
    return (
        <div className="session-list-container">
            <div className="session-list">
                <h2 className="session-list-title">Session List</h2>
                <ul className="session-list-items">
                    {sessions.map((session) => (
                        <li key={session._id} className="session-item">
                            <div className="session-info">
                                <p className="session-info-item"><strong>Session ID:</strong> {session.sessionId}</p>
                                <p className="session-info-item"><strong>Token Usage:</strong> {session.tokenUsage}</p>
                                <p className="session-info-item"><strong>Model Name:</strong> {session.modelName}</p>
                                <p className="session-info-item"><strong>Creation Date:</strong> {new Date(session.creationDate).toLocaleString()}</p>
                            </div>
                            <div className="session-actions">
                                <button className="session-action-button" onClick={() => onSessionSelect(session.sessionId)}>Open Session</button>
                                <button className="session-action-button delete-button" onClick={() => onDeleteSession(session._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={onNewSession} className="new-session-button">Start New Session</button>
            </div>
        </div>
    );
};

export default SessionList;
