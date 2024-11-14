// ChatWindow.jsx
import { useState, useEffect } from 'react';
import { sendMessage } from '../services/apiService';
import Message from './Message';
import styles from '../css/ChatWindow.module.css';



const ChatWindow = ({ userinfo, session }) => {
    const [messages, setMessages] = useState(session ? session.content : []);
    const [inputMessage, setInputMessage] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  
    
    
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

    useEffect(() => {
        // update the messages with the session content
        if (session) {
            setMessages(session.content);
        }
    }, [session]);

    const handleSend = async () => {
        if (!session || !session._id) {
            console.error("Session or session ID is missing.creating a new session");
            return;
        }

        if (inputMessage.trim()) {
            try {
                const response = await sendMessage(
                    userinfo,
                    session._id, // use the current session ID
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

                <div className={styles.chatHistory}>
                    {messages.map((msg, index) => (
                        <Message key={index} sender={msg.sender} text={msg.text} />
                    ))}
                </div>

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
