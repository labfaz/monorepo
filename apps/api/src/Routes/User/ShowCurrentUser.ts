import UserRepository from "Repository/UserRepository";
import { RouteHandler } from "Utils/routeHandler";
import { Req } from "Utils/request";
import { fetchedSuccessfully, unauthenticatedError, unauthorizedError } from "Utils/endpointReturns";
import { UserJWTPayload } from "Middlewares/ensureAuthenticated";

interface ShowCurrentUserInterface {
  UserRepo: UserRepository;
}

export const ShowCurrentUser: (
  deps: ShowCurrentUserInterface
) => RouteHandler<Req<{}, UserJWTPayload>> = ({
  UserRepo,
}: ShowCurrentUserInterface) => async (req, res) => {
  const { id } = req.user ?? {}
  const user = await UserRepo.findById(id ?? "")

  if (!user)
    return unauthenticatedError(res, "Usuário não autenticado")
  if (!user.active)
    return unauthorizedError(res, "Esse usuário não confirmou usa conta pelo email!");

  const { password: _, ...userWithoutPassword } = user

  return fetchedSuccessfully(res, { user: userWithoutPassword })
};

export default ShowCurrentUser;
