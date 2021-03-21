import { Router } from 'express';
import { Code, createApiError } from '../helpers/error';
import * as DataStore from 'nedb';
import { User } from '../interfaces/user';
import { checkPasswordSent, checkUserSent } from '../middlewares/user';
import { compareSync } from 'bcryptjs';
import { sign, verify, VerifyErrors } from 'jsonwebtoken';
import { preset } from '../presets/userPresets';
import { getEnvVar } from '../helpers/environment';

export const db = new DataStore({ filename: getEnvVar('DB_DIR') + '/users.db', autoload: true });

export let refreshTokens: string[] = [];

// Insert default users if empty
preset(db);

const router = Router();
const TOKEN_EXPIRE_TIME = 86400;

export const LOGIN_ROUTE = '/login';
export const LOGOUT_ROUTE = '/logout';
export const TOKEN_ROUTE = '/token';
// Root without parameter
router.route(LOGIN_ROUTE).post(checkUserSent, checkPasswordSent, (req, res) => {
  const { username, password } = req.body;

  db.find({ username }, function (error: any, docs: User[]) {
    const user = docs[0];

    if (!user) {
      return createApiError(res, 401, Code.InvalidCredentials, 'Benutzername oder Passwort ist falsch');
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return createApiError(res, 401, Code.InvalidCredentials, 'Benutzername oder Passwort ist falsch');
    }

    const accessToken = sign({ id: user._id }, getEnvVar('JWT_TOKEN_SECRET') as string, {
      expiresIn: TOKEN_EXPIRE_TIME, // 24 hours
    });
    const refreshToken = sign({ id: user._id }, getEnvVar('JWT_REFRESH_TOKEN_SECRET') as string);

    refreshTokens.push(refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPasswordHash, ...userPropsToSend } = user;
    res.send({
      ...userPropsToSend,
      accessToken,
      refreshToken,
    });
  });
});

router.route(TOKEN_ROUTE).post((req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) {
    return createApiError(res, 401, Code.MissingToken, 'Token fehlt');
  }

  if (!refreshTokens.includes(token)) {
    return createApiError(res, 403, Code.RefreshTokenInvalid, 'Refresh-Token ist ungültig');
  }

  verify(token, getEnvVar('JWT_REFRESH_TOKEN_SECRET') as string, (err: VerifyErrors | null, user: unknown) => {
    if (!!err) {
      return createApiError(res, 403, Code.RefreshTokenInvalid, 'Refresh-Token ist ungültig');
    }

    const accessToken = sign({ id: (user as { id: string }).id }, getEnvVar('JWT_TOKEN_SECRET') as string, {
      expiresIn: TOKEN_EXPIRE_TIME, // 24 hours
    });
    res.send({
      accessToken,
    });
  });
});

router.route(LOGOUT_ROUTE).post((req, res) => {
  const { refreshToken: token } = req.body;
  refreshTokens = refreshTokens.filter((refreshToken) => token !== refreshToken);
  res.send();
});

export default router;
