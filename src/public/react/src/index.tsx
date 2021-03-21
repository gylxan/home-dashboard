import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import { initializeHighCharts } from './util/highcharts';
import { Provider } from 'react-redux';
import configureStore from './util/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import deLocale from 'date-fns/locale/de';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './util/theme';
import { history } from './util/history';

initializeHighCharts();

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
    <ThemeProvider theme={theme}>
      <Provider store={configureStore()}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </MuiPickersUtilsProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
