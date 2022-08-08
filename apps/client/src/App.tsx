import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { showRoutes } from 'FeatureFlags'
import GlobalContext from 'Context'
import GlobalStyles from 'GlobalStyles'
import Routes from 'Routes'

import useGoogleAnalytics from 'Hooks/useInitializeGA'
import Contruction from 'Pages/Construction'

import { SkipNavLink } from '@reach/skip-nav'
import '@reach/skip-nav/styles.css'

export const App = () => {
  useGoogleAnalytics()

  return (
    <>
      <SkipNavLink>Pular para o conteúdo principal</SkipNavLink>
      <GlobalStyles />
      <GlobalContext>
        { showRoutes
          ? <Routes />
          : <BrowserRouter><Contruction /></BrowserRouter>
        }
      </GlobalContext>
    </>
  )
}

export default App
