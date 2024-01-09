export interface UserRepository {
  create: (input: UserRepository.CreateInput) => Promise<void>
  findByCriteria: (input: UserRepository.FindByCriteriaInput) => Promise<UserRepository.FindByCriteriaOutput>
}

export namespace UserRepository {
  export type CreateInput = { name: string, email: string, password: string }
  export type FindByCriteriaInput = { email?: string, id?: string }
  export type FindByCriteriaOutput = { id: string, name: string, email: string, password: string } | null
}
