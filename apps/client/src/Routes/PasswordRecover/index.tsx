
import React, { lazy } from "react"
import { Route, Switch, RouteComponentProps } from "react-router-dom"

import { Router } from "Routes"

import usePageView from "Hooks/usePageView"

const AskResetPage = lazy(() => import("./AskReset"))
const ResetEmail = lazy(() => import("./ResetEmail"))

export const PasswordRecover: Router = ({ match }) => {
  const { path = "recover" } = match ?? {}

  usePageView({ name: "recuperacao", path });

  return (
    <Switch>
      <Route exact path={path}>
        {() => (
          <AskResetPage />
        )}
      </Route>

      
      <Route path={`${path}/:token`}>
        {({ match }: RouteComponentProps<{ token: string }>) => (
          <ResetEmail token={match?.params.token} />
        )}
      </Route>
    </Switch>
  )
}


export default PasswordRecover;
