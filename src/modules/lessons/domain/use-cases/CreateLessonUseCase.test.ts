import { createCourseFactory } from "../../../../shared/factories/courseFactory";
import { ICourseRepository } from "../../../courses/domain/repositories/ICourseRepository";
import { CourseRepositoryInMemory } from "../../../courses/domain/repositories/in-memory/CourseRepositoryInMemory";
import { CreateCourseUseCase } from "../../../courses/domain/use-cases/CreateCourseUseCase";

import { ICreateLessonDTO } from "../dtos/ICreateLesson.dto";
import { ILessonRepository } from "../repositories/ILessonsRepository";
import { LessonRepositoryInMemory } from "../repositories/in-memory/LessonRepositoryInMemory";

import { CreateLessonUseCase } from "./CreateLessonUseCase";

describe("Create Course Lesson", () => {
  let createCourseLessonUseCase: CreateLessonUseCase;
  let createCourseUseCase: CreateCourseUseCase;
  let coursesRepositoryInMemory: ICourseRepository;
  let lessonsRepositoryInMemory: ILessonRepository;

  beforeEach(() => {
    lessonsRepositoryInMemory = new LessonRepositoryInMemory();
    coursesRepositoryInMemory = new CourseRepositoryInMemory();

    createCourseUseCase = new CreateCourseUseCase(coursesRepositoryInMemory);
    createCourseLessonUseCase = new CreateLessonUseCase(
      lessonsRepositoryInMemory,
      coursesRepositoryInMemory
    );
  });

  it("should create a lesson and add to a course", async () => {
    const course = createCourseFactory();
    const resultCourse = await createCourseUseCase.execute(course);

    const lesson: ICreateLessonDTO = {
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
