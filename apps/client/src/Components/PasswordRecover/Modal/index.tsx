import React, { FC } from 'react'

import { ModalDiv, ModalContent, Button, Container, ModalLine } from '../styles'
import { Title } from "Components/Typography/Title"
import { Text } from "Components/Typography/Text"
import SocialMediaIcons  from "Components/SocialMediaIcons"

interface ModalProps {
  isVisible: boolean,
  setFunction: React.Dispatch<React.SetStateAction<boolean>>
  title?: string,
  userEmail?: string
}

export const Modal: FC<ModalProps> = ({ isVisible, setFunction, title, userEmail }) => {


  return(
    <Container isVisible={isVisible}>
      <ModalDiv>
        <Title level={3}> {title ? title : "DESCULPE PELOS PROBLEMAS :C"}   </Title>
        <ModalLine />
        <ModalContent>
          <Text> {userEmail ? `O email com as instruções para recuperar senha foram enviadas para ${userEmail}.\n \n
            Cheque sua caixa de mensgems ou em alguns minutos tente novamente` :
            "Tente entrar em contato com a nossa equipe, pelos meios de comunicaca e midias abaixo, para resolver o seu problema."
          } </Text>
          {!title ? (
            <>
            <Text> (99)9999-999 </Text>
            <Text> contato@labfaz.com.br </Text>
            <SocialMediaIcons />
            </>
          ): 
          ""}
          <Button onClick={() => setFunction(!isVisible)} > Voltar </Button>
        </ModalContent>
      </ModalDiv>
    </Container>
  )
}
