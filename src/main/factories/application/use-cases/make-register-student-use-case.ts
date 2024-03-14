import { makeMongoStudentRepository } from '@main/factories/infra/db/mongo/repositories'
import { makeBcryptAdapter } from '@main/factories/infra/gateways'
import { RegisterStudentUseCase } from '@application/use-cases/student/register-student'

export const makeRegisterStudentUseCase = (): RegisterStudentUseCase =>
  new RegisterStudentUseCase(makeMongoStudentRepository(), makeBcryptAdapter())
