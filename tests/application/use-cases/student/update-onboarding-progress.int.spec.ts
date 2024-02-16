import mongoose from 'mongoose'
import { mock, MockProxy } from 'jest-mock-extended'

import { OnboardingSteps } from '@domain/entities'
import { MongoConnection } from '@infra/db/mongo/helpers'
import { MongoStudentRepository } from '@infra/db/mongo/repositories'
import { env } from '@main/config/env'
import { makeFakeUser } from '@tests/factories'
import { UpdateOnboardingProgressUseCase } from '@application/use-cases'
import { StudentNotFoundError } from '@application/use-cases/errors'
import { MessageBroker } from '@application/contracts/gateways'

describe('UpdateOnboardingProgressUseCase', () => {
  let connection: MongoConnection
  let sut: UpdateOnboardingProgressUseCase
  let studentRepository: MongoStudentRepository
  let messageBroker: MockProxy<MessageBroker>

  beforeAll(async () => {
    connection = MongoConnection.getInstance()
    await connection.connect(env.db.mongo.uri)
    await connection.clearCollections(['users', 'students'])
    studentRepository = new MongoStudentRepository()
    messageBroker = mock()
    messageBroker.publish.mockResolvedValue()
    sut = new UpdateOnboardingProgressUseCase(studentRepository, messageBroker)
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  test('Update onboarding progress', async () => {
    const userData = makeFakeUser()
    const userId = new mongoose.Types.ObjectId().toHexString()
    await studentRepository.create({ ...userData, id: userId })

    await sut.execute({ userId, onboardingStep: OnboardingSteps.SignupComplete })

    const studentWithOnboarding = await studentRepository.findByEmail(userData.email)
    expect(studentWithOnboarding).toMatchObject({
      student: {
        onboarding: { signupComplete: true }
      }
    })
  })

  test('Update fails when user does not exist', async () => {
    const userId = new mongoose.Types.ObjectId().toHexString()

    const promise = sut.execute({ userId, onboardingStep: OnboardingSteps.SignupComplete })

    await expect(promise).rejects.toThrow(StudentNotFoundError)
  })

  test('Interaction with the message broker', async () => {
    const userData = makeFakeUser()
    const userId = new mongoose.Types.ObjectId().toHexString()
    await studentRepository.create({ ...userData, id: userId })

    await sut.execute({ userId, onboardingStep: OnboardingSteps.SignupComplete })

    expect(messageBroker.publish).toHaveBeenCalledWith(
      { userId, onboardingStep: OnboardingSteps.SignupComplete },
      'onboarding.progress.updated'
    )
  })
})
