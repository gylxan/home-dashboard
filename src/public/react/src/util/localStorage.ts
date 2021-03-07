import { User } from '../interfaces/user';

const APP_VERSION = 'app_version';
const ENTSCHEIDOMAT_LIST_KEY = 'entscheidomat-list';
const ENTSCHEIDOMAT_MUSIC_KEY = 'entscheidomat-music';
const USER = 'user';

export const getEntscheidomatList = (): string[] => {
  const list = localStorage.getItem(ENTSCHEIDOMAT_LIST_KEY);
  if (!list) {
    return [];
  }
  return JSON.parse(list) as string[];
};

export const setEntscheidomatList = (list: string[]) =>
  localStorage.setItem(ENTSCHEIDOMAT_LIST_KEY, JSON.stringify(list));

export const hasEntscheidomatMusic = () =>
  localStorage.getItem(ENTSCHEIDOMAT_MUSIC_KEY) === null || localStorage.getItem(ENTSCHEIDOMAT_MUSIC_KEY) === 'true';

export const setEntscheidomatMusic = (hasMusic: boolean) =>
  localStorage.setItem(ENTSCHEIDOMAT_MUSIC_KEY, `${hasMusic}`);

export const getAppVersion = () => localStorage.getItem(APP_VERSION) ?? '';

export const setAppVersion = (version: string) => localStorage.setItem(APP_VERSION, version);

export const setUser = (user: User) => localStorage.setItem(USER, JSON.stringify(user));

export const getUser = (): User | null =>
  localStorage.getItem(USER) === null ? null : JSON.parse(localStorage.getItem(USER) || '');

export const clearUser = () => localStorage.removeItem(USER);
