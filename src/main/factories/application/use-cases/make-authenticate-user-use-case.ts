import { makeMongoUserRepository } from '@main/factories/infra/db/mongo/repositories'
import { makeJwtAdapter, makeBcryptAdapter } from '@main/factories/infra/gateways'
import { AuthenticateUserUseCase } from '@application/use-cases'

export const makeAuthenticateUserUseCase = (): AuthenticateUserUseCase =>
  new AuthenticateUserUseCase(makeMongoUserRepository(), makeBcryptAdapter(), makeJwtAdapter())
