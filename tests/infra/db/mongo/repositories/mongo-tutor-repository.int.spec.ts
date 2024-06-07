import { MongoConnection } from '@infra/db/mongo/helpers'
import { env } from '@main/config/env'
import { Tutor } from '@domain/entities/tutor'
import { faker } from '@faker-js/faker'
import { MongoTutorRepository } from '@infra/db/mongo/repositories/mongo-tutor-repository'

describe('MongoTutorRepository', () => {
  let sut: MongoTutorRepository
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users', 'tutors'])
    sut = new MongoTutorRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('create()', () => {
    test('Create a Student and check on database', async () => {
      const tutor = Tutor.create({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })

      await sut.create(tutor)

      // const retrievedTutor = await sut.findByEmail(tutor.email)
      // expect(retrievedTutor?.onboarding.signupComplete).toBe(false)
      // expect(retrievedTutor?.name).toBe(tutor.name)
    })
  })

  // describe('findByEmail()', () => {
  //   test('Retrieve a student using the email', async () => {
  //     const data = makeFakeUser()
  //     await sut.create(data)
  //
  //     const result = await sut.findByEmail(data.email)
  //
  //     expect(result?.email).toBe(data.email)
  //   })
  // })
  //
  // describe('update()', () => {
  //   test('Update student data', async () => {
  //     const id = new mongoose.Types.ObjectId().toHexString()
  //     const student = makeFakeUser({ id })
  //     await sut.create(student)
  //     const newData = { name: makeFakeUser().name, onboarding: { signupComplete: true } }
  //     student.name = newData.name
  //     student.onboarding.signupComplete = true
  //
  //     await sut.update(student)
  //
  //     const studentFromDatabase = await sut.findById(id)
  //     expect(studentFromDatabase?.name).toBe(newData.name)
  //     expect(studentFromDatabase?.onboarding.signupComplete).toBe(true)
  //   })
  // })
})
