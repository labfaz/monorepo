import React, { lazy } from 'react';
import usePageview from 'Hooks/usePageView';
const HomePage = lazy(() => import('../HomePage'));

export const Home = ({ path }: { path: string }) => {
  usePageview({ name: 'home', path });
  return <HomePage />;
};

export default Home;
