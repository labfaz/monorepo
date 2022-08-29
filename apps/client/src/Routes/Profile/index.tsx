import React, { lazy } from "react"
import { Route, RouteComponentProps, Switch, Redirect } from "react-router-dom";

import { Router } from 'Routes';

import usePageview from "Hooks/usePageView"
import { useCurrentUserToken } from "Context/LoggedUserToken";

const PersonalProfilePage = lazy(() => import('./PersonalProfilePage'));
const UsersProfilePage = lazy(() => import('./UsersProfilePage'));

export const Profile: Router = ({ match }) => {
  const { token } = useCurrentUserToken()
  const { path = "/profile" } = match ?? {}
  usePageview({ name: 'profile', path: path });

  return (
    <Switch>
      <Route path={[`${path}/eu`, `${path}/me`]}>
        {() => (
          !token ? <Redirect to="/" /> :
          <PersonalProfilePage token={token}/>
        )}
      </Route>
      <Route exact path={path}>
        {() => (
          !token ? <Redirect to="/" /> :
          <PersonalProfilePage token={token}/>
        )}
      </Route>

      <Route path={`${path}/:id`}>
        {({ match }: RouteComponentProps<{ id: string }>) => (
          <UsersProfilePage id={String(match?.params.id)} />
        )}
      </Route>
    </Switch>
  );
};

export default Profile;
