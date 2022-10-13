import styled from 'styled-components';

import Header from 'Components/Header';
import { Title } from 'Components/Typography/Title';
import { Text } from 'Components/Typography/Text';

interface StepProps {
  currentStep: number;
}

interface ButtonProps {
  lastStep: boolean;
}

interface SessionProps {
  currentStep: number;
  lastStep: boolean;
}

interface ModalProps {
  isOpen: boolean;
}

export const Container = styled.div`
  background-color: black;
  padding-top: 5.83rem;
`;

export const SessionContainer = styled.div``;

export const FormContainer = styled.div<StepProps>`
  display: flex;
  justify-content: space-between;
  position: relative;

  .form {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88vw;
    flex-direction: column;
  }
`;

export const FormButton = styled.button`
  border: 0;
  background-color: #fc0061;
  color: rgba(250, 250, 250, 0.7);
  width: 6.5rem;
  height: 2.2rem;
  cursor: pointer;

  font-size: var(--font-size-large);
  font-weight: 700;
`;

export const RightSession = styled.div<SessionProps>`
  background-color: #111010;

  .sessionContainer {
    display: flex;
    flex-direction: column;
  }

  .formSession {
    width: 1.98rem;
    height: calc(100vh / 16);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px 0px;

    &.checked {
      background-color: #2daf2f;

      label {
        color: #fafafa;
      }
    }

    background-color: #111010;

    &:nth-child(${({ currentStep }) => currentStep}) {
      background-color: #2daf2f;
      border-radius: ${({ lastStep }) =>
        lastStep ? '0px 0px 0px 0px' : '0px 0px 50px 50px'};

      label {
        color: #fafafa;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const ButtonContainer = styled.div<ButtonProps>`
  display: ${({ lastStep }) => (lastStep ? 'none' : 'flex')};
  column-gap: 2.1rem;
  margin: 2rem 0;
`;

export const FormHeader = styled(Header)`
  position: fixed;
`;

export const FormTitle = styled(Title)`
  font-size: var(--font-size-title-xlarge);
  color: #ffffff;

  margin-left: 1.7rem;
`;
export const SignUpText = styled(Text)`
  color: #fff;
  font-size: var(--font-size-large);

  display: block;
  width: 16.5rem;
  margin-left: 1.7rem;
  margin-top: 2.6rem;
  margin-bottom: 5.83rem;
`;

export const ErrorModalContainer = styled.div<ModalProps>`
  position: absolute;

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  z-index: 10;

  background: rgba(196, 196, 196, 0);
  backdrop-filter: blur(1.5px);

  touch-action: none;

  .errorModalContainer {
    background-color: #202020;

    color: #fafafa;

    width: 15rem;
    height: 30rem;

    padding: 0 2rem;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    h1 {
      font-size: 18px;
      margin-bottom: 2rem;
      line-height: 20px;
      color: #fc0061;
    }

    h2 {
      font-size: 14px;
      margin-bottom: 2rem;
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
  }

  button {
    width: 12rem;
    height: 2rem;

    border: 0;
    background: #fc0061;
    box-shadow: inset 0px 0px 3px #000000;
    border-radius: 2px;

    cursor: pointer;

    font-size: 13px;

    color: #ffec99;
  }
`;

export const ConfirmEmailModal = styled.div<ModalProps>`
  position: absolute;

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};

  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  z-index: 10;

  background: rgba(196, 196, 196, 0);
  backdrop-filter: blur(1.5px);

  touch-action: none;

  .confirmEmailContainer {
    background-color: #202020;

    color: #fafafa;

    width: 15rem;
    height: 30rem;

    padding: 0 2rem;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    h1 {
      font-size: 18px;
      margin-bottom: 2rem;
      line-height: 20px;
    }

    h2 {
      font-size: 14px;
      margin-bottom: 2rem;
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
  }

  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 2rem;

    label {
      font-size: 14px;
    }
  }

  .socialMedias {
    margin-bottom: 2rem;
    display: flex;

    column-gap: 0.5rem;

    svg {
      width: 30px;
      height: 30px;
      color: #fc0061;
    }
  }

  button {
    width: 12rem;
    height: 2rem;

    border: 0;
    background: #fc0061;
    box-shadow: inset 0px 0px 3px #000000;
    border-radius: 2px;

    cursor: pointer;

    font-size: 13px;

    color: #ffec99;
  }
`;
