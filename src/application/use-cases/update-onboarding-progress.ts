import { StudentRepository } from '@application/contracts/repositories'
import { OnboardingSteps, Student } from '@domain/entities'
import { StudentNotFoundError } from '@application/use-cases/errors'
import { MessageBroker } from '@application/contracts/gateways'

export class UpdateOnboardingProgressUseCase {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async execute ({ userId, onboardingStep }: UpdateOnboardingProgressUseCase.Input): Promise<void> {
    const studentFromDb = await this.studentRepository.findById(userId)
    if (!studentFromDb) throw new StudentNotFoundError()
    const student = Student.create(studentFromDb)
    student.markOnboardingStep(onboardingStep)
    await this.studentRepository.save({ ...student, id: studentFromDb.id })
    await this.messageBroker.publish({ onboardingStep: 'signupComplete', userId }, 'onboarding.progress.updated')
  }
}

export namespace UpdateOnboardingProgressUseCase {
  export type Input = { userId: string, onboardingStep: OnboardingSteps }
}
