import UserRepository from "Repository/UserRepository";
import { RouteHandler } from "Utils/routeHandler";
import { Req } from "Utils/request";
import { actionSuccessfulReturn, syntaticErrorReturn, unauthorizedErrorReturn } from "Utils/endpointReturns";

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
    return syntaticErrorReturn(res, "Incomplete request body");

  if (typeof email !== "string" || typeof password !== "string")
    return syntaticErrorReturn(res, "Invalid request body");

  const userDB = await UserRepo.findByEmail(email);

  if (!userDB) {
    return unauthorizedErrorReturn(res, "Incorrect email/password combination.");
  }

  const passwordMatched = await UserRepo.compareHash(password, userDB.password);

  if (!passwordMatched) {
    return unauthorizedErrorReturn(res, "Incorrect email/password combination.");
  }

  if (!userDB.active) {
    console.log("no user in DB")
    return unauthorizedErrorReturn(res, "Email confimation needed");
  }

  const token = await UserRepo.generateToken(email);

  //remove password from user query
  const userAsArray = Object.entries(userDB);
  const userWithoutPassword = userAsArray.filter(
    ([key, _]) => key !== "password"
  );
  const user = Object.fromEntries(userWithoutPassword);

  return actionSuccessfulReturn(res, { token, user });
};

export default CreateSession;
