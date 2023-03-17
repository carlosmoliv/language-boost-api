import { CourseNotFoundError } from "../../../../shared/errors/courses/CourseNotFoundError";
import { ICourseRepository } from "../../../courses/domain/repositories/ICourseRepository";
import { ICreateModuleDTO } from "../dtos/ICreateModule.dto";
import { IModuleRepository } from "../repositories/IModuleRepository";

export class CreateModuleUseCase {
  constructor(
    private courseRepository: ICourseRepository,
    private moduleRepository: IModuleRepository
  ) {
    this.courseRepository = courseRepository;
    this.moduleRepository = moduleRepository;
  }

  async execute(data: ICreateModuleDTO) {
    const { courseId, title } = data;

    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new CourseNotFoundError();

    const module = await this.moduleRepository.create({ courseId, title });

    return module;
  }
}
