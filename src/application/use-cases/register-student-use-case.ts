import { Hasher } from '@application/contracts/gateways'
import { StudentRepository } from '@application/contracts/repositories'
import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { Onboarding, Student } from '@domain/entities'

export namespace RegisterStudentUseCase {
  export type Input = { name: string, email: string, password: string }
}

export class RegisterStudentUseCase {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly hasher: Hasher
  ) {}

  async execute ({ email, name, password }: RegisterStudentUseCase.Input): Promise<void> {
    const studentAlreadyExists = await this.studentRepository.findByEmail(email)
    if (studentAlreadyExists) throw new EmailAlreadyInUseError()
    const hashedPassword = await this.hasher.hash({ plainText: password })
    const student = new Student(name, email, hashedPassword, new Onboarding())
    await this.studentRepository.create(student)
  }
}
