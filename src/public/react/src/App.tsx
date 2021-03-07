import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import './App.module.css';
import routes from './util/routes';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkipboOverviewPage from './pages/SkipboOverviewPage';
import SkipboAddGamePage from './pages/SkipboAddGamePage';
import EntscheidomatPage from './pages/EntscheidomatPage';
import Header from './components/Header';
import SkipboTableOverviewPage from './pages/SkipboTableOverviewPage';
import LightOverviewPage from 'pages/LightOverviewPage';
import LoginPage from "./pages/LoginPage";
import AdminOverviewPage from "./pages/AdminOverviewPage";

import styles from './App.module.css';

library.add(fas, far);
// TODO
// 3. Save location of game
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
          <Route path={routes.light}>
            <LightOverviewPage />
          </Route>
          <Route path={routes.login}>
            <LoginPage />
          </Route>
          <Route path={routes.admin}>
            <AdminOverviewPage />
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
