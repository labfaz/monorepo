import express from "express"
import { Router, RouterDeps } from "Routes"
import DeficiencyRepository from "Repository/DeficiencyRepository";
import { fetchedSuccessfully } from "Utils/endpointReturns";
import { Deficiency } from "Entities/Deficiency";

type DeficienciesDeps = {
  DeficiencyRepo?: DeficiencyRepository;
} & RouterDeps;

const DeficiencesRouter: Router<DeficienciesDeps> = (deps, options) => {
  const { 
    conn,
    DeficiencyRepo: deficiencyRepo = conn.getRepository(Deficiency), 
  } = deps;

  const defaultOrderBy:{ [P in keyof Deficiency]?: "ASC" | "DESC" | 1 | -1} = {name: "ASC"}

  return express
    .Router(options)
    .get("/", async (_req, res) => {
      const result = await deficiencyRepo.find({order: defaultOrderBy});
      return fetchedSuccessfully(res, result)
    })
    .get("/custom", async (_req, res) => {
      const result = await deficiencyRepo.find({where: {isCustom: true}, order: defaultOrderBy});
      return fetchedSuccessfully(res, result)
    })
    .get("/system", async (_req, res) => {
      const result = await deficiencyRepo.find({where: {isCustom: false}, order: defaultOrderBy});
      return fetchedSuccessfully(res, result)
    })
};

export default DeficiencesRouter;
