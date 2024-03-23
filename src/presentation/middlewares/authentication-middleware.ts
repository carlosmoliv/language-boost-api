import { HttpResponse } from '@presentation/interfaces'
import { Token } from '@application/contracts/gateways'
import { ok } from '@presentation/helpers'
import { Middleware } from '@presentation/interfaces/middleware'

export class AuthenticationMiddleware implements Middleware {
  constructor (
    private readonly token: Token
  ) {}

  async handle (accessToken: string): Promise<HttpResponse> {
    const userId = this.token.validate(accessToken)
    return ok(userId)
  }
}
