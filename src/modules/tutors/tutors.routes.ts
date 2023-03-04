import express, { NextFunction, Request, Response, Router } from "express";
import { validator } from "../../middleware/validation.middleware";
import { registerUserSchema } from "../users/users.validations";
import { TutorsController } from "./tutors.controller";

const tutorsRouter: Router = express.Router();
const tutorsController = new TutorsController();

tutorsRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  tutorsController.login(req, res, next)
);

tutorsRouter.post(
  "/register",
  validator(registerUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    tutorsController.register(req, res, next)
);

export default tutorsRouter;
