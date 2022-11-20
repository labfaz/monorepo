import React, { FC } from 'react';

import useMobile from 'Hooks/useMobile';
import { Mobile } from './Mobile';
import { Web } from './Web';

interface SingUpProps {
  button_type: 'submit' | 'button' | 'reset';
}

export const SignUp: FC<SingUpProps> = ({ button_type = 'submit' }) => {
  return useMobile() ? (
    <Mobile buttonType={button_type} />
  ) : (
    <Web buttonType={button_type} />
  );
};

export default SignUp;
