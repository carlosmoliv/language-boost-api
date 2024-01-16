type Status = 'active' | 'inactive'

export class Student {
  constructor (
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly status: Status,
    readonly verifiedAt: Date | null
  ) {}

  isVerified (): boolean {
    return !!this.verifiedAt
  }
}
