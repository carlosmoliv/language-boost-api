import { UserProps } from '@domain/entities/base-user'
import { Onboarding } from '@domain/entities/student/onboarding'

export type StudentProps = UserProps & {
  onboarding?: Onboarding
}
