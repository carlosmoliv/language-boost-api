import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../domain/repositories/in-memory/UserRepositoryInMemory";
import { Role } from "../../domain/user.enums";
import { CreateUserByRoleUseCase } from "./CreateUserUseCase";
import { LogInUserByRoleUseCase } from "./LoginUserUseCase";

describe("Login User by Role", () => {
  let userRepository: UserRepositoryInMemory;
  let loginUserByRole: LogInUserByRoleUseCase;
  let createUserByRole: CreateUserByRoleUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    loginUserByRole = new LogInUserByRoleUseCase(userRepository);
    createUserByRole = new CreateUserByRoleUseCase(userRepository);
  });

  it("should login a user student and provide a token", async () => {
    const user = await createUserByRole.execute({
      name: "John Doe",
      email: "johndoe.student.1@example.com",
      password: "12345678",
    });

    const result = await loginUserByRole.execute({
      email: user.email,
      password: "12345678",
    });

    expect(result.token).toBeDefined();
  });

  it("should login a user tutor and provide a token", async () => {
    const user = await createUserByRole.execute(
      {
        name: "John Doe",
        email: "johndoe.tutor.1@example.com",
        password: "12345678",
      },
      Role.tutor
    );

    const result = await loginUserByRole.execute(
      {
        email: user.email,
        password: "12345678",
      },
      Role.tutor
    );

    expect(result.token).toBeDefined();
  });

  it("should login a user admin and provide a token", async () => {
    const user = await createUserByRole.execute(
      {
        name: "John Doe",
        email: "johndoe.admin.1@example.com",
        password: "12345678",
      },
      Role.admin
    );

    const result = await loginUserByRole.execute(
      {
        email: user.email,
        password: "12345678",
      },
      Role.admin
    );

    expect(result.token).toBeDefined();
  });

  it("shouldn't login a user with invalid credentials", async () => {
    const data = {
      email: "johndoe.student.1@example.com",
      password: "87654321",
    };

    await expect(loginUserByRole.execute(data, Role.student)).rejects.toEqual(
      new AppError("AuthenticationError", "Invalid credentials.", 401)
    );
  });
});
