import { ModuleNotFoundError } from "../../../../shared/errors/courses-modules/ModuleNotFoundError";

import { ICreateLessonDTO } from "../dtos/ICreateLesson.dto";
import { ILessonRepository } from "../repositories/ILessonsRepository";
import { IModuleRepository } from "../../../module/domain/repositories/IModuleRepository";

export class CreateLessonUseCase {
  constructor(
    private lessonRepository: ILessonRepository,
    private moduleRepository: IModuleRepository
  ) {
    this.lessonRepository = lessonRepository;
    this.moduleRepository = moduleRepository;
  }

  async execute(data: ICreateLessonDTO) {
    const { moduleId } = data;

    const module = await this.moduleRepository.findById(moduleId);
    if (!module) throw new ModuleNotFoundError();

    const lesson = await this.lessonRepository.create(data);
    return lesson;
  }
}
