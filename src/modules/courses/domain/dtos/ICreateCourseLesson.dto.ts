export interface ICreateCourseLessonDTO {
  courseId: string;
  title: string;
  videoUrl: string;
  description?: string;
  materials?: string[];
}
