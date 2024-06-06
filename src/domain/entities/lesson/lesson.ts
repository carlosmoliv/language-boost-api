import { LessonProps } from '@domain/entities/lesson/lesson-props'
import { Student } from '@domain/entities/student'
import { Tutor } from '@domain/entities/tutor'

export class Lesson {
  constructor (
    public id: string,
    public title: string,
    public description: string,
    public startTime: Date,
    public endTime: Date,
    public tutor: Tutor,
    public student: Student
  ) {}

  static create (props: LessonProps): Lesson {
    return new Lesson(
      props.id,
      props.title,
      props.description,
      props.startTime,
      props.endTime,
      props.tutor,
      props.student
    )
  }
}
