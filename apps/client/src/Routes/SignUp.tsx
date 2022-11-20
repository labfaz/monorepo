import React, { FC, Fragment } from 'react';

import { LoginContainer } from './SignUp.style';
import { SignUp } from 'Components/SignUp';
import Wireframe from 'Components/Wireframe';
import useMobile from 'Hooks/useMobile';

interface DisplayProps {
  button_type?: 'submit' | 'button' | 'reset';
}

export const Display: FC<DisplayProps> = ({ button_type = 'submit' }) => {
  const Wrapper = useMobile() ? Fragment : Wireframe;

  return (
    <Wrapper>
      <LoginContainer>
        <SignUp button_type={button_type} />
      </LoginContainer>
    </Wrapper>
  );
};

export default Display;
