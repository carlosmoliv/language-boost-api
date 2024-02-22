import { UpdateOnboardingProgressUseCase } from '@application/use-cases'
import { OnboardingSteps } from '@domain/entities'
import { noContent, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/interfaces'

export class OnboardingStudentController implements Controller {
  constructor (private readonly updateOnboardingProgress: UpdateOnboardingProgressUseCase) {}

  async handle (request: OnboardingStudentController.Request): Promise<HttpResponse<OnboardingStudentController.Response>> {
    try {
      await this.updateOnboardingProgress.execute(request)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace OnboardingStudentController {
  export type Request = { userId: string, onboardingStep: OnboardingSteps }
  export type Response = undefined | Error
}
