import { Router } from 'express';
import { Code, createApiError } from '../helpers/error';
import * as DataStore from 'nedb';
import { User } from '../interfaces/user';
import { checkDuplicateUser, checkPasswordSent, checkUserSent } from '../middlewares/user';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { preset } from '../presets/userPresets';
import { getEnvVar } from '../helpers/environment';

export const db = new DataStore({ filename: getEnvVar('DB_DIR') + '/users.db', autoload: true });

// Insert default users if empty
preset(db);

const router = Router();

export const ROUTE = '/login';
// Root without parameter
router.route('/').post(checkUserSent, checkPasswordSent, (req, res) => {
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

    const token = sign({ id: user._id }, getEnvVar('JWT_TOKEN_SECRET') as string, {
      expiresIn: 86400, // 24 hours
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPasswordHash, ...userPropsToSend } = user;
    res.send({
      ...userPropsToSend,
      accessToken: token,
    });
  });
});

router.route('/register').post(checkDuplicateUser, checkPasswordSent, (req, res) => {
  const { username, password } = req.body;

  const pwHash = hashSync(password, 8);
  db.insert({ username, password: pwHash }, function (error: unknown, docs: User) {
    res.send(docs);
  });
});

export default router;
