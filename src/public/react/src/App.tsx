import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './App.module.css';
import routes from './util/routes';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkipboOverviewPage from './pages/SkipboOverviewPage';
import SkipboAddGamePage from './pages/SkipboAddGamePage';
import EntscheidomatPage from './pages/EntscheidomatPage';
import Header from './components/Header';
import SkipboTableOverviewPage from './pages/SkipboTableOverviewPage';


import styles from './App.module.css';

library.add(fas);
// TODO
// 2. table view for skip bo games
// 3. Save location of game
// 4. Redux to save things and reload in background
// 4. New Tile to control lights at home via hue
// 5. New Tile to play spotify
// 6. New Tile with calender entries of shared calender
// 7. ToDo List
// 8. Login

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
          <Route path={routes.skipboTable}>
            <SkipboTableOverviewPage />
          </Route>
          <Route path={routes.skipbo}>
            <SkipboOverviewPage />
          </Route>
          <Route path={routes.entscheidomat}>
            <EntscheidomatPage />
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
