import express, { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../../modules/users/domain/user.enums";
import { validator } from "../middlewares/validator.middleware";
import { CreateUserByRoleController } from "../../../../modules/users/infrastructure/http/controllers/CreateUserController";
import { LoginUserByRoleController } from "../../../../modules/users/infrastructure/http/controllers/LoginUserController";
import { createUserSchema } from "../../../../modules/users/domain/user.validations";

const tutorsRouter: Router = express.Router();

const createUserByRoleController = new CreateUserByRoleController();
const loginUserByRoleController = new LoginUserByRoleController();

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
