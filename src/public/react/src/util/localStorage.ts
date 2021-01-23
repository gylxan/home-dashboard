const ENTSCHEIDOMAT_LIST_KEY = 'entscheidomat-list';
const ENTSCHEIDOMAT_MUSIC_KEY = 'entscheidomat-music';

export const getEntscheidomatList = (): string[] => {
  const list = localStorage.getItem(ENTSCHEIDOMAT_LIST_KEY);
  console.log(list);
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
