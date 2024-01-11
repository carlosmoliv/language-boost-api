import { Controller, HttpResponse } from '@presentation/interfaces'
import { ok, serverError, unauthorized } from '@presentation/helpers/http'
import { AuthenticateUserUseCase } from '@application/use-cases'

export class LoginController implements Controller {
  constructor (private readonly authenticateUser: AuthenticateUserUseCase) {}

  async handle ({ email, password }: LoginController.Request): Promise<HttpResponse<LoginController.Response>> {
    try {
      const result = await this.authenticateUser.execute({ email, password })
      if (result.isLeft()) return unauthorized()
      return ok({ accessToken: result.value.accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoginController {
  export type Request = { email: string, password: string }
  export type Response = { accessToken: string } | Error
}
