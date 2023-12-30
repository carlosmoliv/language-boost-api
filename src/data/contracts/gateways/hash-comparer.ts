export interface HashComparer {
  compare: (input: HashComparer.Input) => Promise<HashComparer.Output>
}

export namespace HashComparer {
  export type Input = { plainText: string, digest: string }
  export type Output = boolean
}
