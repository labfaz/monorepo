import React, { lazy } from "react"
import { Route, Switch } from "react-router-dom"

import { Router } from 'Routes';

const RegisterPage = lazy(() => import('./SignUpPage'));

export const Login: Router = ({ match }) => {
  const { path = '/signup' } = match ?? {};

export const Login: Router = ({ match }) => {
  const { path = "/signup" } = match ?? {}
  
  return (
    <Switch>
      <Route exact path={path}>
        {() => (
          <RegisterPage />
        )}
      </Route>
    </Switch>
  );
};

export default Login;
