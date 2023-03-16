import { Lesson } from "../../../infrastructure/mongo/models/Lesson";
import { ICreateLessonDTO } from "../../dtos/ICreateLesson.dto";
import { ILessonRepository } from "../ILessonsRepository";

export class LessonRepositoryInMemory implements ILessonRepository {
  private lessons: Lesson[] = [];

  async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = new Lesson();

    Object.assign(lesson, {
      id: this.generateId(),
      title: data.title,
      videoUrl: data.videoUrl,
      description: data.description,
      materials: data.materials,
      courseId: data.courseId,
    });

    this.lessons.push(lesson);

    return lesson;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
