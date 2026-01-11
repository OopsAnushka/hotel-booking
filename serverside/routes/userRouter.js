
import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Import protect
import { getUserData, storeRecentSearchCities } from '../controller/userController.js';

const userRouter = express.Router();

// CHANGE: Use protect instead of requireAuth()
userRouter.get('/get-user', protect, getUserData); 
userRouter.post('/store-recent-search', protect, storeRecentSearchCities);

export default userRouter;