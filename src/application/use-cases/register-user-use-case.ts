import { UserRepository } from '@application/contracts/repositories'
import { Hasher } from '@application/contracts/gateways'
import { Student } from '@domain/entities'

export class RegisterStudentUseCase {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute ({ email, name, password }: RegisterStudentUseCase.Input): Promise<void> {
    const hashedPassword = await this.hasher.hash({ plainText: password })
    const student = new Student(name, email, hashedPassword)
    await this.userRepository.create(student)
  }
}

export namespace RegisterStudentUseCase {
  export type Input = { name: string, email: string, password: string }
}
