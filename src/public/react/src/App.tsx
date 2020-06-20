import React from 'react';
import './App.css';
import routes from './util/routes';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SkipboPage from './pages/Skipbo/SkipboPage';

function App() {
  return (
    <div className="App">
      <header className="App-header" />
      <Switch>
        <Route path={routes.skipbo}>
          <SkipboPage />
        </Route>
        <Route path={routes.home}>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
