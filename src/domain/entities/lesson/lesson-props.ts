import { Student } from '@domain/entities/student'
import { Tutor } from '@domain/entities/tutor'

export type LessonProps = {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  tutor: Tutor
  student: Student
}
