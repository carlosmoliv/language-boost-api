import { StudentData } from '@domain/entities'

export interface StudentRepository {
  create: (input: StudentRepository.CreateInput) => Promise<void>
  save: (input: StudentRepository.SaveInput) => Promise<void>
  findByEmail: (email: string) => Promise<StudentRepository.FindOutput>
  findById: (id: string) => Promise<StudentRepository.FindOutput>
}

export namespace StudentRepository {
  export type CreateInput = Omit<StudentData, 'id'> & { id?: string }
  export type SaveInput = StudentData
  export type FindOutput = StudentData | null
}
