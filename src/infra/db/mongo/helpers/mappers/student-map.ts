import { StudentData } from '@domain/entities'

export const StudentMap = {
  toDomain: (raw: any): StudentData => {
    return {
      id: raw._id.toHexString(),
      name: raw.name,
      email: raw.email,
      password: raw.password,
      onboarding: raw.student.onboarding ?? undefined
    }
  }
}
