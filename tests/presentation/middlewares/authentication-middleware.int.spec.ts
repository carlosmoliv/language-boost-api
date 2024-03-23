import { Token } from '@application/contracts/gateways'
import { JwtAdapter } from '@infra/gateways'
import { env } from '@main/config/env'
import mongoose from 'mongoose'
import { AccessToken } from '@domain/entities'
import { AuthenticationMiddleware } from '@presentation/middlewares'

describe('AuthenticationMiddleware', () => {
  let tokenGateway: Token

  beforeAll(() => {
    tokenGateway = new JwtAdapter(env.jwt.secret)
  })

  test('Allow request to proceed when User token is valid', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString()
    const token = await tokenGateway.generate(userId, AccessToken.expirationInMs)

    const sut = new AuthenticationMiddleware(tokenGateway)
    const result = await sut.handle(token)

    expect(result.body).toBe(userId)
  })
})
