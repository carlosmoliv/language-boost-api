import { StudentRepository } from '@application/contracts/repositories'
import { Student } from '@domain/entities/student'

export class GetStudentByEmailUseCase {
  constructor (private readonly studentRepository: StudentRepository) {}

  async execute ({ email }: GetStudentByEmailUseCase.Input): Promise<GetStudentByEmailUseCase.Output> {
    const student = await this.studentRepository.findByEmail(email)
    if (!student) throw new Error()
    return student
  }
}

namespace GetStudentByEmailUseCase {
  export type Input = { email: string }
  export type Output = Student
}
