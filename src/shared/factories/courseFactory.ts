import { CourseType } from "../../modules/courses/domain/courses.enums";
import { ICreateCourseDTO } from "../../modules/courses/domain/dtos/ICreateCourse.dto";

export const createCourseFactory = ({
  title = "Test Course",
  type = CourseType.paid,
  price = 500,
  description = "Test Course Description",
} = {}): ICreateCourseDTO => {
  return {
    title,
    type,
    price,
    description,
  };
};
