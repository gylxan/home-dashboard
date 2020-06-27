import axios from 'axios';
import { GeneralStatistic, Player, SkipboGame } from '../interfaces/skipboGame';

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

// Always unpack the payload (data) from the response
client.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

export const getBoards = (): Promise<any> => client.get('boards');
export const getSkipboGames = (): Promise<SkipboGame[]> => client.get('skipbo');
export const addSkipboGame = (winner: Player): Promise<void> => client.post('skipbo', winner);
export const getSkipboGameStatisticsGeneral = (): Promise<GeneralStatistic> =>
  client.get('skipbo/statistics/general').then((data: any) => {
    if (!!data.lastPlayTime) {
      return {
        ...data,
        lastPlayTime: { ...data.lastPlayTime, value: new Date(data.lastPlayTime.value).toLocaleString('de-DE') },
      };
    }
    return data;
  });
export const getSkipboGamesPerWinnerStatistics = (): Promise<{ name: string; y: number }[]> =>
  client.get('skipbo/statistics/games-per-winner');

export const getTopWinners = (): Promise<{ name: string; y: number }[]> =>
  client.get('skipbo/statistics/games-per-winner').then((winners) => {
    const topWinners = (winners as unknown) as { name: string; y: number }[];
    topWinners.sort((a, b) => b.y - a.y);
    return topWinners.splice(0, 5);
  });

export const getSkipboGameWinners = (): Promise<string[]> => client.get('skipbo/winners');
