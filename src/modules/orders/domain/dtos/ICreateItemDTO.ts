import { ItemCurrency } from "../enums/item.enums";

export interface ICreateItemDTO {
  name: string;
  courseId: string;
  amount: number;
  currency: ItemCurrency;
}
