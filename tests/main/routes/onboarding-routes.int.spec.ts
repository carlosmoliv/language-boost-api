import request from 'supertest'

import { app } from '@main/config/app'
import { env } from '@main/config/env'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { OnboardingSteps } from '@domain/entities'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import mongoose from 'mongoose'
import { makeFakeUser } from '@tests/factories'

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

  describe.skip('/api/onboarding/:userId', () => {
    const publishSpy = jest.fn()
    jest.mock('@infra/gateways/rabbit-mq-adapter', () => ({
      RabbitMQAdapter: jest.fn().mockReturnValue({ publish: publishSpy })
    }))

    test('Mark Signup step as complete', async () => {
      publishSpy.mockResolvedValueOnce({})
      const id = new mongoose.Types.ObjectId().toHexString()
      await new MongoStudentRepository().create(makeFakeUser({ id }))

      const { status } = await request(app)
        .put(`/api/students/${id}/onboarding`)
        .send({ onboardingStep: OnboardingSteps.SignupComplete })

      const student = await new MongoStudentRepository().findById(id)
      expect(status).toBe(204)
      expect(student).toMatchObject({
        onboarding: {
          signupComplete: true
        }
      })
    })

    test('Update fails when an invalid onboarding step is provided.', async () => {
      const { status } = await request(app)
        .put('/api/students/userId/onboarding')
        .send({ onboardingStep: 'invalid_option' })

      expect(status).toBe(400)
    })
  })
})
