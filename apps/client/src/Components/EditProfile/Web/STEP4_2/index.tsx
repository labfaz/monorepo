import React, { FC } from "react";
import { useFormikContext } from "formik";
import { RadioInput } from "Components/Inputs/RadioInput";

import { CheckboxInput } from "Components/Inputs/CheckboxInput";
import { TextInput } from "Components/Inputs/TextInput";
import { FileInput } from "Components/Inputs/FileInput";
import { deficiencyOptions } from "Utils/selectOptionsData";

import {
  Container,
  Box,
  BoxContent,
  LabelText,
  InputCheckBoxContainer,
  TextInputContainer,
  InputRadioContainer,
  FileContainer,
} from "./style";

interface ErrorProps {
  deficiencies: string[];
  isPcd: string;
  artist: {
    technical: {
      formation: string;
    };
  };
}

export const STEP4_2: FC = () => {
  const { values } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <Box>
        <LabelText>Você é uma pessoa com deficiência?</LabelText>
        <InputRadioContainer>
          <RadioInput name="isPcd" value="true" label="Sim" />
        </InputRadioContainer>
        <InputRadioContainer>
          <RadioInput name="isPcd" value="false" label="Não" />
        </InputRadioContainer>
        {values.isPcd === "true" && (
          <BoxContent>
            <TextInputContainer>
              <label>Qual sua outra deficiência?</label>
            </TextInputContainer>
            {deficiencyOptions.map((deficiencyOption, index) => (
              <InputCheckBoxContainer key={index}>
                <CheckboxInput
                  type="checkbox"
                  name="deficiency"
                  value={deficiencyOption.value}
                  label={deficiencyOption.label}
                />
              </InputCheckBoxContainer>
            ))}

            <FileContainer>
              <label htmlFor="medical_report" className="fileLabel">
                Laudo médico
              </label>

              <FileInput
                name="medical_report"
                value="medical_report"
                label="Enviar laudo"
              />
            </FileContainer>
          </BoxContent>
        )}
        {values.deficiencies.find((values: any) => values === "Outro") && (
          <TextInputContainer>
            <label>Qual outra condição você possui?</label>
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
