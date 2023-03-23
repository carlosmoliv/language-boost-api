import express, { NextFunction, Request, Response, Router } from "express";
import { CreateCourseController } from "../../../../modules/courses/infrastructure/http/controllers/CreateCourseController";
import { CourseRepository } from "../../../../modules/courses/infrastructure/mongo/repositories/CourseRepository";
import { Role } from "../../../../modules/users/domain/user.enums";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.middleware";

const courseRepository = new CourseRepository();
const createCourseController = new CreateCourseController(courseRepository);

const coursesRouter: Router = express.Router();

coursesRouter.post(
  "/",
  verifyAuthentication([Role.admin]),
  (req: Request, res: Response, next: NextFunction) => {
    createCourseController.handle(req, res, next);
  }
);

export default coursesRouter;
