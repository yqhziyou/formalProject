// modelRoutes.js

import express from 'express';
import ModelList from '../models/modelList.js';

const router = express.Router();

// GET /api/models - Get all modelName lists
router.get('/models', async (req, res) => {
    try {
        const models = await ModelList.find({}, 'modelName'); // 只查询 modelName 字段
        res.json(models);
    } catch (error) {
        console.error("Error fetching models:", error);
        res.status(500).json({ error: "Failed to fetch models" });
    }
});

export default router;