import { AppError } from "../../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { Role } from "../../users.enums";
import { CreateUserByRoleUseCase } from "../createUserByRole/CreateUserByRoleUseCase";
import { LogInUserByRoleUseCase } from "./LoginUserByRoleUseCase";

describe("Login User by Role", () => {
  let usersRepository: UsersRepositoryInMemory;
  let loginUserByRole: LogInUserByRoleUseCase;
  let createUserByRole: CreateUserByRoleUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    loginUserByRole = new LogInUserByRoleUseCase(usersRepository);
    createUserByRole = new CreateUserByRoleUseCase(usersRepository);
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
