import generateAIResponse from "../services/chatService.js";


const messageHandler = async (userID, sessionID, message, selectedModel = "gpt-4o-mini") => {
    try {
        let user = userID;
        let session = sessionID;
        let content = message;
        let model = selectedModel;

        console.log("all information loaded");
        console.log("send request from controller...");
        console.log(user, session, content, model);

        const reply = await generateAIResponse(user, session, content, model);

        if (!reply) {
            throw new Error("No response received from AI service");
        }

        console.log("message has sent!");
        console.log("reply:", reply);

        return reply;
    } catch (error) {
        console.error("messageHandler controller error", error);
        // Important: Throw the error upwards instead of silently failing
        throw error;
    }
};

export default messageHandler;