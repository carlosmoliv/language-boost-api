import { UserRoles, UserStatus } from '@domain/entities/base-user'

export type UserProps = {
  name: string
  email: string
  password: string
  role?: UserRoles
  status?: UserStatus
  verifiedAt?: Date | null
  id?: string
}
