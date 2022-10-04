import UserRepository from "Repository/UserRepository"
import { sendConfirmationEmail } from "Mailer/emailConfirmation"

import {
  actionSuccessful,
  databaseError
} from 'Utils/endpointReturns'

import { RouteHandler } from "Utils/routeHandler"
import { Req } from "Utils/request"

interface ResendEmailDeps {
  UserRepo: UserRepository
}

export const ResendEmail: (
  desps: ResendEmailDeps
) => RouteHandler<Req<{email: string}>> = ({ UserRepo }: ResendEmailDeps) => async (req, res) => {
  const { email } = req.body

  const user = await UserRepo.findByEmail(email)

  if(!user) return databaseError(res, "Nenhum usuário encontrado")

  sendConfirmationEmail(user)

  return actionSuccessful(res, {
    message: 'Email enviado'
  })

} 

export default ResendEmail
