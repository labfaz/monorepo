import { useFormikContext } from "formik";
import React, { FC } from "react";
import { useRef } from "react";
import { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { RadioInput } from "Components/Inputs/RadioInput";
import { FileInput } from "Components/Inputs/FileInput";

import {
  formationOptions,
  idiomOptions,
  deficiencyOptions,
} from "Utils/selectOptionsData";

import {
  Container,
  ContentContainer,
  Content,
  InputRadioContainer,
  SelectContainer,
  LabelText,
  InputRadio,
  InputSelect,
  OptionsContainer,
  CheckboxContainer,
  InputCheckbox,
  InputText,
  InputTextContainer,
  FileContainer,
} from "./style";

interface Step11Props {
  deficiencies?: string[];
  isPcd?: string;
  medicalReport?: string;
  artist: {
    technical: {
      formation: string;
      idiom: string[];
    };
  };
}

export const Step11: FC = () => {
  const { values, errors } = useFormikContext<Step11Props>();

  const [isIdiomOptionsOpen, setIsIdiomOptionsOpen] = useState(false);
  const [isDeficiencyOptionsOpen, setIsDeficiencyOptionsOpen] = useState(false);
  const modalRef = useRef<HTMLInputElement | null>(null);
  const modalRefDeficiencies = useRef<HTMLInputElement | null>(null);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setIsIdiomOptionsOpen(false);
    }
    if (modalRefDeficiencies.current === e.target) {
      setIsDeficiencyOptionsOpen(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Content>
          <LabelText>
            Formação escolar <p className="obrigatory"> *</p>
            {errors.artist?.technical?.formation && (
              <span className="errorMessage">
                {errors.artist.technical.formation}
              </span>
            )}
          </LabelText>

          {formationOptions.map((formationOption, index) => (
            <InputRadioContainer key={index}>
              <InputRadio
                type="radio"
                name="artist.technical.formation"
                value={formationOption.value}
                label={formationOption.label}
              />
            </InputRadioContainer>
          ))}

          <SelectContainer
            onClick={() => setIsIdiomOptionsOpen(!isIdiomOptionsOpen)}
          >
            <label>Voce domina algum idioma?</label>
            <InputSelect>
              {values.artist?.technical?.idiom[0]
                ? values.artist.technical.idiom[0]
                : "Selecione"}
              <IoMdArrowDropdownCircle />
            </InputSelect>
          </SelectContainer>

          {values.artist?.technical?.idiom.find(
            (values: any) => values === "Outro"
          ) && (
            <InputTextContainer>
              <LabelText>Qual outro idioma?</LabelText>

              <InputText
                name="other_idiom"
                placeholder="Digite um idioma"
                width={14.4}
              />
            </InputTextContainer>
          )}

          <LabelText>Você é uma pessoa com deficiência?</LabelText>
          <InputRadioContainer>
            <RadioInput name="isPcd" value="true" label="Sim" />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput name="isPcd" value="false" label="Não" />
          </InputRadioContainer>
          <SelectContainer
            onClick={() => setIsDeficiencyOptionsOpen(!isDeficiencyOptionsOpen)}
          >
            {values.isPcd === "true" && (
              <InputSelect>
                {values.deficiencies && values.deficiencies[0]
                  ? values.deficiencies[0]
                  : "Selecione"}
                <IoMdArrowDropdownCircle />
              </InputSelect>
            )}
          </SelectContainer>
          {values.isPcd === "true" && (
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
          )}

          {values.deficiencies?.find((values: any) => values === "Outro") && (
            <InputTextContainer>
              <LabelText>Qual outra deficiência?</LabelText>

              <InputText
                name="other_deficiency"
                placeholder="Digite sua deficiência"
                width={14.4}
              />
            </InputTextContainer>
          )}
        </Content>
      </ContentContainer>

      <OptionsContainer
        ref={modalRef}
        onClick={closeModal}
        isOpen={isIdiomOptionsOpen}
      >
        <CheckboxContainer>
          {idiomOptions.map((idiomOption, index) => (
            <InputCheckbox
              key={index}
              inputRightSide
              name="artist.technical.idiom"
              value={idiomOption.value}
              label={idiomOption.label}
            />
          ))}
        </CheckboxContainer>
      </OptionsContainer>

      <OptionsContainer
        ref={modalRefDeficiencies}
        onClick={closeModal}
        isOpen={isDeficiencyOptionsOpen}
      >
        <CheckboxContainer>
          {deficiencyOptions.map((deficiencyOption, index) => (
            <InputCheckbox
              key={index}
              inputRightSide
              name="deficiency"
              value={deficiencyOption.value}
              label={deficiencyOption.label}
            />
          ))}
        </CheckboxContainer>
      </OptionsContainer>
    </Container>
  );
};
