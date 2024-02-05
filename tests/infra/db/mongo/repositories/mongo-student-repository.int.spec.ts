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
      const data = { ...makeFakeUser(), role: UserRoles.Student }

      await sut.create(data)

      const retrievedUser = await sut.findByEmail({ email: data.email })
      expect(retrievedUser).toMatchObject({
        name: data.name,
        email: data.email,
        role: UserRoles.Student,
        student: expect.objectContaining({ _id: expect.any(mongoose.Types.ObjectId) })
      })
    })
  })

  describe('findByEmail()', () => {
    test('Retrieve a student using the email', async () => {
      const data = makeFakeUser()
      await sut.create(data)

      const result = await sut.findByEmail({ email: data.email })

      expect(result?.email).toBe(data.email)
    })
  })
})
