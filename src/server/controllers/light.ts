import { connect, discoverBridge } from '../services/hue';

import Api = require('node-hue-api/lib/api/Api');
import { Code, createError } from '../helpers/error';
import { Response } from 'express-serve-static-core';
import { Router } from 'express';
import { GroupLightState } from 'node-hue-api/lib/model/lightstate';
import { verifyToken } from '../middlewares/auth';
import { getEnvVar } from '../helpers/environment';
import Logger from '../classes/Logger';

const router = Router();
export const ROUTE = '/light';

let hueApi: undefined | Api;
let error: undefined | string;

discoverBridge()
  .then((ipAddress) => {
    if (ipAddress) {
      connect(ipAddress, getEnvVar('HUE_USER') ?? undefined)
        .then((api) => {
          Logger.info(`Connection to Hue Bridge ${ipAddress} established with ${getEnvVar('HUE_USER')}`);
          hueApi = api;
        })
        .catch((e) => {
          Logger.error(`Couldn't establish connection to Hue Bridge ${ipAddress}. Reason: ${e.message}`);
          error = e.message;
        });
    }
  })
  .catch((e) => {
    Logger.error(`Couldn't establish connection to Hue Bridge. Reason: ${e.message}`);
    error = e.message;
  });

const checkBridgeConnection = (res: Response): boolean => {
  if (!hueApi) {
    res.status(500).send(createError(Code.HueBridgeNotConnected, error ?? ''));
    return false;
  }
  return true;
};

const getLightGroups = (): Promise<unknown[]> => hueApi?.groups.getAll() ?? Promise.resolve([]);

router.route('/groups').get(verifyToken, async (req, res) => {
  if (checkBridgeConnection(res)) {
    res.send(await getLightGroups());
  }
});

router.route('/groups/:id').put(verifyToken, async (req, res) => {
  if (checkBridgeConnection(res)) {
    const requestedId = req.params.id;
    const { on = true } = req.body;
    const state = new GroupLightState().on(on);
    await hueApi?.groups.setGroupState(requestedId, state);
    const groups = await getLightGroups();
    res.send(groups);
  }
});

export default router;
