import { CourseStatus, CourseType } from "../courses.enums";
import { ICreateCourseDTO } from "../dtos/ICreateCourse.dto";
import { ICoursesRepository } from "../repositories/ICoursesRepository";
import { CoursesRepositoryInMemory } from "../repositories/in-memory/CoursesRepositoryInMemory";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

describe("Create Course Use Case", () => {
  let createCourseUseCase: CreateCourseUseCase;
  let coursesRepositoryInMemory: ICoursesRepository;

  beforeEach(() => {
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();
    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
  });

  it("should create a new course", async () => {
    const data: ICreateCourseDTO = {
      title: "Test Course",
      type: CourseType.paid,
      description: "Test Course Description",
    };

    const result = await createCourseUseCase.execute(data);

    expect(result.title).toBeDefined();
    expect(result.status).toEqual(CourseStatus.in_development);
    expect(Object.values(CourseType)).toContain(result.type);
  });
});
