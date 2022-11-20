import React, { FC } from 'react';
import * as yup from 'yup';

import { TextInput } from 'Components/Inputs/TextInput';
import { useFormikContext } from 'formik';
import { OnlyNumbers } from 'Utils/inputRegex';

import {
  Container,
  ContentContainer,
  Content,
  InputTextContainer,
} from './Step03.style';

export const schemaStep03 = yup.object({
  artist: yup.object({
    cpf: yup
      .string()
      // .required('Cpf obrigatório')
      .min(11, 'Cpf incompleto'),
    birthday: yup
      .string()
      .required('Data de nascimento obrigatório')
      .min(8, 'Data incompleta'),
    rg: yup
      .string()
      // .required('Rg é obrigatório')
      .min(7, 'Rg incompleto'),
    expedition_department: yup.string(),
    // .required('Orgão expedidor obrigatório'),
  }),
});

export const Step03: FC = () => {
  const { setFieldValue } = useFormikContext();

  return (
    <Container>
      <ContentContainer>
        <Content>
          {/* <InputTextContainer>
            <TextInput
              name="artist.cpf"
              label="CPF"
              placeholder="Digite seu cpf"
              inputMask="999.999.999-99"
              onChange={(ev: any) =>
                setFieldValue('artist.cpf', ev.target.value)
              }
            />
          </InputTextContainer> */}

          <InputTextContainer>
            <TextInput
              name="artist.birthday"
              label="Data de nascimento"
              inputMask="99/99/9999"
              onChange={(ev: any) =>
                setFieldValue('artist.birthday', OnlyNumbers(ev.target.value))
              }
              placeholder="Digite sua data de nascimento"
              obrigatory
            />
          </InputTextContainer>

          {/* <InputTextContainer>
            <TextInput
              name="artist.rg"
              label="RG"
              onChange={(ev: any) =>
                setFieldValue('artist.rg', OnlyNumbers(ev.target.value))
              }
              placeholder="Digite seu rg"
            />
          </InputTextContainer> */}

          {/* <InputTextContainer>
            <TextInput
              name="artist.expedition_department"
              label="Orgão expedidor"
              placeholder="Digite o orgão expedidor"
            />
          </InputTextContainer> */}
        </Content>
      </ContentContainer>
    </Container>
  );
};
