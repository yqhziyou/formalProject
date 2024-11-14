const SessionList = ({ sessionData, onSelectSession }) => {
    const sessions = sessionData || [
        {
            _id: '1',
            sessionId: 'sess_123456',
            tokenUsage: 1250,
            modelName: 'gpt-4',
            creationDate: new Date().toISOString(),
            content: [{ role: "user", content: "Hello!" }]
        },
        {
            _id: '2',
            sessionId: 'sess_789012',
            tokenUsage: 850,
            modelName: 'gpt-3.5',
            creationDate: new Date().toISOString(),
            content: [{ role: "assistant", content: "Hi there!" }]
        }
    ];

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
                    {sessions.map((session) => (
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
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px',
                                    marginBottom: '16px'
                                }}>
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        <strong>Session ID:</strong> {session.sessionId}
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        <strong>Token Usage:</strong> {session.tokenUsage}
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        <strong>Model Name:</strong> {session.modelName}
                                    </p>
                                    <p style={{ fontSize: '14px', color: '#666' }}>
                                        <strong>Creation Date:</strong> {new Date(session.creationDate).toLocaleString()}
                                    </p>
                                </div>

                                {/* 添加对content内容的显示 */}
                                <div style={{ fontSize: '14px', color: '#666' }}>
                                    <strong>Messages:</strong>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {session.content.map((message, index) => (
                                            <li key={index}>
                                                <strong>{message.role}:</strong> {message.content}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ display: 'flex', gap: '12px' }}>
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
                                        onClick={() => onSelectSession(session)}
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
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                    onClick={() => console.log('Start new session')}
                >
                    Start New Session
                </button>
            </div>
        </div>
    );
};

export default SessionList;
