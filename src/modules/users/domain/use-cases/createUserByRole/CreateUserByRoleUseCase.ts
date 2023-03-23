import { AppError } from "../../../../../shared/errors/AppError";
import { hashPassword } from "../../../../../shared/infrastructure/adapters/utils/bcrypt.utils";
import { IUserRepository } from "../../repositories/IUserRepository";
import { Role } from "../../user.enums";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserByRoleUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequest, role: Role = Role.student) {
    switch (role) {
      case Role.student:
        return this.userRepository.createUserStudent({
          ...data,
          password: await hashPassword(data.password),
        });

      case Role.tutor:
        return this.userRepository.createUserTutor({
          ...data,
          password: await hashPassword(data.password),
        });

      case Role.admin:
        return this.userRepository.createUserAdmin({
          ...data,
          password: await hashPassword(data.password),
        });

      default:
        throw new AppError(
          "InvalidUserRoleError",
          "Invalid user role provided."
        );
    }
  }
}
