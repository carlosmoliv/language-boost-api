import { Onboarding } from '@domain/entities'

export interface StudentRepository {
  create: (input: StudentRepository.CreateInput) => Promise<void>
  findByEmail: (input: StudentRepository.FindByEmailInput) => Promise<StudentRepository.FindByEmailOutput>
  findById: (input: StudentRepository.FindByIdInput) => Promise<StudentRepository.FindByIdOutput>
}

export namespace StudentRepository {
  export type CreateInput = { name: string, email: string, password: string, id?: string, onboarding?: Onboarding }
  export type FindByEmailInput = { email: string }
  export type FindByEmailOutput = { id: string, name: string, email: string, password: string, onboarding: Onboarding } | null
  export type FindByIdInput = { id: string }
  export type FindByIdOutput = { id: string, name: string, email: string, password: string, onboarding: Onboarding } | null

}
