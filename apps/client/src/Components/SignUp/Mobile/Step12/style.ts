import styled from 'styled-components';

import { Field } from 'formik';
import { Text } from 'Components/Typography/Text';
import { RadioInput } from 'Components/Inputs/RadioInput';
import { CheckboxInput } from 'Components/Inputs/CheckboxInput';
import { TextInput } from 'Components/Inputs/TextInput';

interface ContentProps {
  isOpen: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;

  scroll-snap-align: start;
`;

export const Content = styled.div`
  width: 14.4rem;
`;

export const TextLabel = styled(Text)`
  font-size: var(--font-size-medium);
  font-weight: 600;
  line-height: 16px;

  margin-top: 2.44rem;

  display: block;

  color: #fafafa;

  position: relative;
`;

export const InputRadioContainer = styled.div`
  margin-bottom: 0.5rem;
  width: 14.8rem;

  label {
    font-size: var(--font-size-medium);
    line-height: 13px;
    color: #fafafa;
  }
`;

export const InputRadio = styled(RadioInput)``;

export const SelectContainer = styled.label`
  width: 13.3rem;
  display: block;
  margin-bottom: 1rem;

  label {
    font-weight: 600;
    font-size: var(--font-size-medium);
    display: block;

    margin-bottom: 1.2rem;
    color: #fafafa;
  }
`;
export const InputSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  position: relative;

  width: 14.4rem;
  height: 2.2rem;
  appearance: none;
  border: 0;
  padding-left: 0.83rem;
  padding-right: 0.83rem;
  color: #c4c4c4;

  font-size: var(--font-size-medium);

  background-color: #090909;

  border: 1px solid rgba(250, 250, 250, 0.7);

  &:hover {
    cursor: pointer;
  }

  svg {
    position: absolute;
    width: 24px;
    height: 24px;
    color: #fafafa;

    right: 0.64rem;
    top: 25%;

    pointer-events: none;
  }
`;

export const InputText = styled(Field)`
  width: 14.4rem;
  height: 15.6rem;

  margin-top: 1.66rem;
  resize: none;
`;

export const OptionsContainer = styled.div<ContentProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};

  position: absolute;

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  z-index: 10;

  background: rgba(196, 196, 196, 0);
  backdrop-filter: blur(1.5px);

  touch-action: none;

  top: 0;
`;

export const CheckboxContainer = styled.div`
  width: 13.8rem;
  height: 24.7rem;

  background-color: #000000;

  display: flex;
  flex-direction: column;

  padding: 1.1rem 1.6rem;

  overflow-y: scroll;
  overflow-x: hidden;

  overscroll-behavior: contain;

  & > div {
    flex-direction: row-reverse;
    align-items: center;

    border-bottom: 1px solid rgba(255, 255, 255, 0.25);

    padding-bottom: 0.66rem;
    padding-top: 0.66rem;

    input {
      width: 2rem;
      height: 2rem;
    }

    & .checkbox_input {
      width: 1.4rem;
      height: 1.4rem;

      padding: 9px;
    }
  }

  label {
    margin-left: 0;
  }
`;

export const InputCheckbox = styled(CheckboxInput)``;

export const InputSmallText = styled(TextInput)``;

export const InputTextContainer = styled.div`
  p {
    margin-bottom: 0rem;
  }
`;

export const FileContainer = styled.div`
  width: 14.4rem;

  input {
    width: 100%;
  }
`;
