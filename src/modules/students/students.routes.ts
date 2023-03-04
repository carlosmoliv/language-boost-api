import express, { NextFunction, Request, Response, Router } from "express";
import { validator } from "../../middleware/validation.middleware";
import { registerUserSchema } from "../users/users.validations";
import { StudentsController } from "./students.controller";

const studentsRouter: Router = express.Router();
const studentsController = new StudentsController();

studentsRouter.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) =>
    studentsController.login(req, res, next)
);

studentsRouter.post(
  "/register",
  validator(registerUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    studentsController.register(req, res, next)
);

export default studentsRouter;
