import { UpdateOnboardingProgressUseCase } from '@application/use-cases/student/update-onboarding'
import { makeMongoStudentRepository } from '@main/factories/infra/db/mongo/repositories'
import { makeRabbitMQAdapter } from '@main/factories/infra/gateways'

export const makeUpdateOnboardingProgressUseCase = (): UpdateOnboardingProgressUseCase =>
  new UpdateOnboardingProgressUseCase(makeMongoStudentRepository(), makeRabbitMQAdapter())
