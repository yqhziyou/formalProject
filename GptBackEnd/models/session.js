// session.js

import mongoose from 'mongoose';

// define Session Schema
const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    creationDate: { type: Date, default: Date.now },
    tokenUsage: { type: Number, default: 0 },
    modelName: { type: String, required: true },
    content: [
        {
            role: { type: String, enum: ["user", "assistant"], required: true },
            content: { type: String, required: true }
        }
    ],
    emailAddress: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // new userId field
});

// create Session model
const Session = mongoose.model('Session', sessionSchema);

export default Session;
