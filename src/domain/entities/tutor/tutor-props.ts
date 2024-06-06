import { UserProps } from '@domain/entities/base-user'
import { AvailabilitySlot } from '@domain/entities/tutor/availabity-slot'

export type TutorProps = UserProps & {
  spots?: AvailabilitySlot[]
}
