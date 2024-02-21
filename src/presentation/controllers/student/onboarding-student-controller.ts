import { UpdateOnboardingProgressUseCase } from '@application/use-cases'
import { OnboardingSteps } from '@domain/entities'
import { noContent, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class OnboardingStudentController implements Controller {
  constructor (private readonly updateOnboardingProgress: UpdateOnboardingProgressUseCase) {}

  async handle (request: OnboardingStudentController.Input): Promise<HttpResponse<OnboardingStudentController.Output>> {
    try {
      await this.updateOnboardingProgress.execute(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace OnboardingStudentController {
  export type Input = { userId: string, onboardingStep: OnboardingSteps }
  export type Output = undefined | Error
}
