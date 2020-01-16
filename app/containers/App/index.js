import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Dashboard from '../Dashboard';
import LoginPage from '../LoginPage';
import routes from 'constants/routes.json';

export default function App() {
  return (
    <Switch>
      <Route exact path={routes.LOGIN} component={LoginPage} />
      <Route render={Dashboard} />
    </Switch>
  );
}
