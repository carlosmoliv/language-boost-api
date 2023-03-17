import { AppError } from "../AppError";

export class ModuleNotFoundError extends AppError {
  constructor(message = "Course not found with the provided id.") {
    super("ModuleNotFoundError", message, 404);
  }
}
