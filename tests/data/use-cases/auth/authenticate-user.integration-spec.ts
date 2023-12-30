import { hash } from 'bcrypt'

import { AuthenticateUserUseCaseImp } from '@data/use-cases'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { JwtAdapter, BcryptAdapter } from '@infra/gateways'
import { MongoUserRepository } from '@infra/db/mongo/repositories/user.repository'
import { env } from '@main/config/env'

describe('AuthenticateUserUseCaseImp', () => {
  let sut: AuthenticateUserUseCaseImp
  let userRepo: MongoUserRepository

  beforeAll(async () => {
    await MongoHelper.connect(env.db.mongo.uri)
    userRepo = new MongoUserRepository()
    const hashComparer = new BcryptAdapter()
    const tokenGenerator = new JwtAdapter('any_secret')
    sut = new AuthenticateUserUseCaseImp(
      userRepo,
      hashComparer,
      tokenGenerator
    )
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return a token when the provided password and email matches', async () => {
    const password = await hash('any_password', 12)
    const userData = { name: 'any_name', email: 'any_email@gmail.com', password }
    await userRepo.create(userData)

    const result = await sut.execute({ email: 'any_email@gmail.com', password: 'any_password' })

    expect(result?.accessToken).toEqual(expect.any(String))
  })
})
