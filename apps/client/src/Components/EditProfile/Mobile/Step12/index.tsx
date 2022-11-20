import { useFormikContext } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { RadioInput } from 'Components/Inputs/RadioInput';
import { FileInput } from 'Components/Inputs/FileInput';

import { deficiencyOptions } from 'Utils/selectOptionsData';

import {
  Container,
  ContentContainer,
  TextLabel,
  Content,
  InputRadioContainer,
  SelectContainer,
  InputSelect,
  OptionsContainer,
  CheckboxContainer,
  InputCheckbox,
  InputSmallText,
  InputText,
  InputTextContainer,
  FileContainer,
} from './style';

interface Step12Props {
  deficiencies?: string[];
  isPcd?: string;
  medicalReport?: string;
  artist: {
    accessibility_resources_description?: string;
  };
}

export const Step12: FC = () => {
  const { values } = useFormikContext<Step12Props>();

  const [isDeficiencyOptionsOpen, setIsDeficiencyOptionsOpen] = useState(false);
  const modalRefDeficiencies = useRef<HTMLInputElement | null>(null);

  const closeModal = (e: any) => {
    if (modalRefDeficiencies.current === e.target) {
      setIsDeficiencyOptionsOpen(false);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <Content>
          <TextLabel>Você é uma pessoa com deficiência?</TextLabel>
          <InputRadioContainer>
            <RadioInput name="isPcd" value="true" label="Sim" />
          </InputRadioContainer>
          <InputRadioContainer>
            <RadioInput name="isPcd" value="false" label="Não" />
          </InputRadioContainer>
          <SelectContainer
            onClick={() => setIsDeficiencyOptionsOpen(!isDeficiencyOptionsOpen)}
          >
            {values.isPcd === 'true' && (
              <InputSelect>
                {values.deficiencies && values.deficiencies[0]
                  ? values.deficiencies[0]
                  : 'Selecione'}
                <IoMdArrowDropdownCircle />
              </InputSelect>
            )}
          </SelectContainer>
          {values.isPcd === 'true' && (
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

          {values.deficiencies?.find((values: any) => values === 'Outro') && (
            <InputTextContainer>
              <TextLabel>Qual outra deficiência?</TextLabel>

              <InputSmallText
                name="other_deficiency"
                placeholder="Digite sua deficiência"
                width={14.4}
              />
            </InputTextContainer>
          )}
          <TextLabel>
            Em caso de possuir deficiências, quais recursos de acessibilidade
            seriam necessários para você?
          </TextLabel>

          <InputText
            component="textarea"
            name="artist.accessibility_resources_description"
          />
        </Content>
      </ContentContainer>

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
              name="deficiencies"
              value={deficiencyOption.value}
              label={deficiencyOption.label}
            />
          ))}
        </CheckboxContainer>
      </OptionsContainer>
    </Container>
  );
};
