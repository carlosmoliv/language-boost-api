import { AppError } from "../../../../shared/errors/AppError";
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
      price: 500,
      description: "Test Course Description",
    };

    const result = await createCourseUseCase.execute(data);

    expect(result.title).toBeDefined();
    expect(result.status).toEqual(CourseStatus.in_development);
    expect(Object.values(CourseType)).toContain(result.type);
  });

  it("should throw an error if no price is provided for paid course", async () => {
    const data: ICreateCourseDTO = {
      title: "Test Course",
      type: CourseType.paid,
      description: "Test Course Description",
    };

    expect(createCourseUseCase.execute(data)).rejects.toEqual(
      new AppError(
        "MissingPriceError",
        "Cannot create a paid course without a price"
      )
    );
  });

  it("should throw an error if price is smaller than 9.99", () => {
    const data: ICreateCourseDTO = {
      title: "Test Course",
      type: CourseType.paid,
      price: 9.98,
      description: "Test Course Description",
    };

    expect(createCourseUseCase.execute(data)).rejects.toEqual(
      new AppError(
        "MissingPriceError",
        "Cannot create a paid course with a price smaller than 9.99"
      )
    );
  });
});
