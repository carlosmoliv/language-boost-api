import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { RegisterStudentUseCase } from '@application/use-cases/register-user-use-case'
import { DbTransaction } from '@presentation/contracts'
import { conflict, noContent, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class RegisterStudentController implements Controller {
  constructor (
    private readonly registerStudent: RegisterStudentUseCase,
    private readonly dbTransaction: DbTransaction
  ) {}

  async handle (request: RegisterStudentController.Request): Promise<HttpResponse<RegisterStudentController.Response>> {
    await this.dbTransaction.openTransaction()
    try {
      const result = await this.registerStudent.execute(request)
      if (result.isLeft() && result.value instanceof EmailAlreadyInUseError) return conflict(result.value)
      await this.dbTransaction.commitTransaction()
      return noContent()
    } catch (error) {
      await this.dbTransaction.rollbackTransaction()
      return serverError(error)
    } finally {
      await this.dbTransaction.closeTransaction()
    }
  }
}

export namespace RegisterStudentController {
  export type Request = { name: string, email: string, password: string }
  export type Response = undefined | Error
}
