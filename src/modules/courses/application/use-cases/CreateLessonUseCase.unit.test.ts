import { createCourseFactory } from "../../../../shared/factories/createCourseFactory";
import { createLessonFactory } from "../../../../shared/factories/createLessonFactory";
import { ICourseRepository } from "../../domain/repositories/ICourseRepository";
import { CourseRepositoryInMemory } from "../../domain/repositories/in-memory/CourseRepositoryInMemory";
import { IModuleRepository } from "../../domain/repositories/IModuleRepository";
import { ModuleRepositoryInMemory } from "../../domain/repositories/in-memory/ModuleRepositoryInMemory";
import { CreateModuleUseCase } from "./CreateModuleUseCase";
import { ILessonRepository } from "../../domain/repositories/ILessonsRepository";
import { LessonRepositoryInMemory } from "../../domain/repositories/in-memory/LessonRepositoryInMemory";

import { CreateLessonUseCase } from "./CreateLessonUseCase";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

describe("Create Module Lesson", () => {
  let createLessonUseCase: CreateLessonUseCase;
  let createModuleUseCase: CreateModuleUseCase;
  let createCourseUseCase: CreateCourseUseCase;

  let lessonRepositoryInMemory: ILessonRepository;
  let moduleRepositoryInMemory: IModuleRepository;
  let courseRepositoryInMemory: ICourseRepository;

  beforeEach(() => {
    lessonRepositoryInMemory = new LessonRepositoryInMemory();
    moduleRepositoryInMemory = new ModuleRepositoryInMemory();
    courseRepositoryInMemory = new CourseRepositoryInMemory();

    createCourseUseCase = new CreateCourseUseCase(courseRepositoryInMemory);

    createModuleUseCase = new CreateModuleUseCase(
      courseRepositoryInMemory,
      moduleRepositoryInMemory
    );

    createLessonUseCase = new CreateLessonUseCase(
      moduleRepositoryInMemory,
      lessonRepositoryInMemory
    );
  });

  it("should create a lesson and add to a course", async () => {
    const course = createCourseFactory();
    const resultCourse = await createCourseUseCase.execute(course);

    const module = { title: "Module 1", courseId: resultCourse.id };
    const resultModule = await createModuleUseCase.execute(module);

    const lesson = createLessonFactory({ moduleId: resultModule.id });
    const resultLesson = await createLessonUseCase.execute(lesson);

    expect(resultLesson).toBeDefined();
    expect(resultLesson.moduleId).toEqual(resultModule.id);
  });
});
