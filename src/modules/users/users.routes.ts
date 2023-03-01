import express, { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { UsersController } from "./users.controller";

const usersRouter: Router = express.Router();

const usersController = new UsersController();

usersRouter.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) =>
    usersController.register(req, res, next)
);

usersRouter.post("/login", (req: Request, res: Response, next: NextFunction) =>
  usersController.login(req, res, next)
);

usersRouter.get("/protected", authMiddleware, (req, res) =>
  usersController.testContext(req, res)
);

export default usersRouter;
