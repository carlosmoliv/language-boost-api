import { CourseType } from "../courses.enums";

export interface ICreateCourseDTO {
  title: string;
  type: CourseType;
  description?: string;
  price?: number;
}
