import { Router } from 'express';
import matchesControllers from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesControllers.matchesGetAll);

export default matchesRouter;
