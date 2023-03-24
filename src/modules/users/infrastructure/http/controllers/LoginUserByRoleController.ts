import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { logger } from "../../../../../shared/infrastructure/adapters/utils/logger.utils";
import { LogInUserByRoleUseCase } from "../../../application/use-cases/LoginUserByRoleUseCase";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { Role } from "../../../domain/user.enums";

export class LoginUserByRoleController {
  async handle(req: Request, res: Response, next: NextFunction, role: Role) {
    try {
      const loginUserByRoleUseCase = container.resolve(LogInUserByRoleUseCase);
      const user = await loginUserByRoleUseCase.execute(req.body, role);

      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
