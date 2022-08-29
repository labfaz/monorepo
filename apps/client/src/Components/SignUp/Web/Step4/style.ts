import styled, { css } from 'styled-components';
import { Field } from 'formik';

import { Text } from 'Components/Typography/Text';
import { DesktopSmall } from 'Utils/breakpoints';

export const Container = styled.div`
  display: flex;

  background-color: #111010;
  width: 71rem;
  font-size: var(--font-size-default);

  ${DesktopSmall(css`
    width: 47.6rem;
    font-size: var(--font-size-short);
  `)}
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
  display: grid;
  grid-template-rows: auto auto 1fr auto;

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
export const PCDOptions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const BoxContent = styled.div`
  display: grid;
  height: 80%;
  grid-template-rows: auto 1fr;
`;

export const DeficiencyContainer = styled.div`
  display: grid;
  // grid-template-columns: 1fr 1fr;
`;

export const InputCheckBox = styled(Field)`
  margin-right: 1.6rem;

  &:hover {
    cursor: pointer;
  }
`;

export const InputCheckBoxContainer = styled.div`
  font-weight: 600;
  margin: auto 0;
  display: flex;
`;

export const TextInputContainer = styled.div`
  height: min-content;
  margin-bottom: 0;
  label {
    height: min-content;
    color: #ffffff;
    display: block;
    margin-bottom: 0.5rem;

    ${DesktopSmall(css`
      font-size: var(--font-size-short);
    `)}
  }
`;

export const InputRadioContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-bottom: 1.8rem;

  ${DesktopSmall(css`
    margin-bottom: 1rem;
  `)}
`;

export const FileContainer = styled.div`
  margin-top: 2rem;

  .fileLabel {
    font-weight: 600;
    display: inline-block;
    margin-bottom: 1rem;
    font-size: var(--font-size-large);

    position: relative;

    color: #fafafa;

    ${DesktopSmall(css`
      font-size: var(--font-size-short);
      display: inline-block;
      margin-bottom: 0.5rem;
    `)}
  }

  ${DesktopSmall(css`
    margin-top: 0.5rem;
  `)}
`;
