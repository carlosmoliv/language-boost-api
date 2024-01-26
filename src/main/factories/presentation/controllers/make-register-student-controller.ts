import { MongoConnection } from '@infra/db/mongo/helpers'
import { makeRegisterStudentUseCase } from '@main/factories/application/use-cases/make-register-student-use-case'
import { RegisterStudentController } from '@presentation/controllers/student'

export const makeRegisterStudentController = (): RegisterStudentController =>
  new RegisterStudentController(makeRegisterStudentUseCase(), MongoConnection.getInstance())
