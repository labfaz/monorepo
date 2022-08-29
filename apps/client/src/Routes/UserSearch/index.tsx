
import React, { lazy } from "react"
import { Route, Switch } from "react-router-dom"

import { Router } from "Routes"
import usePageview from "Hooks/usePageView"

const UserSearchPage = lazy(() => import('./UserSearchPage/index'));

export const UserSearch: Router = ({ match }) => {
  const { path = "/banco-profissionais" } = match ?? {}
  usePageview({ name: 'banco-profissionais', path: path })

  return (
    <Switch>
      <Route exact path={path}>
        {() => (
          <UserSearchPage />
        )}
      </Route>
    </Switch>
  );
};

export default UserSearch;
