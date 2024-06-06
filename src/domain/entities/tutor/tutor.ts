import { BaseUser, UserRoles, UserStatus } from '@domain/entities/base-user'
import { AvailabilitySlot } from '@domain/entities/tutor/availabity-slot'
import { TutorProps } from '@domain/entities/tutor/tutor-props'

export class Tutor extends BaseUser {
  constructor (
    name: string,
    email: string,
    password: string,
    status: UserStatus,
    verifiedAt: Date | null,
    role: UserRoles,
    id?: string,
    public availability?: AvailabilitySlot[]
  ) {
    super(
      name,
      email,
      password,
      status,
      verifiedAt,
      role,
      id
    )
  }

  static create (props: TutorProps): Tutor {
    return new Tutor(
      props.name,
      props.email,
      props.password,
      props.status ?? UserStatus.Pending,
      props.verifiedAt ?? null,
      UserRoles.Tutor,
      props.id,
      props.availability
    )
  }
}
