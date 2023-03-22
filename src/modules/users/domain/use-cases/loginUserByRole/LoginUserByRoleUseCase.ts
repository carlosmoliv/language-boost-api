import { comparePasswords } from "../../../../../shared/infrastructure/adapters/bcrypt";
import { AppError } from "../../../../../shared/errors/AppError";
import { createToken } from "../../../../../shared/infrastructure/adapters/jwt";
import { ILoginUserByEmail } from "../../dtos/ILoginUserByEmail.dto";
import { IUserRepository } from "../../repositories/IUserRepository";
import { Role } from "../../user.enums";

export class LogInUserByRoleUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ILoginUserByEmail, role: Role = Role.student) {
    const { email, password } = data;

    const user = await this.userRepository.findByEmailAndRole(email, role);

    if (!user)
      throw new AppError("AuthenticationError", "Invalid credentials.", 401);

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid)
      throw new AppError("AuthenticationError", "Invalid credentials.", 401);

    const token = createToken({ userId: user._id });
    user.token = token;

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token: token,
    };
  }
}
