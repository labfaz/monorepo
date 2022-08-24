import React, { FC } from "react"

import { SocialNetworksLabfaz } from "Api/SocialNetworksLabfaz"
import useMobile from 'Hooks/useMobile'

import Web from './Web'
import Mobile from './Mobile'

export interface ComposerProps {
  data: SocialNetworksLabfaz
  id?: string
}

export const Composer: FC<ComposerProps> = ({
  data,
  id
}) => {
  const width = useMobile()
  
  if (width) return <Mobile data={data}/>
  return <Web id={id} data={data} />
}

export default Composer
