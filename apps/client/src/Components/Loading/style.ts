import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 3em 0;
`;

export const Color = css`
  animation: colors 2s infinite;
  @keyframes colors {
    25% {
      background-color: #fc0061;
      transform: rotateX(180deg) rotateY(0);
    }
    50% {
      background-color: #2daf2f;
      transform: rotateX(180deg) rotateY(180deg);
    }
    75% {
      background-color: #0c74ff;
      transform: rotateX(0) rotateY(180deg);
    }
    100% {
      background-color: #f6da37;
      transform: rotateX(0) rotateY(0);
    }
  }
`;
