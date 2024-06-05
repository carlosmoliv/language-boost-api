import { LessonProps } from '@domain/entities/lesson/lesson-props'

export class Lesson {
  constructor (
    public id: string,
    public title: string,
    public description: string,
    public startTime: Date,
    public endTime: Date,
    public tutorId: string,
    public studentId: string
  ) {}

  static create (lessonProps: LessonProps): Lesson {
    return new Lesson(
      lessonProps.id,
      lessonProps.title,
      lessonProps.description,
      lessonProps.startTime,
      lessonProps.endTime,
      lessonProps.tutorId,
      lessonProps.studentId
    )
  }
}
