import { Course } from "../../infrastructure/mongo/models/Course";
import { ICreateCourseDTO } from "../dtos/ICreateCourse.dto";

export interface ICourseRepository {
  create(data: ICreateCourseDTO): Promise<Course>;
  findById(courseId: string): Promise<Course | null>;
}