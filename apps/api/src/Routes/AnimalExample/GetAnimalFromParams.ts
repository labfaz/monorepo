import AnimalExample from "Entities/AnimalExample"
import AnimalExampleRepository from "Repository/AnimalExampleRepository"
import { notFoundError, badRequestError } from "Utils/endpointReturns"
import { ParamsType, Req } from "Utils/request"
import { RouteHandler } from "Utils/routeHandler"

interface GetAnimalDeps {
  AnimalExampleRepo: AnimalExampleRepository,
}

export interface AnimalRequestBody {
  animal: AnimalExample
}

export interface AnimalIdParams extends ParamsType {
  id: string,
}

export const GetAnimalFromParams: (deps: GetAnimalDeps) => RouteHandler<Req<AnimalRequestBody, {}, AnimalIdParams>> = ({
  AnimalExampleRepo,
}) => async (req, res, next) => {

  const { id } = req.params ?? {}

  // return an error if id not in params
  if (!id) return badRequestError(res, "Id not present in route params")

  const animal = await AnimalExampleRepo.findOne({ id })

  // if id doesnt correspont to an animal
  if (!animal) return notFoundError(res, "Animal not found!" )

  // add animal to body
  req.body = { animal }

  // go to next middleware
  return next && next()
}

export default GetAnimalFromParams
