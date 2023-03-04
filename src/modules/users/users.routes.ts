import express, { NextFunction, Request, Response, Router } from "express";
import { validator } from "../../middleware/validation.middleware";
import { UsersController } from "./users.controller";
import { registerUserSchema } from "./users.validations";

const usersRouter: Router = express.Router();
const usersController = new UsersController();

export default usersRouter;
