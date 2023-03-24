import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCourseUseCase } from "../../../application/use-cases/CreateCourseUseCase";

export class CreateCourseController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const createCourseUseCase = container.resolve(CreateCourseUseCase);

      const course = await createCourseUseCase.execute(req.body);
      return res.status(200).json(course);
    } catch (error) {
      return next(error);
    }
  }
}
