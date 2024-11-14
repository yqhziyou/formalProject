import express from 'express';
import pullData from "../controllers/newController.js";
const router = express.Router();

router.get('/getInfo/:username',pullData)


export default router;