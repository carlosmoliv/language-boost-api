import { AppError } from "../AppError";

export class UserNotFoundError extends AppError {
  constructor(message = "User not found with the provided id.") {
    super("UserNotFoundError", message);
  }
}
