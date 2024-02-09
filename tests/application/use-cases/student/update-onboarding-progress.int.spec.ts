import { OnboardingSteps } from '@domain/entities'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'
import mongoose from 'mongoose'
import { UpdateOnboardingProgressUseCase } from '@application/use-cases'

describe('UpdateOnboardingProgressUseCase', () => {
  let connection: MongoConnection
  let sut: UpdateOnboardingProgressUseCase
  let studentRepository: MongoStudentRepository

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users', 'students'])
    studentRepository = new MongoStudentRepository()
    sut = new UpdateOnboardingProgressUseCase(studentRepository)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Update onboarding progress', async () => {
    const userData = makeFakeUser()
    const userId = new mongoose.Types.ObjectId().toHexString()
    await studentRepository.create({ ...userData, id: userId })

    await sut.execute({ userId, onboardingStep: OnboardingSteps.SignupComplete })

    const studentWithOnboarding = await studentRepository.findByEmail({ email: userData.email })
    expect(studentWithOnboarding).toMatchObject({
      student: {
        onboarding: {
          signupComplete: true
        }
      }
    })
  })
})
