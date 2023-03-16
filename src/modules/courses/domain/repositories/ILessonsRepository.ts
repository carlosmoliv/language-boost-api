import { Lesson } from "../../infrastructure/mongo/models/Lesson";
import { ICreateCourseLessonDTO } from "../dtos/ICreateCourseLesson.dto";

export interface ILessonsRepository {
  create(data: ICreateCourseLessonDTO): Promise<Lesson>;
}
