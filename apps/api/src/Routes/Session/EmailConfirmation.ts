import UserRepository from "Repository/UserRepository"
import { RouteHandler } from "Utils/routeHandler"
import { ParamsType, Req } from "Utils/request"
import { actionSuccessfulReturn, syntaticErrorReturn } from "Utils/endpointReturns"

interface ConfirmEmailInterface {
  UserRepo: UserRepository
}

interface IUser extends ParamsType {
  userId: string
  userToken: string
}

export const EmailConfirmation: (deps: ConfirmEmailInterface) => RouteHandler<Req<{}, {}, IUser>> = ({
  UserRepo
}: ConfirmEmailInterface) => async (req, res) => {
  const { userId } = req.params as IUser
  
  const user = await UserRepo.findById(userId)

  if(!user){
    return syntaticErrorReturn(res, "Invalid user")
  }
  
  user.active = true
  
  await UserRepo.save(user)

  return actionSuccessfulReturn(res, {message: "Email Confirmado!!"})
}

export default EmailConfirmation
