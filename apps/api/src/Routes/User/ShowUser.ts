import UserRepository from "Repository/UserRepository";
import { RouteHandler } from "Utils/routeHandler";
import { ParamsType, Req } from "Utils/request";
import { badRequestError, unauthenticatedError, unauthorizedError, fetchedSuccessfully } from "Utils/endpointReturns";

interface ShowUserInterface {
  UserRepo: UserRepository;
}

interface IShow extends ParamsType{
  id: string;
}

export const ShowUser: (
  deps: ShowUserInterface
) => RouteHandler<Req<{}, {}, IShow>> = ({
  UserRepo,
}: ShowUserInterface) => async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return badRequestError(res, "Parâmetro de requisição incompleto");
  }
  if (typeof id !== "string") {
    return badRequestError(res, "Parâmetro de requisição inválido");
  }

  const user = await UserRepo.findById(id);

  if (!user) {
    return unauthenticatedError(res, "Usuário com esse ID não encontrado" );
  }

  if (!user.active) {
    return unauthorizedError(res, "Esse usuário não confirmou a sua conta pelo email!");
  }

  let { password: _, ...userQueried } = user;

  return fetchedSuccessfully(res, { user: userQueried })
};

export default ShowUser;
