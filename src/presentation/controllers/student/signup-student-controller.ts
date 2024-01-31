import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { RegisterStudentUseCase } from '@application/use-cases'
import { conflict, noContent, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class SignUpStudentController implements Controller {
  constructor (
    private readonly registerStudent: RegisterStudentUseCase
  ) {}

  async handle (request: SignUpStudentController.Request): Promise<HttpResponse<SignUpStudentController.Response>> {
    try {
      const result = await this.registerStudent.execute(request)
      if (result.isLeft() && result.value instanceof EmailAlreadyInUseError) return conflict(result.value)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpStudentController {
  export type Request = { name: string, email: string, password: string }
  export type Response = undefined | Error
}
