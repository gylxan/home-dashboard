import { connect, discoverBridge } from '../services/hue';

import Api = require('node-hue-api/lib/api/Api');
import { Code, createError } from '../helpers/error';
import { Response } from 'express-serve-static-core';
import { Router } from 'express';
import LightState = require('node-hue-api/lib/model/lightstate/LightState');
import LightGroup = require('node-hue-api/lib/model/groups/LightGroup');
import { GroupLightState } from 'node-hue-api/lib/model/lightstate';

const router = Router();
export const ROUTE = '/light';

let hueApi: undefined | Api;
let error: undefined | string;

discoverBridge().then((ipAddress) => {
  if (ipAddress) {
    connect(ipAddress, process.env.HUE_USER ?? undefined)
      .then((api) => {
        console.log(`Connection to Hue Bridge ${ipAddress} established with ${process.env.HUE_USER}`);
        hueApi = api;
      })
      .catch((e) => {
        hueApi = undefined;
        console.error(`Couldn't establish connection to Hue Bridge ${ipAddress}. Reason: ${e.message}`);
        error = e.message;
      });
  }
});

const checkBridgeConnection = (res: Response): boolean => {
  if (!hueApi) {
    res.status(500).send(createError(Code.HueBridgeNotConnected, error ?? ''));
    return false;
  }
  return true;
};

const getLightGroups = (): Promise<unknown[]> => hueApi?.groups.getAll() ?? Promise.resolve([]);

router.route('/groups').get(async (req, res) => {
  if (checkBridgeConnection(res)) {
    res.send(await getLightGroups());
  }
});

router.route('/groups/:id').put(async (req, res) => {
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
