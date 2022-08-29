import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import { RadioInput } from 'Components/Inputs/RadioInput';

import { CheckboxInput } from 'Components/Inputs/CheckboxInput';
import { TextInput } from 'Components/Inputs/TextInput';
import { FileInput } from 'Components/Inputs/FileInput';
import { deficiencyOptions } from 'Utils/selectOptionsData';

import {
  Container,
  Box,
  BoxContent,
  DeficiencyContainer,
  LabelText,
  InputCheckBoxContainer,
  TextInputContainer,
  PCDOptions,
  InputRadioContainer,
  FileContainer,
} from './style';

interface ErrorProps {
  deficiencies?: string[];
  isPcd?: string;
}

export const Step4: FC = () => {
  const { values } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <Box>
        <LabelText>Você é uma pessoa com deficiência?</LabelText>
        <PCDOptions>
          <InputRadioContainer>
            <RadioInput name="isPcd" value="true" label="Sim" />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput name="isPcd" value="false" label="Não" />
          </InputRadioContainer>
        </PCDOptions>
        {values.isPcd === 'true' && (
          <BoxContent>
            <TextInputContainer>
              <label>Qual sua deficiência?</label>
            </TextInputContainer>
            <DeficiencyContainer>
              {deficiencyOptions.map((deficiencyOption, index) => (
                <InputCheckBoxContainer key={index}>
                  <CheckboxInput
                    type="checkbox"
                    name="deficiencies"
                    value={deficiencyOption.value}
                    label={deficiencyOption.label}
                  />
                </InputCheckBoxContainer>
              ))}
            </DeficiencyContainer>

            <FileContainer>
              <label htmlFor="medicalReport" className="fileLabel">
                Laudo médico
              </label>

              <FileInput
                name="medicalReport"
                value="medicalReport"
                label="Enviar laudo"
                accept="application/pdf"
              />
            </FileContainer>
          </BoxContent>
        )}
        {values.deficiencies?.find((values: any) => values === 'Outro') && (
          <TextInputContainer>
            <label>Qual outra deficiência você possui?</label>
            <TextInput
              name="other_deficiency"
              placeholder="Digite sua condição"
            />
          </TextInputContainer>
        )}
      </Box>
    </Container>
  );
};
