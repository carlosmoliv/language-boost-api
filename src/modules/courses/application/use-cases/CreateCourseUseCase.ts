import { AppError } from "../../../../shared/errors/AppError";
import { CourseType } from "../../domain/course.enums";
import { ICreateCourseDTO } from "../../domain/dtos/ICreateCourse.dto";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import { Course } from "../../infrastructure/mongo/models/Course";

export class CreateCourseUseCase {
  constructor(private coursesRepository: ICourseRepository) {}

  async execute(data: ICreateCourseDTO): Promise<Course> {
    const { type, price } = data;

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
