import { UserRoles, UserStatus } from '@domain/entities'

export abstract class BaseUser {
  status?: UserStatus = UserStatus.Pending
  verifiedAt?: Date | null = null
  role?: UserRoles = UserRoles.Student

  constructor (
    readonly name: string,
    readonly email: string,
    readonly password: string
  ) {}

  isVerified (): boolean {
    return !!this.verifiedAt
  }

  verify (date: Date): void {
    this.verifiedAt = date
  }
}
