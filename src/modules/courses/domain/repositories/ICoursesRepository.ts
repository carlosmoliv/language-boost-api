import { Course } from "../../infrastructure/mongo/models/Course";
import { ICreateCourseDTO } from "../dtos/ICreateCourse.dto";

export interface ICoursesRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
}
