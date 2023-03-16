import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCourseLessonDTO } from "../dtos/ICreateCourseLesson.dto";
import { ICoursesRepository } from "../repositories/ICoursesRepository";
import { ILessonsRepository } from "../repositories/ILessonsRepository";

export class CreateCourseLessonUseCase {
  constructor(
    private lessonsRepository: ILessonsRepository,
    private coursesRepository: ICoursesRepository
  ) {
    this.lessonsRepository = lessonsRepository;
    this.coursesRepository = coursesRepository;
  }

  async execute(data: ICreateCourseLessonDTO) {
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
