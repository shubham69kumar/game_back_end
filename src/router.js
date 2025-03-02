import express from 'express';
import health from './services/health/index.js';
import userRouter from './services/user/index.js';
import gameRouter from './services/game/index.js';

const router = express.Router();

router.use('/health', health);
router.use('/user', userRouter);
router.use('/game', gameRouter);
export default router;