// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import HomePage from './components/ChatWindow.jsx';
import {AuthProvider} from "./Auth/AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/HomePage" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </Router>
        </AuthProvider>

    );
}

export default App;