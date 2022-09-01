import UserRepository from "Repository/UserRepository";
import { RouteHandler } from "Utils/routeHandler";
import { Req } from "Utils/request";
import { actionSuccessful, badRequestError, unauthorizedError } from "Utils/endpointReturns";

interface CreateSessionInterface {
  UserRepo: UserRepository;
}

interface IUser {
  email: string;
  password: string;
}

export const CreateSession: (
  deps: CreateSessionInterface
) => RouteHandler<Req<IUser>> = ({
  UserRepo,
}: CreateSessionInterface) => async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return badRequestError(res, "Incomplete request body");

  if (typeof email !== "string" || typeof password !== "string")
    return badRequestError(res, "Invalid request body");

  const userDB = await UserRepo.findByEmail(email);

  if (!userDB) {
    return unauthorizedError(res, "Email e/ou senha incorretos");
  }

  const passwordMatched = await UserRepo.compareHash(password, userDB.password);

  if (!passwordMatched) {
    return unauthorizedError(res, "Email e/ou senha incorretos");
  }

  if (!userDB.active) {
    return unauthorizedError(res, "Email ainda não foi confimado");
  }

  const token = await UserRepo.generateToken(email);

  //remove password from user query
  const userAsArray = Object.entries(userDB);
  const userWithoutPassword = userAsArray.filter(
    ([key, _]) => key !== "password"
  );
  const user = Object.fromEntries(userWithoutPassword);

  return actionSuccessful(res, { token, user })
};

export default CreateSession;
