import { ICreateItemDTO } from "../../../../../modules/orders/domain/dtos/ICreateItemDTO";

export interface ICheckoutSession {
  items: ICreateItemDTO[];
  orderId: string;
}
