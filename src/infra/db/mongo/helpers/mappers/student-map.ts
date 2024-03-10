import { Onboarding, Student } from '@domain/entities'
import { StudentProps } from '@domain/entities/student'

export const StudentMap = {
  toDomain (raw: any): Student {
    const props: StudentProps = {
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: raw.role,
      status: raw.status,
      verifiedAt: raw.verifiedAt,
      id: raw._id.toHexString(),
      onboarding: raw.student.onboarding ?? undefined
    }
    return new Student(props)
  },

  toPersistance (student: Student): Omit<StudentProps, 'id' | 'onboarding'> & {
    _id?: string
    student: { onboarding: Onboarding }
  } {
    return {
      _id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      role: student.role,
      status: student.status,
      verifiedAt: student.verifiedAt,
      student: {
        onboarding: student.onboarding
      }
    }
  }
}
