import { Controller, HttpResponse } from '@presentation/interfaces'
import { ok, serverError, unauthorized } from '@presentation/helpers/http'
import { AuthenticateUserUseCase } from '@data/use-cases'

type HttpRequest = { email: string, password: string }

export class LoginController implements Controller {
  constructor (private readonly authenticateUser: AuthenticateUserUseCase) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
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
