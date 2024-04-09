import { prop } from '@typegoose/typegoose'

export class Onboarding {
  @prop()
  signupComplete!: boolean

  @prop()
  languageProficiencyComplete!: boolean

  @prop()
  learningGoalsComplete!: boolean

  @prop()
  preferredTopicsComplete!: boolean
}
