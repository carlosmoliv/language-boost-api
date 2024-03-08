import mongoose from 'mongoose'

import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { makeFakeUser } from '@tests/factories'
import { env } from '@main/config/env'
import { UserRoles } from '@domain/entities'

describe('MongoStudentRepository', () => {
  let sut: MongoStudentRepository
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users', 'students'])
    sut = new MongoStudentRepository()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('create()', () => {
    test('Create a Student and check on database', async () => {
      const data = makeFakeUser()

      await sut.create(data)

      const retrievedUser = await sut.findByEmail(data.email)
      expect(retrievedUser).toMatchObject({
        name: data.name,
        email: data.email,
        role: UserRoles.Student,
        student: expect.objectContaining({
          _id: expect.any(mongoose.Types.ObjectId),
          onboarding: expect.objectContaining({
            signupComplete: false,
            languageProficiencyComplete: false,
            learningGoalsComplete: false
          })
        })
      })
    })
  })

  describe('findByEmail()', () => {
    test('Retrieve a student using the email', async () => {
      const data = makeFakeUser()
      await sut.create(data)

      const result = await sut.findByEmail(data.email)

      expect(result?.email).toBe(data.email)
    })
  })

  describe('findById()', () => {
    test('Retrieve a student using the ID', async () => {
      const id = new mongoose.Types.ObjectId().toHexString()
      await sut.create(makeFakeUser({ id }))

      const result = await sut.findById(id)

      expect(result?.id).toBe(id)
    })
  })

  // describe.only('update()', () => {
  //   test('Update student data', async () => {
  //     const studentData = makeFakeUser({ id: new mongoose.Types.ObjectId().toHexString() })
  //     const newData = { name: makeFakeUser().name }
  //     const createdStudent = await sut.findById(studentData.id)
  //     studentData.name = newData.name
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     await sut.update(studentData)

  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     const fuck = await sut.findById(student.id)
  //     expect(fuck?.name).toBe(newStudentData.name)
  //   })
  // })
})
