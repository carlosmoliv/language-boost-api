import request from 'supertest'
import { hash } from 'bcrypt'

import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'
import { MongoHelper } from '@infra/db/mongo/helpers'
import { MongoUserRepository } from '@infra/db/mongo/repositories/mongo-user-repository'

describe('Auth Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.db.mongo.uri)
    await MongoHelper.clearCollections(['users'])
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return 200 and a token when successfuly logging a User', async () => {
    const userData = makeFakeUser()
    const password = await hash(userData.password, 12)
    await new MongoUserRepository().create({ ...userData, password })

    const { status, body } = await request(app)
      .post('/api/login')
      .send({
        email: userData.email,
        password: userData.password
      })

    expect(status).toBe(200)
    expect(body).toEqual({ accessToken: expect.any(String) })
  })
})
