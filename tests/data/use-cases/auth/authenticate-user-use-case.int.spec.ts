import { hash } from 'bcrypt'

import { AuthenticateUserUseCase } from '@application/use-cases'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { JwtAdapter, BcryptAdapter } from '@infra/gateways'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { env } from '@main/config/env'
import { AuthenticationError } from '@application/use-cases/errors'
import { makeFakeUser } from '@tests/factories'

describe('AuthenticateUserImp', () => {
  let sut: AuthenticateUserUseCase
  let userRepo: MongoUserRepository
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
    userRepo = new MongoUserRepository()
    const hashComparer = new BcryptAdapter()
    const tokenGenerator = new JwtAdapter('any_secret')
    sut = new AuthenticateUserUseCase(
      userRepo,
      hashComparer,
      tokenGenerator
    )
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should return a token when the provided password and email match', async () => {
    const userData = makeFakeUser()
    const password = await hash(userData.password, 12)
    await userRepo.create({ ...userData, password })

    const result = await sut.execute({ email: userData.email, password: userData.password })

    expect(result?.isRight).toBeTruthy()
    expect(result?.value).toEqual({ accessToken: expect.any(String) })
  })

  it('should return AuthenticationError when the provided password does not match', async () => {
    const userData = makeFakeUser()
    const password = await hash(userData.password, 12)
    await userRepo.create({ ...userData, password })

    const result = await sut.execute({ email: userData.email, password: 'any_invalid_password' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(AuthenticationError)
  })

  it('should return AuthenticationError when User was not found', async () => {
    await connection.clearCollections(['users'])

    const result = await sut.execute({ email: 'any_email@gmail.com', password: 'any_password' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(AuthenticationError)
  })
})
