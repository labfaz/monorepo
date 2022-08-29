import styled from 'styled-components';

export const SkipContent = styled.div`
  height: 2rem;
  width: 100%;
  background: #000;
  color: var(--background-pink);
  padding-left: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  a:active,
  a:focus {
    border: 1px solid red;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;

    &:hover {
      cursor: pointer;
    }

    &:active,
    &:focus {
      border: 1px solid red;
    }
  }
`;
