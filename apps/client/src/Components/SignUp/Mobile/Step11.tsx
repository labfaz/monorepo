import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { RadioInput } from 'Components/Inputs/RadioInput';

import { formationOptions, idiomOptions } from 'Utils/selectOptionsData';

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
} from './Step11.style';

interface Step11Props {
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
  const modalRef = useRef<HTMLInputElement | null>(null);

  const closeModal = (e: any) => {
    if (modalRef.current === e.target) {
      setIsIdiomOptionsOpen(false);
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
                : 'Selecione'}
              <IoMdArrowDropdownCircle />
            </InputSelect>
          </SelectContainer>

          {values.artist?.technical?.idiom.find(
            (values: any) => values === 'Outro'
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
    </Container>
  );
};