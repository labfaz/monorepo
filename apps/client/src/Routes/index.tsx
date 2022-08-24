import React, { FC, lazy, Suspense } from 'react'
import { BrowserRouter, match, Route, Switch } from 'react-router-dom'

import LoadingFullPage from 'Components/LoadingFullPage'
import { showAboutUs, showBlog, showCourses, showEditProfile, showForgotPassword, showObservatorio } from 'FeatureFlags'

const Home              = lazy(() => import('./Home'))
const Blog              = lazy(() => import('./Blog'))
const Observatorio      = lazy(() => import('./Observatorio'))
const AboutUs           = lazy(() => import('./AboutUs'))
const Classes           = lazy(() => import('./Classes'))
const NotFound          = lazy(() => import('../Pages/NotFound'))
const Register          = lazy(() => import('./SignUp'))
const Login             = lazy(() => import('./Login'))
const EmailConfirmation = lazy(() => import('./ConfirmEmail'))
const Profile           = lazy(() => import('./Profile'))
const Recover           = lazy(() => import('./PasswordRecover'));
const EditProfile       = lazy(() => import('./EditProfile'))
const UserSearch        = lazy(() => import('./UserSearch'))

export type RouterProps<MatchParams = {}> = {
  history?: History
  location?: Location
  match: match<MatchParams> | null
}
export type Router<T = {}> = FC<RouterProps<T>>

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFullPage />}>
        <Switch>
          {/* default route */}
          <Route exact path="/">
            {({ match }) => (
              <Home match={match} />
            )}
          </Route>

          {/* home router */}
          <Route path={['/home']}>
            {({ match }) => (
              <Home match={match} />
            )}
          </Route>

          {/* blog router */}
          {showBlog && <Route path={['/blog']}>
            {({ match }) => (
              <Blog match={match} />
            )}
          </Route>}

          {/* observatorio router */}
          {showObservatorio && <Route path={['/observatorio']}>
            {({ match }) => (
              <Observatorio match={match} />
            )}
          </Route>}

          {/* classes router */}
          {showCourses && <Route path={["/classes"]}>
            {({ match }) => (
              <Classes match={match} />
            )}
          </Route>}

          {showAboutUs && <Route path={['/aboutus', '/about-us', '/sobre-nos', '/sobre', '/about']}>
            {({ match }) => (
              <AboutUs match={match} />
            )}
          </Route>}

          <Route path={["/sign-up", "/signup", "/SignUp", "/cadastro", "/cadastre-se"]}>
            {({ match }) => (
              <Register match={match} />
            )}
          </Route>
          
          <Route path={['/perfil', '/profile']}>
            {({ match }) => (
              <Profile match={match} />
            )}
          </Route>

          {showEditProfile && <Route path={['/edit-profile', '/editar-perfil']}>
            {({ match }) => (
              <EditProfile match={match} />
            )}
          </Route>}

          <Route path={["/login", "/SignIn", "/logar", "/entrar"]}>
            {({ match }) => (
              <Login match={match} />
            )}
          </Route>

          {/* email confirmation router */}
          <Route path={['/email-confirmation', '/confirmação-email']}>
            {({ match }) => (
              <EmailConfirmation match={match} />
            )}
          </Route>

          {/* recover router */}
          {showForgotPassword && <Route path={["/recover", "/forgot-password", "/password-reset","/criar-nova-senha"]}>
            {({ match }) => (
              <Recover match={match} />
            )}
          </Route>}

          {/* user search */}
          <Route path={["/banco-profissionais", "/user-search", "/busca-usuários", "/professionals", "/busca-profissionais"]}>
            {({ match }) => (
              <UserSearch match={match} />
            )}
          </Route>

          {/* default route (404) */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default Routes
