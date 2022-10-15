import React, { FC } from 'react';
import { useFormikContext } from 'formik';

import {
  Container,
  ContentContainer,
  Content,
  AvatarInput,
  Input,
  Button,
  InputTextContainer,
} from './Step18.style';

interface Step18Props {
  profilePicture: string;

  password: string;
  confirm_password: string;
  use_term: string;
}

export const Step18: FC = () => {
  const { values } = useFormikContext<Step18Props>();

  return (
    <Container>
      <ContentContainer>
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

          <InputTextContainer>
            <Input
              name="password"
              label="Escolha uma senha"
              placeholder="Digite uma senha"
              obrigatory
            />
          </InputTextContainer>
          <InputTextContainer>
            <Input
              name="confirm_password"
              label="Confirmar Senha"
              placeholder="Digite novamente a senha"
              obrigatory
            />
          </InputTextContainer>
          <Button type="submit">FINALIZAR REGISTRO</Button>
        </Content>
      </ContentContainer>
    </Container>
  );
};
