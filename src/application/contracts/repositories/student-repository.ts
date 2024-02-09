import { Onboarding, StudentData } from '@domain/entities'

export interface StudentRepository {
  create: (input: StudentRepository.CreateInput) => Promise<void>
  findByEmail: (input: StudentRepository.FindByEmailInput) => Promise<StudentRepository.FindByEmailOutput>
  findById: (input: StudentRepository.FindByIdInput) => Promise<StudentRepository.FindByIdOutput>
  save: (input: StudentRepository.SaveInput) => Promise<void>
}

export namespace StudentRepository {
  export type CreateInput = { name: string, email: string, password: string, id?: string, onboarding?: Onboarding }
  export type FindByEmailInput = { email: string }
  export type FindByEmailOutput = { id: string, name: string, email: string, password: string, onboarding: Onboarding } | null
  export type FindByIdInput = { id: string }
  export type FindByIdOutput = StudentData | null
  export type SaveInput = StudentData
}
