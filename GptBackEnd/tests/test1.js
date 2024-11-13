import generateAIResponse from '../services/chatService.js';  // 请替换为 generateAIResponse 文件的实际路径
import config from "../config/config.js";

const testGenerateAIResponse = async () => {
    if (!config.mongodb_url || !config.openaiapi) {
        console.error("Config file is missing required fields.");
        return;
    }

    console.log("Config loaded successfully:", config.mongodb_url);
    console.log("GPT API key loaded:", config.openaiapi);

    const sessionId = "test-session-124";  // Test session ID
    const userMessage = "Hello, AI! Can you help me?";  // Test user input message

    console.log("Testing with sessionId:", sessionId);
    console.log("Testing with userMessage:", userMessage);

    try {
        const aiResponse = await generateAIResponse(sessionId, userMessage);
        console.log("AI Response:", aiResponse);  // Print AI response
    } catch (error) {
        console.error("Error during AI response test:", error);
    }
};

export default testGenerateAIResponse;
