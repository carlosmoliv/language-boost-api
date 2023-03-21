import express, { NextFunction, Request, Response, Router } from "express";
import { CreateLessonController } from "../../../../modules/lessons/application/CreateLessonController";
import { LessonRepository } from "../../../../modules/lessons/infrastructure/repositories/LessonRepository";
import { ModuleRepository } from "../../../../modules/module/Infrastructure/mongo/repositories/ModuleRepository";

const lessonRepository = new LessonRepository();
const moduleRepository = new ModuleRepository();

const createLessonController = new CreateLessonController(
  moduleRepository,
  lessonRepository
);

const lessonsRouter: Router = express.Router();

lessonsRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createLessonController.handle(req, res, next);
});

export default lessonsRouter;
