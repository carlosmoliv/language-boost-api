import { AppError } from "../../../../shared/errors/AppError";
import { ICourseRepository } from "../../../courses/domain/repositories/ICourseRepository";
import { ILessonRepository } from "../repositories/ILessonsRepository";
import { ICreateLessonDTO } from "../dtos/ICreateLesson.dto";

export class CreateLessonUseCase {
  constructor(
    private lessonsRepository: ILessonRepository,
    private coursesRepository: ICourseRepository
  ) {
    this.lessonsRepository = lessonsRepository;
    this.coursesRepository = coursesRepository;
  }

  async execute(data: ICreateLessonDTO) {
    const { courseId } = data;

    const course = await this.coursesRepository.findById(courseId);

    if (!course)
      throw new AppError(
        "CourseNotFoundError",
        "Course not found with the id provided."
      );

    const lesson = await this.lessonsRepository.create(data);
    return lesson;
  }
}
