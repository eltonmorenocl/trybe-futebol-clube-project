import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { ILogin } from '../interfaces/ILogin';

const SECRET = fs.readFileSync('jwt.evaluation.key');

export function loginToken(data: object) {
  const userToken = jwt.sign(data, SECRET, { expiresIn: '7d', algorithm: 'HS256' });
  // console.log('userToken', userToken);
  return userToken;
}

export function verifyToken(token: string) {
  const tokenV = jwt.verify(token, SECRET) as ILogin;
  // console.log('tokenV', tokenV);
  return tokenV;
}
