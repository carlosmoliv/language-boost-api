import { ICreateItemDTO } from "./ICreateItemDTO";

export interface ICreateOrderDTO {
  total: number;
  userId: string;
  items: ICreateItemDTO[];
}
