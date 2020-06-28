import * as HighCharts from 'highcharts';

export const initializeHighCharts = () => {
  initializeLanguage();
};
const initializeLanguage = () => {
  HighCharts.setOptions({
    lang: {
      months: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      resetZoom: 'Zoom zurücksetzen',
    },
  });
};

export const getDefaultChartOptions = (): HighCharts.Options => {
  return {
    time: {
      timezoneOffset: new Date().getTimezoneOffset(),
    },
  };
};
