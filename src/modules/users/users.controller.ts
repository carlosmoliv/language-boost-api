import { Request, Response } from "express";
import { logger } from "../../../utils/logger.utils";
import { UsersService } from "./users.service";

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.usersService.registerUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      logger.error(error);

      return res.status(400).json({
        error: "Looks like something went wrong, please try again later.",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const user = await this.usersService.loginUserByEmail(req.body);
      return res.status(200).json({ user });
    } catch (error) {
      logger.error(error);

      const errorMessage =
        error instanceof Error  
          ? error.message
          : "Looks like something went wrong, please try again later";

      return res.status(400).json({ error: errorMessage });
    }
  }
}
