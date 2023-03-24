import express, { NextFunction, Request, Response, Router } from "express";
import { CourseRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/CourseRepository";
import { CreateModuleController } from "../../../../modules/courses/infrastructure/http/controllers/CreateModuleController";
import { ModuleRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/ModuleRepository";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.middleware";
import { Role } from "../../../../modules/users/domain/user.enums";

const createModuleController = new CreateModuleController();
const modulesRouter: Router = express.Router();

modulesRouter.post(
  "/",
  verifyAuthentication([Role.admin]),
  (req: Request, res: Response, next: NextFunction) => {
    createModuleController.handle(req, res, next);
  }
);

export default modulesRouter;
