// SessionList.jsx
import React from 'react';

const SessionList = ({ sessionData, onSelectSession }) => {
    const sessions = sessionData || [
        {
            _id: '1',
            sessionId: 'sess_123456',
            tokenUsage: 1250,
            modelName: 'gpt-4',
            creationDate: new Date().toISOString(),
            content: ["Hello!"]
        },
        {
            _id: '2',
            sessionId: 'sess_789012',
            tokenUsage: 850,
            modelName: 'gpt-3.5',
            creationDate: new Date().toISOString(),
            content: ["Hi there!"]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Session List</h2>

                <ul className="space-y-4">
                    {sessions.map((session) => (
                        <li key={session._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Session ID:</span> {session.sessionId}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Token Usage:</span> {session.tokenUsage}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Model Name:</span> {session.modelName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Creation Date:</span> {new Date(session.creationDate).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                        onClick={() => onSelectSession(session)}
                                    >
                                        Open Session
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                        onClick={() => console.log('Delete session:', session._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <button
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => console.log('Start new session')}
                >
                    Start New Session
                </button>
            </div>
        </div>
    );
};

export default SessionList;
