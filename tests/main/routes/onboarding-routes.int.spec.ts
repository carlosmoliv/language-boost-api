import request from 'supertest'

import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { makeCreateFakeStudentOnDatabase } from '@tests/factories'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { OnboardingSteps } from '@domain/entities'

describe('Student Routes', () => {
  let connection: MongoConnection

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users', 'students'])
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  describe('/api/onboarding/:userId', () => {
    const publishSpy = jest.fn()
    jest.mock('@infra/gateways/rabbit-mq-adapter', () => ({
      RabbitMQAdapter: jest.fn().mockReturnValue({ publish: publishSpy })
    }))

    test('Mark Signup step as complete', async () => {
      publishSpy.mockResolvedValueOnce({})
      const user = await makeCreateFakeStudentOnDatabase()

      const { status } = await request(app)
        .put(`/api/students/${user.id}/onboarding`)
        .send({ onboardingStep: OnboardingSteps.SignupComplete })

      expect(status).toBe(204)
    })
  })
})
