import { 
  badRequestError, 
  createdSuccessfully,
  notFoundError, 
  unauthenticatedError, 
  unauthorizedError, 
  unidentifiedError
} from "Utils/endpointReturns"
import { RouteHandler } from "Utils/routeHandler"
import { ParamsType, Req } from "Utils/request"

import { UserJWTPayload } from "Middlewares/ensureAuthenticated"

import UserRepository from "Repository/UserRepository"
import RequestRepository from "Repository/RequestRepository"
import CourseRepository from "Repository/CourseRepository"

interface CreateSubscritpionDeps {
  UserRepo: UserRepository,
  RequestRepo: RequestRepository,
  CourseRepo: CourseRepository
}

interface ICourse extends ParamsType {
  course_id: string
}

export const SubscribeToCourse: (
  deps: CreateSubscritpionDeps
) => RouteHandler<Req<{}, UserJWTPayload, ICourse>> = ({ UserRepo, RequestRepo, CourseRepo }: CreateSubscritpionDeps) => async (req, res) => {
  const { id } = req.user ?? {}
  const { course_id } = req.params

  if (!id) return badRequestError(res, "ID de usuário faltando")
  if (!course_id) return badRequestError(res, "ID do curso faltando")
  
  const [user, course] = await Promise.all([UserRepo.findById(id), CourseRepo.findById(course_id)])

  if (!user)        return unauthenticatedError(res, "ID de usuário não encontrado" )
  if (!course)      return notFoundError(res, 'Curso não encontrado')
  if (!user.active) return unauthorizedError(res, "Este usuário não confirmou seu endereço de email!!")
  if (user.banned)  return unauthorizedError(res, "Este usuário está banido")

  if (!course.available) return badRequestError(res, "Não pode se inscrever em um curso que não está mais disponível")
  if (!course.has_subscription) return badRequestError(res, "Essa atividade não aceita pedidos de inscrição")
  
  return RequestRepo.createRequest(user, course)
    .then(() => createdSuccessfully(res, "Requisição feita"))
    .catch(() => unidentifiedError(res, "Alguma coisa deu errado"))
  }

export default SubscribeToCourse
