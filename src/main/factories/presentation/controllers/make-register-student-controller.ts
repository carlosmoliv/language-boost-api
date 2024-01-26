import { makeRegisterStudentUseCase } from '@main/factories/application/use-cases'
import { makeDbTransactionControllerDecorator } from '@main/factories/presentation/decorators'
import { RegisterStudentController } from '@presentation/controllers/student'
import { Controller } from '@presentation/interfaces'

export const makeRegisterStudentController = (): Controller => {
  const controller = new RegisterStudentController(makeRegisterStudentUseCase())
  return makeDbTransactionControllerDecorator(controller)
}
