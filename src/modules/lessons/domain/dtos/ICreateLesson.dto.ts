export interface ICreateLessonDTO {
  moduleId: string;
  title: string;
  videoUrl?: string;
  description?: string;
  materials?: string[];
}
