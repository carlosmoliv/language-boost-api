import express, { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../../modules/users/domain/user.enums";
import { validator } from "../middlewares/validator.middleware";
import { UserRepository } from "../../../../modules/users/infrastructure/mongo/repositories/UserRepository";
import { CreateUserByRoleController } from "../../../../modules/users/application/controllers/CreateUserByRoleController";
import { LoginUserByRoleController } from "../../../../modules/users/application/controllers/LoginUserByRoleController";
import { createUserSchema } from "../../../../modules/users/domain/user.validations";

const studentsRouter: Router = express.Router();
const userRepository = new UserRepository();

const createUserByRoleController = new CreateUserByRoleController(
  userRepository
);

const loginUserByRoleController = new LoginUserByRoleController(userRepository);

studentsRouter.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    loginUserByRoleController.handle(req, res, next, Role.student)
);

studentsRouter.post(
  "/register",
  validator(createUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    createUserByRoleController.handle(req, res, next, Role.student)
);

export default studentsRouter;
