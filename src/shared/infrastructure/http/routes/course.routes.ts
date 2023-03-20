import express, { NextFunction, Request, Response, Router } from "express";
import { CreateCourseController } from "../../../../modules/courses/application/CreateCourseController";
import { CourseRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/CourseRepository";

const courseRepository = new CourseRepository();
const createCourseController = new CreateCourseController(courseRepository);

const coursesRouter: Router = express.Router();

coursesRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createCourseController.handle(req, res, next);
});

export default coursesRouter;