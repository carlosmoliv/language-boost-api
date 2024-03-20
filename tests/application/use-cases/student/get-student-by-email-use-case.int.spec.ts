import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'
import {
  GetStudentByEmailUseCase
} from '@application/use-cases/student/get-student-by-email/get-student-by-email-use-case'

describe('GetStudentByEmailUseCase', () => {
  let connection: MongoConnection
  let sut: GetStudentByEmailUseCase
  let studentRepository: MongoStudentRepository

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
    studentRepository = new MongoStudentRepository()
    sut = new GetStudentByEmailUseCase(studentRepository)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Return a Student correlated with the email provided', async () => {
    const userData = makeFakeUser()
    await studentRepository.create(userData)

    const student = await sut.execute(userData)

    const studentRegistered = await studentRepository.findByEmail(userData.email)
    expect(studentRegistered?.email).toBe(student.email)
  })
})
