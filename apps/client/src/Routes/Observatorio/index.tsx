import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { Router } from 'Routes';

import usePageview from 'Hooks/usePageView';

const ObservatorioPage = lazy(() => import("./ObservatorioPage"));

export const Observatorio: Router = ({ match }) => {
  const { path = '/observatorio' } = match ?? {};

  usePageview({ name: 'observatorio', path });

  return (
    <Switch>
      <Route exact path={path}>
        {() => (
          <ObservatorioPage />
        )}
      </Route>
    </Switch>
  );
};

export default Observatorio;
