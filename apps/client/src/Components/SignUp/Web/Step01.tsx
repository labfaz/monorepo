import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import * as yup from 'yup';

import { RadioInput } from 'Components/Inputs/RadioInput';
import { TextInput } from 'Components/Inputs/TextInput';
// import { Text } from 'Components/Typography/Text';

import { OnlyNumbers } from 'Utils/inputRegex';

import {
  Container,
  LeftSide,
  LeftSideContent,
  RightSide,
  RightSideContent,
  InputRadioContainer,
  SelectContainer,
  InputText,
  InputTextContainer,
} from './Step01.style';

import { LeftSelectContainer } from './all.style';

import { InputCheckBoxContainer } from './Step11.style';
import { CheckboxInput } from 'Components/Inputs/CheckboxInput';

import { SelectInput } from 'Components/Inputs/SelectInput';
import { CidadesDF, CidadesEntorno, Estados } from 'Utils/selectOptionsData';

export const schemaStep01 = yup.object({
  use_terms: yup.string().required('Termos de uso obrigatório'),
  artist: yup.object({
    name: yup.string().required('Nome obrigatório'),
    social_name: yup.string(),
    artistic_name: yup.string(),
    cpf: yup.string().min(11, 'Cpf incompleto'),
    birthday: yup
      .string()
      .required('Data de nascimento obrigatório')
      .min(8, 'Data incompleta'),
    rg: yup.string(),
    expedition_department: yup.string(),
    address: yup.object({
      cep: yup.string(),
      neighbourhood: yup.string(),
      number: yup.string(),
      complement: yup.string(),
      residency: yup.string().required('Campo obrigatório'),
      state: yup.string().default('null'),
      city: yup.string().required('Cidade obrigatória'),
    }),
  }),
});

