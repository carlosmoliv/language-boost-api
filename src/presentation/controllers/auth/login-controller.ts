import { AuthenticateUserUseCase } from '@data/use-cases'
import { ok, serverError, unauthorized } from '@presentation/helpers/http'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class LoginController implements Controller {
  constructor (private readonly authenticateUser: AuthenticateUserUseCase) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const { email, password } = request
      const result = await this.authenticateUser.execute({ email, password })
      if (result.isLeft()) return unauthorized()
      return ok({ accessToken: result.value.accessToken })
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
