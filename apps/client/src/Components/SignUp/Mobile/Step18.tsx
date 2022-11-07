import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import * as yup from 'yup';

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
  profilePicture: Blob;
  password: string;
  confirm_password: string;
  use_term: string;
}

export const schemaStep18 = yup.object({
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Senha no minimo 6 digítos'),
  confirm_password: yup
    .string()
    .required('Confirme sua senha')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], 'Senhas não são iguais.'),
    }),
});

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
