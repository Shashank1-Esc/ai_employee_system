import express from 'express';
import { getRecommendation } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/recommend', getRecommendation);

export default router;
