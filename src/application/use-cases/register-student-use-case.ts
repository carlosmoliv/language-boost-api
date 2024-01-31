import { Hasher } from '@application/contracts/gateways'
import { StudentRepository } from '@application/contracts/repositories'
import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { Student } from '@domain/entities'
import { Either, left, right } from '@utils/either'

export namespace RegisterStudentUseCase {
  export type Input = { name: string, email: string, password: string }
  export type Output = Either<EmailAlreadyInUseError, void>
}

export class RegisterStudentUseCase {
  constructor (
    private readonly studentRepository: StudentRepository,
    private readonly hasher: Hasher
  ) {}

  async execute ({ email, name, password }: RegisterStudentUseCase.Input): Promise<RegisterStudentUseCase.Output> {
    const studentAlreadyExists = await this.studentRepository.findByEmail({ email })
    if (studentAlreadyExists) return left(new EmailAlreadyInUseError())
    const hashedPassword = await this.hasher.hash({ plainText: password })
    const student = new Student(name, email, hashedPassword)
    await this.studentRepository.create(student)
    return right(undefined)
  }
}
