import { BaseUser, Onboarding, OnboardingSteps } from '@domain/entities'
import { StudentProps } from '@domain/entities/student'

export class Student extends BaseUser {
  private _onboarding: Onboarding

  constructor ({
    name,
    email,
    password,
    role,
    status,
    verifiedAt,
    id,
    onboarding
  }: StudentProps) {
    super({ name, email, password, status, verifiedAt, role, id })
    this._onboarding = onboarding ?? Onboarding.create()
  }

  public get onboarding (): Onboarding {
    return this._onboarding
  }

  public set onboarding (onboarding: Onboarding) {
    this._onboarding = onboarding
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
    return new Student(props)
  }
}
