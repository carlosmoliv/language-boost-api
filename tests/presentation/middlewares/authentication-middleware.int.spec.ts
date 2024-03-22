import { HttpResponse } from '@presentation/interfaces'
import { Token } from '@application/contracts/gateways'
import { JwtAdapter } from '@infra/gateways'
import { env } from '@main/config/env'
import { ok } from '@presentation/helpers'
import mongoose from 'mongoose'
import { AccessToken } from '@domain/entities'

describe('AuthenticationMiddleware', () => {
  let tokenGateway: Token

  beforeAll(() => {
    tokenGateway = new JwtAdapter(env.jwt.secret)
  })

  interface Middleware {
    handle: (httpRequest: any) => Promise<HttpResponse>
  }

  class AuthenticationMiddleware implements Middleware {
    constructor (
      private readonly token: Token
    ) {}

    async handle (accessToken: string): Promise<HttpResponse> {
      const userId = this.token.validate(accessToken)
      return ok(userId)
    }
  }

  test('Allow request to proceed when User token is valid', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString()
    const token = await tokenGateway.generate(userId, AccessToken.expirationInMs)

    const sut = new AuthenticationMiddleware(tokenGateway)
    const result = await sut.handle(token)

    expect(result.body).toBe(userId)
  })
})
