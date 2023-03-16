import { createCourseFactory } from "../../../../shared/factories/courseFactory";

import { ICreateCourseLessonDTO } from "../dtos/ICreateCourseLesson.dto";

import { ICoursesRepository } from "../repositories/ICoursesRepository";
import { ILessonsRepository } from "../repositories/ILessonsRepository";
import { CoursesRepositoryInMemory } from "../repositories/in-memory/CoursesRepositoryInMemory";
import { LessonsRepositoryInMemory } from "../repositories/in-memory/LessonsRepositoryInMemory";

import { CreateCourseUseCase } from "./CreateCourseUseCase";
import { CreateCourseLessonUseCase } from "./CreateCourseLessonUseCase";

describe("Create Course Lesson", () => {
  let createCourseLessonUseCase: CreateCourseLessonUseCase;
  let createCourseUseCase: CreateCourseUseCase;
  let coursesRepositoryInMemory: ICoursesRepository;
  let lessonsRepositoryInMemory: ILessonsRepository;

  beforeEach(() => {
    lessonsRepositoryInMemory = new LessonsRepositoryInMemory();
    coursesRepositoryInMemory = new CoursesRepositoryInMemory();

    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
    createCourseLessonUseCase = new CreateCourseLessonUseCase(
      lessonsRepositoryInMemory,
      coursesRepositoryInMemory
    );
  });

  it("should create a lesson and add to a course", async () => {
    const course = createCourseFactory();
    const resultCourse = await createCourseUseCase.execute(course);

    const lesson: ICreateCourseLessonDTO = {
      courseId: resultCourse.id,
      title: "Test Lesson",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Test Lesson Description",
      materials: [],
    };

    const resultLesson = await createCourseLessonUseCase.execute(lesson);

    expect(resultLesson).toBeDefined();
    expect(resultLesson.courseId).toEqual(resultCourse.id);
  });
});
