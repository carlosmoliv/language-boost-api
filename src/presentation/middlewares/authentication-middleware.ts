import { HttpResponse } from '@presentation/interfaces'
import { Token } from '@application/contracts/gateways'
import { forbidden, ok } from '@presentation/helpers'
import { Middleware } from '@presentation/interfaces/middleware'
import { UserRoles } from '@domain/entities/base-user'

export class AuthenticationMiddleware implements Middleware {
  constructor (private readonly tokenService: Token) {}

  async handle (accessToken: string, roles?: UserRoles[]): Promise<HttpResponse> {
    try {
      const userData = this.tokenService.validate(accessToken)
      if (roles && roles.some((role) => role !== userData.role)) return forbidden()
      return ok(userData)
    } catch (err) {
      return forbidden()
    }
  }
}
