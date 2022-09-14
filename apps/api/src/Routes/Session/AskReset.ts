import { DeepPartial } from "typeorm";

import User from "Entities/User";
import UserRepository from "Repository/UserRepository";
import { RouteHandler } from "Utils/routeHandler";
import { Req } from "Utils/request";
import { actionSuccessful, badRequestError } from "Utils/endpointReturns";
import { sendPwdResetEmail } from "Repository/passwordReset";

interface AskResetInterface {
  UserRepo: UserRepository;
}

export const AskReset: (
  deps: AskResetInterface
) => RouteHandler<Req<DeepPartial<User>>> = ({ UserRepo }: AskResetInterface) => async (
  req,
  res
) => {
  const { email } = req.body

  if (!email) {
    return badRequestError(res, "Requisição Incompleta!!")
  }

  if (typeof email !== "string") {
    return badRequestError(res, "Requisição Inválida!!" );
  }

  const user = await UserRepo.findByEmail(email);

  if (!user) {
    return badRequestError(res, "Esse email ainda não foi cadastrado!!" )
  }

  const token = await UserRepo.generateResetPasswordToken(email);

  sendPwdResetEmail(user, token)
  
  if (process.env.NODE_ENV === "development")
    return actionSuccessful(res, { message: "Reset token sent to email!", token });
  else return actionSuccessful(res, { message: "Reset token sent to email!"});
};

export default AskReset;
