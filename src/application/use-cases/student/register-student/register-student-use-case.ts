import { PasswordHashing } from '@application/contracts/gateways'
import { StudentRepository } from '@application/contracts/repositories'
import { EmailAlreadyInUseError } from '@application/use-cases/student/register-student'
import { Student } from '@domain/entities/student'

export class RegisterStudentUseCase {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly passwordHashing: PasswordHashing
  ) {}

  async execute ({ email, name, password }: RegisterStudentUseCase.Input): Promise<void> {
    const studentAlreadyExists = await this.studentRepository.findByEmail(email)
    if (studentAlreadyExists) throw new EmailAlreadyInUseError()
    const hashedPassword = await this.passwordHashing.hash(password)
    const student = new Student({ name, email, password: hashedPassword })
    await this.studentRepository.create(student)
  }
}

export namespace RegisterStudentUseCase {
  export type Input = { name: string, email: string, password: string }
}
