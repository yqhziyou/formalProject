import { useState, useEffect } from 'react';
import { sendMessage } from '../services/apiService';
import Message from './Message';
import styles from '../css/ChatWindow.module.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');


    // 获取模型列表
    useEffect(() => {
        const fetchModels = async () => {
            try {
                setModels(['gpt-3.5-turbo', 'gpt-4o-mini', 'claude-3']);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };
        fetchModels();
    }, []);
    
    const handleSend = async () => {
        if (inputMessage.trim()) {
            try {
                const response = await sendMessage(
                    '6733b3dee8afaaffce1e0f73', // userID
                    'test3',
                    inputMessage,
                    selectedModel
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
    

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatWindow}>
                {/* 模型选择下拉菜单 */}
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className={styles.modelSelect}
                >
                    {models.map((model) => (
                        <option key={model} value={model}>
                            {model}
                        </option>
                    ))}
                </select>

                {/* 聊天记录显示区域 */}
                <div className={styles.chatHistory}>
                    {messages.map((msg, index) => (
                        <Message key={index} sender={msg.sender} text={msg.text} />
                    ))}
                </div>

                {/* 输入区域 */}
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className={styles.inputMessage}
                    />
                    <div className={styles.buttonContainer}>
                        <button onClick={handleSend} className={styles.sendButton}>
                            Send
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
