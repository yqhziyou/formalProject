import React, { useState, useEffect } from 'react';
import { sendMessage, deleteChatHistory } from '../services/apiService';
import Message from './Message';

const ChatWindow = ({ sessionID }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [models, setModels] = useState([]); // store model list
    const [selectedModel, setSelectedModel] = useState(''); // current selected model

    // fetch model list
    useEffect(() => {
        // add API call to fetch model list
        const fetchModels = async () => {
            try {
                // const response = await getModels(); // 需要实现这个 API
                // setModels(response.data);
                // 临时使用假数据
                setModels(['gpt-3.5-turbo', 'gpt-4o-mini', 'claude-3']);
                setSelectedModel('gpt-3.5-turbo'); // 设置默认模型
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };
        fetchModels();
    }, []);

    // fetch chat history
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                // const response = await getChatHistory(sessionID); // 需要实现这个 API
                // setMessages(response.data);
                // add API call to fetch chat history
            } catch (error) {
                console.error('Error fetching chat history:', error);
            }
        };
        fetchChatHistory();
    }, [sessionID]);

    const handleSend = async () => {
        if (inputMessage.trim()) {
            try {
                const response = await sendMessage(
                    '6733b3dee8afaaffce1e0f73', // userID
                    sessionID || 'test2', // 使用传入的 sessionID
                    inputMessage,
                    selectedModel // use selected model
                );

                const botMessage = response.data.data || response.data;

                setInputMessage('');
                setMessages([
                    ...messages,
                    { sender: 'user', text: inputMessage },
                    { sender: 'bot', text: botMessage }
                ]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleDeleteHistory = async () => {
        await deleteChatHistory(sessionID);
        setMessages([]);
    };

    return (
        <div style={{
            width: '80%',
            maxWidth: '800px', // increase max width
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            margin: '0 auto',
            padding: '20px'
        }}>
            {/* 模型选择下拉菜单 */}
            <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                style={{
                    padding: '8px',
                    marginBottom: '10px',
                    fontSize: '16px',
                    borderRadius: '5px'
                }}
            >
                {models.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>

            {/* 聊天记录显示区域 */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '10px',
                border: '1px solid #ccc', // add border
                borderRadius: '5px',
                backgroundColor: '#f9f9f9' // add background color
            }}>
                {messages.map((msg, index) => (
                    <Message key={index} sender={msg.sender} text={msg.text} />
                ))}
            </div>

            {/* 输入区域 */}
            <div style={{
                display: 'flex',
                gap: '10px',
                flexDirection: 'column'
            }}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        border: '1px solid #ccc'
                    }}
                />
                <div style={{
                    display: 'flex',
                    gap: '10px'
                }}>
                    <button
                        onClick={handleSend}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Send
                    </button>
                    <button
                        onClick={handleDeleteHistory}
                        style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Delete Chat History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;