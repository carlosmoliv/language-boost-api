export interface ICreateLessonDTO {
  courseId: string;
  title: string;
  videoUrl: string;
  description?: string;
  materials?: string[];
}
