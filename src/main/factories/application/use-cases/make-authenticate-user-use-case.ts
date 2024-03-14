import { makeMongoStudentRepository } from '@main/factories/infra/db/mongo/repositories'
import { makeJwtAdapter, makeBcryptAdapter } from '@main/factories/infra/gateways'
import { AuthenticateUserUseCase } from '@application/use-cases/authentication/authenticate-user'

export const makeAuthenticateUserUseCase = (): AuthenticateUserUseCase =>
  new AuthenticateUserUseCase(makeMongoStudentRepository(), makeBcryptAdapter(), makeJwtAdapter())
