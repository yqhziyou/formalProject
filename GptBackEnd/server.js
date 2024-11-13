import express from 'express';
import cors from 'cors'; // 引入cors包
import config from "./config/config.js";
import connectDB from "./config/db.js";
import ModelRoutes from "./routes/modelRoutes.js";
import MsgRoutes from "./routes/msgRoutes.js";
import UserRoutes from "./routes/userOperationRoute.js";
import initializeModels from "./services/initializeModelList.js";

const app = express();


// Use CORS middleware, allowing cross-origin requests
//app.use(cors({
//    origin: 'http://your_frontend_domain.com', // Replace 'http://your_frontend_domain.com' with your frontend address
//    methods: ['GET', 'POST', 'PUT', 'DELETE'],
//    credentials: true
//}));

//development environment
app.use(cors({ origin: '*' }));

// Connect to MongoDB
connectDB();
initializeModels();

// Use JSON middleware to handle JSON data
app.use(express.json());

// Use routes
app.use('/api/models', ModelRoutes);
app.use('/api/messages', MsgRoutes);
app.use('/api/users', UserRoutes);



const PORT = config.backend || 5500;
app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});