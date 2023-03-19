import express, { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../../../modules/users/domain/user.enums";
import { validator } from "../../middlewares/validator.middleware";
import { UsersRepository } from "../../../../../modules/users/infrastructure/mongo/repositories/UserRepository";
import { CreateUserByRoleController } from "../../../../../modules/users/application/controllers/CreateUserByRoleController";
import { LoginUserByRoleController } from "../../../../../modules/users/application/controllers/LoginUserByRoleController";
import { createUserSchema } from "../../../../../modules/users/domain/user.validations";

const adminsRouter: Router = express.Router();

const usersRepository = new UsersRepository();

const createUserByRoleController = new CreateUserByRoleController(
  usersRepository
);

const loginUserByRoleController = new LoginUserByRoleController(
  usersRepository
);

adminsRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  loginUserByRoleController.handle(req, res, next, Role.admin)
);

adminsRouter.post(
  "/register",
  validator(createUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    createUserByRoleController.handle(req, res, next, Role.admin)
);

export default adminsRouter;
