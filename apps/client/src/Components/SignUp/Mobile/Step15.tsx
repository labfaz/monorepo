import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import * as yup from 'yup';

import { FileInput } from 'Components/Inputs/FileInput';

import {
  Container,
  ContentContainer,
  TextLabel,
  Content,
  InputText,
  FileContainer,
} from './Step15.style';

import { curriculumMaxSize } from 'Utils/userUtils';

interface ErrorProps {
  artist: {
    technical: {
      areas: {
        describe: String;
      };
    };
  };
}

export const schemaStep15 = yup.object({
  curriculum: yup
    .mixed()
    .test(
      'fileSize',
      'Arquivo muito grande',
      (value) => value === null || (value && value.size <= curriculumMaxSize)
    ),
  artist: yup.object({
    technical: yup.object({
      areas: yup.object({
        describe: yup.string().required('Campo obrigatório'),
      }),
    }),
  }),
});

export const Step15: FC = () => {
  const { errors } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <ContentContainer>
        <Content>
          <TextLabel>
            Descreva quais são as atividades e serviços oferecidos por você{' '}
            <p className="obrigatory"> *</p>:
            <span className="errorMessage">
              {errors.artist?.technical?.areas?.describe &&
                errors.artist.technical.areas.describe}
            </span>
          </TextLabel>

          <InputText
            component="textarea"
            name="artist.technical.areas.describe"
          />

          <FileContainer>
            <FileInput
              name="curriculum"
              value="curriculum"
              label="Clique para enviar curriculo"
              accept="application/pdf"
            />
          </FileContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};
