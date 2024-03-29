import React from 'react';
import render from 'Utils/render';
import { BrowserRouter } from 'react-router-dom';
import { formatPostDate } from 'Utils/formatPostDate';

import Display from './Display';

const postExample = {
  id: 1,
  title: 'Teste de blog post',
  description: 'Isso é um teste',
  created_at: '2021-06-29T23:50:54.596Z',
  image: {
    url: 'https://labfaz-strapi-assets.s3.sa-east-1.amazonaws.com/Whats_App_Image_2020_12_19_at_17_23_28_439c4529a0.jpeg',
    alternativeText: 'Blog Banner Image',
    caption: 'string',
    width: 20,
    height: 20,
    ext: 'jpeg',
  },
  content: 'Este é o conteúdo do post!',
};

it('renders blog post', () => {
  expect(() =>
    render(
      <BrowserRouter>
        <Display post={postExample} />
      </BrowserRouter>
    )
  ).not.toThrow();
});

describe('Check content of post component', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Display post={postExample} />
    </BrowserRouter>
  );

  it('checks if title rendered', () => {
    const title = getByText('Teste de blog post');
    expect(title).toHaveTextContent('Teste de blog post');
  });

  it('checks if weekday rendered', () => {
    const weekday = getByText(formatPostDate('2021-06-29T23:50:54.596Z')?.day);
    expect(weekday).toHaveTextContent(
      formatPostDate('2021-06-29T23:50:54.596Z')?.day
    );
  });

  it('checks if hour rendered', () => {
    const hour = getByText(formatPostDate('2021-06-29T23:50:54.596Z')?.hour);
    expect(hour).toHaveTextContent(
      formatPostDate('2021-06-29T23:50:54.596Z')?.hour
    );
  });

  it('checks if content rendered', () => {
    const content = getByText('Este é o conteúdo do post!');
    expect(content).toHaveTextContent('Este é o conteúdo do post!');
  });
});
