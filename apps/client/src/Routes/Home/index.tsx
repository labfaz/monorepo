import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Router } from 'Routes';
import usePageview from 'Hooks/usePageView';
import HomePage from './HomePage';

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
