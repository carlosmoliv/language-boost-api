import { lessonModel, moduleModel } from "../../../models";
import { ICreateLessonDTO } from "../../domain/dtos/ICreateLesson.dto";
import { ILessonRepository } from "../../domain/repositories/ILessonsRepository";
import { Lesson } from "../mongo/models/Lesson";

export class LessonRepository implements ILessonRepository {
  async create(data: ICreateLessonDTO): Promise<Lesson> {
    return lessonModel.create(data).then(async (lesson) => {
      await moduleModel.findByIdAndUpdate(data.moduleId, {
        $push: { lessons: lesson.id },
      });

      return lesson;
    });
  }
}
