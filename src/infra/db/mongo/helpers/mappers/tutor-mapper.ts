import { AvailabilitySlot, Tutor, TutorProps } from '@domain/entities/tutor'

export const TutorMapper = {
  toPersistence (tutor: Tutor): Omit<TutorProps, 'id' | 'availability'> & {
    _id?: string
    tutor: {
      availability?: AvailabilitySlot[]
    }
  } {
    return {
      _id: tutor.id,
      name: tutor.name,
      email: tutor.email,
      password: tutor.password,
      role: tutor.role,
      status: tutor.status,
      verifiedAt: tutor.verifiedAt,
      tutor: {
        availability: tutor.availability
      }
    }
  }
}
