import React, { FC } from 'react';

import Image from '../Image';
import {
  TitleText,
  TextWrapper,
  SubtitleText,
  Rectangle2,
  Content,
} from './style';

export interface Props {
  status: number | undefined;
  message: string | undefined;
}

export const Web: FC<Props> = ({ status, message }) => {
  return (
    <Content>
      <Rectangle2>
        <Image />
        <TextWrapper>
          <TitleText>
            Ops...
            <br />
            Parece que algo deu errado
          </TitleText>
          <SubtitleText>
            {status && (
              <>
                Error {status}: <br />
              </>
            )}
            {message ?? "Não foi possível carregar essa página."}
          </SubtitleText>
        </TextWrapper>
      </Rectangle2>
    </Content>
  );
};

export default Web;
