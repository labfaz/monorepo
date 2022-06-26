import express from "express"
import { Connection } from "typeorm"
import { Router } from "Routes"


import UserRepository from "Repository/UserRepository"

import { FileType, parseFiles } from "Middlewares/parseFiles"
import ensureAuthenticated from "Middlewares/ensureAuthenticated"

import ShowUser from "./ShowUser"
import UpdateUser from "./UpdateUser"
import SearchUsers from "./SearchUsers"
import { ParseUser } from "./ParseUser"
import { ParseUpdateUser  } from "./ParesUpdateUser"
import { CreateUser } from "./CreateUser"
import ShowCurrentUser from "./ShowCurrentUser"
import ResendEmail from "./ResendEmail"
import DeficiencyRepository from "Repository/DeficiencyRepository"

// import subscribeToCourse from "./SubscribeToCourse";
// import CourseRepository from "Repository/CourseRepository";
// import RequestRepository from "Repository/RequestRepository";

type UserDeps = {
  conn: Connection;
  UserRepo?: UserRepository;
  DeficiencyRepo?: DeficiencyRepository;
};

const UserRouter: Router<UserDeps> = (deps, options) => {
  const { 
    conn, 
    UserRepo = conn.getCustomRepository(UserRepository), 
    DeficiencyRepo = conn.getCustomRepository(DeficiencyRepository) 
  } = deps;
  // const CourseRepo = conn.getCustomRepository(CourseRepository)
  // const RequestRepo = conn.getCustomRepository(RequestRepository)

  return express
    .Router(options)
    .post(
      "/create",
      parseFiles([
        { fieldName: "profilePicture", type: FileType.image, max: 1, min: 1, maxSize: 15 * 1024 * 1024 },
        { fieldName: "curriculum", type: FileType.pdf , max: 1, min: 0, maxSize: 20 * 1024 * 1024 },
      ]),
      ParseUser,
      CreateUser({ UserRepo, DeficiencyRepo })
    )
    .put(
      "/update",
      parseFiles([
        { fieldName: "profilePicture", type: FileType.image, max: 1, min: 0, maxSize: 15 * 1024 * 1024 },
        { fieldName: "curriculum", type: FileType.pdf , max: 1, min: 0, maxSize: 20 * 1024 * 1024 },
      ]),
      ensureAuthenticated,
      ParseUpdateUser,
      UpdateUser({ UserRepo })
    )
    .get("/search", SearchUsers({ UserRepo }))
    .get("/me", ensureAuthenticated, ShowCurrentUser({ UserRepo }))
    .get("/:id", ShowUser({ UserRepo }))
    .post("/confirm-mail", ResendEmail({ UserRepo }))
};

export default UserRouter;
