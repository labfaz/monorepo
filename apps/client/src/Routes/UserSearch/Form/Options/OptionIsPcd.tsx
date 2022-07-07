import React, { Dispatch, FC, SetStateAction } from "react";
import {
  OptionDiv,
  BadgeInput,
  BadgeDiv,
  OptionWrapper,
} from "../../UserSearchPage/style";

import { Title } from "Components/Typography/Title";
// import { Text }  from "Components/Typography/Text"

import { UserSearchParams } from "Api/UserSearch";
interface OptionsProps {
  setFunction: Dispatch<SetStateAction<UserSearchParams>>;
}

export const OptionIsPcd: FC<OptionsProps> = ({ setFunction }) => {
  return (
    <OptionDiv>
      <Title level={4}> PCD </Title>
      <OptionWrapper>
        <BadgeDiv>
          <BadgeInput
            type="radio"
            name="isPcd"
            value={"true"}
            key="isPcd"
            onChange={() =>
              setFunction((formData) => {
                const updateFormData = { ...formData };
                updateFormData["pcdOnly"] = true;
                return updateFormData;
              })
            }
          />
          <label> Sim </label>
        </BadgeDiv>

        <BadgeDiv>
          <BadgeInput
            type="radio"
            name="isPcd"
            value={"true"}
            key="isPcd"
            onChange={() =>
              setFunction((formData) => {
                const updateFormData = { ...formData };
                updateFormData["pcdOnly"] = false;
                return updateFormData;
              })
            }
          />
          <label> Não </label>
        </BadgeDiv>
      </OptionWrapper>
    </OptionDiv>
  );
};

export default OptionIsPcd;
