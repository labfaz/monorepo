import React, { FC } from 'react';

import useMobile from 'Hooks/useMobile';
import Mobile from './Mobile';
import Web from './Web';

import Wireframe from 'Components/Wireframe';

export interface Props {
  errorStatus: number | undefined;
  errorMessage: string | undefined;
}

export const Error: FC<Props> = ({ errorStatus, errorMessage }) => {
  const Component = useMobile() ? Mobile : Web;

  return (
    <Wireframe>
      <Component status={errorStatus} message={errorMessage} />
    </Wireframe>
  );
};

export default Error;
