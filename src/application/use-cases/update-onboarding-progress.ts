import { StudentRepository } from '@application/contracts/repositories'
import { OnboardingSteps, Student } from '@domain/entities'
import { StudentNotFoundError } from '@application/use-cases/errors'

export namespace UpdateOnboardingProgressUseCase {
  export type Input = { userId: string, onboardingStep: OnboardingSteps }
}

export class UpdateOnboardingProgressUseCase {
  constructor (private readonly studentRepository: StudentRepository) {}

  async execute ({ userId, onboardingStep }: UpdateOnboardingProgressUseCase.Input): Promise<void> {
    const studentFromDb = await this.studentRepository.findById(userId)
    if (!studentFromDb) throw new StudentNotFoundError()
    const student = Student.create(studentFromDb)
    student.markOnboardingStep(onboardingStep)
    await this.studentRepository.save({ ...student, id: studentFromDb.id })
  }
}
