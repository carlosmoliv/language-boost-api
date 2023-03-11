import express, { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../../modules/users/domain/users.enums";
import { validator } from "../middlewares/validator.middleware";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.middleware";
import { UsersRepository } from "../../../../modules/users/infrastructure/mongo/repositories/UsersRepository";
import { CreateUserByRoleController } from "../../../../modules/users/application/CreateUserByRoleController";
import { LoginUserByRoleController } from "../../../../modules/users/application/LoginUserByRoleController";
import { registerUserSchema } from "../../../../modules/users/domain/users.validations";

const studentsRouter: Router = express.Router();
const usersRepository = new UsersRepository();

const createUserByRoleController = new CreateUserByRoleController(
  usersRepository
);

const loginUserByRoleController = new LoginUserByRoleController(
  usersRepository
);

studentsRouter.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    loginUserByRoleController.handle(req, res, next, Role.student)
);

studentsRouter.post(
  "/register",
  validator(registerUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    createUserByRoleController.handle(req, res, next, Role.student)
);

export default studentsRouter;
