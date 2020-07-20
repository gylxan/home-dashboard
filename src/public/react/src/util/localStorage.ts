export const getEntscheidomatList = (): string[] => {
  const list = localStorage.getItem('entscheidomat-list');
  console.log(list);
  if (!list) {
    return [];
  }
  return JSON.parse(list) as string[];
};

export const setEntscheidomatList = (list: string[]) =>
  localStorage.setItem('entscheidomat-list', JSON.stringify(list));
