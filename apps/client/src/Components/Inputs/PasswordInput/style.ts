import styled, { css } from "styled-components"
import { DesktopSmall } from "Utils/breakpoints"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;

  label {
    font-weight: 600;
    color: var(--color-text-black);
    font-size: var(--font-size-medium);
    /* margin-bottom: -0.5rem; */
    margin-bottom: 0.75rem;

    ${DesktopSmall(css`
      font-size: var(--font-size-short);
    `)}
  }
  
  input {
    width: 12.4rem;
    height: 2.55rem;
    margin-bottom: 1.5rem;

    font-size: var(--font-size-medium);


    ${DesktopSmall(css`
      width: 14.48rem;
      height: 1.8rem;
      font-size: var(--font-size-short);
      margin-bottom: 0.5rem;

    `)}
    
    border: 0;
    padding: 0.7rem 0.2rem 0.7rem 0.7rem;

    &::placeholder {
      color: rgba(0, 0, 0, 0.25);
      font-weight: 600;
      font-size: var(--font-size-medium);
    }
  }

`
