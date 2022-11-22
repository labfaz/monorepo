import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  OptionDiv,
  BadgeInput,
  BadgeDiv,
  OptionWrapper,
} from '../../UserSearchPage/style';

import { Title } from 'Components/Typography/Title';
// import { Text }  from "Components/Typography/Text"

import { UserSearchParams } from 'Api/UserSearch';
interface OptionsProps {
  setFunction: Dispatch<SetStateAction<UserSearchParams>>;
}

export const OptionIsPcd: FC<OptionsProps> = ({ setFunction }) => {
  return (
    <OptionDiv>
      <Title level={4}> PCD </Title>
      <OptionWrapper>
        <BadgeDiv>
          <label> Sim </label>
          <BadgeInput
            type="radio"
            name="isPcd"
            value="pcdOnly"
            onChange={() =>
              setFunction((formData) => {
                const updateFormData = { ...formData };
                updateFormData['pcdOnly'] = true;
                updateFormData['showNothing'] = false;
                return updateFormData;
              })
            }
          />
        </BadgeDiv>

        <BadgeDiv>
          <label> Não </label>
          <BadgeInput
            type="radio"
            name="isPcd"
            value="pcdOnly"
            onChange={() =>
              setFunction((formData) => {
                const updateFormData = { ...formData };
                updateFormData['pcdOnly'] = false;
                updateFormData['showNothing'] = false;
                return updateFormData;
              })
            }
          />
        </BadgeDiv>
      </OptionWrapper>
    </OptionDiv>
  );
};

export default OptionIsPcd;
