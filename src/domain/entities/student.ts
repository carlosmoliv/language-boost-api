import { BaseUser, Onboarding, OnboardingSteps } from '@domain/entities'

export class Student extends BaseUser {
  constructor (
    name: string,
    email: string,
    password: string,
    readonly onboarding: Onboarding
  ) {
    super(name, email, password)
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
    }
  }
}
