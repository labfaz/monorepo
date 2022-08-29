import React, { lazy } from "react"
import { Route, RouteComponentProps, Switch } from "react-router-dom"

import { Router } from 'Routes';

const RegisterPage = lazy(() => import('Pages/EmailConfirmation'));

export const Login: Router = ({ match }) => {
  const { path = '/confirmar-email' } = match ?? {};

export const Login: Router = ({ match }) => {
  const { path = "/confirmar-email" } = match ?? {}
  
  return (
    <Switch>
      <Route path={`${path}/:user_id`}>
        {({ match }: RouteComponentProps<{ user_id: string }>) => (
          <RegisterPage userId={match.params.user_id}/>
        )}
      </Route>
    </Switch>
  );
};

export default Login;
