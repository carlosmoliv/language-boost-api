import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { Role } from "../../../domain/user.enums";
import { logger } from "../../../../../shared/infrastructure/adapters/utils/logger.utils";
import { CreateUserByRoleUseCase } from "../../../application/use-cases/CreateUserUseCase";

export class CreateUserByRoleController {
  async handle(req: Request, res: Response, next: NextFunction, role: Role) {
    try {
      const createUserByRoleUseCase = container.resolve(
        CreateUserByRoleUseCase
      );

      const user = await createUserByRoleUseCase.execute(req.body, role);
      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
