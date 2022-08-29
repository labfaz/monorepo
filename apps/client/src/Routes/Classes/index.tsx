import React, { lazy } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import { Router } from 'Routes';

import usePageview from 'Hooks/usePageView';

const ClassesPage = lazy(() => import('./ClassesPage'));
const ClassDetails = lazy(() => import('./ClassDetails'));

export const Classes: Router = ({ match }) => {
  const { path = '/classes' } = match ?? {};

  usePageview({ name: 'classes', path });

  return (
    <Switch>
      <Route exact path={path}>
        {() => <ClassesPage />}
      </Route>
      show de um curso
      <Route path={`${path}/:id`}>
        {({ match }: RouteComponentProps<{ id: string }>) => (
          <ClassDetails id={match?.params.id} />
        )}
      </Route>
    </Switch>
  );
};

export default Classes;
