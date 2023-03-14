import { Course } from "../../../infrastructure/mongo/models/Course";
import { CourseStatus } from "../../courses.enums";
import { ICreateCourseDTO } from "../../dtos/ICreateCourse.dto";

export class CoursesRepositoryInMemory {
  private courses: Course[] = [];

  async create(data: ICreateCourseDTO) {
    const course = new Course();

    Object.assign(course, {
      ...data,
      status: CourseStatus.in_development,
      lessons: [],
    });

    this.courses.push(course);
    return course;
  }
}
