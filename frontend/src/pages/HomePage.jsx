// HomePage.jsx
import React, { useContext, useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import LoginPage from '../components/LoginPage';
import Message from '../components/Message';
import SessionList from '../components/SessionList';
import { AuthContext } from '../Auth/AuthContext.jsx';
import { pullInfo } from "../services/ApiService.js";

function HomePage() {
    const { username } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            try {
                const response = await pullInfo(username);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [username]);

    const handleSessionSelect = (session) => {
        setSelectedSession(session); // 更新当前选中的会话
    };

    if (!username) {
        return <LoginPage />;
    }

    return (
        <div>
            <h1>主页</h1>
            <h2>hello, {username}</h2>
            {data && data.sessionIdList ? (
                <SessionList sessionData={data.sessionIdList} onSelectSession={handleSessionSelect} />
            ) : (
                <p>加载中...</p>
            )}
            {data ? (
                <ChatWindow userinfo={data._id} session={selectedSession} />
            ) : (
                <p>聊天窗口加载中...</p>
            )}
            <Message />
        </div>
    );
}

export default HomePage;
