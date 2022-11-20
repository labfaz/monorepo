import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import * as yup from 'yup';

import { Container, Content, TextLabel, InputText } from './style';

interface ErrorProps {
  artist: {
    accessibility_resources_description: string;
  };
}

export const schemaStep05 = yup.object({
  artist: yup.object({
    accessibility_resources_description: yup.string(),
  }),
});

export const Step05: FC = () => {
  const { errors } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <div className="centralContent">
        <Content>
          <TextLabel>
            Em caso de possuir deficiências, quais recursos de acessibilidade
            seriam necessários para você?
          </TextLabel>

          {errors.artist?.accessibility_resources_description && (
            <span className="errorMessage">
              {errors.artist.accessibility_resources_description}
            </span>
          )}

          <InputText
            component="textarea"
            name="artist.accessibility_resources_description"
          />
        </Content>
      </div>
    </Container>
  );
};
