export const getCurrentDateTimeForHtml = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  console.log(now.toISOString());
  return now.toISOString().substring(0, now.toISOString().length - 5);
};

export const getUnixTimestamp = (time: string): number => {
  return +new Date(time);
};
