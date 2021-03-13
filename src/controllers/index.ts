import { Router } from 'express';
import boardRoutes, { ROUTE as BOARD_ROUTE } from './boards';
import skipboRoutes, { ROUTE as SKIPBO_ROUTE } from './skipbo';
import skipboStatisticRoutes, { ROUTE as SKIPBO_STATISTIC_ROUTE } from './skipboStatistics';
import lightRoutes, { ROUTE as LIGHT_ROUTE } from './light';
import loginRoutes, { ROUTE as LOGIN_ROUTE } from './login';
import userRoutes, { ROUTE as USER_ROUTE } from './users';
import { Code, createError } from '../helpers/error';
import { isProductionEnvironment } from '../helpers/environment';
import * as path from 'path';
import * as fs from 'fs';

const DEFAULT_VERSION = 'develop';
const HEADER_CLIENT_VERSION = 'x-client-version';

const getCurrentVersion = (): string => {
  if (!isProductionEnvironment()) {
    return DEFAULT_VERSION;
  }

  const dir = path.join(__dirname, '../public/client/static/js/');
  let version = DEFAULT_VERSION;
  fs.readdirSync(dir).forEach((file) => {
    if (file.startsWith('main') && file.endsWith('.js')) {
      version = file.replace('main.', '').replace(/\..*$/, '');
    }
  });
  console.log(`Current version is: "${version}"`);
  return version;
};

const router = Router();
const version = getCurrentVersion();
// Add middleware to check for correct sent client version. When version is not correct, stop request and send error.
router.use((req, res, next) => {
  const clientVersion = req.header(HEADER_CLIENT_VERSION);
  res.setHeader(HEADER_CLIENT_VERSION, version);
  if (!clientVersion || clientVersion !== version) {
    console.warn(
      `Invalid client version "${clientVersion}" received from "${req.ip}". Current server version: "${version}"`,
    );
    res.status(403);
    res.send(
      createError(
        Code.InvalidClientVersion,
        `Invalid client version "${clientVersion}". Current server version: "${version}"`,
      ),
    );
    return;
  }
  next();
});
// Define routes to use
router.use(BOARD_ROUTE, boardRoutes);
router.use(SKIPBO_ROUTE, skipboRoutes);
router.use(SKIPBO_STATISTIC_ROUTE, skipboStatisticRoutes);
router.use(LIGHT_ROUTE, lightRoutes);
router.use(LOGIN_ROUTE, loginRoutes);
router.use(USER_ROUTE, userRoutes);

export default router;
