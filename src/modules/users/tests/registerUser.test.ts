import { UsersService } from "../users.service";
import * as database from "../../../../config/database";
import { Role } from "../users.enums";

describe("Register User", () => {
  let usersService: UsersService;

  beforeAll(() => {
    usersService = new UsersService();
    database.connect();
  });

  afterAll(() => {
    database.disconnect();
  });

  it("should create a new user student by default with the provided data", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe.student.1@example.com",
      password: "12345678",
    };

    const user = await usersService.registerUser(data);

    expect(user).toBeDefined();
    expect(user).toHaveProperty("_id");
    expect(user.role).toEqual(Role.student);
  });

  it("shouldn't create user with an email that already exists", async () => {
    const existingUser = {
      name: "John Doe",
      email: "johndoe.student.2@example.com",
      password: "12345678",
    };

    await usersService.registerUser(existingUser);

    const data = {
      name: "John Doe",
      email: "johndoe.student.2@example.com",
      password: "12345678",
    };

    await expect(usersService.registerUser(data)).rejects.toThrow();
  });

  it("should create a user tutor if role tutor is provided", async () => {
    const data = {
      email: "johndoe.tutor.1@example.com",
      name: "John Doe Tutor",
      password: "12345678",
    };

    const user = await usersService.registerUser(data, Role.tutor);

    expect(user.role).toEqual(Role.tutor);
    expect(user.tutor).toBeDefined();
  });

  it("should create a user admin if role admin is provided", async () => {
    const data = {
      email: "johndoe.admin.1@example.com",
      name: "John Doe Admin",
      password: "12345678",
    };

    const user = await usersService.registerUser(data, Role.admin);

    expect(user.role).toEqual(Role.admin);
    expect(user.admin).toBeDefined();
  });
});
