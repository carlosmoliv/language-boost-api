import { hash } from 'bcrypt'

import { AuthenticateUserUseCase } from '@application/use-cases'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { JwtAdapter, BcryptAdapter } from '@infra/gateways'
import { MongoStudentRepository } from '@infra/db/mongo/repositories/mongo-student-repository'
import { env } from '@main/config/env'
import { AuthenticationError } from '@application/use-cases/errors'
import { makeFakeUser } from '@tests/factories'

describe('AuthenticateUserUseCase', () => {
  let sut: AuthenticateUserUseCase
  let studentRepository: MongoStudentRepository
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
    studentRepository = new MongoStudentRepository()
    const hashComparer = new BcryptAdapter()
    const tokenGenerator = new JwtAdapter('any_secret')
    sut = new AuthenticateUserUseCase(
      studentRepository,
      hashComparer,
      tokenGenerator
    )
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Generate an access token when email and password match', async () => {
    const user = makeFakeUser()
    const plainPassword = user.password
    user.password = await hash(user.password, 12)
    await studentRepository.create(user)

    const result = await sut.execute({ email: user.email, password: plainPassword })

    expect(result).toEqual({ accessToken: expect.any(String) })
  })

  test('Authenticate fails when password does not match', async () => {
    const user = makeFakeUser()
    const password = await hash(user.password, 12)
    user.password = password
    await studentRepository.create(user)

    const result = sut.execute({ email: user.email, password: 'any_invalid_password' })

    await expect(result).rejects.toThrow(AuthenticationError)
  })

  test('Authenticate fails when User is not found', async () => {
    await connection.clearCollections(['users'])

    const result = sut.execute({ email: 'any_email@gmail.com', password: 'any_password' })

    await expect(result).rejects.toThrow(AuthenticationError)
  })
})
