import axios from 'axios';
import { Player, SkipboGame } from '../interfaces/skipboGame';

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
export const getSkipboGameStatisticsGeneral = (): Promise<any> =>
  client.get('skipbo/statistics/general').then((data: any) => {
    if (!!data.lastPlayTime) {
      return { ...data, lastPlayTime: new Date(data.lastPlayTime).toLocaleString('de-DE') };
    }
    return data;
  });
