import { Course } from "../../infrastructure/mongo/models/Course";
import { ICreateCourseDTO } from "../dtos/ICreateCourse.dto";
import { ICoursesRepository } from "../repositories/ICoursesRepository";

export class CreateCourseUseCase {
  constructor(private coursesRepository: ICoursesRepository) {
    this.coursesRepository = coursesRepository;
  }

  async execute(data: ICreateCourseDTO): Promise<Course> {
    return this.coursesRepository.create(data);
  }
}
