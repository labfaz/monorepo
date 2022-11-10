import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import * as yup from 'yup';

import { Container, Content, TextLabel, InputText } from './style';

interface ErrorProps {
  artist: {
    technical: {
      areas: {
        describe: string;
      };
    };
  };
}

export const schemaStep08 = yup.object({
  artist: yup.object({
    technical: yup.object({
      areas: yup.object({
        describe: yup.string().required('Descrição obrigatória'),
      }),
    }),
  }),
});

export const Step08: FC = () => {
  const { errors } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <div className="centralContent">
        <Content>
          <TextLabel>
            Sobre o meu trabalho: Descreva quais são as atividades e serviços
            oferecidos por você.<p className="obrigatory"> *</p>
          </TextLabel>

          {errors.artist?.technical?.areas?.describe && (
            <span className="errorMessage">
              {errors.artist.technical.areas.describe}
            </span>
          )}

          <InputText
            component="textarea"
            name="artist.technical.areas.describe"
          />
        </Content>
      </div>
    </Container>
  );
};
