import React, { FC } from 'react';
import * as yup from 'yup';

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

export const schemaStep11 = yup.object({
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(6, 'Senha no minimo 6 digítos'),
  confirm_password: yup
    .string()
    .required('Confirmação obrigatória')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Senhas não são iguais.'),
    }),
});

export const Step11: FC = () => {
  const { values } = useFormikContext<Step11Props>();

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
