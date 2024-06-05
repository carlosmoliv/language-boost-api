import { BaseUser, UserRoles, UserStatus } from '@domain/entities/base-user'
import { Onboarding, OnboardingSteps, StudentProps } from '@domain/entities/student'

export class Student extends BaseUser {
  constructor (
    name: string,
    email: string,
    password: string,
    role: UserRoles,
    status: UserStatus,
    verifiedAt: Date | null,
    public onboarding: Onboarding,
    id?: string
  ) {
    super(name, email, password, status, verifiedAt, role, id)
  }

  markOnboardingStep (step: OnboardingSteps): void {
    switch (step) {
      case OnboardingSteps.SignupComplete:
        this.onboarding.signupComplete = true
        break
      case OnboardingSteps.LanguageProficiencyComplete:
        this.onboarding.languageProficiencyComplete = true
        break
      case OnboardingSteps.LearningGoalsComplete:
        this.onboarding.learningGoalsComplete = true
        break
      case OnboardingSteps.PreferredTopicsComplete:
        this.onboarding.preferredTopicsComplete = true
        break
      default:
        throw new Error('Not a valid onboarding step.')
    }
  }

  static create (props: StudentProps): Student {
    const onboarding = props.onboarding ?? Onboarding.create()
    return new Student(
      props.name,
      props.email,
      props.password,
      UserRoles.Student,
      props.status ?? UserStatus.Pending,
      props.verifiedAt ?? null,
      onboarding,
      props.id
    )
  }
}
