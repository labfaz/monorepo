import styled, { css } from "styled-components";
import { Field } from "formik";

import { Text } from "Components/Typography/Text";
import { DesktopSmall } from "Utils/breakpoints";

export const Container = styled.div`
  display: flex;

  background-color: #111010;
`;

export const LabelText = styled(Text)`
  margin-bottom: 1.5rem;
  font-weight: 600;

  color: #fafafa;

  position: relative;

  ${DesktopSmall(css`
    font-size: var(--font-size-short);
  `)}
`;

export const Box = styled.div`
  width: 71rem;
  height: 50rem;

  border-right: 2px dashed #262626;
  margin: 2.27rem 3.3rem 6.2rem 3.3rem;

  ${DesktopSmall(css`
    width: 47.6rem;
    height: 33.5rem;

    margin: 1.52rem 4.09rem 3.2rem 2.23rem;
  `)}

  display: flex;
  flex-direction: column;
`;

export const BoxContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const InputCheckBox = styled(Field)`
  margin-right: 1.6rem;

  &:hover {
    cursor: pointer;
  }
`;

export const InputCheckBoxContainer = styled.div`
  font-weight: 600;
  margin-bottom: 2.21rem;
  margin-top: 2rem;
  display: flex;

  ${DesktopSmall(css`
    margin-top: 1.5rem;
    margin-bottom: 0;
  `)}
`;

export const TextInputContainer = styled.div`
  label {
    color: #ffffff;
    display: block;
    margin-bottom: 0.5rem;

    ${DesktopSmall(css`
      font-size: var(--font-size-short);
    `)}
  }
`;
