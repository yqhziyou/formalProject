// chatService.js
import Session from "../models/session.js";
import config from "../config/config.js";
import { OpenAI } from "openai";
import { updateTotalTokenUsage, addSessionToUser } from './userService.js';

const openai = new OpenAI({
    apiKey: config.openaiapi
});

const generateAIResponse = async (userId, sessionId, userMessage, aiModel) => {
    try {
        console.log("sessionId passed to generateAIResponse:", sessionId);

        // 1. Get all history records of the current session from database
        let session = await Session.findOne({ sessionId }); // Ensure the session belongs to the user
        let messages = [];

        if (session) {
            // If session exists, load history into messages array
            messages = session.content;
        } else {
            // If session doesn't exist, create a new one and initialize
            const response = await openai.chat.completions.create({
                model: aiModel,
                messages: [{ role: "system", content: "Session initialization." }],
                stream: false
            });

            const modelName = response.model;

            session = await Session.create({
                sessionId,
                userId,
                modelName,
                content: [],
                tokenUsage: 0
            });

            // Add the new session to user's session list
            await addSessionToUser(userId, session._id);
        }

        // 2. Add user's new message to context
        messages.push({ role: "user", content: userMessage });

        // 3. Call GPT API to generate AI response
        const aiResponse = await openai.chat.completions.create({
            model: aiModel,
            messages,
            stream: false
        });

        // 4. Get complete response content
        const responseText = aiResponse.choices[0]?.message?.content;

        if (!responseText) {
            throw new Error("AI response is empty");
        }

        // 5. Add AI's response to context
        messages.push({ role: "assistant", content: responseText.trim() });

        // 6. Update session content and token usage in database
        const totalTokens = aiResponse.usage.total_tokens || 0; // Ensure totalTokens has a value
        await Session.updateOne(
            { sessionId },
            {
                content: messages,
                $inc: { tokenUsage: totalTokens }
            }
        );

        // 7. Update user's total token usage
        await updateTotalTokenUsage(userId, totalTokens);

        // 8. Return result
        console.log('response:',responseText.trim());
        return responseText.trim();
    } catch (error) {
        console.error("Error generating AI response: ", error);
        throw error;
    }
};

export default generateAIResponse;
