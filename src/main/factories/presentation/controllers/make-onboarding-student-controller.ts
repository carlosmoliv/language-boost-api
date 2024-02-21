import { makeUpdateOnboardingProgressUseCase } from '@main/factories/application/use-cases/make-update-onboarding-progress-use-case'
import { makeDbTransactionControllerDecorator } from '@main/factories/presentation/decorators'
import { OnboardingStudentController } from '@presentation/controllers/student'
import { Controller } from '@presentation/interfaces'

export const makeOnboardingStudentController = (): Controller => {
  const controller = new OnboardingStudentController(makeUpdateOnboardingProgressUseCase())
  return makeDbTransactionControllerDecorator(controller)
}
