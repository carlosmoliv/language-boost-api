import { MongoConnection } from '@infra/db/mongo/helpers'
import { BcryptAdapter } from '@infra/gateways'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'
import { env } from '@main/config/env'
import { RegisterStudentUseCase } from '@application/use-cases/register-user-use-case'
import { makeFakeUser } from '@tests/factories'

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

    await sut.execute(userData)

    const studentRegistered = await userRepository.findByCriteria({ email: userData.email })
    expect(studentRegistered).toEqual(expect.objectContaining({
      name: userData.name,
      email: userData.email,
      status: 'pending',
      role: 'student',
      verifiedAt: null
    }))
  })
})
