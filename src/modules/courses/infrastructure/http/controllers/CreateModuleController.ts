import { NextFunction, Request, Response } from "express";
import { ICourseRepository } from "../../../domain/repositories/ICourseRepository";
import { IModuleRepository } from "../../../domain/repositories/IModuleRepository";
import { CreateModuleUseCase } from "../../../application/use-cases/CreateModuleUseCase";

export class CreateModuleController {
  private createModuleUseCase: CreateModuleUseCase;

  constructor(
    courseRepository: ICourseRepository,
    moduleRepository: IModuleRepository
  ) {
    this.createModuleUseCase = new CreateModuleUseCase(
      courseRepository,
      moduleRepository
    );
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.createModuleUseCase.execute(req.body);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }
}
