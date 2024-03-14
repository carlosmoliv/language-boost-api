export type OnboardingProps = {
  signupComplete?: boolean
  languageProficiencyComplete?: boolean
  learningGoalsComplete?: boolean
  preferredTopicsComplete?: boolean
}

export class Onboarding {
  private _signupComplete
  private _languageProficiencyComplete
  private _learningGoalsComplete
  private _preferredTopicsComplete

  constructor ({
    signupComplete,
    languageProficiencyComplete,
    learningGoalsComplete,
    preferredTopicsComplete
  }: OnboardingProps = {}) {
    this._signupComplete = signupComplete ?? false
    this._languageProficiencyComplete = languageProficiencyComplete ?? false
    this._learningGoalsComplete = learningGoalsComplete ?? false
    this._preferredTopicsComplete = preferredTopicsComplete ?? false
  }

  get signupComplete (): boolean {
    return this._signupComplete
  }

  set signupComplete (value: boolean) {
    this._signupComplete = value
  }

  get languageProficiencyComplete (): boolean {
    return this._languageProficiencyComplete
  }

  set languageProficiencyComplete (value: boolean) {
    this._languageProficiencyComplete = value
  }

  get learningGoalsComplete (): boolean {
    return this._learningGoalsComplete
  }

  set learningGoalsComplete (value: boolean) {
    this._learningGoalsComplete = value
  }

  get preferredTopicsComplete (): boolean {
    return this._preferredTopicsComplete
  }

  set preferredTopicsComplete (value: boolean) {
    this._preferredTopicsComplete = value
  }

  public static create (props?: OnboardingProps): Onboarding {
    return new Onboarding(props)
  }
}
