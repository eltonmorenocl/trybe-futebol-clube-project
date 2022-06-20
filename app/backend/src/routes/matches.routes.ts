import { Router } from 'express';
import matchesControllers from '../controllers/matchesController';
import { validateMatches } from '../middleware/matchesMid';

const matchesRouter = Router();

matchesRouter.get('/', matchesControllers.matchesGetAll);
matchesRouter.post('/', validateMatches, matchesControllers.MatchesCreate);
matchesRouter.patch('/:id/finish', matchesControllers.MatchesPatch);
matchesRouter.patch('/:id', matchesControllers.MatchespatchId);

export default matchesRouter;
