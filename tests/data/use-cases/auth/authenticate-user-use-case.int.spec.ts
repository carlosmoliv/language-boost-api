import { hash } from 'bcrypt'

import { AuthenticateUserUseCase } from '@data/use-cases'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { JwtAdapter, BcryptAdapter } from '@infra/gateways'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { env } from '@main/config/env'
import { AuthenticationError } from '@domain/errors'
import { makeFakeUser } from '@tests/factories'

describe('AuthenticateUserImp', () => {
  let sut: AuthenticateUserUseCase
  let userRepo: MongoUserRepository

  beforeAll(async () => {
    await MongoHelper.connect(env.db.mongo.uri)
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
    await MongoHelper.disconnect()
  })

  it('should return a token when the provided password and email match', async () => {
    const userData = makeFakeUser()
    const password = await hash(userData.password, 12)
    await userRepo.create({ ...userData, password })

    const result = await sut.execute({ email: userData.email, password: userData.password })

    expect(result?.accessToken).toEqual(expect.any(String))
  })

  it('should return AuthenticationError when the provided password does not match', async () => {
    const userData = makeFakeUser()
    const password = await hash(userData.password, 12)
    await userRepo.create({ ...userData, password })

    const promise = sut.execute({ email: userData.email, password: 'any_invalid_password' })

    await expect(promise).rejects.toThrow(AuthenticationError)
  })

  it('should return AuthenticationError when User was not found', async () => {
    await MongoHelper.clearCollections(['users'])

    const promise = sut.execute({ email: 'any_email@gmail.com', password: 'any_password' })

    await expect(promise).rejects.toThrow(AuthenticationError)
  })
})
