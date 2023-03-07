import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger.utils";
import { Role } from "../users/users.enums";
import { UsersService } from "../users/users.service";

export class StudentsController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.usersService.logInUserByEmail(
        req.body,
        Role.student
      );

      return res.status(200).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.usersService.registerUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }
}
