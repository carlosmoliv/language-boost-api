import express, { NextFunction, Request, Response, Router } from "express";
import { CreateOrderController } from "../../../../modules/orders/infrastructure/http/controllers/CreateOrderController";
import { ItemRepository } from "../../../../modules/orders/infrastructure/repositories/ItemRepository";
import { OrderRepository } from "../../../../modules/orders/infrastructure/repositories/OrderRepository";
import { Role } from "../../../../modules/users/domain/user.enums";
import { UserRepository } from "../../../../modules/users/infrastructure/mongo/repositories/UserRepository";
import { verifyAuthentication } from "../middlewares/verifyAuthentication.middleware";

const createOrderController = new CreateOrderController();
const ordersRouter: Router = express.Router();

ordersRouter.post(
  "/",
  verifyAuthentication([Role.student, Role.admin]),
  (req: Request, res: Response, next: NextFunction) => {
    createOrderController.handle(req, res, next);
  }
);

export default ordersRouter;
