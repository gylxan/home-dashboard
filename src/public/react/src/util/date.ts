export const getFormattedDate = (value: string | Date): string =>
  (value instanceof Date ? value : new Date(value)).toLocaleString('de-DE');
