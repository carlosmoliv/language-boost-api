import { NextFunction, Request, Response } from "express";
import { ICourseRepository } from "../domain/repositories/ICourseRepository";
import { CreateCourseUseCase } from "../domain/use-cases/CreateCourseUseCase";

export class CreateCourseController {
  private createCourseUseCase: CreateCourseUseCase;

  constructor(courseRepository: ICourseRepository) {
    this.createCourseUseCase = new CreateCourseUseCase(courseRepository);
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await this.createCourseUseCase.execute(req.body);
      return res.status(201).json(course);
    } catch (error) {
      return next(error);
    }
  }
}
