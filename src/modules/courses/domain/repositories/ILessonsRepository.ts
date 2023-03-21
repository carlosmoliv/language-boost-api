import { Lesson } from "../../infrastructure/mongo/models/Lesson";
import { ICreateLessonDTO } from "../dtos/ICreateLesson.dto";

export interface ILessonRepository {
  create(data: ICreateLessonDTO): Promise<Lesson>;
}
