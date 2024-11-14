// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import {AuthProvider} from "./Auth/AuthContext.jsx";
import ChatWindow from "./components/ChatWindow.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/chat" element={<ChatWindow />} />
                </Routes>
            </Router>
        </AuthProvider>

    );
}

export default App;