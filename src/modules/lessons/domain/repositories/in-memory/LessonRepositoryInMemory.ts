import crypto from "node:crypto";

import { Lesson } from "../../../infrastructure/mongo/models/Lesson";
import { ICreateLessonDTO } from "../../dtos/ICreateLesson.dto";
import { ILessonRepository } from "../ILessonsRepository";

export class LessonRepositoryInMemory implements ILessonRepository {
  private lessons: Lesson[] = [];

  async create(data: ICreateLessonDTO): Promise<Lesson> {
    const lesson = new Lesson();

    Object.assign(lesson, {
      id: crypto.randomUUID(),
      title: data.title,
      videoUrl: data.videoUrl,
      description: data.description,
      materials: data.materials,
      moduleId: data.moduleId,
    });

    this.lessons.push(lesson);
    return lesson;
  }
}
