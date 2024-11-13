import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import { registerUser, loginUser } from '../services/apiService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // initialize navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                // registration logic
                const result = await registerUser(username, password);
                if (result.success) {
                    setMessage('Registration successful, please login');
                    setIsRegistering(false); // switch to login mode after successful registration
                } else {
                    setMessage(result.error || 'Registration failed');
                }
            } else {
                // login logic
                const result = await loginUser(username, password);
                console.log(result.data.success);
                if (result.data.success) {
                    setMessage('Login successful');
                    // store user information or token (optional)
                    // localStorage.setItem('userToken', result.token);
                    // navigate to home page
                    navigate('/home'); // assume home page path is /home
                } else {
                    setMessage(result.error || 'Login failed');
                }
            }
        } catch (error) {
            console.error(error);
            setMessage('Operation failed, please check the input information');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
                <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </form>
            {message && <p>{message}</p>} {/* display prompt information */}
        </div>
    );
};

export default LoginPage;