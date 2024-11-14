import.meta.env = {"BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_API_URL": "http://localhost:5500/api"};import axios from "/node_modules/.vite/deps/axios.js?v=4688a0e9";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (username, password) => {
    return axios.post(`${API_URL}/users/register`, { username, password });
};

export const loginUser = async (username, password) => {
    return axios.post(`${API_URL}/users/login`, { username, password });
};

export const sendMessage = async (userID, sessionID,message,selectedModel) => {
    return axios.post(`${API_URL}/messages/sendMessage`, { userID, sessionID,message,selectedModel });
};

export const deleteChatHistory = async (userID, sessionID) => {
    return axios.post(`${API_URL}/users/remove-session`, { userId: userID, sessionId: sessionID });
};

export const pullInfo = async (username) => {
    return await axios.get(`${API_URL}/info/getInfo/${username}`);
};


