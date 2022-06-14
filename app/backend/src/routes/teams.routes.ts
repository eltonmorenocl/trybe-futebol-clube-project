import { Router } from 'express';
import teamsControllers from '../controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', teamsControllers.teamsGetAll);
teamsRouter.get('/:id', teamsControllers.teamsGetid);

export default teamsRouter;
