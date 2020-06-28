export const getCurrentDateTimeForHtml = () => {
  const isoString = new Date().toISOString();
  return isoString.substring(0, isoString.length - 5);
};
