import { AppError } from "../../../../shared/errors/AppError";
import { Course } from "../../infrastructure/mongo/models/Course";
import { CourseType } from "../courses.enums";
import { ICreateCourseDTO } from "../dtos/ICreateCourse.dto";
import { ICoursesRepository } from "../repositories/ICoursesRepository";

export class CreateCourseUseCase {
  constructor(private coursesRepository: ICoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute(data: ICreateCourseDTO): Promise<Course> {
    const { type, price, ...rest } = data;

    if (type === CourseType.paid && !price)
      throw new AppError(
        "MissingPriceError",
        "Cannot create a paid course without a price"
      );

    if (type === CourseType.paid && price && price < 9.99)
      throw new AppError(
        "MissingPriceError",
        "Cannot create a paid course with a price smaller than 9.99"
      );

    return this.coursesRepository.create(data);
  }
}
