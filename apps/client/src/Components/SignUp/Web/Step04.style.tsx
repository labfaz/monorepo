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
