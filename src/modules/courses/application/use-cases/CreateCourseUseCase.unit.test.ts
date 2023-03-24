import { AppError } from "../../../../shared/errors/AppError";
import { createCourseFactory } from "../../../../shared/factories/createCourseFactory";

import { CourseStatus, CourseType } from "../../domain/course.enums";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import { CourseRepositoryInMemory } from "../../domain/repositories/in-memory/CourseRepositoryInMemory";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

describe("Create Course Use Case", () => {
  let createCourseUseCase: CreateCourseUseCase;
  let courseRepositoryInMemory: ICourseRepository;

  beforeEach(() => {
    courseRepositoryInMemory = new CourseRepositoryInMemory();
    createCourseUseCase = new CreateCourseUseCase(courseRepositoryInMemory);
  });

  it("should create a new course", async () => {
    const data = createCourseFactory();
    const result = await createCourseUseCase.execute(data);

    expect(result.title).toBeDefined();
    expect(result.status).toEqual(CourseStatus.in_development);
    expect(Object.values(CourseType)).toContain(result.type);
  });

  it("should throw an error if price is smaller than 9.99", () => {
    const data = createCourseFactory({ price: 9.98 });

    expect(createCourseUseCase.execute(data)).rejects.toEqual(
      new AppError(
        "MissingPriceError",
        "Cannot create a paid course with a price smaller than 9.99"
      )
    );
  });
});
