import { BaseUser, Onboarding } from '@domain/entities'

export class Student extends BaseUser {
  onboarding?: Onboarding
}
