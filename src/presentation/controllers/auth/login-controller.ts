import { Controller, HttpResponse } from '@presentation/interfaces'
import { ok, serverError, unauthorized } from '@presentation/helpers/http'
import { AuthenticateUserUseCase } from '@application/use-cases'
import { AuthenticationError } from '@application/use-cases/errors'

export class LoginController implements Controller {
  constructor (private readonly authenticateUser: AuthenticateUserUseCase) {}

  async handle ({ email, password }: LoginController.Request): Promise<HttpResponse<LoginController.Response>> {
    try {
      const accessToken = await this.authenticateUser.execute({ email, password })
      return ok(accessToken)
    } catch (error) {
      if (error instanceof AuthenticationError) return unauthorized()
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = { email: string, password: string }
  export type Response = { accessToken: string } | Error
}
