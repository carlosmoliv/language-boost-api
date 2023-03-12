import express, { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../../modules/users/domain/users.enums";
import { validator } from "../middlewares/validator.middleware";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.middleware";
import { UsersRepository } from "../../../../modules/users/infrastructure/mongo/repositories/UsersRepository";
import { CreateUserByRoleController } from "../../../../modules/users/application/CreateUserByRoleController";
import { LoginUserByRoleController } from "../../../../modules/users/application/LoginUserByRoleController";
import { createUserSchema } from "../../../../modules/users/domain/users.validations";

const tutorsRouter: Router = express.Router();

const usersRepository = new UsersRepository();

const createUserByRoleController = new CreateUserByRoleController(
  usersRepository
);

const loginUserByRoleController = new LoginUserByRoleController(
  usersRepository
);

tutorsRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  loginUserByRoleController.handle(req, res, next, Role.tutor)
);

tutorsRouter.post(
  "/register",
  validator(createUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    createUserByRoleController.handle(req, res, next, Role.tutor)
);

export default tutorsRouter;
