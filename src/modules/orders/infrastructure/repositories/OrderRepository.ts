import { orderModel } from "../../../models";
import {
  ICreateOrderRepository,
  IOrderRepository,
} from "../../domain/repositories/IOrderRepository";
import { Order } from "../mongo/models/Order";

export class OrderRepository implements IOrderRepository {
  async create(data: ICreateOrderRepository): Promise<Order> {
    const { itemsIds } = data;

    return orderModel.create({ ...data, items: itemsIds });
  }
}
