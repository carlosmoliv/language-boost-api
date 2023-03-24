import { inject, injectable } from "tsyringe";

import { CourseNotFoundError } from "../../../../shared/errors/courses/CourseNotFoundError";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import { ICreateModuleDTO } from "../../domain/dtos/ICreateModule.dto";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";

@injectable()
export class CreateModuleUseCase {
  constructor(
    @inject("CourseRepository")
    private courseRepository: ICourseRepository,

    @inject("ModuleRepository")
    private moduleRepository: IModuleRepository
  ) {}

  async execute(data: ICreateModuleDTO) {
    const { courseId, title } = data;

    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new CourseNotFoundError();

    const module = await this.moduleRepository.create({ courseId, title });

    return module;
  }
}
