import { NextFunction, Request, Response } from "express";
import { logger } from "../../../utils/logger.utils";
import { UsersService } from "./users.service";

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.usersService.loginUserByEmail(req.body);
      return res.status(200).json({ user });
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  }

  async testContext(req: Request, res: Response) {
    console.log(req.user);
    logger.info("Test context: ", req.user.id);
  }
}
