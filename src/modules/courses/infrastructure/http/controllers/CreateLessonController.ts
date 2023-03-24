import { NextFunction, Request, Response } from "express";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { ILessonRepository } from "../../../domain/repositories/ILessonsRepository";
import { CreateLessonUseCase } from "../../../application/use-cases/CreateLessonUseCase";
import { container } from "tsyringe";

export class CreateLessonController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const createLessonUseCase = container.resolve(CreateLessonUseCase);

      const data = await createLessonUseCase.execute(req.body);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }
}
