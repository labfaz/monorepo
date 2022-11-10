import React, { FC } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'Hooks/useLocalStorage';

import FullPage from 'Components/FullPage';
import Footer from 'Components/Footer';
import Header from 'Components/Header';
import SkipNav from 'Components/SkipNav';

const Container = styled(FullPage)`
  display: flex;
  flex-direction: column;

  --background-color: var(--background-black);
  background-color: var(--background-color);

  &.contrast * {
    color: #ff0 !important;
    text-shadow: 1px 1px 0 #000 !important;
    filter: contrast(120%);
  }
`;

const Content = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Wireframe: FC = ({ children }) => {
  const [isContrasted, setIsContrasted] = useLocalStorage<boolean | undefined>(
    'highContrast',
    false
  );

  return (
    <Container className={isContrasted ? 'contrast' : ''}>
      <SkipNav setIsContrasted={setIsContrasted} />
      <Header />
      <Content id="content">{children}</Content>
      <Footer id="footer" />
    </Container>
  );
};

export default Wireframe;
