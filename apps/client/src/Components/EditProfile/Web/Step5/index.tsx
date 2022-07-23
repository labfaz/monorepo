import { useFormikContext } from "formik";
import React, { FC } from "react";

import { Container, Content, TextLabel, InputText } from "./style";

interface ErrorProps {
  artist: {
    acessibilityResourcesDescription: string;
  };
}

export const Step5: FC = () => {
  const { errors } = useFormikContext<ErrorProps>();

  return (
    <Container>
      <div className="centralContent">
        <Content>
          <TextLabel>
            Em caso de possuir deficiências, quais recursos de acessibilidade
            seriam necessários para você?
          </TextLabel>

          {errors.artist?.acessibilityResourcesDescription && (
            <span className="errorMessage">
              {errors.artist.acessibilityResourcesDescription}
            </span>
          )}

          <InputText
            component="textarea"
            name="artist.acessibilityResourcesDescription"
          />
        </Content>
      </div>
    </Container>
  );
};
