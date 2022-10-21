import styled, { css } from 'styled-components';
import { Field } from 'formik';
import { Title } from 'Components/Typography/Title';
import { PasswordInput } from 'Components/Inputs/PasswordInput';
import { DesktopSmall } from 'Utils/breakpoints';
import { Text } from 'Components/Typography/Text';
import { TextInput } from 'Components/Inputs/TextInput';

interface StepProps {
  currentStep: number;
}

interface ModalProps {
  isOpen: boolean;
}

export const FormTitle = styled(Title)`
  font-size: var(--font-size-title-xlarge);
  color: #fc0061;

  ${DesktopSmall(css`
    font-size: var(--font-size-title-xlarge);
  `)}
`;

export const SessionContainer = styled.div`
  border-top: 2px solid #fc0061;
`;

export const FormContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-bottom: 3.83rem;

  position: relative;

  .form {
    border: 5px solid rgba(17, 16, 16, 0.5);
    box-shadow: 0px 0px 10px rgba(64, 64, 64, 0.6);
    border-radius: 7px;
  }

  ${DesktopSmall(css`
    margin-top: 3.35rem;
    margin-bottom: 2.54rem;
  `)}
`;

export const NextButton = styled.button`
  border: 0;
  background-color: #fc0061;
  color: rgba(250, 250, 250, 0.7);
  width: 9.7rem;
  height: 2.2rem;
  cursor: pointer;

  z-index: 2;

  font-size: var(--font-size-large);
  font-weight: 700;

  position: absolute;

  right: 6rem;
  bottom: 2.2rem;

  background-color: rbga(297, 0, 97, 1);
  box-shadow: 1px 1px 0px rgba(255, 236, 153, 1);
  border: none;

  :hover {
    box-shadow: 3px 3px 0px rgba(255, 236, 153, 1);
    opacity: 1;
    transition: 500ms;
  }

  ${DesktopSmall(css`
    width: 6.5rem;
    height: 1.48rem;
    font-size: var(--font-size-short);
    right: 4rem;
  `)}
`;

export const BackButton = styled.button`
  width: 9.7rem;
  height: 2.2rem;
  border: 0;
  background-color: #090909;
  color: rgba(250, 250, 250, 0.7);
  cursor: pointer;
  font-size: var(--font-size-large);
  font-weight: 700;
  z-index: 2;
  position: absolute;
  left: 2.6rem;
  bottom: 2.2rem;

  ${DesktopSmall(css`
    width: 6.5rem;
    height: 1.48rem;
    left: 1.78rem;
    font-size: var(--font-size-short);
  `)}
`;

export const RightSession = styled.div<StepProps>`
  display: flex;

  .sessionContainer {
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
    margin-top: 1.36rem;
  }

  .formSession {
    width: 3.33rem;
    height: 5.68rem;
    border-left: 5px solid rgba(17, 16, 16, 0.5);
    border-radius: 0px 7px 7px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px 0px;

    label {
      color: rgba(255, 255, 255, 0.25);
      font-size: var(--font-size-title-medium);
      font-weight: 900;

      ${DesktopSmall(css`
        font-size: var(--font-size-subtitle);
      `)}
    }

    svg {
      display: none;
    }

    ${DesktopSmall(css`
      width: 2.23rem;
      height: 3.8rem;
    `)}

    &.checked {
      background-color: #2daf2f;

      svg {
        display: block;
        width: 26.67px;
        height: 26.67px;
        color: #fafafa;

        ${DesktopSmall(css`
          width: 24px;
          height: 24px;
        `)}
      }

      label {
        color: #fafafa;
      }
    }

    background-color: #090909;

    &:nth-child(${({ currentStep }) => {
          switch (currentStep) {
            case 0:
              return 1;

            case 1:
              return 2;

            case 2:
              return 3;

            case 3:
            case 4:
            case 5:
              return 4;

            case 6:
            case 7:
              return 5;

            case 8:
            case 9:
              return 6;

            default:
              return '';
          }
        }}) {
      background-color: #fc0061;

      label {
        color: #ffec99;
      }
    }
  }
`;

export const ErrorModalContainer = styled.div<ModalProps>`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  z-index: 10;
  background: rgba(196, 196, 196, 0);
  backdrop-filter: blur(1.5px);
  touch-action: none;

  .errorModalContainer {
    background-color: #202020;
    position: relative;
    color: #fafafa;
    padding: 0 4.2rem;
    width: 36rem;
    height: 39.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 5px solid rgba(40, 40, 40, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 0px 20px rgba(10, 10, 10, 0.8),
      inset 0px 0px 20px rgba(10, 10, 10, 0.8);
    border-radius: 10px;

    h1 {
      font-size: 26px;
      margin-bottom: 3.3rem;
      color: #fc0061;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 3.3rem;
      line-height: 26px;
    }

    animation: fadeIn 0.4s;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.5);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    ${DesktopSmall(css`
      width: 28rem;
      height: 28rem;

      h1 {
        font-size: 18px;
        margin-bottom: 2rem;
      }

      h2 {
        font-size: 14px;
        margin-bottom: 2rem;
        line-height: 20px;
      }
    `)}
  }

  button {
    width: 21rem;
    height: 2.7rem;
    border: 0;
    background: #fc0061;
    box-shadow: inset 0px 0px 3px #000000;
    border-radius: 2px;
    cursor: pointer;
    color: #ffec99;

    ${DesktopSmall(css`
      width: 18rem;
      height: 2.7rem;
    `)}
  }
