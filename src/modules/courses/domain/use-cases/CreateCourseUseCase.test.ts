import { AppError } from "../../../../shared/errors/AppError";

import { CourseStatus, CourseType } from "../course.enums";
import { CreateCourseUseCase } from "./CreateCourseUseCase";
import { createCourseFactory } from "../../../../shared/factories/courseFactory";
import { ICourseRepository } from "../repositories/ICourseRepository";
import { CourseRepositoryInMemory } from "../repositories/in-memory/CourseRepositoryInMemory";

describe("Create Course Use Case", () => {
  let createCourseUseCase: CreateCourseUseCase;
  let coursesRepositoryInMemory: ICourseRepository;

  beforeEach(() => {
    coursesRepositoryInMemory = new CourseRepositoryInMemory();
    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
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
