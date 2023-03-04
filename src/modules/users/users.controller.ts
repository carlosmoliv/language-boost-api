import { NextFunction, Request, Response } from "express";
import { logger } from "../../../utils/logger.utils";
import { UsersService } from "./users.service";

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }
}
