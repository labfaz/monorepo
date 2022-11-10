import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import render from 'Utils/render';
import SkipNav from './Web/index';

it('renders skipnav component', () => {
  expect(() =>
    render(
      <BrowserRouter>
        <SkipNav />
      </BrowserRouter>
    )
  ).not.toThrow();
});

describe('Check href successfully leading to sections', () => {
  const { getByText } = render(
    <BrowserRouter>
      <SkipNav />
    </BrowserRouter>
  );

  it('check anchor of content', () => {
    expect(getByText('Conteúdo').closest('a')).toHaveAttribute(
      'href',
      '#content'
    );
  });

  it('check anchor of footer redirecting', () => {
    expect(getByText('Rodapé').closest('a')).toHaveAttribute('href', '#footer');
  });

  it('check anchor of high contrast', () => {
    expect(getByText('Alto Contraste').closest('a')).toBeDefined();
  });
});
