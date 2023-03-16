import { AppError } from "../../../../../shared/errors/AppError";
import { hashPassword } from "../../../../../shared/infrastructure/adapters/bcrypt.utils";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { Role } from "../../user.enums";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserByRoleUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: ICreateUserRequest, role: Role = Role.student) {
    switch (role) {
      case Role.student:
        return this.usersRepository.createUserStudent({
          ...data,
          password: await hashPassword(data.password),
        });

      case Role.tutor:
        return this.usersRepository.createUserTutor({
          ...data,
          password: await hashPassword(data.password),
        });

      case Role.admin:
        return this.usersRepository.createUserAdmin({
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
