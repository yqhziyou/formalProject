// HomePage.jsx
import React, { useContext } from 'react';
import ChatWindow from '../components/ChatWindow';
import LoginPage from '../components/LoginPage';
import Message from '../components/Message';
import SessionList from '../components/SessionList';
import { AuthContext } from '../Auth/AuthContext.jsx';

function HomePage() {
    const { user, login } = useContext(AuthContext);

    return (
        <div>
            <h1>主页</h1>
            {/* 根据用户是否登录来显示不同内容 */}
            {user ? (
                <>
                    <SessionList />
                    <ChatWindow />
                    <Message />
                </>
            ) : (
                <LoginPage onLogin={login} />
            )}
        </div>
    );
}

export default HomePage;
