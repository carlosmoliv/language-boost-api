import { courseModel } from "../../../../models";
import { ICreateCourseDTO } from "../../../domain/dtos/ICreateCourse.dto";
import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";
import { Course } from "../models/Course";

export class CourseRepository implements ICourseRepository {
  async findById(courseId: string): Promise<Course | null> {
    return courseModel.findById(courseId);
  }

  async create(data: ICreateCourseDTO) {
    return courseModel.create(data);
  }
}
