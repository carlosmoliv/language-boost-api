import { AuthenticateUserUseCase } from '@data/use-cases'
import { ok, serverError } from '@presentation/helpers/http'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class LoginController implements Controller {
  constructor (private readonly authenticateUser: AuthenticateUserUseCase) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request
      const token = await this.authenticateUser.execute({ email, password })
      return ok(token)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
