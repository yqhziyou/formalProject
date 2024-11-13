import express from 'express';
import msgController from '../controllers/chatController.js';

const router = express.Router();

router.post('/sendMessage', async (req, res) => {
    console.log("I am in msg route", req.body);
    try {
        const { userID, sessionID, message, selectedModel } = req.body;

        if (!userID || !sessionID || !message) {
            return res.status(400).json({
                error: "Missing required parameters"
            });
        }

        // Call msgController and receive its return value
        const responseData = await msgController(userID, sessionID, message, selectedModel);

        // Check if responseData exists
        if (!responseData) {
            throw new Error("No response data received from controller");
        }

        console.log("route's parameters", userID, sessionID, message, selectedModel);
        console.log("responseData", responseData);

        res.status(200).json({
            message: "Message successfully sent",
            data: responseData
        });
    } catch (error) {
        console.error("msg route error", error);
        res.status(500).json({
            error: error.message || "Failed to process message"
        });
    }
});

export default router;