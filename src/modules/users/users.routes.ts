import express, { Request, Response, Router } from "express";
import { UsersController } from "./users.controller";

const usersRouter: Router = express.Router();

const usersController = new UsersController();

usersRouter.post("/register", (req: Request, res: Response) =>
  usersController.register(req, res)
);

export default usersRouter;
