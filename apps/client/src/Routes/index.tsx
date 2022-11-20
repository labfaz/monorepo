import React, { FC, Suspense, lazy } from 'react';
import { BrowserRouter, match, Route, Switch } from 'react-router-dom';

import LoadingFullPage from 'Components/LoadingFullPage';
import {
  showAboutUs,
  showBlog,
  showCourses,
  showEditProfile,
  showForgotPassword,
  showObservatorio,
} from 'FeatureFlags';

import AboutUs from './AboutUs';
import Blog from './Blog';
import Classes from './Classes';
import EmailConfirmation from './ConfirmEmail';
import EditProfile from './EditProfile';
import Home from './Home';
import Observatorio from './Observatorio';
import Recover from './PasswordRecover';
import Profile from './Profile';
import UserSearch from './UserSearch';
import NotFound from '../Pages/NotFound';
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./SignUp'));

export type RouterProps<MatchParams = {}> = {
  history?: History;
  location?: Location;
  match: match<MatchParams> | null;
};
export type Router<T = {}> = FC<RouterProps<T>>;

const Routes: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFullPage />}>
        <Switch>
          {/* default route */}
          <Route exact path="/">
            {() => <Home path="/" />}
          </Route>

          {/* home router */}
          <Route exact path="/home">
            {() => <Home path="/home" />}
          </Route>

          {/* blog router */}
          {showBlog && (
            <Route path={['/blog']}>
              {({ match }) => <Blog match={match} />}
            </Route>
          )}

          {/* observatorio router */}
          {showObservatorio && (
            <Route path="/observatorio">
              {({ match }) => <Observatorio match={match} />}
            </Route>
          )}

          {/* classes router */}
          {showCourses && (
            <Route path={['/classes', '/cursos']}>
              {({ match }) => <Classes match={match} />}
            </Route>
          )}

          {showAboutUs && (
            <Route
              path={[
                '/aboutus',
                '/about-us',
                '/sobre-nos',
                '/sobre',
                '/about',
                '/quem-somos',
              ]}
            >
              {({ match }) => <AboutUs match={match} />}
            </Route>
          )}

          <Route exact path={['/signup', '/cadastro', '/cadastrar']}>
            {() => <Register />}
          </Route>

          <Route exact path={['/login', '/logar', '/entrar']}>
            {() => <Login />}
          </Route>

          <Route path={['/perfil', '/profile']}>
            {({ match }) => <Profile match={match} />}
          </Route>

          {showEditProfile && (
            <Route path={['/edit-profile', '/editar-perfil']}>
              {({ match }) => <EditProfile match={match} />}
            </Route>
          )}

          {/* email confirmation router */}
          <Route path={['/email-confirmation', '/confirmação-email']}>
            {({ match }) => <EmailConfirmation match={match} />}
          </Route>

          {/* recover router */}
          {showForgotPassword && (
            <Route
              path={[
                '/recover',
                '/forgot-password',
                '/password-reset',
                '/criar-nova-senha',
              ]}
            >
              {({ match }) => <Recover match={match} />}
            </Route>
          )}

          {/* user search */}
          <Route
            path={[
              '/banco-profissionais',
              '/user-search',
              '/busca-usuários',
              '/professionals',
              '/busca-profissionais',
            ]}
          >
            {({ match }) => <UserSearch match={match} />}
          </Route>

          {/* default route (404) */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
