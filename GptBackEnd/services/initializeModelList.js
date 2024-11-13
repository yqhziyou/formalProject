// initModels.js
import ModelList from '../models/modelList.js';

const models = [
    { modelName: 'GPT-4o', description: 'Our high-intelligence flagship model for complex, multi-step tasks' },
    { modelName: 'GPT-4o mini', description: 'Our affordable and intelligent small model for fast, lightweight tasks' },
    { modelName: 'o1-preview and o1-mini', description: 'Language models trained with reinforcement learning to perform complex reasoning.' },
    { modelName: 'GPT-4 Turbo and GPT-4', description: 'The previous set of high-intelligence models' },
    { modelName: 'GPT-3.5 Turbo', description: 'A fast, inexpensive model for simple tasks' }
];

const initializeModels = async () => {
    try {
        // Check if ModelList   collection already has data
        const existingModels = await ModelList.find();
        if (existingModels.length === 0) {
            await ModelList.insertMany(models);
            console.log('ModelList initialized with default models');
        } else {
            console.log('ModelList already contains data, skipping initialization');
        }
    } catch (error) {
        console.error('Error initializing ModelList:', error);
    }
};

export default initializeModels;