`;

export const ConfirmEmailModal = styled.div<ModalProps>`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  z-index: 10;
  background: rgba(196, 196, 196, 0);
  backdrop-filter: blur(1.5px);
  touch-action: none;

  .confirmEmailContainer {
    background-color: #202020;
    color: #fafafa;
    padding: 0 4.2rem;
    width: 36rem;
    height: 39.3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 5px solid rgba(40, 40, 40, 0.5);
    box-sizing: border-box;
    box-shadow: 0px 0px 20px rgba(10, 10, 10, 0.8),
      inset 0px 0px 20px rgba(10, 10, 10, 0.8);
    border-radius: 10px;

    h1 {
      font-size: 26px;
      margin-bottom: 3.3rem;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 3.3rem;
      line-height: 26px;
    }

    animation: fadeIn 0.4s;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.5);
      }

      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    ${DesktopSmall(css`
      width: 28rem;
      height: 28rem;

      h1 {
        font-size: 18px;
        margin-bottom: 2rem;
      }

      h2 {
        font-size: 14px;
        margin-bottom: 2rem;
        line-height: 20px;
      }
    `)}
  }

  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3.3rem;

    ${DesktopSmall(css`
      margin-bottom: 2rem;
    `)}
  }

  .socialMedias {
    margin-bottom: 3.3rem;
    display: flex;
    column-gap: 0.5rem;

    svg {
      width: 36px;
      height: 36px;
      color: #fc0061;
    }

    ${DesktopSmall(css`
      margin-bottom: 2rem;
    `)}
  }

  button {
    width: 21rem;
    height: 2.7rem;
    border: 0;
    background: #fc0061;
    box-shadow: inset 0px 0px 3px #000000;
    border-radius: 2px;
    cursor: pointer;
    color: #ffec99;

    ${DesktopSmall(css`
      width: 18rem;
      height: 2.7rem;
    `)}
  }
`;

export const LeftSelectContainer = styled.label`
  width: 12.475rem;
  position: absolute;
  margin-top: 0.5rem;

  ${DesktopSmall(css`
    width: 8.33rem;
    bottom: -2.5rem;
  `)}
`;

export const PasswordInputContainer = styled.div`
  margin-bottom: 3.5rem;

  ${DesktopSmall(css`
    margin-bottom: 2rem;
  `)}
`;

export const PrivacityText = styled(Text)`
  width: 27rem;
  font-size: var(--font-size-small);
  line-height: 16px;

  ${DesktopSmall(css`
    width: 18rem;

    font-size: 9px;
  `)}

  margin-top: 1rem;
`;

export const CnpjText = styled(TextInput)`
  top: 75%;

  ${DesktopSmall(css`
    label {
      font-size: var(--font-size-small);
    }

    top: 75%;
  `)}

  position: absolute;
  right: 0;
`;

export const Input = styled(PasswordInput)`
  input {
    width: 21.7rem;

    ${DesktopSmall(css`
      width: 14.48rem;
      font-size: var(--font-size-short);

      &::placeholder {
        font-size: var(--font-size-short);
      }
    `)}
  }
`;

export const OtherTechnicalArea = styled(TextInput)`
  margin-top: 1.5rem;

  ${DesktopSmall(css`
    position: absolute;
    bottom: 4.5rem;
    right: 1rem;
  `)}
`;

export const Box = styled.div`
  width: 71rem;
  height: 50rem;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
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
`;

export const InputFile = styled(Field)`
  position: relative;
  z-index: -1;

  & + .fileContent {
    width: 12.4rem;
    height: 2.55rem;
    background-color: #ffffff;
    padding-left: 0.83rem;
    position: relative;
    display: flex;
    align-items: center;

    div {
      position: absolute;
      width: 1px;
      height: 22px;
      background-color: #c4c4c4;
      right: 3.03rem;
      top: 25%;
      z-index: 1;
    }

    img {
      position: absolute;
      z-index: 1;
      width: 24px;
      height: 24px;
      right: 0.64rem;
      top: 25%;
      pointer-events: none;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const InformartionText = styled(Text)`
  font-size: var(--font-size-small);
  width: 26rem;
  color: #fafafa;
  line-height: 16px;
  margin-left: 2.2rem;

  ${DesktopSmall(css`
    display: none;
  `)}
`;
