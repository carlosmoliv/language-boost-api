import { NextFunction, Request, Response } from "express";
import { IUserRepository } from "../../../../users/domain/repositories/IUserRepository";
import { CreateOrderUseCase } from "../../../application/use-cases/CreateOrderUseCase";
import { IItemRepository } from "../../../domain/repositories/IItemRepository";
import { OrderRepository } from "../../repositories/OrderRepository";

export class CreateOrderController {
  private createOrderUseCase: CreateOrderUseCase;

  constructor(
    orderRepository: OrderRepository,
    userRepository: IUserRepository,
    itemRepository: IItemRepository
  ) {
    this.createOrderUseCase = new CreateOrderUseCase(
      orderRepository,
      userRepository,
      itemRepository
    );
  }

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const checkoutSessionUrl = await this.createOrderUseCase.execute(
        req.body
      );

      // return res.redirect(303, checkoutSessionUrl);
      return res.json({ checkoutUrl: checkoutSessionUrl });
    } catch (error) {
      return next(error);
    }
  }
}
