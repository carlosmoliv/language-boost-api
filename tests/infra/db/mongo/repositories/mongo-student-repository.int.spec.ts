import mongoose from 'mongoose'

import { makeFakeUser } from '@tests/factories'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { env } from '@main/config/env'

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

  describe('create', () => {
    it('should create an Student User', async () => {
      const data = { ...makeFakeUser(), role: 'student' }

      await sut.create(data)

      const retrievedUser = await sut.findByEmail({ email: data.email })
      expect(retrievedUser).toMatchObject({
        name: data.name,
        email: data.email,
        role: 'student',
        student: expect.objectContaining({ _id: expect.any(mongoose.Types.ObjectId) })
      })
    })
  })

  describe('findByEmail()', () => {
    it('should return an Student with the provided email', async () => {
      const data = makeFakeUser()
      await sut.create(data)

      const result = await sut.findByEmail({ email: data.email })

      expect(result?.email).toBe(data.email)
    })
  })
})
