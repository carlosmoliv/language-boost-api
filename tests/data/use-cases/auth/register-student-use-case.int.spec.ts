import { MongoConnection } from '@infra/db/mongo/helpers'
import { BcryptAdapter } from '@infra/gateways'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { env } from '@main/config/env'
import { RegisterStudentUseCase } from '@application/use-cases/register-user-use-case'
import { makeFakeUser } from '@tests/factories'
import { EmailAlreadyInUseError } from '@application/use-cases/errors'

describe('RegisterStudentUseCase', () => {
  let connection: MongoConnection
  let sut: RegisterStudentUseCase
  let userRepository: MongoUserRepository

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
    const hasher = new BcryptAdapter()
    userRepository = new MongoUserRepository()
    sut = new RegisterStudentUseCase(
      userRepository,
      hasher
    )
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  it('should register a new Student', async () => {
    const userData = makeFakeUser()

    const result = await sut.execute(userData)

    const studentRegistered = await userRepository.findByCriteria({ email: userData.email })
    expect(result.isRight).toBeTruthy()
    expect(studentRegistered).toEqual(expect.objectContaining({
      name: userData.name,
      email: userData.email,
      status: 'pending',
      role: 'student',
      verifiedAt: null
    }))
  })

  it('should return error when the email provided is already in use', async () => {
    const userData1 = makeFakeUser()
    await userRepository.create(userData1)
    const userData2 = makeFakeUser()

    const result = await sut.execute({ ...userData2, email: userData1.email })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(EmailAlreadyInUseError)
  })
})
