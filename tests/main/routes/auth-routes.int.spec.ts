import request from 'supertest'
import { hash } from 'bcrypt'

import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { UnauthorizedError } from '@presentation/errors'

describe('Auth Routes', () => {
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users'])
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Authentication succeeds when credentials match', async () => {
    const userData = makeFakeUser()
    const plainPassword = userData.password
    const password = await hash(userData.password, 12)
    userData.password = password
    await new MongoStudentRepository().create(userData)

    const { status, body } = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: plainPassword
      })

    expect(status).toBe(200)
    expect(body).toMatchObject({ accessToken: expect.any(String) })
  })

  test('Unauthorize authentication when credentials does not match', async () => {
    const userData = makeFakeUser()
    const password = await hash(userData.password, 12)
    userData.password = password
    await new MongoStudentRepository().create(userData)

    const { status, body } = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: 'invalid_password'
      })

    expect(status).toBe(401)
    expect(body).toEqual({ error: new UnauthorizedError().message })
  })

  test.each(['password', 'email'])('Authentication fails when %s is not provided', async (field) => {
    const credentialsData = { email: 'carlos@gmail.com', password: '123456' }
    const { status } = await request(app)
      .post('/api/login')
      .send({
        ...credentialsData,
        [field]: undefined
      })

    expect(status).toBe(400)
  })

  test('should return 400 when email is not valid', async () => {
    const { status } = await request(app)
      .post('/api/login')
      .send({
        email: 'invalid_email',
        password: '123456'
      })

    expect(status).toBe(400)
  })
})
