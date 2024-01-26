import { makeRegisterStudentUseCase } from '@main/factories/application/use-cases'
import { makeDbTransactionControllerDecorator } from '@main/factories/presentation/decorators'
import { SignUpStudentController } from '@presentation/controllers/student'
import { Controller } from '@presentation/interfaces'

export const makeSignUpStudentController = (): Controller => {
  const controller = new SignUpStudentController(makeRegisterStudentUseCase())
  return makeDbTransactionControllerDecorator(controller)
}
