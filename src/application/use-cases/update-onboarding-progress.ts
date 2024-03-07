import { StudentRepository } from '@application/contracts/repositories'
import { OnboardingSteps } from '@domain/entities'
import { StudentNotFoundError } from '@application/use-cases/errors'
import { MessageBroker } from '@application/contracts/gateways'

export class UpdateOnboardingProgressUseCase {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async execute ({ userId, onboardingStep }: UpdateOnboardingProgressUseCase.Input): Promise<void> {
    const student = await this.studentRepository.findById(userId)
    if (!student) throw new StudentNotFoundError()
    student.markOnboardingStep(onboardingStep)
    await this.studentRepository.update(student)
    await this.messageBroker.publish({ onboardingStep, userId }, 'onboarding.progress.updated')
  }
}

export namespace UpdateOnboardingProgressUseCase {
  export type Input = { userId: string, onboardingStep: OnboardingSteps }
}
