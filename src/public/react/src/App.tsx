import React from 'react';
import './App.module.css';
import routes from './util/routes';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkipboOverviewPage from './pages/SkipboOverviewPage';
import SkipboAddGamePage from './pages/SkipboAddGamePage';
import Header from './components/Header';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <Header />
      </header>
      <main className={styles.Main}>
        <Switch>
          <Route path={routes.skipboAddGame}>
            <SkipboAddGamePage />
          </Route>
          <Route path={routes.skipbo}>
            <SkipboOverviewPage />
          </Route>
          <Route path={routes.home}>
            <HomePage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
