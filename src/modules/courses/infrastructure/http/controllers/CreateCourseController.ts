import { NextFunction, Request, Response } from "express";
import { CreateCourseUseCase } from "../../../application/use-cases/CreateCourseUseCase";
import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";

export class CreateCourseController {
  private createCourseUseCase: CreateCourseUseCase;

  constructor(courseRepository: ICourseRepository) {
    this.createCourseUseCase = new CreateCourseUseCase(courseRepository);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await this.createCourseUseCase.execute(req.body);
      return res.status(200).json(course);
    } catch (error) {
      return next(error);
    }
  }
}
