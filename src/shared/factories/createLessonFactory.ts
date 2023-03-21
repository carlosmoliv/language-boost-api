import { ICreateLessonDTO } from "../../modules/courses/domain/dtos/ICreateLesson.dto";

export const createLessonFactory = ({
  moduleId = "1234567890",
  title = "Test Lesson",
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  description = "Test Lesson Description",
  materials = [],
} = {}): ICreateLessonDTO => {
  return {
    moduleId,
    title,
    videoUrl,
    description,
    materials,
  };
};
