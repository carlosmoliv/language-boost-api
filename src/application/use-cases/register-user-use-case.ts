import { UserRepository } from '@application/contracts/repositories'
import { Hasher } from '@application/contracts/gateways'
import { EmailAlreadyInUseError } from '@application/use-cases/errors'
import { Student } from '@domain/entities'
import { Either, left, right } from '@utils/either'

export class RegisterStudentUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute ({ email, name, password }: RegisterStudentUseCase.Input): Promise<RegisterStudentUseCase.Output> {
    const studentAlreadyExists = await this.userRepository.findByCriteria({ email })
    if (studentAlreadyExists) return left(new EmailAlreadyInUseError())
    const hashedPassword = await this.hasher.hash({ plainText: password })
    const student = new Student(name, email, hashedPassword)
    await this.userRepository.create(student)
    return right(undefined)
  }
}

export namespace RegisterStudentUseCase {
  export type Input = { name: string, email: string, password: string }
  export type Output = Either<EmailAlreadyInUseError, void>
}
