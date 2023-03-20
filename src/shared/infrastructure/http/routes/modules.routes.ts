import express, { NextFunction, Request, Response, Router } from "express";
import { CourseRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/CourseRepository";
import { CreateModuleController } from "../../../../modules/module/application/CreateModuleController";
import { ModuleRepository } from "../../../../modules/module/Infrastructure/mongo/repositories/ModuleRepository";

const courseRepository = new CourseRepository();
const moduleRepository = new ModuleRepository();

const createModuleController = new CreateModuleController(
  courseRepository,
  moduleRepository
);

const modulesRouter: Router = express.Router();

modulesRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createModuleController.handle(req, res, next);
});

export default modulesRouter;
