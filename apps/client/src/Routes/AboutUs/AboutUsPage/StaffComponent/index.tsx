import React, { FC } from 'react'
import { StaffObject } from 'Api/AboutUs'

import { Card, CardThumb, CardBody, CardImage, Text, Span } from './styles'







export const StaffCard: FC<StaffObject> = ( data ) => {

  const { name, tag, text, image } = data

  return(
    <Card>
      <CardThumb>
        <CardImage src={image.url} alt={image.alternativeText}/>
        <Text fontSize='medium' fontWeight={700}> {name} </Text>
      </CardThumb>
      <CardBody>
        <Span> {tag} </Span>
        <Text fontSize='medium' lineHeigt='small' marginBottom='0' marginTop='1.2em'> {text} </Text>
      </CardBody>
    </Card>
  )

}

export default StaffCard
