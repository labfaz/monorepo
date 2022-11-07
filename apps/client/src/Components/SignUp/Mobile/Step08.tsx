import React, { FC } from 'react';
import * as yup from 'yup';

import { TextInput } from 'Components/Inputs/TextInput';

import {
  Container,
  ContentContainer,
  Content,
  InputTextContainer,
} from './Step08.style';

import {
  linkedinUserRegex,
  tiktokUserRegex,
  twitterUserRegex,
  youtubeUserRegex,
} from 'Utils/regex';

export const schemaStep08 = yup.object({
  artist: yup.object({
    contact: yup.object({
      twitter: yup
        .string()
        .trim()
        .matches(twitterUserRegex, 'formato inválido'),
      linkedin: yup
        .string()
        .trim()
        .matches(linkedinUserRegex, 'formato inválido'),
      tiktok: yup.string().trim().matches(tiktokUserRegex, 'formato inválido'),
      youtube: yup
        .string()
        .trim()
        .matches(youtubeUserRegex, 'formato inválido'),
    }),
  }),
});

export const Step08: FC = () => {
  return (
    <Container>
      <ContentContainer>
        <Content>
          <InputTextContainer>
            <TextInput
              name="artist.contact.twitter"
              label="Twitter"
              placeholder="@seutwitter"
            />
          </InputTextContainer>

          <InputTextContainer>
            <TextInput
              name="artist.contact.linkedin"
              label="Linkedin"
              placeholder="@seulinkedin"
            />
          </InputTextContainer>

          <InputTextContainer>
            <TextInput
              name="artist.contact.tiktok"
              label="Tiktok"
              placeholder="@seutiktok"
            />
          </InputTextContainer>

          <InputTextContainer>
            <TextInput
              name="artist.contact.youtube"
              label="Youtube"
              placeholder="@seuyoutube"
            />
          </InputTextContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};
