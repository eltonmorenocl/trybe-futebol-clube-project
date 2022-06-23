import { Router } from 'express';
import leaderboardControllers from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardControllers.GetBoard);

export default leaderboardRouter;
