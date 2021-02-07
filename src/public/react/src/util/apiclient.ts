import axios, { AxiosResponse } from 'axios';
import { GeneralStatistic, SkipboGame } from '../interfaces/skipboGame';
import { getAppVersion, setAppVersion } from './localStorage';
import { Code } from './error';

const HEADER_VERSION = 'x-client-version';
const appVersion = getAppVersion();

const client = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  (request) => {
    request.headers[HEADER_VERSION] = appVersion;
    return request;
  },
  (error) => Promise.reject(error),
);

// Always unpack the payload (data) from the response and check the client version
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    checkClientVersionError(error.response);
    return Promise.reject(error);
  },
);

/**
 * Checks if the error is a invalid client version error and reloads the page to load new client
 *
 * When the error is invalid client version error, we save the new version from the response header and reload the page
 * to get the new files for the client.
 * @param {AxiosResponse} response Response from axios
 */
const checkClientVersionError = (response: AxiosResponse): void => {
  if (response.status === 403 && response?.data?.error?.code === Code.InvalidClientVersion) {
    setAppVersion(response.headers[HEADER_VERSION]);
    window.location.reload();
  }
};

export const getBoards = (): Promise<any> => client.get('boards');
export const getSkipboGames = (): Promise<SkipboGame[]> => client.get('skipbo');
export const addSkipboGame = (game: SkipboGame): Promise<void> => client.post('skipbo', game);
export const getSkipboGameStatisticsGeneral = (): Promise<GeneralStatistic> =>
  client.get('skipbo/statistics/general').then((data: any) => {
    if (!!data.lastPlayTime) {
      return {
        ...data,
        lastPlayTime: { ...data.lastPlayTime, value: new Date(data.lastPlayTime.value) },
      };
    }
    return data;
  });
export const getSkipboGamesPerWinnerStatistics = (): Promise<{ name: string; y: number }[]> =>
  client.get('skipbo/statistics/games-per-winner');

export const getSkipboTopWinners = (): Promise<{ name: string; y: number }[]> =>
  client.get('skipbo/statistics/games-per-winner').then((winners) => {
    const topWinners = (winners as unknown) as { name: string; y: number }[];
    topWinners.sort((a, b) => b.y - a.y);
    return topWinners.splice(0, 5);
  });

export const getSkipboGamesHistory = (): Promise<{ name: string; data: number[][] }[]> =>
  client.get('skipbo/statistics/games-history');

export const getSkipboLastPlayDayGames = (): Promise<{ name: string; data: number[][] }[]> =>
  client.get('skipbo/statistics/last-play-day');

export const getSkipboGameWinners = (): Promise<string[]> => client.get('skipbo/winners');

export const deleteSkipboGame = (id: string): Promise<void> => client.delete(`skipbo/${id}`);
