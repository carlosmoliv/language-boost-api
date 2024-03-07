import { Student } from '@domain/entities'

export interface StudentRepository {
  create: (input: StudentRepository.CreateInput) => Promise<void>
  update: (input: StudentRepository.UpdateInput) => Promise<void>
  findByEmail: (email: string) => Promise<StudentRepository.FindOutput>
  findById: (id: string) => Promise<StudentRepository.FindOutput>
}

export namespace StudentRepository {
  export type CreateInput = Student
  export type UpdateInput = Student
  export type FindOutput = Student | null
}
