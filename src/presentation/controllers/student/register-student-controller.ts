import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { RegisterStudentUseCase } from '@application/use-cases/register-user-use-case'
import { conflict, noContent, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class RegisterStudentController implements Controller {
  constructor (private readonly registerStudent: RegisterStudentUseCase) {}

  async handle (request: RegisterStudentController.Request): Promise<HttpResponse<RegisterStudentController.Response>> {
    try {
      const result = await this.registerStudent.execute(request)
      if (result.isLeft() && result.value instanceof EmailAlreadyInUseError) return conflict(result.value)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RegisterStudentController {
  export type Request = { name: string, email: string, password: string }
  export type Response = undefined | Error
}
