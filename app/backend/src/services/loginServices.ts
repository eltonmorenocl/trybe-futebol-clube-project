import { compareSync } from 'bcryptjs';
import { loginToken, verifyToken } from '../middleware/token';
import Users from '../database/models/users';

class LoginService {
  loginFind = async (email: string, _password: string) => {
    const userfind = await Users.findOne({ where: { email } });
    // console.log(loginUser);
    if (!userfind) return null;

    if (!compareSync(_password, userfind.password)) {
      return { code: '400', message: 'Incorrect password' };
    }

    const token = loginToken({ data: { role: userfind.role, id: userfind.id } });

    return {
      user: {
        id: userfind.id,
        username: userfind.username,
        role: userfind.role,
        email: userfind.email,
      },
      token,
    };
  };

  loginVerify = async (token: string) => {
    if (!token) {
      return null;
    }
    const tokenValidate = verifyToken(token);
    // console.log('tokenValidate service', tokenValidate);

    if (!tokenValidate) {
      return null;
    }
    return tokenValidate.data.role;
  };
}

export default new LoginService();
