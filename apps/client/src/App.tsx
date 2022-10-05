import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras';

import { showRoutes } from './FeatureFlags';
import GlobalContext from './Context';
import GlobalStyles from './GlobalStyles';
import Routes from './Routes';

import useGoogleAnalytics from './Hooks/useInitializeGA';
import Construction from './Pages/Construction';

const ConstructionApp = () => (
  <BrowserRouter>
    <Construction />
  </BrowserRouter>
);

export const App = () => {
  useGoogleAnalytics();

  return (
    <>
      <VLibras />
      <GlobalStyles />
      <GlobalContext>
        {showRoutes ? <Routes /> : <ConstructionApp />}
      </GlobalContext>
    </>
  );
};

export default App;