export const Step01: FC = () => {
  const { values, setFieldValue, errors } = useFormikContext<any>();

  // const checkCEP = (cep: string) => {
  //   fetch(`https://viacep.com.br/ws/${cep}/json/`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFieldValue('artist.address.address', data.logradouro);
  //       setFieldValue('artist.address.neighbourhood', data.bairro);
  //       setFieldValue('artist.address.city', data.localidade);
  //       setFieldValue('artist.address.state', data.uf);
  //       setFieldValue('artist.address.complement', data.complemento);
  //     });
  // };

  return (
    <Container>
      <LeftSide>
        <LeftSideContent>
          <InputTextContainer>
            <InputText
              name="artist.name"
              label="Nome"
              placeholder="Digite seu nome"
              obrigatory
            />
          </InputTextContainer>

          {/* <InputTextContainer>
            <InputText
              name="artist.social_name"
              label="Nome Social"
              placeholder="Digite seu nome social"
            >
              <Text>
                Nome social não é o apelido, é o nome pelo qual pessoas
                transexuais, travestis e não binárias desejam ser chamadas ou
                socialmente reconhecidas e tem a ver com o respeito às
                identidades de gênero.
              </Text>
            </InputText>
          </InputTextContainer> */}

          {/* <InputTextContainer>
            <InputText
              name="artist.artistic_name"
              label="Nome Artistico"
              placeholder="Digite seu nome artistico"
            />
          </InputTextContainer> */}

          {/* <div> */}
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
          {/* </div> */}

          {/* <div>
            <InputTextContainer>
              <TextInput
                name="artist.rg"
                label="RG"
                onChange={(ev: any) =>
                  setFieldValue('artist.rg', OnlyNumbers(ev.target.value))
                }
                placeholder="Digite seu rg"
              />
            </InputTextContainer>

            <InputTextContainer>
              <TextInput
                name="artist.expedition_department"
                label="Orgão expedidor"
                placeholder="Digite o orgão expedidor"
              />
            </InputTextContainer>
          </div> */}

          <InputCheckBoxContainer>
            <CheckboxInput type="checkbox" name="use_terms" value="sim">
              Li e concordo com os{' '}
              <a
                href="/politica-de-privacidade.pdf"
                target="_blank"
                rel="noopener"
              >
                Termos de Uso
              </a>{' '}
              e estou ciente e autorizo que os meus dados sejam usados única e
              exclusivamente para o projeto LabFaz.
            </CheckboxInput>
            {errors.use_terms && (
              <span className="errorMessage">{errors.use_terms}</span>
            )}
          </InputCheckBoxContainer>
        </LeftSideContent>
      </LeftSide>

      <RightSide>
        <RightSideContent>
          <div className="genderContainer">
            <label htmlFor="residency" className="radioLabel">
              Você reside no Distrito Federal ou Entorno?
            </label>

            <InputRadioContainer>
              <RadioInput
                name="artist.address.residency"
                value="df"
                label="Distrito Federal"
              />
            </InputRadioContainer>

            <InputRadioContainer>
              <RadioInput
                name="artist.address.residency"
                value="entorno"
                label="Entorno"
              />
            </InputRadioContainer>

            <InputRadioContainer>
              <RadioInput
                name="artist.address.residency"
                value="fora df"
                label="Resido fora do DF  e do Entorno"
              />
            </InputRadioContainer>

            {values.artist.address.residency === 'fora df' && (
              <LeftSelectContainer htmlFor="state">
                <SelectInput
                  name="artist.address.state"
                  label="Qual seu estado?"
                  options={Estados}
                  obrigatory
                />
              </LeftSelectContainer>
            )}
          </div>

          <div className="residencyContainer">
            {values.artist.address.residency === 'df' && (
              <SelectContainer htmlFor="main_name">
                <SelectInput
                  name="artist.address.city"
                  label="Qual sua cidade do DF?"
                  options={CidadesDF}
                  obrigatory
                />
              </SelectContainer>
            )}

            {values.artist.address.residency === 'entorno' && (
              <SelectContainer htmlFor="residency">
                <SelectInput
                  name="artist.address.city"
                  label="Qual cidade do Entorno?"
                  options={CidadesEntorno}
                  obrigatory
                />
              </SelectContainer>
            )}

            {values.artist.address.residency === 'fora df' && (
              <InputTextContainer>
                <TextInput
                  name="artist.address.city"
                  label="Cidade"
                  placeholder="Digite o nome de sua cidade"
                  obrigatory
                />
              </InputTextContainer>
            )}

            {/* <InputTextContainer>
              <TextInput
                name="artist.address.cep"
                label="CEP"
                placeholder="Digite seu cep"
                inputMask="99999-999"
                // obrigatory
                onChange={(ev: any) => {
                  if (OnlyNumbers(ev.target.value).length === 8) {
                    checkCEP(OnlyNumbers(ev.target.value));
                  }
                  setFieldValue('cep', OnlyNumbers(ev.target.value));
                }}
              />
            </InputTextContainer> */}
          </div>

          {/* <div className="residencyContainer">
            <InputTextContainer>
              <TextInput
                name="artist.address.address"
                label="Endereco"
                placeholder="Digite seu logradouro"
              />
            </InputTextContainer>

            <InputTextContainer>
              <TextInput
                name="artist.address.neighbourhood"
                label="Bairro"
                placeholder="Digite seu bairro"
                // obrigatory
              />
            </InputTextContainer>
          </div> */}

          {/* <div className="residencyContainer">
            <InputTextContainer>
              <TextInput
                name="artist.address.number"
                label="Numero"
                placeholder="Digite seu número"
                onChange={(ev: any) =>
                  setFieldValue(
                    'artist.address.number',
                    OnlyNumbers(ev.target.value)
                  )
                }
              />
            </InputTextContainer>

            <InputTextContainer>
              <TextInput
                name="artist.address.complement"
                label="Complemento"
                placeholder="Digite seu complemento"
              />
            </InputTextContainer>
          </div> */}
        </RightSideContent>
      </RightSide>
    </Container>
  );
};
