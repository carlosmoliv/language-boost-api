import express, { NextFunction, Request, Response, Router } from "express";
import { CreateLessonController } from "../../../../modules/courses/infrastructure/http/controllers/CreateLessonController";
import { LessonRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/LessonRepository";
import { ModuleRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/ModuleRepository";
import { Role } from "../../../../modules/users/domain/user.enums";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.middleware";

const lessonRepository = new LessonRepository();
const moduleRepository = new ModuleRepository();

const createLessonController = new CreateLessonController(
  moduleRepository,
  lessonRepository
);

const lessonsRouter: Router = express.Router();

lessonsRouter.post(
  "/",
  verifyAuthentication([Role.admin]),
  (req: Request, res: Response, next: NextFunction) => {
    createLessonController.handle(req, res, next);
  }
);

export default lessonsRouter;
