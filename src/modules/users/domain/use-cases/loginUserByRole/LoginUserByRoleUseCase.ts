import { comparePasswords } from "../../../../../shared/infrastructure/adapters/bcrypt";
import { AppError } from "../../../../../shared/errors/AppError";
import { createToken } from "../../../../../shared/infrastructure/adapters/jwt.utils";
import { ILoginUserByEmail } from "../../dtos/loginUserByEmail.dto";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { Role } from "../../users.enums";

export class LogInUserByRoleUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(data: ILoginUserByEmail, role: Role = Role.student) {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmailAndRole(email, role);

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
