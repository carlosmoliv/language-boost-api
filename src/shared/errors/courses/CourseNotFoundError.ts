import { AppError } from "../AppError";

export class CourseNotFoundError extends AppError {
  constructor(message = "Course not found with the id provided.") {
    super("CourseNotFoundError", message, 404);
  }
}
