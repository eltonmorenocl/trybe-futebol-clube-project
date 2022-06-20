import { Request, Response } from 'express';
import LoginServices from '../services/loginServices';

export class LoginController {
  public loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const resultLogin = await LoginServices.loginFind(email, password);
      // console.log('login passei aqui', resultLogin);
      if (!resultLogin) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
      return res.status(200).json(resultLogin);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  public loginValidate = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers;

      const resultValidate = await LoginServices.loginVerify(authorization as string);
      // console.log('resultValidate controller', resultValidate);

      if (resultValidate === null) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        return res.status(200).json(resultValidate);
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}

export default new LoginController();
