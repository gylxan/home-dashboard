import React from 'react';
import './App.css';
import routes from './util/routes';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SkipboOverviewPage from './pages/SkipboOverviewPage';
import SkipboAddGamePage from './pages/SkipboAddGamePage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main className="App-main">
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
