import { verify } from "jsonwebtoken";

import { ITokenPayload } from "Middlewares/ensureAuthenticated";
import UserRepository from "Repository/UserRepository";
import authConfig from "Config/auth";
import { RouteHandler } from "Utils/routeHandler";
import { Req } from "Utils/request";
import { actionSuccessful, badRequestError, unauthenticatedError } from "Utils/endpointReturns";

interface ResetPasswordInterface {
  UserRepo: UserRepository;
}

interface ResetPasswordI {
  password: string;
  token: string;
}

export const ResetPassword: (
  deps: ResetPasswordInterface
) => RouteHandler<Req<ResetPasswordI>> = ({
  UserRepo,
}: ResetPasswordInterface) => async (req, res) => {
  const { password, token } = req.body

  if (!token || !password) {
    return badRequestError(res, "Incomplete request body!!")
  }

  if (typeof token !== "string" || typeof password !== "string") {
    return badRequestError(res, "Invalid request body!!")
  }

  const decoded = verify(token, authConfig.token.secret);
  // console.log(decoded);
  const { id } = decoded as ITokenPayload;

  if (id) {
    const user = await UserRepo.findById(id);

    if (!user) {
      return badRequestError(res, "Esse usuário ainda não foi cadastrado!!")
    }

    const comparePassword = await UserRepo.compareHash(password, user.password);

    if (comparePassword) {
      return badRequestError(res, "Você não pode mudar para a mesma senha !!")
    }

    user.password = await UserRepo.generateHash(password);
    await UserRepo.save(user);
  } else {
    return unauthenticatedError(res, "Token is not valid!!")
  }

  return actionSuccessful(res, "Password Changed Sucessfully !!");
};

export default ResetPassword;
