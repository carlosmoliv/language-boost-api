import { Onboarding, Student, StudentProps } from '@domain/entities/student'

export const StudentMap = {
  toDomain (raw: any): Student {
    const onboarding = raw.student?.onboarding
    const onboardingProps = onboarding
      ? {
        signupComplete: onboarding.signupComplete ?? false,
        languageProficiencyComplete: onboarding.languageProficiencyComplete ?? false,
        learningGoalsComplete: onboarding.learningGoalsComplete ?? false,
        preferredTopicsComplete: onboarding.learningGoalsComplete ?? false
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
    return Student.create(props)
  },

  toPersistence (student: Student): Omit<StudentProps, 'id' | 'onboarding'> & {
    _id?: string
    student: {
      onboarding: Onboarding
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
