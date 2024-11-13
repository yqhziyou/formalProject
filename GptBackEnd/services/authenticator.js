// authenticator.js

import bcrypt from 'bcrypt';
import User from '../models/userInfo.js';

const saltRounds = 10;

/**
 * Register a new user
 * @param {String} username
 * @param {String} password
 * @returns {Object} Registered user object or error message
 */
export async function registerUser(username, password) {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return { error: 'Username already exists' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        
        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            totalTokenUsage: 0,
            sessionIdList: [],
            
        });

        await newUser.save();
        return { success: true, user: newUser };
    } catch (error) {
        return { error: 'Error during registration' };
    }
}

/**
 * Login a user
 * @param {String} username
 * @param {String} password
 * @returns {Object} Authenticated user object or error message
 */
export async function loginUser(username, password) {
    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return { error: 'User not found' };
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: 'Invalid password' };
        }

        return { success: true, user };
    } catch (error) {
        return { error: 'Error during login' };
    }
}
