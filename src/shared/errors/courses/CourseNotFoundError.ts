import { AppError } from "../AppError";

export class CourseNotFoundError extends AppError {
  constructor(message = "Course not found with the provided id.") {
    super("CourseNotFoundError", message, 404);
  }
}
