import { Order } from "../../infrastructure/mongo/models/Order";
import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";

export interface IOrderRepository {
  createOrder(order: ICreateOrderDTO): Promise<Order>;
}
