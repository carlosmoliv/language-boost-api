import { HttpResponse } from '@presentation/interfaces'
import { Token } from '@application/contracts/gateways'
import { forbidden, ok } from '@presentation/helpers'
import { Middleware } from '@presentation/interfaces/middleware'
import { JsonWebTokenError } from 'jsonwebtoken'

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly token: Token) {}

  async handle (accessToken: string): Promise<HttpResponse> {
    try {
      const userId = this.token.validate(accessToken)
      return ok(userId)
    } catch (err) {
      if (err instanceof JsonWebTokenError) return forbidden()
      throw err
    }
  }
}
