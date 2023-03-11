import { NextFunction, Request, Response } from "express";
import { logger } from "../../../shared/infrastructure/adapters/logger.utils";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { LogInUserByRoleUseCase } from "../domain/use-cases/loginUserByRole/LoginUserByRoleUseCase";
import { Role } from "../domain/users.enums";

export class LoginUserByRoleController {
  private loginUserByRoleUseCase: LogInUserByRoleUseCase;

  constructor(usersRepository: IUsersRepository) {
    this.loginUserByRoleUseCase = new LogInUserByRoleUseCase(usersRepository);
  }

  async handle(req: Request, res: Response, next: NextFunction, role: Role) {
    try {
      const user = await this.loginUserByRoleUseCase.execute(req.body, role);
      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
