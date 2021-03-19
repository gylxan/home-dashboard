import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../util/routes';
import SkipboAddGamePage from '../../pages/SkipboAddGamePage';
import SkipboTableOverviewPage from '../../pages/SkipboTableOverviewPage';
import SkipboOverviewPage from '../../pages/SkipboOverviewPage';
import EntscheidomatPage from '../../pages/EntscheidomatPage';
import LightOverviewPage from '../../pages/LightOverviewPage';
import LoginPage from '../../pages/LoginPage';
import UserProfilePage from '../../pages/UserProfilePage';
import HomePage from '../../pages/HomePage';

const Routes: React.FC = () => (
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
    <Route path={routes.user}>
      <UserProfilePage />
    </Route>
    <Route path={routes.home}>
      <HomePage />
    </Route>
  </Switch>
);

export default Routes;
