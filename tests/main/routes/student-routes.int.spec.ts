import request from 'supertest'

import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'
import { MongoConnection } from '@infra/db/mongo/helpers'

describe('Student Routes', () => {
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Register a Student', async () => {
    const userData = makeFakeUser()

    const { status } = await request(app)
      .post('/api/students')
      .send({
        name: userData.name,
        email: userData.email,
        password: userData.password
      })

    expect(status).toBe(204)
  })

  test.each(['name', 'email', 'email'])('Register fails when %s is not provided', async (field) => {
    const userData = makeFakeUser()

    const { status } = await request(app)
      .post('/api/students')
      .send({ ...userData, [field]: undefined })

    expect(status).toBe(400)
  })
})
