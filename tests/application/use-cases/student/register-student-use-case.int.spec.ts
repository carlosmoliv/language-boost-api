import { RegisterStudentUseCase } from '@application/use-cases'
import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { UserRoles, UserStatus } from '@domain/entities'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { BcryptAdapter } from '@infra/gateways'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'

describe('RegisterStudentUseCase', () => {
  let connection: MongoConnection
  let sut: RegisterStudentUseCase
  let userRepository: MongoStudentRepository

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
    const hasher = new BcryptAdapter()
    userRepository = new MongoStudentRepository()
    sut = new RegisterStudentUseCase(
      userRepository,
      hasher
    )
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Register a Student', async () => {
    const userData = makeFakeUser()

    await sut.execute(userData)

    const studentRegistered = await userRepository.findByEmail(userData.email)
    expect(studentRegistered).toEqual(expect.objectContaining({
      name: userData.name,
      email: userData.email,
      status: UserStatus.Pending,
      role: UserRoles.Student,
      verifiedAt: null
    }))
  })

  test('Register fails when email already exists', async () => {
    const userData1 = makeFakeUser()
    await userRepository.create(userData1)
    const userData2 = makeFakeUser()

    const result = sut.execute({ ...userData2, email: userData1.email })

    await expect(result).rejects.toThrow(EmailAlreadyInUseError)
  })
})
