import { NextFunction, Request, Response } from "express";
import { logger } from "../../../../shared/infrastructure/adapters/utils/logger.utils";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserByRoleUseCase } from "../../domain/use-cases/createUserByRole/CreateUserByRoleUseCase";
import { Role } from "../../domain/user.enums";

export class CreateUserByRoleController {
  private createUserByRoleUseCase: CreateUserByRoleUseCase;

  constructor(userRepository: IUserRepository) {
    this.createUserByRoleUseCase = new CreateUserByRoleUseCase(userRepository);
  }

  async handle(req: Request, res: Response, next: NextFunction, role: Role) {
    try {
      const user = await this.createUserByRoleUseCase.execute(req.body, role);
      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
