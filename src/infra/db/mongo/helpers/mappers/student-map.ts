import { Onboarding, Student, StudentProps } from '@domain/entities/student'

export const StudentMap = {
  toDomain (raw: any): Student {
    const onboardingProps = raw.student.onboarding
      ? {
        signupComplete: raw.student.onboarding.signupComplete ?? false,
        languageProficiencyComplete: raw.student.onboarding.languageProficiencyComplete ?? false,
        learningGoalsComplete: raw.student.onboarding.learningGoalsComplete ?? false,
        preferredTopicsComplete: raw.student.onboarding.learningGoalsComplete ?? false
      }
      : undefined

    const props: StudentProps = {
      name: raw.name,
      email: raw.email,
      password: raw.password,
      role: raw.role,
      status: raw.status,
      verifiedAt: raw.verifiedAt,
      id: raw._id.toHexString(),
      onboarding: Onboarding.create(onboardingProps)
    }
    return new Student(props)
  },

  toPersistence (student: Student): Omit<StudentProps, 'id' | 'onboarding'> & {
    _id?: string
    student: {
      onboarding: {
        signupComplete: boolean
        preferredTopicsComplete: boolean
        learningGoalsComplete: boolean
        languageProficiencyComplete: boolean
      }
    }
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
        onboarding: {
          signupComplete: student.onboarding.signupComplete,
          preferredTopicsComplete: student.onboarding.preferredTopicsComplete,
          learningGoalsComplete: student.onboarding.learningGoalsComplete,
          languageProficiencyComplete: student.onboarding.languageProficiencyComplete
        }
      }
    }
  }
}
