import request from "supertest";
import setupApp from "../app";
import { disconnect } from "../../database/mongo";
import { Application } from "express";

describe("Admin routes", () => {
  let app: Application;

  beforeAll(async () => {
    app = await setupApp();
  });

  afterAll(async () => {
    await disconnect();
  });

  it("should return 200 when successful login an Admin", async () => {
    const payload = {
      email: "johndoe.admin.1@example.com",
      password: "12345678",
    };

    const { statusCode } = await request(app)
      .post("/v1/admins/login")
      .send(payload);

    expect(statusCode).toBe(200);
  });
});
