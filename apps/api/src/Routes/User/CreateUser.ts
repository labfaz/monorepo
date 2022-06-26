import UserRepository from "Repository/UserRepository";
import { UploadFiles } from "Utils/awsConfig";

import {
  createdSuccessfully,
  badRequestError,
  databaseError,
} from "Utils/endpointReturns";
import { RouteHandler } from "Utils/routeHandler";
import { Req } from "Utils/request";

import { ParsedUser } from "./ParseUser";
import { ParsedFiles } from "Middlewares/parseFiles";
import { removeCircularity } from "Utils/stringifyCircular";
import { sendConfirmationEmail } from "Mailer/emailConfirmation";
import DeficiencyRepository from "Repository/DeficiencyRepository";
import { Deficiency } from "Entities/Deficiency";
import { In } from "typeorm";
import { separeteNewAndExistentDeficiencies } from "./utils/deficienciesUtils";

interface CreateUserDeps {
  UserRepo: UserRepository;
  DeficiencyRepo: DeficiencyRepository
}

export const CreateUser: (
  deps: CreateUserDeps
) => RouteHandler<
  Req<{}, ParsedUser & ParsedFiles<"profilePicture" | "curriculum">>
> = ({ UserRepo, DeficiencyRepo: deficiencyRepo }: CreateUserDeps) => async (req, res) => {
  const { email, password, artist } = req.user_info! ?? {};

  const checkUserExists = await UserRepo.findByEmail(email);
  if (!!checkUserExists)
    return badRequestError(res, "Email address already exists.");

  try {
    const curriculum = req.parsedFiles?.curriculum ?? [];
    const profilePicture = req.parsedFiles?.profilePicture ?? [];
    const files = await UploadFiles([...curriculum, ...profilePicture]);

    const artistCurriculum = files.find(
      (file) => file.fieldname === "curriculum"
    )!;
    const artistProfilePicture = files.find(
      (file) => file.fieldname === "profilePicture"
    )!;

    const requestDeficiencies = req.user_info?.deficiencies ?? [];
    const deficiences = await separeteNewAndExistentDeficiencies(requestDeficiencies, deficiencyRepo);

    return UserRepo.createUser(
      email,
      password,
      artist,
      artistCurriculum,
      artistProfilePicture,
      {
        new: deficiences.new,
        existent: deficiences.existent,
      }
    )
     .then((user) => {
        sendConfirmationEmail(user);
        return user;
      })
      .then((user) => {
        // remove password and send user back
        let { password: _, ...newUser } = user;
        return createdSuccessfully(res, removeCircularity(newUser));
      })
      .catch((err) => databaseError(res, "Error trying to create user.", err));
  } catch {
    return badRequestError(
      res,
      "Error trying to create curriculum or profilePicture"
    );
  }
};
export default CreateUser;
