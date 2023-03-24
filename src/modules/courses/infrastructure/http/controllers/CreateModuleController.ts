import { NextFunction, Request, Response } from "express";
import { CreateModuleUseCase } from "../../../application/use-cases/CreateModuleUseCase";
import { container } from "tsyringe";

export class CreateModuleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const createModuleUseCase = container.resolve(CreateModuleUseCase);

      const data = await createModuleUseCase.execute(req.body);
      return res.status(200).json(data);
    } catch (error) {
      return next(error);
    }
  }
}
