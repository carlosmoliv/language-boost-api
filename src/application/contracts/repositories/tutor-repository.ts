import { Tutor } from '@domain/entities/tutor'

export interface TutorRepository {
  create: (tutor: Tutor) => Promise<void>
}
