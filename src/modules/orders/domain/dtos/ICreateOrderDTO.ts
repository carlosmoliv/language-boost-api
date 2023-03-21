import { Item } from "../../infrastructure/mongo/models/Item";
import { ICreateItemDTO } from "./ICreateItemDTO";

export interface ICreateOrderDTO {
  total: number;
  studentId: string;
  items: ICreateItemDTO[];
}
