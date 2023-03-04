import { UsersService } from "../users.service";
import * as database from "../../../../config/database";

describe("Login User by email", () => {
  let usersService: UsersService;

  beforeAll(() => {
    usersService = new UsersService();
    database.connect();
  });

  afterAll(() => {
    database.disconnect();
  });

  it("should login the user and provide a token", async () => {
    const data = {
      email: "johndoe.1@gmail.com",
      password: "12345678",
    };

    const user = await usersService.loginUserByEmail(data);

    expect(user.token).toBeDefined();
  });

  it("should");
});
