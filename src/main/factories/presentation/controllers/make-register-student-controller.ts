import { makeRegisterStudentUseCase } from '@main/factories/application/use-cases'
import { RegisterStudentController } from '@presentation/controllers/student'
import { MongoConnection } from '@infra/db/mongo/helpers'

export const makeRegisterStudentController = (): RegisterStudentController =>
  new RegisterStudentController(makeRegisterStudentUseCase(), MongoConnection.getInstance())
