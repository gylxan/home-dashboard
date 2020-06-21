import React from 'react';
import './App.css';
import routes from './util/routes';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SkipboOverviewPage from './pages/SkipboOverviewPage';
import SkipboAddGamePage from './pages/SkipboAddGamePage';

function App() {
  return (
    <div className="App">
      <header className="App-header" />
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
    </div>
  );
}

export default App;
