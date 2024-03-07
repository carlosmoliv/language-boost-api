import { Student, StudentProps } from '@domain/entities'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StudentMap {
  public static toDomain (raw: any): Student {
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
  }

  public static toPersistance (student: Student): any {
    return {
      user: {
        _id: student.id,
        name: student.name,
        email: student.email,
        password: student.password,
        role: student.role,
        status: student.status,
        verifiedAt: student.verifiedAt
      },
      student: {
        onboarding: student.onboarding
      }
    }
  }
}
