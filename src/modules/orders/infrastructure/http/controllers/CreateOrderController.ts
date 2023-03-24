import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "../../../application/use-cases/CreateOrderUseCase";

export class CreateOrderController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const createOrderUseCase = container.resolve(CreateOrderUseCase);

      const checkoutSessionUrl = await createOrderUseCase.execute(req.body);

      // return res.redirect(303, checkoutSessionUrl);
      return res.json({ checkoutUrl: checkoutSessionUrl });
    } catch (error) {
      return next(error);
    }
  }
}
