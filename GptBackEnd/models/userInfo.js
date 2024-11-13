// userInfo.js

import mongoose from 'mongoose';

// define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    totalTokenUsage: { type: Number, default: 0 },
    sessionIdList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
});

// create User model
const User = mongoose.model('User', userSchema);

export default User;
