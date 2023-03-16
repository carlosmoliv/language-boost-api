import { CourseType } from "../course.enums";

export interface ICreateCourseDTO {
  title: string;
  type: CourseType;
  description?: string;
  price?: number;
}
