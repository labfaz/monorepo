import React, { FC } from 'react';
import * as yup from 'yup';

import { RadioInput } from 'Components/Inputs/RadioInput';

import {
  Container,
  ContentContainer,
  Content,
  InputRadioContainer,
} from './Step06.style';
import { useFormikContext } from 'formik';

interface ErrorProps {
  artist: {
    race: string;
  };
}

export const schemaStep06 = yup.object({
  artist: yup.object({
    race: yup.string().required('Campo obrigatório'),
  }),
});

export const Step06: FC = () => {
  const { errors } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <ContentContainer>
        <Content>
          <label htmlFor="race" className="radioLabel">
            Etnia <p className="obrigatory"> *</p>
            {errors.artist?.race && (
              <span className="errorMessage">{errors.artist.race}</span>
            )}
          </label>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.race"
              value="branca"
              label="Branca"
            />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.race"
              value="preta"
              label="Preta"
            />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.race"
              value="parda"
              label="Parda"
            />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.race"
              value="amarela"
              label="Amarela"
            />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.race"
              value="indigena"
              label="Indígena"
            />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.race"
              value="nenhuma"
              label="Prefiro não responder"
            />
          </InputRadioContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};
