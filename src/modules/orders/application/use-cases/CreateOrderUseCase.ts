import { Role } from "../../../users/domain/user.enums";
import { AppError } from "../../../../shared/errors/AppError";
import { UserNotFoundError } from "../../../../shared/errors/users/UserNotFoundError";
import { StripePaymentService } from "../../../../shared/infrastructure/providers/stripe/StripePayment";

import { IUserRepository } from "../../../users/domain/repositories/IUserRepository";
import { ICreateOrderDTO } from "../../domain/dtos/ICreateOrderDTO";
import { IItemRepository } from "../../domain/repositories/IItemRepository";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUseCase {
  private paymentService: StripePaymentService;

  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("ItemRepository")
    private itemRepository: IItemRepository
  ) {
    this.paymentService = new StripePaymentService();
  }

  async execute(data: ICreateOrderDTO) {
    let itemsIds: string[] = [];

    const { userId, items, total } = data;

    const user = await this.userRepository.findByIdAndRole(
      userId,
      Role.student
    );
    if (!user) throw new UserNotFoundError();

    for (const item of items) {
      const itemCreated = await this.itemRepository.create(item);
      itemsIds.push(itemCreated.id);
    }

    const order = await this.orderRepository.create({
      total: total,
      userId: user.id,
      itemsIds: itemsIds,
    });

    const sessionCheckout = await this.paymentService.createCheckoutSession({
      items: items,
      orderId: order.id,
    });

    if (!sessionCheckout.url)
      throw new AppError(
        "StripeCheckoutSessionError",
        "Stripe session checkout error."
      );

    return sessionCheckout.url;
  }
}
