import express, { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validator } from "../../middleware/validation.middleware";
import { Role } from "../users/users.enums";
import { registerUserSchema } from "../users/users.validations";
import { TutorsController } from "./tutors.controller";

const tutorsRouter: Router = express.Router();
const tutorsController = new TutorsController();

tutorsRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  tutorsController.login(req, res, next)
);

tutorsRouter.post(
  "/register",
  authMiddleware([Role.tutor]),
  validator(registerUserSchema),
  (req: Request, res: Response, next: NextFunction) =>
    tutorsController.register(req, res, next)
);

export default tutorsRouter;
