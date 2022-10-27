import React, { FC } from 'react';
import { useFormikContext } from 'formik';

import {
  Container,
  ContentContainer,
  Content,
  InputText,
  InputTextContainer,
} from './Step01.style';

import {
  InputCheckBoxContainer,
  InputCheckbox,
} from './Step18.style';

interface Step01Props {
  use_terms: string;

  artist: {
    name: string,
    social_name: string,
    artistic_name: string,
  };
}

export const Step1: FC = () => {
  const { errors } = useFormikContext<Step01Props>();

  return (
    <Container>
      <ContentContainer>
        <Content>
          <InputTextContainer>
            <InputText
              name="artist.name"
              label="Nome"
              placeholder="Digite seu nome"
              obrigatory
            />
          </InputTextContainer>

          <InputTextContainer>
            <InputText
              label="Nome Social"
              name="artist.social_name"
              placeholder="Digite seu nome social"
              informationText="Nome social não é o apelido, é o nome pelo qual pessoas transexuais, travestis e não binárias desejam ser chamadas ou socialmente reconhecidas e tem a ver com o respeito às identidades de gênero."
            />
          </InputTextContainer>

          <InputTextContainer>
            <InputText
              name="artist.artistic_name"
              label="Nome Artistico"
              placeholder="Digite seu nome artistico"
            />
          </InputTextContainer>

          <InputCheckBoxContainer>
            <InputCheckbox type="checkbox" name="use_terms" value="sim">
              Li e concordo com os{' '}
              <a
                href="/politica-de-privacidade.pdf"
                target="_blank"
                rel="noopener"
              >
                Termos de Uso
              </a>{' '}
              e estou ciente e autorizo que os meus dados sejam usados única e
              exclusivamente para o projeto LabFaz.
            </InputCheckbox>

            {errors.use_terms && (
              <span className="errorMessage">{errors.use_terms}</span>
            )}
          </InputCheckBoxContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};
