import React, { FC } from 'react';
import * as yup from 'yup';

import { RadioInput } from 'Components/Inputs/RadioInput';

import {
  Container,
  ContentContainer,
  Content,
  InputRadioContainer,
} from './Step05.style';
import { useFormikContext } from 'formik';

interface Step5Props {
  artist: {
    sexual_orientation: string;
  };
}

export const schemaStep05 = yup.object({
  artist: yup.object({
    sexual_orientation: yup.string().required('Campo obrigatório'),
  }),
});

export const Step05: FC = () => {
  const { errors } = useFormikContext<Step5Props>();

  return (
    <Container>
      <ContentContainer>
        <Content>
          <label htmlFor="gender" className="radioLabel">
            Qual a sua orientação sexual? <p className="obrigatory"> *</p>
            {errors.artist?.sexual_orientation && (
              <span className="errorMessage">
                {errors.artist.sexual_orientation}
              </span>
            )}
          </label>
          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="assexual"
              label="Assexual"
              information="Assexualidade é a falta total, parcial ou condicional de atração sexual a qualquer pessoa, com pouco ou inexistente interesse nas atividades sexuais humanas. Pode ser considerada uma orientação sexual ou a falta de uma"
            />
          </InputRadioContainer>

          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="bissexual"
              label="Bissexual"
              information="Orientação sexual bissexual é atração romântica, atração sexual ou comportamento sexual voltado tanto a homens e como a mulheres, ou por mais de um sexo ou gênero."
            />
          </InputRadioContainer>

          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="heterosexual"
              label="Heterossexual"
              information="Orientação sexual heterossexual é atração romântica e/ou sexual entre pessoas do gênero oposto ao seu"
            />
          </InputRadioContainer>

          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="pansexual"
              label="Pansexual"
              information="Pansexual é a denominação que abarca quem sente atração física, desejo sexual e amor independentemente de sexo ou identidade de gênero. Confundido com a bissexualidade, que é definida como a atração por mais de um gênero, em geral homem ou mulher"
            />
          </InputRadioContainer>

          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="lésbica"
              label="Homossexualidade Lésbica"
              information="é a denominação em que uma mulher sente-se atraída afetiva e/ou sexualmente por outra mulher"
            />
          </InputRadioContainer>

          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="gay"
              label="Homossexualidade Gay"
              information="é a denominação em que um homem sente-se atraído afetiva e/ou sexualmente por outro homem"
            />
          </InputRadioContainer>

          <InputRadioContainer>
            <RadioInput
              type="radio"
              name="artist.sexual_orientation"
              value="prefiro não dizer"
              label="Prefiro não dizer"
            />
          </InputRadioContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};
