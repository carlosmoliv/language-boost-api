export interface UserRepository {
  findByEmail: (input: UserRepository.FindByEmailInput) => Promise<UserRepository.FindByEmailOutput>
  create: (input: UserRepository.CreateInput) => Promise<void>
}

export namespace UserRepository {
  export type FindByEmailInput = { email: string }
  export type FindByEmailOutput = {
    id: string
    name: string
    email: string
    password: string
  } | null
  export type CreateInput = {
    name: string
    email: string
    password: string
  }
}
