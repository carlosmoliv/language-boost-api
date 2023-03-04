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

  it("should create a new user with the provided data", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe.1@example.com",
      password: "123456",
    };

    const user = await usersService.registerUser(data);

    expect(user).toBeDefined();
    expect(user).toHaveProperty("_id");
  });

  it("shouldn't create user with an email that already exists", async () => {
    const existingUser = {
      name: "John Doe",
      email: "johndoe.2@example.com",
      password: "123456",
    };

    await usersService.registerUser(existingUser);

    const data = {
      name: "John Doe",
      email: "johndoe.2@example.com",
      password: "123456",
    };

    await expect(usersService.registerUser(data)).rejects.toThrow();
  });
});
