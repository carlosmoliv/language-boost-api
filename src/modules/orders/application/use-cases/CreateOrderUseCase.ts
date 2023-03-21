import { ICreateOrderDTO } from "../../domain/dtos/ICreateOrderDTO";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(data: ICreateOrderDTO) {
    return {};
  }
}
