import { createdSuccessfully } from "Utils/endpointReturns"
import { RouteHandler } from "Utils/routeHandler"
import { Req } from "Utils/request"

import AnimalExampleRepository from "Repository/AnimalExampleRepository"
import { AnimalRequestBody } from "./GetAnimalFromParams"

interface DeleteAnimalDeps {
  AnimalExampleRepo: AnimalExampleRepository
}

export const DeleteAnimal: (deps: DeleteAnimalDeps) => RouteHandler<Req<AnimalRequestBody>> = ({
  AnimalExampleRepo,
}) => async (req, res) => {
  
  // get animal
  const { animal } = req.body

  // delete animal
  await AnimalExampleRepo.remove(animal)

  return createdSuccessfully(res, { animal })
}

export default DeleteAnimal
