import { TextInput } from 'Components/Inputs/TextInput';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { OnlyNumbers } from 'Utils/inputRegex';

import {
  Container,
  ContentContainer,
  Content,
  InputTextContainer,
} from './style';

export const Step10: FC = () => {
  const { setFieldValue } = useFormikContext();
  const checkCEP = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('artist.address.address', data.logradouro);
        setFieldValue('artist.address.neighbourhood', data.bairro);
        setFieldValue('artist.address.city', data.localidade);
        setFieldValue('artist.address.state', data.uf);
        setFieldValue('artist.address.complement', data.complemento);
      });
  };

  return (
    <Container>
      <ContentContainer>
        <Content>
          <div>
            <InputTextContainer>
              <TextInput
                name="artist.address.cep"
                label="CEP"
                placeholder="Digite seu cep"
                inputMask="99999-999"
                onChange={(ev: any) => {
                  if (OnlyNumbers(ev.target.value).length === 8) {
                    checkCEP(OnlyNumbers(ev.target.value));
                  }
                  setFieldValue('cep', OnlyNumbers(ev.target.value));
                }}
                width={8.18}
                // obrigatory
              />
            </InputTextContainer>

            <InputTextContainer>
              <TextInput
                name="artist.address.number"
                label="Numero"
                placeholder={`Número`}
                width={5.55}
                onChange={(ev: any) =>
                  setFieldValue(
                    'artist.address.number',
                    OnlyNumbers(ev.target.value)
                  )
                }
                // obrigatory
              />
            </InputTextContainer>
          </div>

          <InputTextContainer>
            <TextInput
              name="artist.address.complement"
              label="Endereco"
              placeholder="Digite seu logradouro"
              width={15}
              // obrigatory
            />
          </InputTextContainer>

          <InputTextContainer>
            <TextInput
              name="artist.address.neighbourhood"
              label="Bairro"
              placeholder="Digite seu bairro"
              width={15}
              // obrigatory
            />
          </InputTextContainer>

          <InputTextContainer>
            <TextInput
              name="artist.address.address"
              label="Complemento"
              placeholder="Digite seu complemento"
              width={15}
            />
          </InputTextContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
};
