import React, { FC } from 'react';

import Display from './Display';

import Error from 'Pages/Error';
import LoadingFullPage from 'Components/LoadingFullPage';

import { mockImage } from 'Utils/Image';

import { useBlogBannerInfo } from 'Api/BlogBannerInfo';
import { useBlogPost } from 'Api/BlogPost';

interface RouteParams {
  id: number;
}

export const PostPage: FC<RouteParams> = ({ id }) => {
  const result = useBlogBannerInfo();
  const post = useBlogPost(id);
  const mockBannerInfo = {
    title: 'Blog',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: mockImage({
      url: 'https://labfaz-strapi-assets.s3.sa-east-1.amazonaws.com/Whats_App_Image_2020_12_19_at_17_23_28_439c4529a0.jpeg',
      alternativeText: 'Blog Banner Image',
    }),
  };

  if (result.isLoading || post.isLoading) return <LoadingFullPage />;

  if (post.error) {
    return (
      <Error
        errorStatus={post.error.response?.status}
        errorMessage={post.error.response?.statusText}
      />
    );
  }

  if (result.error) {
    return <Display data={mockBannerInfo} post={post.data!} />;
  }

  return <Display data={result.data} post={post.data} />;
};

export default PostPage;
