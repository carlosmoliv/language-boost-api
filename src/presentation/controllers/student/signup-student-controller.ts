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
      await this.registerStudent.execute(request)
      return noContent()
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) return conflict(error)
      return serverError(error)
    }
  }
}

export namespace SignUpStudentController {
  export type Request = { name: string, email: string, password: string }
  export type Response = undefined | Error
}
