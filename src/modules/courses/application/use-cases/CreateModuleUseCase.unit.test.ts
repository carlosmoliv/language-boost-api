import { CourseNotFoundError } from "../../../../shared/errors/courses/CourseNotFoundError";
import { createCourseFactory } from "../../../../shared/factories/createCourseFactory";

import { ICreateModuleDTO } from "../../domain/dtos/ICreateModule.dto";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";

import { ModuleRepositoryInMemory } from "../../domain/repositories/in-memory/ModuleRepositoryInMemory";
import { CourseRepositoryInMemory } from "../../domain/repositories/in-memory/CourseRepositoryInMemory";

import { CreateModuleUseCase } from "./CreateModuleUseCase";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

describe("Create Course Module", () => {
  let createModuleUseCase: CreateModuleUseCase;
  let createCourseUseCase: CreateCourseUseCase;

  let courseRepository: ICourseRepository;
  let moduleRepository: IModuleRepository;

  beforeEach(() => {
    courseRepository = new CourseRepositoryInMemory();
    moduleRepository = new ModuleRepositoryInMemory();

    createCourseUseCase = new CreateCourseUseCase(courseRepository);
    createModuleUseCase = new CreateModuleUseCase(
      courseRepository,
      moduleRepository
    );
  });

  it("should create a module and add to course", async () => {
    const course = createCourseFactory();
    const resultCourse = await createCourseUseCase.execute(course);

    const module: ICreateModuleDTO = {
      courseId: resultCourse.id,
      title: "Module 1",
    };

    const result = await createModuleUseCase.execute(module);

    expect(result).toBeDefined();
    expect(result.title).toBeDefined();
    expect(result.courseId).toEqual(resultCourse.id);
  });

  it("should throw an error if a course was not found with the courseId provided", async () => {
    const module: ICreateModuleDTO = {
      courseId: "45454655",
      title: "Module 1",
    };

    expect(createModuleUseCase.execute(module)).rejects.toEqual(
      new CourseNotFoundError()
    );
  });

  it("should not throw an error if a course was found with the courseId provided", async () => {
    const course = createCourseFactory();
    const resultCourse = await createCourseUseCase.execute(course);

    const module: ICreateModuleDTO = {
      courseId: resultCourse.id,
      title: "Module 1",
    };

    expect(createModuleUseCase.execute(module)).resolves.toBeDefined();
  });
});
