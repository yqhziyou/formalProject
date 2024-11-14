import React, { useContext, useState, useEffect } from 'react';
import ChatWindow from '../components/ChatWindow';
import LoginPage from '../components/LoginPage';
import Message from '../components/Message';
import SessionList from '../components/SessionList';
import { AuthContext } from '../Auth/AuthContext.jsx';
import { pullInfo, sendMessage } from "../services/ApiService.js";
import { v4 as uuidv4 } from 'uuid';
import { Tools } from "../utlis/tools.jsx";


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

                // if there is session record, select the latest session
                if (response.data.sessionIdList && response.data.sessionIdList.length > 0) {
                    setSelectedSession(response.data.sessionIdList[response.data.sessionIdList.length - 1]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [username]);

    // when data and selectedSession are both satisfied, create a new session and immediately select it
    useEffect(() => {
        if (data && data.sessionIdList && data.sessionIdList.length === 0 && !selectedSession) {
            const newSessionId = uuidv4();
            console.log("Creating new session with ID:", newSessionId);

            sendMessage(data._id, newSessionId, "Start a new session", "gpt-4o-mini")
                .then(() => {
                    console.log("Message sent");
                    // set the new created session as the selected session
                    const newSession = { _id: newSessionId, content: [] }; // here assume the new session content is empty
                    setSelectedSession(newSession);
                    // update the sessionIdList
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
            <h1>Home Page</h1>
            {data ? <Tools totalTokenUsage={data.totalTokenUsage} /> : <p>Loading token usage...</p>}
            <h2>hello, {username}</h2>
            {data && data.sessionIdList ? (
                <SessionList userid={data._id} sessionData= {data.sessionIdList} onSelectSession={handleSessionSelect} />
            ) : (
                <p>Loading...</p>
            )}
            {data ? (
                <>
                    {console.log("UserInfo:", data._id)}
                    {console.log("Selected Session:", selectedSession)}
                    <ChatWindow userinfo={data._id} session={selectedSession} />
                </>
            ) : (
                <p>Loading chat window...</p>
            )}
            <Message />
        </div>
    );
}

export default HomePage;
