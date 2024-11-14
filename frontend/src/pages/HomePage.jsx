import React, { useContext, useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import LoginPage from '../components/LoginPage';
import Message from '../components/Message';
import SessionList from '../components/SessionList';
import { AuthContext } from '../Auth/AuthContext.jsx';
import { pullInfo, sendMessage } from "../services/ApiService.js";
import { v4 as uuidv4 } from 'uuid';

function HomePage() {
    const { username } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchData = async () => {
            try {
                const response = await pullInfo(username);
                console.log("Fetched data:", response.data);
                setData(response.data);

                // 如果有会话记录，则选择最新的会话
                if (response.data.sessionIdList && response.data.sessionIdList.length > 0) {
                    setSelectedSession(response.data.sessionIdList[response.data.sessionIdList.length - 1]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [username]);

    // 当 data 和 selectedSession 都满足条件时，创建新的会话并立即选择它
    useEffect(() => {
        if (data && data.sessionIdList && data.sessionIdList.length === 0 && !selectedSession) {
            const newSessionId = uuidv4();
            console.log("Creating new session with ID:", newSessionId);

            sendMessage(data._id, newSessionId, "Start a new session", "gpt-4o-mini")
                .then(() => {
                    console.log("Message sent");
                    // 将新创建的会话设置为选中的会话
                    const newSession = { _id: newSessionId, content: [] }; // 这里假设新会话的内容为空
                    setSelectedSession(newSession);
                    // 更新 sessionIdList
                    setData((prevData) => ({
                        ...prevData,
                        sessionIdList: [...prevData.sessionIdList, newSession]
                    }));
                })
                .catch((error) => console.error("Error sending message:", error));
        }
    }, [data, selectedSession]);

    const handleSessionSelect = (session) => {
        setSelectedSession(session);
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
                <>
                    {console.log("UserInfo:", data._id)}
                    {console.log("Selected Session:", selectedSession)}
                    <ChatWindow userinfo={data._id} session={selectedSession} />
                </>
            ) : (
                <p>聊天窗口加载中...</p>
            )}
            <Message />
        </div>
    );
}

export default HomePage;
