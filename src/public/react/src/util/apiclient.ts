import axios from 'axios';
import { GeneralStatistic, SkipboGame } from '../interfaces/skipboGame';
import { getAppVersion, setAppVersion } from './localStorage';

const HEADER_VERSION = 'x-client-version';

const client = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  (request) => request,
  (error) => {
    return Promise.reject(error);
  },
);

// Always unpack the payload (data) from the response and check the client version
client.interceptors.response.use(
  (response) => {
    checkClientVersion(response.headers[HEADER_VERSION]);
    return response.data;
  },
  (error) => Promise.reject(error),
);

/**
 * Checks if the client version in the response of the server is the same as locally saved.
 *
 * When the client version differs from the given one, reload the window to get the new build react app
 * @param {string} responseVersion The version from the API response
 */
const checkClientVersion = (responseVersion: string): void => {
  if (responseVersion !== getAppVersion()) {
    setAppVersion(responseVersion);
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
