import { AppError } from "../../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { Role } from "../../users.enums";

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
        return this.usersRepository.createUserStudent(data);

      case Role.tutor:
        return this.usersRepository.createUserTutor(data);

      case Role.admin:
        return this.usersRepository.createUserAdmin(data);

      default:
        throw new AppError(
          "InvalidUserRoleError",
          "Invalid user role provided."
        );
    }
  }
}
