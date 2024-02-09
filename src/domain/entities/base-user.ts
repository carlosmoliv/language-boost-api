import { UserRoles, UserStatus } from '@domain/entities'

export abstract class BaseUser {
  constructor (
    public name: string,
    public email: string,
    public password: string,
    public status: UserStatus = UserStatus.Pending,
    public verifiedAt: Date | null = null,
    public role: UserRoles = UserRoles.Student,
    public id?: string
  ) {}

  public isVerified (): boolean {
    return !!this.verifiedAt
  }

  public verify (date: Date): void {
    this.verifiedAt = date
  }
}
