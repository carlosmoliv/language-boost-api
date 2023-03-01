import express, { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { UsersController } from "./users.controller";

const usersRouter: Router = express.Router();

const usersController = new UsersController();

usersRouter.post("/register", (req: Request, res: Response) =>
  usersController.register(req, res)
);

usersRouter.post("/login", (req: Request, res: Response) =>
  usersController.login(req, res)
);

usersRouter.get("/protected", authMiddleware, (req, res) => {
  return res.json("Middleware working");
});

export default usersRouter;
