import { Router } from 'express';
import loginControllers from '../controllers/loginController';
import validateLogin from '../middleware/loginMid';

const loginRouter = Router();

loginRouter.post('/', validateLogin, loginControllers.loginUser);
loginRouter.get('/validate', loginControllers.loginValidate);

export default loginRouter;
