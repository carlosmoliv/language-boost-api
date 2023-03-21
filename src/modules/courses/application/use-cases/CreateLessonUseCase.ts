import { ModuleNotFoundError } from "../../../../shared/errors/courses-modules/ModuleNotFoundError";

import { ICreateLessonDTO } from "../../domain/dtos/ICreateLesson.dto";
import { ILessonRepository } from "../../domain/repositories/ILessonsRepository";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";

export class CreateLessonUseCase {
  constructor(
    private moduleRepository: IModuleRepository,
    private lessonRepository: ILessonRepository
  ) {}

  async execute(data: ICreateLessonDTO) {
    const { moduleId } = data;

    const module = await this.moduleRepository.findById(moduleId);
    if (!module) throw new ModuleNotFoundError();

    const lesson = await this.lessonRepository.create(data);
    return lesson;
  }
}
