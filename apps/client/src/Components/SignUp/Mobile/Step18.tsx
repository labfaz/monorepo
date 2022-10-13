import React, { FC } from 'react';
import { useFormikContext } from 'formik';

import {
  Container,
  ContentContainer,
  Content,
  AvatarInput,
  Input,
  InputCheckBoxContainer,
  Button,
  InputCheckbox,
  InputTextContainer,
} from './Step18.style';

interface Step18Props {
  profilePicture: string;

  password: string;
  confirm_password: string;
  use_term: string;
}

export const Step18: FC = () => {
  const { values, errors } = useFormikContext<Step18Props>();

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

          <InputCheckBoxContainer>
            <InputCheckbox type="checkbox" name="use_terms" value="sim">
              Li e concordo com os
              <a
                href="/politica-de-privacidade.pdf"
                target="_blank"
                rel="noopener"
              >
                {' '}
                Termos de Uso{' '}
              </a>
              e estou ciente e autorizo que os meus dado sejam usados única e
              exclusivamente para o projeto LabFaz.
            </InputCheckbox>

            {errors.use_term && (
              <span className="errorMessage">{errors.use_term}</span>
            )}
          </InputCheckBoxContainer>

          <Button type="submit">FINALIZAR REGISTRO</Button>
        </Content>
      </ContentContainer>
    </Container>
  );
};