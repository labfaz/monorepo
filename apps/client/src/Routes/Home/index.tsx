import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Router } from 'Routes';
import usePageview from 'Hooks/usePageView';
const HomePage = lazy(() => import('./HomePage'));

export const Home: Router = ({ match }) => {
  const path = match?.path ?? '';
  usePageview({ name: 'home', path });

  return (
    <Switch>
      {/* base home route */}
      <Route exact path={path}>
        {() => <HomePage />}
      </Route>
    </Switch>
  );
};

export default Home;
