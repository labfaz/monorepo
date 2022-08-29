import React, { FC } from 'react';

import {
  SocialNetworksLabfaz,
  useSocialNetworksLabfaz,
} from 'Api/SocialNetworksLabfaz';
import Composer from './Composer';

const defaultData: SocialNetworksLabfaz = {
  email: 'labfaz@labfaz.com.br',
  phone: '61999999999',
};

type FooterProps = {
  id?: string
}

const Footer: FC<FooterProps> = ({id}) => {
  const result = useSocialNetworksLabfaz()

  if (result.isLoading) return <Composer id={id} data={defaultData} />
  if (result.error) return <div>error: {result.error.message}</div>
  return <Composer id={id} data={result.data} />
}

export default Footer;
