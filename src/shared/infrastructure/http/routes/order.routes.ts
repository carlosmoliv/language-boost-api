import express, { NextFunction, Request, Response, Router } from "express";
import { CreateOrderController } from "../../../../modules/orders/infrastructure/http/controllers/CreateOrderController";
import { ItemRepository } from "../../../../modules/orders/infrastructure/repositories/ItemRepository";
import { OrderRepository } from "../../../../modules/orders/infrastructure/repositories/OrderRepository";
import { UserRepository } from "../../../../modules/users/infrastructure/mongo/repositories/UserRepository";

const orderRepository = new OrderRepository();
const userRepository = new UserRepository();
const itemRepository = new ItemRepository();

const createOrderController = new CreateOrderController(
  orderRepository,
  userRepository,
  itemRepository
);

const ordersRouter: Router = express.Router();

ordersRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createOrderController.handle(req, res, next);
});

export default ordersRouter;
