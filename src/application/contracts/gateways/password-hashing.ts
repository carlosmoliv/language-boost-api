export interface PasswordHashing {
  compare: (plainText: string, digest: string) => Promise<boolean>
  hash: (plainText: string) => Promise<string>
}
