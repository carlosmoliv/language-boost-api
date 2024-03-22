export interface Token {
  generate: (key: string, expirationInMs: number) => Promise<string>
  validate: (token: string) => string
}
