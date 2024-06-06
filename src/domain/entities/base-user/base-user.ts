import { UserRoles, UserStatus } from '@domain/entities/base-user'

export abstract class BaseUser {
  protected constructor (
    public name: string,
    public email: string,
    public password: string,
    public status: UserStatus,
    public verifiedAt: Date | null,
    public role: UserRoles,
    public id?: string
  ) {}

  public isVerified (): boolean {
    return !!this.verifiedAt
  }

  public verify (date: Date): void {
    this.verifiedAt = date
  }
}
