import React, { FC } from "react";
import { useFormikContext } from "formik";

import { CheckboxInput } from "Components/Inputs/CheckboxInput";
import { TextInput } from "Components/Inputs/TextInput";
import { deficiencyOptions } from "Utils/selectOptionsData";

import {
  Container,
  Box,
  BoxContent,
  LabelText,
  InputCheckBoxContainer,
  TextInputContainer,
} from "./style";

interface ErrorProps {
  deficiency: string[];
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
        <LabelText>Você possui alguma condição especial?</LabelText>
        <BoxContent>
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
          {values.deficiency.find((values: any) => values === "Outro") && (
            <TextInputContainer>
              <label>Qual outra condição você possui?</label>
              <TextInput
                name="other_deficiency"
                placeholder="Digite sua condição"
              />
            </TextInputContainer>
          )}
        </BoxContent>
      </Box>
    </Container>
  );
};
