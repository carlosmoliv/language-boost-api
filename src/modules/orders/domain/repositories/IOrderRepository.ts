import { Order } from "../../infrastructure/mongo/models/Order";

export interface ICreateOrderRepository {
  total: number;
  userId: string;
  itemsIds: string[];
}

export interface IOrderRepository {
  create(data: ICreateOrderRepository): Promise<Order>;
}
