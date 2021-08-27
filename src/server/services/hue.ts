import { v3 as nodeHueApi } from 'node-hue-api';
import * as Api from 'node-hue-api/lib/api/Api';
import Logger from '../classes/Logger';

export const APP_NAME = 'home-dashboard';
export const DEVICE_NAME = 'server';

export async function discoverBridge(): Promise<string | null> {
  const discoveryResults = await nodeHueApi.discovery.nupnpSearch();

  if (discoveryResults.length === 0) {
    Logger.error('Failed to resolve any Hue Bridges');
    return null;
  } else {
    Logger.info(`Found running Philips Hue bridge on ${discoveryResults[0].ipaddress}`);
    // Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
    return discoveryResults[0].ipaddress;
  }
}

export async function connect(ipAddress: string, userName?: string): Promise<Api> {
  return nodeHueApi.api.createLocal(ipAddress).connect(userName);
}
