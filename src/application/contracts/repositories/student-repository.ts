export interface StudentRepository {
  create: (input: StudentRepository.CreateInput) => Promise<void>
  findByEmail: (input: StudentRepository.FindByEmailInput) => Promise<StudentRepository.FindByEmailOutput>
}

export namespace StudentRepository {
  export type CreateInput = { name: string, email: string, password: string, id?: string }
  export type FindByEmailInput = { email: string }
  export type FindByEmailOutput = { id: string, name: string, email: string, password: string } | null
}
