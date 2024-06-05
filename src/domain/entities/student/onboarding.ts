export type OnboardingProps = {
  signupComplete?: boolean
  languageProficiencyComplete?: boolean
  learningGoalsComplete?: boolean
  preferredTopicsComplete?: boolean
}

export class Onboarding {
  constructor (
    public signupComplete: boolean,
    public languageProficiencyComplete: boolean,
    public learningGoalsComplete: boolean,
    public preferredTopicsComplete: boolean
  ) {}

  public static create (props?: OnboardingProps): Onboarding {
    return new Onboarding(
      props?.signupComplete ?? false,
      props?.languageProficiencyComplete ?? false,
      props?.learningGoalsComplete ?? false,
      props?.preferredTopicsComplete ?? false
    )
  }
}
