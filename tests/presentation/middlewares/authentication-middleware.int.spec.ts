import { Token } from '@application/contracts/gateways'
import { JwtAdapter } from '@infra/gateways'
import { env } from '@main/config/env'
import mongoose from 'mongoose'
import { AccessToken } from '@domain/entities'
import { AuthenticationMiddleware } from '@presentation/middlewares'
import { UserRoles } from '@domain/entities/base-user'
import { HttpStatus } from '@presentation/enums'

describe('AuthenticationMiddleware', () => {
  let tokenGateway: Token
  let sut: AuthenticationMiddleware

  beforeAll(() => {
    tokenGateway = new JwtAdapter(env.jwt.secret)
    sut = new AuthenticationMiddleware(tokenGateway)
  })

  test('Allow request to proceed when User token is valid', async () => {
    const payload = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      role: UserRoles.Student
    }
    const token = await tokenGateway.generate(payload, AccessToken.expirationInMs)

    const result = await sut.handle(token)

    expect(result.body).toMatchObject(payload)
  })

  test('Prevent Users with an invalid token', async () => {
    const payload = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      role: UserRoles.Student
    }
    const token = await tokenGateway.generate(payload, 0)

    const result = await sut.handle(token)

    expect(result.statusCode).toBe(HttpStatus.Forbidden)
  })

  test('Prevent users with insufficient role permission', async () => {
    const payload = {
      userId: new mongoose.Types.ObjectId().toHexString(),
      role: UserRoles.Student
    }
    const token = await tokenGateway.generate(payload, AccessToken.expirationInMs)

    const result = await sut.handle(token, [UserRoles.Admin])

    expect(result.statusCode).toBe(HttpStatus.Forbidden)
  })
})
