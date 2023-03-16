import { Course } from "../../../infrastructure/mongo/models/Course";
import { CourseStatus } from "../../courses.enums";
import { ICreateCourseDTO } from "../../dtos/ICreateCourse.dto";
import { ICoursesRepository } from "../ICoursesRepository";

export class CoursesRepositoryInMemory implements ICoursesRepository {
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
      id: this.generateId(),
      status: CourseStatus.in_development,
      lessons: [],
    });

    this.courses.push(course);
    return course;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
