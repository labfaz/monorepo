import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import * as yup from 'yup';

import { CheckboxInput } from 'Components/Inputs/CheckboxInput';
import { TextInput } from 'Components/Inputs/TextInput';
import { RadioInput } from 'Components/Inputs/RadioInput';

import { formationOptions, idiomOptions } from 'Utils/selectOptionsData';

import {
  Container,
  Content,
  ContentContainer,
  LeftSide,
  LeftSideContent,
  RightSide,
  RightSideContent,
  LabelText,
  InputRadioContainer,
  InputCheckBoxContainer,
  TextInputContainer,
} from './Step06.style';

interface ErrorProps {
  artist: {
    technical: {
      formation: string;
      idiom: string[];
    };
  };
}

export const schemaStep06 = yup.object({
  artist: yup.object({
    technical: yup.object({
      formation: yup.string().required('Formação obrigatória'),
      idiom: yup.array(),
    }),
  }),
});

export const Step06: FC = () => {
  const { values, errors } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <ContentContainer>
        <Content>

      {/* <LeftSide>
        <LeftSideContent>
          <LabelText>Você domina outro idioma além do português?</LabelText>
          {idiomOptions.map((idiomOption, index) => (
            <InputCheckBoxContainer key={index}>
              <CheckboxInput
                type="checkbox"
                name="artist.technical.idiom"
                value={idiomOption.value}
                label={idiomOption.label}
              />
            </InputCheckBoxContainer>
          ))}
        </LeftSideContent>
      </LeftSide>

      <RightSide>
        <RightSideContent> */}
          <LabelText>
            Formação escolar
            <p className="obrigatory"> *</p>
            {errors.artist?.technical?.formation && (
              <span className="errorMessage">Campo obrigatório</span>
            )}
          </LabelText>

          {formationOptions.map((formationOption, index) => (
            <InputRadioContainer key={index}>
              <RadioInput
                type="radio"
                name="artist.technical.formation"
                value={formationOption.value}
                label={formationOption.label}
              />
            </InputRadioContainer>
          ))}

          {values.artist.technical.idiom.find(
            (values: any) => values === 'Outro'
          ) && (
            <TextInputContainer>
              <label>Qual outro idioma você domina?</label>
              <TextInput name="other_idiom" placeholder="Digite outro idioma" />
            </TextInputContainer>
          )}
        {/* </RightSideContent>
      </RightSide> */}
        </Content>
      </ContentContainer>
    </Container>
  );
};
