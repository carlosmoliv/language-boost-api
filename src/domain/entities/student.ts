export type UserStatus = 'active' | 'inactive' | 'pending'
export type UserRole = 'student' | 'admin'

export class Student {
  status?: UserStatus = 'pending'
  verifiedAt?: Date | null = null
  role?: UserRole = 'student'

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
