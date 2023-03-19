import crypto from "node:crypto";
import { Course } from "../../../infrastructure/mongo/models/Course";
import { CourseStatus } from "../../course.enums";
import { ICreateCourseDTO } from "../../dtos/ICreateCourse.dto";
import { ICourseRepository } from "../ICourseRepository";

export class CourseRepositoryInMemory implements ICourseRepository {
  private courses: Course[] = [];

  async findById(courseId: string): Promise<Course | null> {
    return (
      this.courses.find((course: Course) => course.id === courseId) ?? null
    );
  }

  async create(data: ICreateCourseDTO) {
    const course = new Course();

    Object.assign(course, {
      ...data,
      id: crypto.randomUUID(),
      status: CourseStatus.in_development,
      lessons: [],
    });

    this.courses.push(course);
    return course;
  }
}
