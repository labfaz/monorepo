import React, { FC } from 'react';

import { useFormikContext } from 'formik';

import {
  Container,
  Content,
  AvatarInput,
  Input,
  PasswordInputContainer,
} from './Step11.style';

interface Step11Props {
  profilePicture: string;
  use_terms: string;
}

export const Step11: FC = () => {
  const { values, errors } = useFormikContext<Step11Props>();

  return (
    <Container>
      <div className="centralContent">
        <Content>
          <AvatarInput>
            <img
              src={
                values.profilePicture
                  ? URL.createObjectURL(values.profilePicture)
                  : undefined
              }
              alt={values.profilePicture ? 'User avatar' : ''}
            />
          </AvatarInput>
          <PasswordInputContainer>
            <Input
              name="password"
              label="Escolha uma senha"
              placeholder="Digite uma senha"
              obrigatory
            />
          </PasswordInputContainer>

          <PasswordInputContainer>
            <Input
              name="confirm_password"
              label="Confirmar Senha"
              placeholder="Digite novamente a senha"
              obrigatory
            />
          </PasswordInputContainer>
        </Content>
      </div>
    </Container>
  );
};
