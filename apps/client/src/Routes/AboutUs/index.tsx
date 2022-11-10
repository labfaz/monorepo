import React, { lazy } from 'react';
import usePageview from 'Hooks/usePageView';

const AboutUsPage = lazy(() => import('../AboutUsPage'));

export const AboutUs = ({ path = '/about-us' }) => {
  usePageview({ name: 'sobre', path: path });

  return <AboutUsPage />;
};

export default AboutUs;
