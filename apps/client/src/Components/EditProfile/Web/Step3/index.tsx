import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import * as yup from 'yup';

import { SelectInput } from 'Components/Inputs/SelectInput';
import { FileInput } from 'Components/Inputs/FileInput';

import { OnlyNumbers } from 'Utils/inputRegex';
import { profilePictureMaxSize } from 'Utils/userUtils';

import {
  facebookUserRegex,
  instagramUserRegex,
  linkedinUserRegex,
  tiktokUserRegex,
  twitterUserRegex,
  youtubeUserRegex,
} from 'Utils/regex';

import {
  Container,
  LeftSide,
  LeftSideContent,
  RightSide,
  RightSideContent,
  FormInputText,
  AvatarInput,
  SelectContainer,
  PrivacityText,
  InputTextContainer,
} from './style';

export const schemaStep03 = yup.object({
  profilePicture: yup
    .mixed()
    .test(
      'fileSize',
      'Arquivo muito grande',
      (value) =>
        (value && !value.name) ||
        value === null ||
        (value && value.size <= profilePictureMaxSize)
    ),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  artist: yup.object({
    show_name: yup.string().required('Como quer ser chamado?'),
    contact: yup.object({
      whatsapp: yup.string(),
      twitter: yup
        .string()
        .trim()
        .matches(twitterUserRegex, 'formato inválido'),
      facebook: yup
        .string()
        .trim()
        .matches(facebookUserRegex, 'formato inválido'),
      instagram: yup
        .string()
        .trim()
        .matches(instagramUserRegex, 'formato inválido'),
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

export const Step03: FC = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  const options = [
    { value: 'nome', label: values.artist.name },
    { value: 'nome social', label: values.artist.social_name },
    { value: 'nome artistico', label: values.artist.artistic_name },
  ];

  return (
    <Container>
      <LeftSide>
        <LeftSideContent>
          <AvatarInput>
            <img
              src={
                values.profilePicture?.name
                  ? URL.createObjectURL(values.profilePicture)
                  : values.profilePicture
              }
              alt={values.profilePicture ? 'User avatar' : ''}
            />
          </AvatarInput>

          <FileInput
            name="profilePicture"
            value="profilePicture"
            label="Clique para enviar foto"
          />

          <SelectContainer htmlFor="main_name">
            <SelectInput
              name="artist.show_name"
              label="Nome principal"
              options={options}
              obrigatory
            />
          </SelectContainer>
        </LeftSideContent>
      </LeftSide>

      <RightSide>
        <RightSideContent>
          <div>
            <InputTextContainer>
              <FormInputText
                name="email"
                label="Email"
                placeholder="email@seuemail.com"
                disabled
                obrigatory
              />

              <FormInputText
                name="artist.contact.whatsapp"
                label="Celular com WhatsApp"
                placeholder="(61) 9 9999-9999"
                inputMask="(99) 9 9999-9999"
                onChange={(ev: any) =>
                  setFieldValue('whatsapp', OnlyNumbers(ev.target.value))
                }
              />
            </InputTextContainer>
          </div>

          <div>
            <InputTextContainer>
              <FormInputText
                name="artist.contact.facebook"
                label="Facebook"
                placeholder="@seufacebook"
              />

              <FormInputText
                name="artist.contact.instagram"
                label="Instagram"
                placeholder="@seuinstagram"
              />
            </InputTextContainer>
          </div>

          <div>
            <InputTextContainer>
              <FormInputText
                name="artist.contact.twitter"
                label="Twitter"
                placeholder="@seutwitter"
              />

              <FormInputText
                name="artist.contact.linkedin"
                label="LinkedIn"
                placeholder="@seulinkedin"
              />
            </InputTextContainer>
          </div>

          <div>
            <FormInputText
              name="artist.contact.tiktok"
              label="TikTok"
              placeholder="@seutiktok"
            />

            <FormInputText
              name="artist.contact.youtube"
              label="YouTube"
              placeholder="@seuyoutube"
            />
          </div>

          <div>
            <PrivacityText>
              Paragrafo informando sobre a privacidade dos dados inseridos nessa
              etapa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Aenean commodo ligula eget dolor,dolor sit amet, consectetuer
              adipiscing elit. Aenean commodo ligula eget dolor.
            </PrivacityText>
          </div>
        </RightSideContent>
      </RightSide>
    </Container>
  );
};
