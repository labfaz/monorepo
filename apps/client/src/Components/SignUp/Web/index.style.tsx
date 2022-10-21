import styled, { css } from 'styled-components';

import { DesktopSmall } from 'Utils/breakpoints';

export const Container = styled.div`
  position: relative;
  background-color: black;
  padding-top: 2rem;

  ${DesktopSmall(css`
    padding-top: 3.91rem;
  `)}
`;
