// modelList.js

import mongoose from 'mongoose';

// define ModelList Schema
const modelListSchema = new mongoose.Schema({
    modelName: { type: String, required: true, unique: true },
    description: { type: String },
    version: { type: String, default: "1.0" },
    maxUsage: { type: Number, default: 1000 },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
});

// create ModelList model
const ModelList = mongoose.model('ModelList', modelListSchema);

export default ModelList;