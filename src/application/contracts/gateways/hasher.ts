export interface Hasher {
  hash: (input: Hasher.Input) => Promise<Hasher.Output>
}

export namespace Hasher {
  export type Input = { plainText: string }
  export type Output = string
}
