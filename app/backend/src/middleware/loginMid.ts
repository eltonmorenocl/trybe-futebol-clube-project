import { Request, Response, NextFunction } from 'express';

function validateLogin(req:Request, res:Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    const message = 'All fields must be filled';
    return res.status(400).json({ message });
  }
  next();
}

export default validateLogin;
