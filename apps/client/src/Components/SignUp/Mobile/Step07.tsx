import React, { FC } from 'react';
import * as yup from 'yup';

import { TextInput } from 'Components/Inputs/TextInput';
// import { useFormikContext } from 'formik';
// import { OnlyNumbers } from 'Utils/inputRegex';

import {
  Container,
  ContentContainer,
  Content,
  InputTextContainer,
} from './Step07.style';

import {
  facebookUserRegex,
  instagramUserRegex,
} from 'Utils/regex';

export const schemaStep07 = yup.object({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  artist: yup.object({
    contact: yup.object({
      whatsapp: yup.string(),
      facebook: yup
        .string()
        .trim()
        .matches(facebookUserRegex, 'formato inválido'),
      instagram: yup
        .string()
        .trim()
        .matches(instagramUserRegex, 'formato inválido'),
    }),
  }),
});

export const Step07: FC = () => {
  // const { setFieldValue } = useFormikContext();

  return (
    <Container>
      <ContentContainer>
        <Content>
          <InputTextContainer>
            <TextInput
              name="email"
              label="Email"
              placeholder="Digite seu email"
              obrigatory
            />
          </InputTextContainer>

          {/* <InputTextContainer>
            <TextInput
              name="artist.contact.whatsapp"
              label="Celular com WhatsApp"
              inputMask="(99) 9 9999-9999"
              onChange={(ev: any) =>
                setFieldValue('whatsapp', OnlyNumbers(ev.target.value))
              }
              placeholder="Digite seu número"
            />
          </InputTextContainer> */}

          {/* <InputTextContainer>
            <TextInput
              name="artist.contact.facebook"
              label="FaceBook"
              placeholder="@seufacebook"
            />
          </InputTextContainer> */}

          {/* <InputTextContainer>
            <TextInput
              name="artist.contact.instagram"
              label="Instagram"
              placeholder="@seuinstagram"
            />
          </InputTextContainer> */}
        </Content>
      </ContentContainer>
    </Container>
  );
};
