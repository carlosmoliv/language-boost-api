describe("Login User by Role", () => {
  //   let usersService: UsersService;
  //   beforeAll(() => {
  //     usersService = new UsersService();
  //     database.connect();
  //   });
  //   afterAll(() => {
  //     database.disconnect();
  //   });
  //   it("should login a user student and provide a token", async () => {
  //     const data = {
  //       email: "johndoe.student.1@example.com",
  //       password: "12345678",
  //     };
  //     const user = await usersService.logInUserByEmail(data);
  //     expect(user.token).toBeDefined();
  //   });
  //   it("should login a user tutor and provide a token", async () => {
  //     const data = {
  //       email: "johndoe.tutor.1@example.com",
  //       password: "12345678",
  //     };
  //     const user = await usersService.logInUserByEmail(data, Role.tutor);
  //     expect(user.token).toBeDefined();
  //   });
  //   it("should login a user admin and provide a token", async () => {
  //     const data = {
  //       email: "johndoe.admin.1@example.com",
  //       password: "12345678",
  //     };
  //     const user = await usersService.logInUserByEmail(data, Role.admin);
  //     expect(user.token).toBeDefined();
  //   });
  //   it("shouldn't login a user with invalid credentials", async () => {
  //     const data = {
  //       email: "johndoe.student.1@example.com",
  //       password: "123456",
  //     };
  //     await expect(
  //       usersService.logInUserByEmail(data, Role.student)
  //     ).rejects.toEqual(
  //       new AppError("AuthenticationError", "Invalid credentials.", 401)
  //     );
  //   });
});
