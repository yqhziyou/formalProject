import { registerUser, loginUser } from '../services/authenticator.js';
import { addSessionToUser, removeSessionFromUser, getUserSessionsContent} from '../services/userService.js';

/**
 * Controller to handle user registration
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function register(req, res) {
    const { username, password } = req.body;

    try {
        const result = await registerUser(username, password);

        if (result.error) {
            // Registration failed, return success: false
            return res.status(400).json({ success: false, error: result.error });
        }

        // Registration successful, return success: true
        res.status(201).json({ success: true, user: result.user });
    } catch (error) {
        // Server error, return success: false
        res.status(500).json({ success: false, error: 'Server error during registration' });
    }
}

/**
 * Controller to handle user login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const result = await loginUser(username, password);

        if (result.error) {
            // Login failed, return success: false
            return res.status(400).json({ success: false, error: result.error });
        }

        // Login successful, return success: true
        res.status(200).json({ success: true, user: result.user });
    } catch (error) {
        // Server error, return success: false
        res.status(500).json({ success: false, error: 'Server error during login' });
    }
}


/**
 * Controller to add a session to the user's session list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function addSession(req, res) {
    const { userId, sessionId } = req.body;

    try {
        const result = await addSessionToUser(userId, sessionId);

        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ success: true, user: result.user });
    } catch (error) {
        res.status(500).json({ error: 'Server error adding session' });
    }
}

/**
 * Controller to remove a session from a user's session list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function removeSession(req, res) {
    const { userId, sessionId } = req.params;

    try {
        const result = await removeSessionFromUser(userId, sessionId);

        if (result.error) {
            return res.status(404).json({ error: result.error });
        }

        return res.status(200).json({ success: true, user: result.user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Controller to get all session contents for a specific user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function getSessionContents(req, res) {
    const { userId } = req.params;

    try {
        const result = await getUserSessionsContent(userId);

        if (result.error) {
            // If there's an error (e.g., user not found), return a 404 error response
            return res.status(404).json({ success: false, error: result.error });
        }

        // Successfully retrieved session contents, return with success: true
        return res.status(200).json({ success: true, content: result.content });
    } catch (error) {
        // Handle server error, return success: false
        return res.status(500).json({ success: false, error: 'Server error fetching session contents' });
    }
}