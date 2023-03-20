import { NextFunction, Request, Response } from "express";
import { IModuleRepository } from "../../module/domain/repositories/IModuleRepository";
import { ILessonRepository } from "../domain/repositories/ILessonsRepository";
import { CreateLessonUseCase } from "../domain/use-cases/CreateLessonUseCase";

export class CreateLessonController {
  private createLessonUseCase: CreateLessonUseCase;

  constructor(
    moduleRepository: IModuleRepository,
    lessonRepository: ILessonRepository
  ) {
    this.createLessonUseCase = new CreateLessonUseCase(
      moduleRepository,
      lessonRepository
    );
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.createLessonUseCase.execute(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  }
}
