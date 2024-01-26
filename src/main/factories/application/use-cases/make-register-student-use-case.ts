import { makeMongoUserRepository } from '@main/factories/infra/db/mongo/repositories'
import { makeBcryptAdapter } from '@main/factories/infra/gateways'
import { RegisterStudentUseCase } from '@application/use-cases'

export const makeRegisterStudentUseCase = (): RegisterStudentUseCase =>
  new RegisterStudentUseCase(makeMongoUserRepository(), makeBcryptAdapter())
