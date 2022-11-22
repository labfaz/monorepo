import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import * as yup from 'yup';

import { FileInput } from 'Components/Inputs/FileInput';
import { SelectInput } from 'Components/Inputs/SelectInput';
import { profilePictureMaxSize } from 'Utils/userUtils';
import {
  Container,
  ContentContainer,
  Content,
  AvatarInput,
  SelectContainer,
  FileInputContainer,
} from './Step02.style';

interface FileProps {
  name: string;
  size: number;
  type: string;
}

interface Step2Props {
  profilePicture: Blob;
  artist: {
    name: string;
    social_name: string;
    artistic_name: string;
    photo_url: FileProps;
  };
}

export const schemaStep02 = yup.object({
  profilePicture: yup
    .mixed()
    .required('Foto obrigatória')
    .test(
      'fileSize',
      'Arquivo muito grande',
      (value) => value && value.size <= profilePictureMaxSize
    ),
  artist: yup.object({
    show_name: yup.string(),
  }),
});

export const Step02: FC = () => {
  const { values } = useFormikContext<Step2Props>();

  // const options = [
  //   { value: 'nome', label: values.artist?.name },
  //   { value: 'nome social', label: values.artist?.social_name },
  //   { value: 'nome artistico', label: values.artist?.artistic_name },
  // ].filter((name) => name.label.trim());

  return (
    <Container>
      <ContentContainer>
        <Content>
          <AvatarInput>
            <img
              src={
                values.profilePicture
                  ? URL.createObjectURL(values.profilePicture)
                  : undefined
              }
              alt={values.profilePicture ? 'User avatar' : ''}
            />
          </AvatarInput>

          <FileInputContainer>
            <FileInput
              name="profilePicture"
              value="profilePicture"
              label="Clique para enviar foto"
            />
          </FileInputContainer>

          {/* <SelectContainer htmlFor="main_name">
            <SelectInput
              label="Nome principal"
              name="artist.show_name"
              options={options}
              obrigatory
            />
          </SelectContainer> */}
        </Content>
      </ContentContainer>
    </Container>
  );
};
