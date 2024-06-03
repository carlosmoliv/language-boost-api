import { UserRoles } from '@domain/entities/base-user'

export type TokenPayload = { userId: string, role: UserRoles }

export interface Token {
  generate: <T extends string | Buffer | object>(payload: T, expirationInMs: number) => Promise<string>
  validate: (token: string) => TokenPayload
}
