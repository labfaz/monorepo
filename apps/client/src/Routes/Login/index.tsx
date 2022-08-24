import React, { lazy } from "react"
import { Route, Switch } from "react-router-dom"

import { Router } from "Routes"

const LoginPage = lazy(() => import("./LoginPage"))

export const Login: Router = ({ match }) => {
  const { path = "/login" } = match ?? {}
  
  return (
    <Switch>
      <Route exact path={path}>
        {() => (
          <LoginPage />
        )}
      </Route>
    </Switch>
  )
}

export default Login
