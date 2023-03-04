import express, { NextFunction, Request, Response, Router } from "express";
import { validator } from "../../middleware/validation.middleware";
import { registerUserSchema } from "../users/users.validations";
import { AdminsController } from "./admins.controller";

const adminsRouter: Router = express.Router();
const adminsController = new AdminsController();

adminsRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  adminsController.login(req, res, next)
);

adminsRouter.post(
  "/register",
  validator(registerUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    adminsController.register(req, res, next)
);

export default adminsRouter;
