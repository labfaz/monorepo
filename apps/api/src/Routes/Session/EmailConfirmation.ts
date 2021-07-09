<<<<<<< HEAD
import UserRepository from "Repository/UserRepository"
import { RouteHandler } from "Utils/routeHandler"
import { ParamsType, Req } from "Utils/request"
import { actionSuccessful, badRequestError } from "Utils/endpointReturns"
=======
import { DeepPartial } from "typeorm"
import { RequestHandler } from "Routes"


import User from "Entities/User"
import UserRepository from "Repository/UserRepository"
>>>>>>> 4e66f8a (✨ Add email confimation logic)

interface ConfirmEmailInterface {
  UserRepo: UserRepository
}

<<<<<<< HEAD
interface IUser extends ParamsType {
=======
interface IUser {
>>>>>>> 4e66f8a (✨ Add email confimation logic)
  userId: string
  userToken: string
}

<<<<<<< HEAD
export const EmailConfirmation: (deps: ConfirmEmailInterface) => RouteHandler<Req<{}, {}, IUser>> = ({
  UserRepo
}: ConfirmEmailInterface) => async (req, res) => {
  const { userId } = req.params as IUser
  
  const user = await UserRepo.findById(userId)

  if(!user){
    return badRequestError(res, "Invalid user")
  }
  
  user.active = true
  
  await UserRepo.save(user)

  return actionSuccessful(res, {message: "Email Confirmado!!"})
=======
export const EmailConfirmation: (deps: ConfirmEmailInterface) => RequestHandler<DeepPartial<User>> = ({
  UserRepo
}: ConfirmEmailInterface) => async (req, res) => {

  const { userId, userToken } = req.params as IUser

  
  const user = await UserRepo.findById(userId)
  
  
  if(!user){
    return res.status(400).json({ error: "Invalid user" })
  }

  const validToken = UserRepo.compareHash(user!.token, userToken)

  
  if(!validToken) {
    return res.status(400).json({ error: 'Token expired' })
  }

  user.active = true

  await UserRepo.save(user)

  return res.redirect('/sessions')
>>>>>>> 4e66f8a (✨ Add email confimation logic)
}

export default EmailConfirmation
